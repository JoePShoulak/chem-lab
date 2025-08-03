const mongoose = require('mongoose');

const GlasswareSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String }
});

module.exports = mongoose.model('Glassware', GlasswareSchema);
