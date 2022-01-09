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

app.get("/dictionary", async (req, res) => {
  console.log("noutaa taulun");
  res.send(await pool.test());
});

app.post("/dictionary/", async (req, res) => {
  try {
    res.send(await pool.save(req.body));
  } catch (err) {
    res.status(500).send("error");
  }
});

function main() {
  console.log("Hello world");
}

main();
