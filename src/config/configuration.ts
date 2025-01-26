export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
      user: process.env.DATABASE_USER || '',
      password: process.env.DATABASE_PASSWORD || '',
      name: process.env.DATABASE_BASE || 'prueba_tecnica',
    },
  });
  