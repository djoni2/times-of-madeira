const twigPlugin = require("eleventy-plugin-twig");

module.exports = function(eleventyCcbg) {
  eleventyCcbg.addPlugin(twigPlugin);
  
  return {
    dir: {
      input: ".",
      output: "_site"
    },
    markdownTemplateEngine: "twig",
    htmlTemplateEngine: "twig"
  };
};
