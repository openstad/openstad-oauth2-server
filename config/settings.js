require('dotenv').config();

exports.showUserOptIn = (config) => {
  return config.showUserOptIn || false;
}


exports.getUserOptInText = (config, clientName) => {
  return config.userOptInText || `Ik wil updates ontvangen over ${clientName}`;
}
