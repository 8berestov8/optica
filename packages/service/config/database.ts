export default ({env}) => {

  const obj = ({
    defaultConnection: "default",
    connection: {
      client: env('DATABASE_CLIENT', 'sqlite'),
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('MYSQL_DATABASE_PORT', 3306),
        database: env('MYSQL_DATABASE', 'optika'),
        user: env('MYSQL_DATABASE_USER', 'root'),
        password: env('MYSQL_DATABASE_PASSWORD', 'Pa$$w0rd'),
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL', false), // For self-signed certificates
        },
      }
    },
    debug: false,
  })
  console.log("ENV", obj)
  return obj
};
