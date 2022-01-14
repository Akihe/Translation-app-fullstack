require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const pool = require("./database/db.js");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

/**
 * Connects to either the port chosen by heroku or to port 8080.
 */
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

// Serve static files from the React frontend app
app.use(express.static("frontend/build"));

/**
 * Catches a /dictionary fetch GET made by frontend, calls a backend function
 */
app.get("/dictionary", async (req, res) => {
  try {
    res.send(await pool.findAll());
  } catch (err) {
    res.status(400).send("Could not connect to the database");
  }
});

/**
 * Catches a /dictionary/ fetch POST made by frontend, calls a backend function
 */
app.post("/dictionary/", async (req, res) => {
  try {
    res.send(await pool.save(req.body));
  } catch (err) {
    res.status(400).send("Could not post to the database");
  }
});

/**
 * Catches a /dictionary/ fetch DELETE made by frontend, calls a backend function with the id used in the url
 */
app.delete("/dictionary/:id([0-9]+)", async (req, res) => {
  try {
    let del = await pool.deleteById(Number(req.params.id));
    if (del === null) {
      res.status(404).send(`Could not find id ${req.params.id}`);
    } else {
      res.send(del);
    }
  } catch (err) {
    res.status(400).send("Could not connect to the database");
  }
});

/**
 * Catches a /dictionary/ fetch PUT made by frontend, calls a backend function.
 */
app.put("/dictionary/:id([0-9]+)", async (req, res) => {
  try {
    res.send(await pool.editById(req.body));
  } catch (err) {
    res.status(400).send("Could not connect to the database");
  }
});
