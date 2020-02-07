require('dotenv').config();

exports.showUserOptIn = () => {
  return process.env.SHOW_USER_OPT_IN || false;
}
