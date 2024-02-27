// localization.js in middleware folder

const { supportedLanguages, getPreferredLanguage } = require('../config/localization');

// Middleware to handle localization
const localizationMiddleware = (req, res, next) => {
  // Get preferred language
  const lang = getPreferredLanguage(req);

  // Set language in response locals
  res.locals.lang = lang;

  next();
};

module.exports = localizationMiddleware;
