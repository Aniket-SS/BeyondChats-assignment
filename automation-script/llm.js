const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const rewriteArticle = async (original, referencesText) => {
  const prompt = `
You are a content editor.

Original article:
${original}

Reference articles:
${referencesText}

Rewrite the article to:
- improve clarity
- enhance SEO
- maintain original meaning
- add better structure
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 800,        
    temperature: 0.7
  });

  return response.choices[0].message.content;
};

module.exports = rewriteArticle;
