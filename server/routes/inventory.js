const express = require('express');
const Glassware = require('../models/Glassware');
const PPE = require('../models/PPE');
const Equipment = require('../models/Equipment');
const Chemical = require('../models/Chemical');
const Misc = require('../models/Misc');

const router = express.Router();

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const glassware = await Glassware.find().lean();
    const ppe = await PPE.find().lean();
    const equipment = await Equipment.find().lean();
    const chemicals = await Chemical.find().lean();
    const misc = await Misc.find().lean();
    const items = [
      ...glassware.map(g => ({ ...g, type: 'glassware' })),
      ...ppe.map(p => ({ ...p, type: 'ppe' })),
      ...equipment.map(e => ({ ...e, type: 'equipment' })),
      ...chemicals.map(c => ({ ...c, type: 'chemicals' })),
      ...misc.map(m => ({ ...m, type: 'misc' })),
    ];
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
