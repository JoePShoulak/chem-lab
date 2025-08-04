const express = require('express');
const Equipment = require('../models/Equipment');

const router = express.Router();

// Get all equipment
router.get('/', async (req, res) => {
  try {
    const all = await Equipment.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new equipment
router.post('/', async (req, res) => {
  try {
    const item = new Equipment({
      brand: req.body.brand,
      category: req.body.category,
      notes: req.body.notes,
    });
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get equipment by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Equipment.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update equipment by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(
      req.params.id,
      {
        brand: req.body.brand,
        category: req.body.category,
        notes: req.body.notes,
      },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete equipment by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Equipment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
