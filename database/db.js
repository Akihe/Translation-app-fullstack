const mysql = require("mysql");

/**
 * config for Heroku purposes, also usable locally with .env file. Used to create the connection pool.
 */
let config = {
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
};

const pool = mysql.createPool(config);

/**
 * All the database functions are stored in this variable which is exported.
 */
let connectionFunctions = {
  /**
   * Gets everything from the database and returns them, rejects on error.
   * @returns an array of all fetched rows
   */
  findAll: () => {
    function func(resolve, reject) {
      let result = [];
      pool.query("SELECT * FROM dictionary", (err, locations) => {
        if (err) {
          reject();
        } else {
          locations.forEach((loc) => {
            //goes through the results found and maps them in an array.
            result.push(loc);
          });
        }
        resolve(result);
      });
    }
    return new Promise(func);
  },

  /**
   * Inserts a new row to the database
   * @param {object} word has all the values to be inserted
   * @returns
   */
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

  /**
   * Deletes a row from the database
   * @param {int} id of the row to be deleted
   * @returns
   */
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

  /**
   * Updates a row in the database
   * @param {*} word Has all the new information to be updated
   * @returns
   */
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
