const router = require('express').Router();

const { Tag, ProductTag, Category, Product } = require('../../models');



// Get all Products and their associated products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({})
    res.json(products);
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get one product by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.json(product)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Create a new Product
router.post('/', async (req, res) => {
  try {
    const category = await Product.create(req.body)
    res.json(category);
  } catch (err) {
    res.status(500).json(err)
  }
})
// // Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const newProduct = await Product.update({
      where: {
        id: req.parmas.id
      }
    })
    res.json(newProduct);
  } catch (err) {
    res.status(500).json(err)
  }
})


// // Delete a Product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.destroy({
      where: {
        id:req.params.id
      }
    })
    res.json(result);
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;

