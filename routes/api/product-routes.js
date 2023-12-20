const express = require('express');
const router = express.Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Middleware for handling async functions
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Get all products
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include: [{ model: Category }, { model: Tag }],
  });
  res.status(200).json(products);
}));

// Get one product by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [{ model: Category }, { model: Tag }],
  });

  if (!product) {
    res.status(404).json({ message: "Product not found!" });
    return;
  }

  res.status(200).json(product);
}));

// Create a new product
router.post('/', asyncHandler(async (req, res) => {
  const createdProduct = await Product.create(req.body);

  if (req.body.tagIds && req.body.tagIds.length) {
    const productTagIds = req.body.tagIds.map((tag_id) => ({
      product_id: createdProduct.id,
      tag_id,
    }));

    await ProductTag.bulkCreate(productTagIds);
  }

  res.status(200).json(createdProduct);
}));

// Update a product by ID
router.put('/:id', asyncHandler(async (req, res) => {
  await Product.update(req.body, { where: { id: req.params.id } });

  if (req.body.tags && req.body.tags.length > 0) {
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    const newProductTags = req.body.tags
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));

    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
      .map(({ id }) => id);

    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
  }

  const updatedProduct = await Product.findByPk(req.params.id, { include: [{ model: Tag }] });
  res.json(updatedProduct);
}));

// Delete a product by ID
router.delete('/:id', asyncHandler(async (req, res) => {
  const deleted = await Product.destroy({ where: { id: req.params.id } });

  if (!deleted) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.status(200).json(deleted);
}));

module.exports = router;
