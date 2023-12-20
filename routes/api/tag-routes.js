const router = require('express').Router();

const { Tag, Product, ProductTag } = require('../../models');



// Get all Tags and their associated products
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({})
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get one Tag by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Create a new Tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
})
// // Update a Tag by ID
router.put('/:id', async (req, res) => {
  try {
    const update = await Tag.update({
      where: {
        id: req.parmas.id
      }
    })
    res.json(update);
  } catch (err) {
    res.status(500).json(err)
  }
})


// // Delete a Tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const result = await Tag.destroy({
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
