require("dotenv").config();

const axios = require("axios");
const cheerio = require("cheerio");
// const rewriteArticle = require("./llm");
const enhanceArticle = require("./mockEnhancer");


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


    let referenceText = "";

    for (let url of references) {
        const page = await axios.get(url);
        const $ = cheerio.load(page.data);
        referenceText += $("p").text().slice(0, 2000);
    }

    const updatedContent = enhanceArticle(
        article.originalContent,
        references
    );



    await axios.put(`${BACKEND_API}/articles/${article._id}`, {
        updatedContent,
        references
      });

    console.log("Updated:", article.title);

  }
};



runAutomation();