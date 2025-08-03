const express = require('express');
const Glassware = require('../models/Glassware');
const PPE = require('../models/PPE');

const router = express.Router();

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const glassware = await Glassware.find().lean();
    const ppe = await PPE.find().lean();
    const items = [
      ...glassware.map(g => ({ ...g, type: 'glassware' })),
      ...ppe.map(p => ({ ...p, type: 'ppe' })),
    ];
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
