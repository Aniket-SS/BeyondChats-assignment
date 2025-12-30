require("dotenv").config();

const axios = require("axios");
const cheerio = require("cheerio");

const BACKEND_API = process.env.BACKEND_API;


const fetchArticles = async () => {
  const res = await axios.get(`${BACKEND_API}/articles`);
  return res.data;
};



const fetchExternalReferences = async (query) => {
  const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  const { data } = await axios.get(searchUrl);
  const $ = cheerio.load(data);

  const links = [];

  $("li.b_algo h2 a").each((i, el) => {
    const href = $(el).attr("href");
    if (href && !href.includes("beyondchats.com") && links.length < 2) {
      links.push(href);
    }
  });

  return links;
};




const runAutomation = async () => {
  const articles = await fetchArticles();
  console.log(`Fetched ${articles.length} articles`);

  for (let article of articles) {
    console.log("Processing:", article.title);

    const references = await fetchExternalReferences(article.title);
    console.log("References:", references);
  }
};



runAutomation();