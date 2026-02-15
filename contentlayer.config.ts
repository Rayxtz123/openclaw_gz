import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  // 只匹配子目录下的 .md 文件，排除根目录的 README.md
  filePathPattern: `*/**/*.md`,
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
  // 禁用导入别名警告
  disableImportAliasWarning: true,
})
