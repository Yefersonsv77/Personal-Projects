const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "2424",
    database: "crud_productos",
    port: 5432
});

module.exports = pool;