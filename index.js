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
  res.send(await pool.test());
});

app.post("/dictionary/", async (req, res) => {
  try {
    res.send(await pool.save(req.body));
  } catch (err) {
    res.status(500).send("error");
  }
});
app.delete("/dictionary/:id([0-9]+)", async (req, res) => {
  try {
    let del = await pool.deleteById(Number(req.params.id));
    if (del === null) {
      res.status(404).send(`Could not find id ${req.params.id}`);
    } else {
      res.send(del);
    }
  } catch (err) {
    res.status(500).send("Error");
  }
});

function main() {
  console.log("Hello world");
}

main();
