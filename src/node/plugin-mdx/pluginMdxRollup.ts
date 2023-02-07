import pluginMdx from '@mdx-js/rollup';
import type { Plugin } from 'vite';
import remarkPluginGFM from 'remark-gfm';
import rehypePlguinAotuLinkHeading from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import remarkPluginFrontMatter from 'remark-frontmatter';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';

export function pluginMdxRollup(): Plugin {
  return pluginMdx({
    remarkPlugins: [
      remarkPluginGFM,
      remarkPluginFrontMatter,
      [remarkPluginMDXFrontMatter, { name: 'frontmatter' }]
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePlguinAotuLinkHeading,
        {
          properties: {
            class: 'header-anchor'
          },
          content: {
            type: 'text',
            value: '#'
          }
        }
      ],
      rehypePluginPreWrapper
    ]
  });
}
