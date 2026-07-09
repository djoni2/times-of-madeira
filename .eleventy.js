const eleventyPluginTwig = require("@factorial/eleventy-plugin-twig");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginTwig, {
    dir: {
      output: "_site"
    }
  });
  eleventyConfig.ignores.add("templates/index.html");

  // Directly pass static assets to production build folder
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("lang");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("article.html");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("config.yaml");
  eleventyConfig.addPassthroughCopy("config.def.yaml");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
