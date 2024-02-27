// localization.js in config folder(there is another one, my mind is blowing up)

// Default language
const defaultLanguage = 'en';

// Supported languages
const supportedLanguages = ['en', 'ru'];

// Function to get the preferred language from request
const getPreferredLanguage = (req) => {
  // Check if language is specified in query params
  if (req.query.lang && supportedLanguages.includes(req.query.lang)) {
    return req.query.lang;
  }

  // Check if language is specified in cookies
  if (req.cookies.lang && supportedLanguages.includes(req.cookies.lang)) {
    return req.cookies.lang;
  }

  // If no language is specified, use default language
  return defaultLanguage;
};

module.exports = { defaultLanguage, supportedLanguages, getPreferredLanguage };
