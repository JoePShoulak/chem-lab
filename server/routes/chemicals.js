const express = require('express');
const Chemical = require('../models/Chemical');

const router = express.Router();

// Get all chemicals
router.get('/', async (req, res) => {
  try {
    const all = await Chemical.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new chemical
router.post('/', async (req, res) => {
  try {
    const item = new Chemical({
      name: req.body.name,
      volume: req.body.volume,
      mass: req.body.mass,
      notes: req.body.notes,
    });
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get chemical by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Chemical.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update chemical by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Chemical.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        volume: req.body.volume,
        mass: req.body.mass,
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

// Delete chemical by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Chemical.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Chemical deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
