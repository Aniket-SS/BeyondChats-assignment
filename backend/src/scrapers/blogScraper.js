const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

const BASE_URL = "https://beyondchats.com";

const scrapeOldestBlogs = async () => {


// Load first blogs page
  const { data } = await axios.get(`${BASE_URL}/blogs/`);
  const $ = cheerio.load(data);

    let paginationHtml;
    try {
    const paginationRes = await axios.get(`${BASE_URL}/blogs/page/2/`);
    paginationHtml = paginationRes.data;
    } catch {
    const fallbackRes = await axios.get(`${BASE_URL}/blogs/`);
    paginationHtml = fallbackRes.data;
    }

    const $p = cheerio.load(paginationHtml);


  // Find last page number from pagination
  let lastPage = 1;

  $p("a.page-numbers").each((_, el) => {
    const text = $p(el).text().trim();
    const pageNum = parseInt(text, 10);

    if (!isNaN(pageNum)) {
      lastPage = Math.max(lastPage, pageNum);
    }
  });


  console.log("Last page detected:", lastPage);

  // Collect all blog links from all pages
  const allBlogLinks = [];

  for (let page = 1; page <= lastPage; page++) {
    const pageUrl =
      page === 1
        ? `${BASE_URL}/blogs/`
        : `${BASE_URL}/blogs/page/${page}/`;

    console.log("Fetching:", pageUrl);

    const pageRes = await axios.get(pageUrl);
    const $$ = cheerio.load(pageRes.data);

    $$("h2 a").each((_, el) => {
      let link = $$(el).attr("href");

      if (link && !link.startsWith("http")) {
        link = BASE_URL + link;
      }

      if (link) {
        allBlogLinks.push(link);
      }
    });
  }

  console.log("Total blog links collected:", allBlogLinks.length);

  // Pick the oldest 5 (last ones)
  const oldestFive = allBlogLinks.slice(-5);

  console.log("Oldest 5 blogs:", oldestFive);

  // Scrape and store each blog
  for (let url of oldestFive) {
    const articleRes = await axios.get(url);
    const $$$ = cheerio.load(articleRes.data);

    const title = $$$("h1").text().trim();
    const content = $$$("article").text().trim();

    const exists = await Article.findOne({ title });
    if (!exists) {
      await Article.create({
        title,
        originalContent: content
      });
      console.log("Saved:", title);
    } else {
      console.log("Already exists:", title);
    }
  }
};

module.exports = scrapeOldestBlogs;
