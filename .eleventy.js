const Twig = require("twig");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Pass through your theme's assets, styles, and scripts untouched
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");

  // Keep our mocks active so they don't crash components
  Twig.extendFilter("template", (value) => value || "");
  Twig.extendFilter("asset_url", (value) => value || "");
  Twig.extendFilter("asset", (value) => value || "");
  Twig.extendFunction("icon", (name) => ``);

  eleventyConfig.addTemplateFormats("twig,html");
  eleventyConfig.addExtension("html", {
    compile: async (inputContent, inputPath) => {
      return async (data) => {
        // If the file uses a twig extension block, let Twig process it relative to the root templates folder
        if (inputContent.includes("{% extends")) {
          return new Promise((resolve, reject) => {
            Twig.renderFile(inputPath, data, (err, html) => {
              if (err) {
                // If it fails, output the error message directly to the screen so we can see it
                resolve(`\n${inputContent}`);
              } else {
                resolve(html);
              }
            });
          });
        }
        return inputContent;
      };
    }
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
