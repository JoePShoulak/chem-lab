const express = require('express');
const Misc = require('../models/Misc');

const router = express.Router();

// Get all misc items
router.get('/', async (req, res) => {
  try {
    const all = await Misc.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new misc item
router.post('/', async (req, res) => {
  try {
    const item = new Misc({
      brand: req.body.brand,
      name: req.body.name,
      notes: req.body.notes,
    });
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get misc item by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Misc.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update misc item by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Misc.findByIdAndUpdate(
      req.params.id,
      {
        brand: req.body.brand,
        name: req.body.name,
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

// Delete misc item by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Misc.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Misc item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
