const mongoose = require('mongoose');

const PPESchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('PPE', PPESchema);
