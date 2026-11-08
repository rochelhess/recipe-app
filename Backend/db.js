const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "recipe_app",
  password: "cholenT99!",
  port: 5433,
});

module.exports = pool;
