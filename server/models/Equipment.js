const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
