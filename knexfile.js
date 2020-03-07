// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection:'postgres://ayush:alphaomega@localhost/test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }

};
