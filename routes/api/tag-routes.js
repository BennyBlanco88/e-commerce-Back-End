const express = require('express');
const router = express.Router();
const { Tag, Product } = require('../../models');

// Middleware for handling async functions
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Get all tags
router.get('/', asyncHandler(async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(tagData);
}));

// Get tag by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  });

  if (!tagData) {
    res.status(404).json({ message: "No tag found with this id!" });
    return;
  }

  res.status(200).json(tagData);
}));

// Create a new tag
router.post('/', asyncHandler(async (req, res) => {
  const tagData = await Tag.create(req.body);
  res.status(200).json(tagData);
}));

// Update a tag's name by its `id` value
router.put('/:id', asyncHandler(async (req, res) => {
  const [updated] = await Tag.update(req.body, {
    where: { id: req.params.id },
  });

  if (!updated) {
    res.status(404).json({ message: "No tag found with this id!" });
    return;
  }

  res.status(200).json(updated);
}));

// Delete a tag by its `id` value
router.delete('/:id', asyncHandler(async (req, res) => {
  const deleted = await Tag.destroy({ where: { id: req.params.id } });

  if (!deleted) {
    res.status(404).json({ message: "No tag found with this id!" });
    return;
  }

  res.status(200).json(deleted);
}));

module.exports = router;
