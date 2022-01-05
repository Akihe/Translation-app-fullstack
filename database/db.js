const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  test: pool.query("SELECT * FROM locations", (err, locations) => {
    if (err) {
      throw err;
    } else {
      locations.forEach((loc) => {
        console.log(loc);
      });
    }
  }),

  connect: (callback) => {},
  close: (callback) => {},
  save: (location, callback) => {},
  findAll: (callback) => {},
  deleteById: (id, callback) => {},
  findById: (id, callback) => {},
};
