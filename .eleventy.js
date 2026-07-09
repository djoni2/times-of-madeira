const eleventyPluginTwig = require("@factorial/eleventy-plugin-twig");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginTwig);
  
  return {
    dir: {
      input: ".",
      output: "_site"
    },
    markdownTemplateEngine: "twig",
    htmlTemplateEngine: "twig"
  };
};
