const express = require('express');
const PPE = require('../models/PPE');

const router = express.Router();

// Get all PPE
router.get('/', async (req, res) => {
  try {
    const all = await PPE.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new PPE
router.post('/', async (req, res) => {
  try {
    const item = new PPE({
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

// Get PPE by id
router.get('/:id', async (req, res) => {
  try {
    const item = await PPE.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update PPE by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await PPE.findByIdAndUpdate(
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

// Delete PPE by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PPE.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'PPE deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
