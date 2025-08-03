const mongoose = require('mongoose');

const PPESchema = new mongoose.Schema({
  brand: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Goggles', 'Gloves', 'Lab Coat', 'Respirator'],
  },
  notes: { type: String },
});

module.exports = mongoose.model('PPE', PPESchema);
