const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Get all categories and their associated products
router.get('/', async (req, res) => {
  try {
 // find all categories
  
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {

    res.status(500).json({ message: 'not found!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
 // find one category by its `id` value
 
    const category = await Category.findByPk(req.params.id, { include: [{model: Product}] });

    if (!category) {
      res.status(404).json({ message: 'id not found'});
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    
    res.status(500).json({ message: 'not found' });
  }
 });
// create a new category
router.post('/', async (req, res) => {
  try {

    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {

    res.status(400).json({ message: 'creation failed' });
  }
  
});
// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    // Update the category with the matching ID using the data in the request body
    const updated = await Category.update(req.body, { where: { id: req.params.id } });

    // If the category is not found, send a 404 status with a custom message
    // Otherwise, return the updated data
    !updated[0] ? res.status(404).json({ message: 'id not found' }) : res.status(200).json(updated);
  } catch (err) {
    // Handle errors by sending a 500 status with a custom message
    res.status(500).json({ message: 'update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
// delete a category by its `id` value
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    !deleted ? res.status(404).json({ message: 'id not found' }) : res.status(200).json(deleted);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
