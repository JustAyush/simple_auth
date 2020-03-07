
exports.up = function(knex) {
    let createQuery = `CREATE TABLE users(
        id SERIAL PRIMARY KEY NOT NULL,
        email TEXT,
        password TEXT,
        created_at TIMESTAMP  
    )`;
    return knex.raw(createQuery);
};

exports.down = function(knex) {
    let dropQuery = `DROP TABLE users`;
    return knex.raw(dropQuery);
};
