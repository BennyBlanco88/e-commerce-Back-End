const router = require('express').Router();

const { Category, Product } = require('../../models');

// Middleware for handling async functions
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Get all categories and their associated products
router.get('/', asyncHandler(async (req, res) => {
  const categories = await Category.findAll({ include: [{ model: Product }] });
  res.status(200).json(categories);
}));

// Get one category by its `id` value
router.get('/:id', asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

  if (!category) {
    res.status(404).json({ message: 'id not found' });
    return;
  }

  res.status(200).json(category);
}));

// Create a new category
router.post('/', asyncHandler(async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
}));

// Update a category by ID
router.put('/:id', asyncHandler(async (req, res) => {
  const [updated] = await Category.update(req.body, { where: { id: req.params.id } });

  if (!updated) {
    res.status(404).json({ message: 'id not found' });
    return;
  }

  res.status(200).json(updated);
}));

// Delete a category by its `id` value
router.delete('/:id', asyncHandler(async (req, res) => {
  const deleted = await Category.destroy({ where: { id: req.params.id } });

  if (!deleted) {
    res.status(404).json({ message: 'id not found' });
    return;
  }

  res.status(200).json(deleted);
}));

module.exports = router;
