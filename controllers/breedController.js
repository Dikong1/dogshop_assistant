const axios = require('axios');
const Carousel = require('../models/carouselModel');
const Breed = require('../models/breedModel')

const breedController = {
    fetchAndSaveImages: async (req, res) => {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random/10');
            const { message } = response.data;

            const carousel = await Carousel.findByIdAndUpdate('65de79621d635cdf58e9f593', {
                images: message
            });

            await carousel.save();

            console.log('Images saved to carousel in database');
            res.redirect('back');
        } catch (error) {
            console.error('Error fetching and saving images:', error);
        }
    },

    renderCarousel: async (req, res) => {
        try {

            const carousel = await Carousel.findById('65de79621d635cdf58e9f593');
            const breed = await Breed.find();
            res.render('breeds', { images: carousel.images, breeds: breed});
        } catch (error) {
            console.error('Error rendering carousel:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = breedController;
