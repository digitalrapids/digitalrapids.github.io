import { EleventyI18nPlugin } from '@11ty/eleventy'
import pluginWebc from '@11ty/eleventy-plugin-webc'

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'de'
  })
  eleventyConfig.addPlugin(pluginWebc)
  eleventyConfig.addJavaScriptFunction("dr18", (obj) => obj[page.lang] || obj);
  eleventyConfig.addJavaScriptFunction("drFA", (name) => `#fa-${name}`);
  eleventyConfig.addJavaScriptFunction("drExists", (thing) => !!thing);
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");
}
