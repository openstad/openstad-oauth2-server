require('dotenv').config();

exports.showUserOptIn = (config) => {
  return config.showUserOptIn || false;
}
