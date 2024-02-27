# Dogshop Assistant App
Dogshop Assistant App is a web application that helps people choose puppies or adult dogs from zoo-shops or kennels. We share mood of creativity and kindness. If you are active user of our site, you will probably notice that.
Also if somehow you grand-grand-grandpa living with you is nazi and he don`t likes some nations, then it may become impossible to handle pet from that nation. In that case, site allows to filter pets by origin country.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas

## Setup and Usage
1. Clone repository
2. Install all dependencies
3. Run application (node app.js or nodemon app.js)

## Admin Panel:
To enter admin panel in login field set: Name - Dias, Password - 123
When you loggen in as admin, from any part of application admin panel is accessible by clicking adminDashboard. If you are not logged in as admin, then you will be redirected back.
You can log out admin panel from profile section or just by logining as another user.

## .env
if .env is not cloned, create file and set:
`
# MongoDB connection URI
MONGO_URI=mongodb+srv://diasimakanov:diasimakanov@cluster0.gvktenm.mongodb.net/WEB?retryWrites=true&w=majority

# JWT secret key
JWT_SECRET=puppy
`
