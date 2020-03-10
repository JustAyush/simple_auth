
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('resetToken'),
        table.boolean('resetStatus').defaultTo(false)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
