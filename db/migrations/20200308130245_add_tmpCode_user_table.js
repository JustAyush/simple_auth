
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('tmpCode')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
