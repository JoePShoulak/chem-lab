const express = require('express');
const Glassware = require('../models/Glassware');

const router = express.Router();

// Get all inventory items (currently only glassware)
router.get('/', async (req, res) => {
  try {
    const glassware = await Glassware.find();
    res.json(glassware);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
