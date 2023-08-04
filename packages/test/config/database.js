module.exports = ({env}) => ({
  defaultConnection: "default",
  connection: {
    client: env('DATABASE_CLIENT', 'sqlite'),
    connection: {
      host: env('MYSQL_DATABASE_HOST', '127.0.0.1'),
      port: env.int('MYSQL_DATABASE_PORT', 3306),
      database: env('MYSQL_DATABASE', 'strapi'),
      user: env('MYSQL_USER', 'strapi'),
      password: env('MYSQL_PASSWORD', 'strapi'),
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL', false), // For self-signed certificates
      },
    }
  },
  debug: false,
});
