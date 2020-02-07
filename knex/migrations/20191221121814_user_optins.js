
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_optins', function(table) {
    table.increments();
    table.integer('userId').unsigned().notNullable().references('id').inTable('users');
    table.integer('clientId').unsigned().notNullable().references('id').inTable('clients');
    table.string('optin').index();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('user_optins');
};
