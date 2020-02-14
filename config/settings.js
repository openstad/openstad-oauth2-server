require('dotenv').config();

exports.showUserOptIn = (config) => {
  return config.showUserOptIn || false;
}


exports.getUserOptInText = (config) => {
  return config.userOptInText || '';
}
