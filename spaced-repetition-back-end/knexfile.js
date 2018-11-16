// Update with your config settings.

module.exports = {
  connection: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: "5432",
      database: "srsly"
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/srsly',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }
};
