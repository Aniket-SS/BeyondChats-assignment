// src/app.js
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./utils/db");

const app = express();
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/test-db", async (req, res) => {
  res.send("DB connected and server running");
});

// test route
app.get("/", (req, res) => {
  res.send("BeyondChats Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
