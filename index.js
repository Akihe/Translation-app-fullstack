require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const pool = require("./database/db.js");

app.use(express.json());
app.use(cors());
app.use(express.static("frontend"));

const server = app.listen(8080, () => {
  console.log(`Listening on port ${server.address().port}`);
});

app.get("/locations", async (req, res) => {
  console.log("noutaa locations");
  res.send(await pool.test());
});

pool.test();

function main() {
  console.log("Hello world");
}

main();
