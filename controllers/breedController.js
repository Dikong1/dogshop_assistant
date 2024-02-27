const Breed = require('../models/breedModel');

// Controller for breed-related operations
const breedController = {
  // Function to render a page with all breeds
  renderAllBreeds: async (req, res, next) => {
    try {
      const breeds = await Breed.find();
      res.render('breeds', { breeds });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = breedController;
