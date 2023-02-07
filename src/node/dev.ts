import { createServer as createViteServer } from 'vite';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { createVitePlugins } from './vitePlugins';

export async function createDevServer(
  root: string,
  restartSever: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
  console.log('config', config);
  return createViteServer({
    plugins: createVitePlugins(config, restartSever),
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
