const mongoose = require('mongoose');

const MiscSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('Misc', MiscSchema);
