const router = require('express').Router();

const { Category, Product } = require('../../models');



// Get all categories and their associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({})
    res.json(categories);
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.json(category)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body)
    res.json(newCategory);
  } catch (err) {
    res.status(500).json(err)
  }
})
// // Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const update= await Category.update({
      where: {
        id: req.parmas.id
      }
    })
    res.json(update);
  } catch (err) {
    res.status(500).json(err)
  }
})


// // Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const result = await Category.destroy({
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
