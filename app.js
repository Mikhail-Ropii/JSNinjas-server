const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const heroesRouter = require("./routes/api/heroes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/heroes", heroesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
