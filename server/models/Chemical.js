const mongoose = require('mongoose');

const ChemicalSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Chemical', ChemicalSchema);
