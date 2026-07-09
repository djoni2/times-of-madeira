const Twig = require("twig");

module.exports = function(eleventyConfig) {
  // Define custom Hyvor template filters so Twig doesn't panic
  Twig.extendFilter("template", function(value) {
    return value || "";
  });
  
  Twig.extendFilter("asset_url", function(value) {
    return value || "";
  });

  Twig.extendFilter("asset", function(value) {
    return value || "";
  });

  // Tell Eleventy to process .twig files using the configured twig engine
  eleventyConfig.addTemplateFormats("twig");
  eleventyConfig.addExtension("twig", {
    compile: async (inputContent, inputPath) => {
      const template = Twig.twig({
        data: inputContent,
        path: inputPath,
        async: false
      });
      return async (data) => {
        return template.render(data);
      };
    }
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    },
    markdownTemplateEngine: "twig",
    htmlTemplateEngine: "twig"
  };
};
