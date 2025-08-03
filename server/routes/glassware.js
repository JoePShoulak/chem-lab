const express = require('express');
const Glassware = require('../models/Glassware');

const router = express.Router();

// Get all glassware
router.get('/', async (req, res) => {
  try {
    const items = await Glassware.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new glassware
router.post('/', async (req, res) => {
  try {
    const item = new Glassware({ name: req.body.name, type: req.body.type });
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get glassware by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Glassware.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update glassware by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Glassware.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, type: req.body.type },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete glassware by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Glassware.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Glassware deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
