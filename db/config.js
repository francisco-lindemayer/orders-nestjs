const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_CONN } = process.env;

module.exports = {
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT,
  dialect: DB_CONN,
  timezone: '-03:00',
  define: {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};
