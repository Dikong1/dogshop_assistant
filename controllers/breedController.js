const axios = require('axios');
const Carousel = require('../models/carouselModel');
const Breed = require('../models/breedModel')

const breedController = {
    // Fetch and save images from API to Carousel collection
    fetchAndSaveImages: async () => {
        try {
            // Fetch data from API
            const response = await axios.get('https://dog.ceo/api/breeds/image/random/10');
            const { message } = response.data;

            // Create a new instance of Carousel model
            const carousel = Carousel.findByIdAndUpdate('65de79621d635cdf58e9f593', {
                images: message
            });

            // Save carousel to the database
            await carousel.save();

            console.log('Images saved to carousel in database');
        } catch (error) {
            console.error('Error fetching and saving images:', error);
        }
    },

    // Function to render carousel.ejs with images from Carousel collection
    renderCarousel: async (req, res) => {
        try {
            // Fetch images from Carousel collection
            const carousel = await Carousel.findById('65de79621d635cdf58e9f593');
            const breed = await Breed.find();
            // Render carousel.ejs with images
            res.render('breeds', { images: carousel.images , breeds: breed});
        } catch (error) {
            console.error('Error rendering carousel:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = breedController;
