const User = require('../models').User;
const UserOptin = require('../models').UserOptin;

exports.get = (email) => {
  return new User({ email: email })
    .fetch();
};

exports.create = (email) => {
  return new User(
    {
      email: email
    })
    .save();
};

exports.update = async (user, email) => {
  await user
    .set('email', email)
    .save();
};


exports.addOptins = async (userId, optins, clientId) => {
  if(optins.filter(Boolean).length <= 0) {
      return;
  }

  const currentOptins = await UserOptin
    .forge()
    .where('userId', '=', userId)
    .where('optin', 'in', optins)
    .where('clientId', '=', clientId)
    .fetchAll();

  return optins.forEach(async (optin) => {
    if (currentOptins.models.find(model => model.get('optin') === optin)) {
      return;
    }

    return new UserOptin(
      {
        userId: userId,
        clientId: clientId,
        optin: optin
      })
      .save();
  });
}
