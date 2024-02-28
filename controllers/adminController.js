const axios = require('axios');
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
      const {name, ru_name, description, ru_description, image} = req.body;
      if(await Breed.findOne({name: name})) {
        res.send("Breed already added");
      }
      const data = {
        name: name,
        name_ru: ru_name,
        descriptions: description,
        descriptions_ru: ru_description,
        imageUrls: [image]
      }
      Breed.insertMany(data);
      res.send("Breed added, go and check on breeds page")
    } catch (error) {
      next(error);
    }
  },
  updateBreed: async (req, res, next) => {
    try {
      if(!req.isAdmin) {
        res.redirect('back');
        return;
      }
      const {edit_name, edit_ru_name, edit_description, edit_ru_description, new_imageUrl} = req.body;
      const breed = await Breed.findOneAndUpdate(
        { name: edit_name },
        { 
          name_ru: edit_ru_name, 
          descriptions: edit_description, 
          descriptions_ru: edit_ru_description, 
          updatedAt: Date.now(), 
          $push: { imageUrls: new_imageUrl } 
        },
        { new: true }
      );
      if (!breed) {
        return res.status(404).json({ error: 'Breed not found' });
      }
      console.log(breed)
      res.send("Breed updated, go and check on breeds page");
    } catch (error) {
      next(error);
    }
  },
  addBreedImage: async (req, res, next) => {
    try {
      if(!req.isAdmin) {
        res.redirect('back');
        return;
      }
      const {add_image_name, add_imageUrl} = req.body;
      const breed = await Breed.findOneAndUpdate(
        { name: add_image_name },
        { 
          updatedAt: Date.now(), 
          $push: { imageUrls: add_imageUrl } 
        },
        { new: true }
      );
      if (!breed) {
        return res.status(404).json({ error: 'Breed not found' });
      }
      console.log(breed)
      res.send("Breed image added, go and check on breeds page");
    } catch (error) {
      next(error);
    }
  },
  addRandomImage: async (req, res, next) => {
    try {
      if(!req.isAdmin) {
        res.redirect('back');
        return;
      }
      const {add_random_name} = req.body;
      const response = await axios.get('https://dog.ceo/api/breed/'+ add_random_name.toLowerCase() + '/images/random');
      const { message } = response.data;
      const breed = await Breed.findOneAndUpdate(
        { name: add_random_name },
        { 
          updatedAt: Date.now(), 
          $push: { imageUrls: message } 
        },
        { new: true }
      );
      if (!breed) {
        return res.status(404).json({ error: 'Breed not found' });
      }
      res.send("Breed image added, here it is " + message);
    } catch (error) {
      next(error);
    }
  },
  deleteBreed: async (req, res, next) => {
    try {
      if(!req.isAdmin) {
        res.redirect('back');
        return;
      }
      const {delete_name} = req.body;
      const breed = await Breed.findOneAndDelete({ name: delete_name });

      if (!breed) {
        return res.status(404).json({ error: 'Breed not found' });
      }
      console.log(breed)
      res.send("Breed deleted, you are MONSTER :-( ");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = adminController;
