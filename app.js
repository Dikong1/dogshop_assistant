const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const dotenv = require('dotenv');
const errorHandler = require('./utils/errorHandler');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const breedRoutes = require('./routes/breedRoutes');
const localizationMiddleware = require('./middleware/localization');
const authMiddleware = require('./middleware/authMiddleware');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/style.css', (req, res, next) => {
    res.type('text/css');
    next();
})
app.use(expressLayouts);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {}).then(()=>{
    console.log("MongoDB success")
}).catch((e)=>{
    console.log(e);
});

// Routes
app.use('/', authRoutes);
app.use('/adminDashboard', authMiddleware, adminRoutes);
app.use('/breeds', breedRoutes);

// Localization middleware
app.use(localizationMiddleware);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
