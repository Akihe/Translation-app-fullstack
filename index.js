require("dotenv").config();
const pool = require("./database/db.js");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("frontend/build"));

pool.test();

function main() {
  console.log("Hello world");
}

main();
