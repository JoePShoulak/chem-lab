const mongoose = require('mongoose');

const GlasswareSchema = new mongoose.Schema({
  capacity: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'Boiling Flask',
      'Erlenmeyer Flask',
      'Griffin Beaker',
      'Graduated Cylinder',
      'Addition Funnel',
      'Separation Funnel',
      'Filtering Funnel',
      'Filtering Flask',
      'Test Tube',
      'Condenser',
      'Watch Glass',
    ],
  },
  brand: { type: String, required: true }
});

module.exports = mongoose.model('Glassware', GlasswareSchema);
