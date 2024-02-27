const User = require('../models/userModel');
const Breed = require('../models/breedModel');

// Controller for admin-related operations
const adminController = {
  // Example function to get all admin users
  getAllAdminFunctionality: async (req, res, next) => {
    try {
      if(!req.isAdmin) {
        res.redirect('back');
        return;
      }
      res.render("adminDashboard");
    } catch (error) {
      next(error);
    }
  },
  createBreed: async (req, res, next) => {
    try {
      if(!req.isAdmin) {
        res.redirect('back');
        return;
      }
      const {name, description, image} = req.body;
      if(await Breed.findOne({name: name})) {
        res.send("Breed already added");
      }
      const data = {
        name: name,
        descriptions: description,
        imageUrls: [image]
      }
      Breed.insertMany(data);
      res.send("breed added")
    } catch (error) {
      next(error);
    }
  },
  updateBreed: async (req, res, next) => {
    try {
      if(!req.user) {
        res.redirect('back');
        return;
      }
      const {name, description, image} = req.body;
      const breed = Breed.findOneAndUpdate({ name: name }, { descriptions: description, $push: {imageUrls: image}});
      if (!breed) {
        return res.status(404).json({ error: 'Breed not found' });
      }

    // If breed is successfully updated, send 200 OK response with updated breed data
      res.status(200).json({ message: 'Breed updated successfully', breed });
      res.send("breed updated")
    } catch (error) {
      next(error);
    }
  },
};

module.exports = adminController;
