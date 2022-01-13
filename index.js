require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const pool = require("./database/db.js");

app.use(express.json());
app.use(cors());
app.use(express.static("frontend"));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

app.get("/", async (req, res) => {
  res.send(await pool.findAll());
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

app.put("/dictionary/:id([0-9]+)", async (req, res) => {
  try {
    res.send(await pool.editById(req.body));
  } catch (err) {
    res.status(500).send("error");
  }
});
