import { EleventyI18nPlugin } from '@11ty/eleventy'
import pluginWebc from '@11ty/eleventy-plugin-webc'
import { eleventyImagePlugin } from '@11ty/eleventy-img'

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'de',
  })

  eleventyConfig.addJavaScriptFunction('dr18', (obj) => obj[page.lang] || obj)
  eleventyConfig.addJavaScriptFunction('drFA', (name) => `#fa-${name}`)
  eleventyConfig.addJavaScriptFunction('drExists', (thing) => !!thing)

  eleventyConfig.addPassthroughCopy('admin')
  eleventyConfig.addPassthroughCopy('assets')
  eleventyConfig.addPassthroughCopy('robots.txt')
  eleventyConfig.addPassthroughCopy('favicon.ico')

  eleventyConfig.addPlugin(pluginWebc, {
    components: ['_components/**/*.webc', 'npm:@11ty/eleventy-img/*.webc'],
  })

  eleventyConfig.addPlugin(eleventyImagePlugin, {
    formats: ['webp', 'jpeg'],
    urlPath: '/img/',
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
    },
  })
}
