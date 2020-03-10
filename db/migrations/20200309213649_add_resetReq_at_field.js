
exports.up = function(knex) {   
    return knex.schema.alterTable('users', function (table) {
        table.timestamp('resetReq_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
