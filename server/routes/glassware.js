const express = require('express');
const Glassware = require('../models/Glassware');

const router = express.Router();

// Get all glassware
router.get('/', async (req, res) => {
  try {
    const glassware = await Glassware.find();
    res.json(glassware);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new glassware
router.post('/', async (req, res) => {
  try {
    const glass = new Glassware({
      name: req.body.name,
      capacity: req.body.capacity,
      shape: req.body.shape,
      brand: req.body.brand,
    });
    const saved = await glass.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get glassware by id
router.get('/:id', async (req, res) => {
  try {
    const glass = await Glassware.findById(req.params.id);
    if (!glass) return res.status(404).json({ error: 'Not found' });
    res.json(glass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update glassware by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Glassware.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        capacity: req.body.capacity,
        shape: req.body.shape,
        brand: req.body.brand,
      },
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
