const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  fact: {
    type: [String],
    required: true,
    default: []
  }
});

const Fact = mongoose.model('Facts', factSchema);

module.exports = Fact;
