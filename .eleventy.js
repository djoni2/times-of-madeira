const Twig = require("twig");

module.exports = function(eleventyConfig) {
  // Pass through your static asset folders cleanly
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("script.js");

  // Mock filters so missing theme variables don't crash the engine
  Twig.extendFilter("template", (value) => value || "");
  Twig.extendFilter("asset_url", (value) => value || "");
  Twig.extendFilter("asset", (value) => value || "");
  Twig.extendFunction("icon", (name) => ``);

  return {
    dir: {
      input: ".",
      includes: "_includes", // Restores the standard, safe Eleventy layout folder
      output: "_site"
    }
  };
};
