
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.unique('email')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
