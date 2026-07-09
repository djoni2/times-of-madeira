const Twig = require("twig");

module.exports = function(eleventyConfig) {
  // 1. Mock missing filters so they don't break execution
  Twig.extendFilter("template", (value) => value || "");
  Twig.extendFilter("asset_url", (value) => value || "");
  Twig.extendFilter("asset", (value) => value || "");

  // 2. Mock the missing custom icon() function
  Twig.extendFunction("icon", (name) => `<!-- Icon: ${name} -->`);

  // 3. Handle Hyvor's proprietary data blocks smoothly
  eleventyConfig.addTemplateFormats("twig");
  eleventyConfig.addExtension("twig", {
    compile: async (inputContent, inputPath) => {
      // Hyvor uses custom query syntax like `blog_data(type="tags"...)` 
      // We safely sanitize those dynamic database query formats out of the raw text before compiling
      let sanitizedContent = inputContent
        .replace(/type\s*=\s*"tags"[^}]*/g, 'type="tags"')
        .replace(/type\s*=\s*"authors"[^}]*/g, 'type="authors"');

      const template = Twig.twig({
        data: sanitizedContent,
        path: inputPath,
        async: false
      });
      return async (data) => {
        try {
          return template.render(data);
        } catch (e) {
          // Fallback if an interior nested loop fails deep inside a component
          return `<!-- Error rendering template component -->`;
        }
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
