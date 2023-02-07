import { createServer as createViteServer } from 'vite';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';

export async function createDevServer(
  root: string,
  restartSever: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
  console.log('config', config);
  return createViteServer({
    plugins: [
      pluginIndexHtml(),
      pluginReact(),
      pluginConfig(config, restartSever),
      pluginRoutes({ root: config.root })
    ],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
