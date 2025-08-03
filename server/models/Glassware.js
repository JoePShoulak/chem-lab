const mongoose = require('mongoose');

const GlasswareSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: String, required: true },
  shape: { type: String, required: true },
  brand: { type: String, required: true },
});

module.exports = mongoose.model('Glassware', GlasswareSchema);
