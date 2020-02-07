const Promise = require('bluebird');
const LoginToken = require('../models').LoginToken;
const appUrl = process.env.APP_URL;
const hat = require('hat');

const buildRedirectUrl = (redirectUrl, optins) => {
  return optins.length > 0 ? `${redirectUrl}&optins=${optins.join(',')}` : redirectUrl;
}

/**
 *
 */
const getUrl = (user, client, token, redirectUrl, optins) => {
  const slug = 'auth/url/authenticate';

  return `${appUrl}/${slug}?token=${token}&clientId=${client.clientId}&redirect_uri=${buildRedirectUrl(redirectUrl, optins)}`;
}

exports.format = (client, user, redirectUrl, optins) => {
  return new Promise((resolve, reject) =>  {
    const token = hat();

    new LoginToken({
      userId: user.id,
      token: token
    })
    .save()
    .then((loginToken) => {
      const url = getUrl(user, client, token, redirectUrl, optins);
      resolve(url);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

exports.getUrl = getUrl;

exports.invalidateTokensForUser = (userId) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      resolve();
    } else {
      LoginToken
      .where({userId: userId})
      .save(
          {valid: false},
          {method: 'update', patch: true}
       )
       .then(() => { resolve(); })
       .catch(() => { resolve(); })
     }
  });

}
