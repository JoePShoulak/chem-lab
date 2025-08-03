const mongoose = require('mongoose');

const GlasswareSchema = new mongoose.Schema({
  capacity: { type: Number, required: true },
  shape: { type: String, required: true },
  brand: { type: String, required: true }
});

module.exports = mongoose.model('Glassware', GlasswareSchema);
