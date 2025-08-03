const mongoose = require('mongoose');

const ChemicalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  volume: { type: Number },
  mass: { type: Number },
  concentration: { type: String },
  notes: { type: String },
});

ChemicalSchema.pre('validate', function (next) {
  if (this.volume == null && this.mass == null) {
    this.invalidate('volume', 'Either volume or mass is required');
  }
  next();
});

module.exports = mongoose.model('Chemical', ChemicalSchema);
