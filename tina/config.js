import { defineConfig } from 'tinacms'

const localized = (type) => [
  {
    type,
    name: 'de',
    label: 'Deutsch',
    required: true,
  },
  {
    type,
    name: 'en',
    label: 'English',
    required: true,
  },
]

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: '.',
  },
  media: {
    tina: {
      mediaRoot: 'assets',
      publicFolder: '.',
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: 'blogs',
        label: 'Blog Entries',
        path: 'blog',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
          },
          {
            type: 'rich-text',
            label: 'Post Body',
            name: 'body',
            isBody: true,
          },
        ],
      },
      {
        name: 'managers',
        label: 'Managers',
        path: '_data',
        match: {
          include: 'managers',
        },
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'object',
            name: 'managers',
            label: 'Managers',
            required: true,
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.fullName }
              },
            },
            fields: [
              {
                type: 'string',
                name: 'fullName',
                label: 'Full Name',
                isTitle: true,
                required: true,
              },
              {
                type: 'object',
                name: 'title',
                label: 'Title',
                required: true,
                fields: localized('string'),
              },
              {
                name: 'portrait',
                type: 'image',
                label: 'Portrait',
                required: true,
              },
              {
                type: 'object',
                name: 'portrait_alt',
                label: 'Portrait Alt Tag',
                required: true,
                fields: localized('string'),
              },
              {
                type: 'object',
                name: 'focus',
                label: 'Focus',
                required: true,
                fields: localized('string'),
              },
              {
                name: 'customers',
                type: 'object',
                label: 'Customers',
                required: true,
                fields: localized('rich-text'),
              },
            ],
          },
        ],
      },
    ],
  },
})
