const knex = require('../knex/knex.js');
const bookshelf = require('bookshelf')(knex);
const jsonColumns = require('bookshelf-json-columns');
const configAuthTypes = require('../config/auth.js').types;
bookshelf.plugin(jsonColumns);

const Client = bookshelf.Model.extend({

  tableName: 'clients',
  hasTimestamps: true,
  hasTimestamps: ['createdAt', 'updatedAt'],
  jsonColumns: ['authTypes', 'requiredFields'],
  getAuthTypes: (model) => {
    const authTypes = JSON.parse(model.get('authTypes'));

    return authTypes.map((authType) => {
      let configAuthType = configAuthTypes.find(type => type.key === authType);
      return  configAuthType;
    });
  }
});

const LoginToken = bookshelf.Model.extend({
  tableName: 'login_tokens',
  hasTimestamps: true,
  hasTimestamps: ['createdAt',  'updatedAt']
});

const UniqueCode = bookshelf.Model.extend({
  tableName: 'unique_codes',
  hasTimestamps: true,
  hasTimestamps: ['createdAt',  'updatedAt']
});

const Role = bookshelf.Model.extend({
  tableName: 'roles',
  hasTimestamps: true,
  hasTimestamps: ['createdAt',  'updatedAt']
});

const UserRole = bookshelf.Model.extend({
  tableName: 'user_roles',
  hasTimestamps: true,
  hasTimestamps: ['createdAt',  'updatedAt']
});

const PasswordResetToken  = bookshelf.Model.extend({
  tableName: 'password_reset_tokens',
  hasTimestamps: true,
  hasTimestamps: ['createdAt',  'updatedAt']
});

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: ['createdAt', 'updatedAt'],
  optins() {
    return this.hasMany('UserOptin');
  }
});

User.fetchByOptins = (optins) => {
  return User.forge().query((query) => {
    query.join('user_optins', 'user_optins.userId', 'users.id');
    query.whereIn('user_optins.optin', optins);
  });
}

const UserOptin = bookshelf.Model.extend({
  tableName: 'user_optins',
  hasTimestamps: true,
  hasTimestamps: ['createdAt', 'updatedAt'],
  user() {
    return this.belongsTo('User')
  }
});

const ActionLog  = bookshelf.Model.extend({
  tableName: 'action_log',
  hasTimestamps: true,
  hasTimestamps: ['createdAt',  'updatedAt']
});

exports.Client = Client;
exports.User = User;
exports.LoginToken = LoginToken;
exports.UniqueCode = UniqueCode;
exports.Role = Role;
exports.UserRole = UserRole;
exports.UserOptin = UserOptin;
exports.PasswordResetToken = PasswordResetToken;
exports.ActionLog = ActionLog;
