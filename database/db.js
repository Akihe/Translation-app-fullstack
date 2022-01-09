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
          reject();
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

  save: (word) => {
    function func(resolve, reject) {
      let sql = mysql.format(
        "INSERT INTO dictionary (word_in_finnish, word_in_english, tag) VALUES (?,?,?)",
        [word.word_in_finnish, word.word_in_english, word.tag]
      );

      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve("New question saved.");
        }
      });
    }
    return new Promise(func);
  },
  findAll: (callback) => {},
  deleteById: (id, callback) => {},
  findById: (id, callback) => {},
};

module.exports = connectionFunctions;
