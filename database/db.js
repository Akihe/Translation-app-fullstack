const mysql = require("mysql");

let config = {
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
};

const pool = mysql.createPool(config);

let connectionFunctions = {
  findAll: () => {
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
  deleteById: (id) => {
    function func(resolve, reject) {
      pool.query(
        "DELETE FROM dictionary WHERE ID = ?",
        pool.escape(id),
        (err, result) => {
          if (err) {
            reject(err);
          } else if (result.affectedRows < 1) {
            resolve(null);
          } else {
            resolve("Deleted id " + id);
          }
        }
      );
    }
    return new Promise(func);
  },
  editById: (word) => {
    function func(resolve, reject) {
      let sql = mysql.format(
        "UPDATE dictionary SET word_in_finnish = ?, word_in_english = ?, tag = ? WHERE id = ?",
        [word.word_in_finnish, word.word_in_english, word.tag, word.id]
      );

      console.log(sql);
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve("Database edited");
        }
      });
    }
    return new Promise(func);
  },
};

module.exports = connectionFunctions;
