import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import yaml from "js-yaml";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("web/assets");
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
  eleventyConfig.addGlobalData("buildId", () => Date.now());

  const md = markdownIt({ html: true, linkify: true }).use(markdownItAnchor, {
    level: [2, 3, 4],
    slugify: (s) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-"),
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "before",
      symbol: "#",
      class: "heading-anchor",
      space: false,
    }),
  });
  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "web",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
