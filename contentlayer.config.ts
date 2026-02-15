import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    source: { type: 'string', required: true },
    category: { type: 'string', required: true },
    subcategory: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' } },
    status: { type: 'string', required: true },
    author: { type: 'string' },
    summary: { type: 'string' },
    related: { type: 'list', of: { type: 'string' } },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.split('/').pop(),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
})