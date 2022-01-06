const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  test: () => {
    function func(resolve, reject) {
      let result = [];
      pool.query("SELECT * FROM dictionary", (err, locations) => {
        if (err) {
          throw err;
        } else {
          locations.forEach((loc) => {
            result.push(loc);
          });
        }
        console.log(result);
        resolve(result);
      });
    }
    return new Promise(func);
  },

  save: (location, callback) => {},
  findAll: (callback) => {},
  deleteById: (id, callback) => {},
  findById: (id, callback) => {},
};

module.exports = connectionFunctions;
