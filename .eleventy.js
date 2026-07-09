const Twig = require("twig");

module.exports = function(eleventyConfig) {
  // Tell Eleventy to process .twig files using the official twig package
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
