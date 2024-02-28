# Dogshop Assistant App
Dogshop Assistant App is a web application that helps people choose puppies or adult dogs from zoo-shops or kennels. We share mood of creativity and kindness. If you are active user of our site, you will probably notice it.
Also if somehow your grand-grand-grandpa have a hard time accepting non-german breeds, then it may become impossible to care any pet but german shepherd. In that case, site allows to filter pets by your needs.

## Technologies and Architectures Used
- Node.js
- Express.js
- MongoDB Atlas
- REST API

## Setup and Usage
1. Clone repository
2. Install all dependencies
3. Run application (node app.js or nodemon app.js)

Also you can visit deployed application on https://odd-gold-cougar-robe.cyclic.app/login 
By the way, site maybe marked as dangerous or not safe, ingore it and just continue browsing by pressing continue to unsafe site from more information dropdown)

## Admin Panel:
To enter admin panel in login field set: Name - Dias, Password - 123
When you loggen in as admin, from any part of application admin panel is accessible by clicking adminDashboard. If you are not logged in as admin, then you will be redirected back.
You can log out admin panel from profile section or just by logining as another user.

## External API`s used
- Dog API (https://dogapi.dog/) for updating facts about dogs and getting breed description
- DOG API (https://dog.ceo/dog-api/) for getting images for carousel and realising "add image from API" in breed editing menu

## .env
if .env is not cloned, create file and set to:
```
MONGO_URI=mongodb+srv://diasimakanov:diasimakanov@cluster0.gvktenm.mongodb.net/WEB?retryWrites=true&w=majority
JWT_SECRET=puppy
```
