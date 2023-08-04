module.exports = ({ env }) => ({
  defaultConnection: "default",
  connection: {
    client: env("DATABASE_CLIENT", "sqlite"),
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USER", "strapi"),
      password: env("DATABASE_PASSWORD", "strapi"),
      ssl: {
        rejectUnauthorized: env.bool("DATABASE_SSL", false), // For self-signed certificates
      },
    },
  },
  debug: false,
});
