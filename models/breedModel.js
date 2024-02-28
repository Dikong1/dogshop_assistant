const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  name_ru: {
    type: String,
    default: "no translation added"
  },
  descriptions: {
    type: String,
    required: true
  },
  descriptions_ru: {
    type: String,
    default: "no translation for this"
  },
  imageUrls: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
    // why do we need this???
  }
});

const Breed = mongoose.model('Breed', breedSchema);

module.exports = Breed;
