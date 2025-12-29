require("dotenv").config();

// src/app.js
const express = require("express");
const cors = require("cors");

const connectDB = require("./utils/db");
const scrapeOldestBlogs = require("./scrapers/blogScraper");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/articles", articleRoutes);


app.get("/scrape", async (req, res) => {
  try {
    await scrapeOldestBlogs();
    res.send("Oldest blogs scraped successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Scraping failed");
  }
});


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
