require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const pool = require("./database/db.js");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

// Serve static files from the React frontend app
app.use(express.static("/frontend/build"));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join("/frontend/build/index.html"));
});

app.get("/dictionary", async (req, res) => {
  res.send(await pool.findAll());
});

app.post("/dictionary/", async (req, res) => {
  try {
    res.send(await pool.save(req.body));
  } catch (err) {
    res.status(500).send("Error");
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
