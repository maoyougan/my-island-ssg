import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';
import { SiteConfig } from 'shared/types';
import { createPluginMdx } from './plugin-mdx';

export async function createVitePlugins(
  config: SiteConfig,
  restartSever?: () => Promise<void>
) {
  return [
    pluginIndexHtml(),
    pluginReact({ jsxRuntime: 'automatic' }),
    pluginConfig(config, restartSever),
    pluginRoutes({
      root: config.root
    }),
    await createPluginMdx()
  ];
}
