import { EleventyI18nPlugin } from '@11ty/eleventy'
import pluginWebc from '@11ty/eleventy-plugin-webc'
import { eleventyImagePlugin, Image, generateHTML } from '@11ty/eleventy-img'
import markdown from 'markdown-it'

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

  const md = markdown()

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    let imgSrc = `.${token.attrGet('src')}`
    const imgAlt = token.content
    const imgTitle = token.attrGet('title')

    const htmlOpts = {
      title: imgTitle,
      alt: imgAlt,
      loading: 'lazy',
      decoding: 'async',
    }

    new Image(imgSrc)
    const metadata = Image.statsSync(imgSrc)

    const generated = generateHTML(metadata, htmlOpts)

    return generated
  }
  eleventyConfig.setLibrary('md', md)
}
