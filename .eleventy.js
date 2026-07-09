const Twig = require("twig");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Pass through your static assets cleanly
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("script.js");

  // Mock filters so missing theme variables don't crash the engine
  Twig.extendFilter("template", (value) => value || "");
  Twig.extendFilter("asset_url", (value) => value || "");
  Twig.extendFilter("asset", (value) => value || "");
  Twig.extendFunction("icon", (name) => ``);

  eleventyConfig.addTemplateFormats("html,twig");
  
  eleventyConfig.addExtension("html", {
    compile: async (inputContent, inputPath) => {
      return async (data) => {
        // If the file uses front-matter layouts or extends, let Twig compile it correctly
        if (data.layout || inputContent.includes("{% extends")) {
          return new Promise((resolve) => {
            // We use path.basename to prevent 'templates/templates/' doubling up
            const targetTemplate = data.layout ? data.layout : "templates/@base.twig";
            
            Twig.renderFile(
              path.resolve(targetTemplate),
              {
                ...data,
                settings: {
                  views: path.resolve(".") // Keeps the look-up base at the root folder
                }
              },
              (err, html) => {
                if (err) {
                  resolve(`\n${inputContent}`);
                } else {
                  resolve(html);
                }
              }
            );
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
