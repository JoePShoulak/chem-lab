const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'Vacuum Pump',
      'Water Pump',
      'pH Tester',
      'Heating Element',
      'Stirring Element',
      'Heat/Stir Element',
      'Jack Stand',
      'Mortar & Pestle',
      'Scale',
    ],
  },
  notes: { type: String },
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
