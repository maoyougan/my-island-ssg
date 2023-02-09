import { build as viteBuild, InlineConfig } from 'vite';
// import pluginReact from '@vitejs/plugin-react';
import fs from 'fs-extra';
import { dirname, join } from 'path';
import type { RollupOutput } from 'rollup';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import { SiteConfig } from 'shared/types';
// import { pluginConfig } from './plugin-island/config';
import { createVitePlugins } from './vitePlugins';
import type { Route } from './plugin-routes';

// const dynamicImport = new Function('m', 'return import(m)')

export async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = async (
    isServer: boolean
  ): Promise<InlineConfig> => ({
    mode: 'production',
    root,
    plugins: await createVitePlugins(config, undefined, isServer),
    ssr: {
      noExternal: ['react-router-dom']
    },
    build: {
      ssr: isServer,
      outDir: isServer ? join(root, '.temp') : join(root, 'build'),
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm'
        }
      }
    }
  });

  console.log('Building client + server bundles...');

  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(await resolveViteConfig(false)),
      // server bundle
      viteBuild(await resolveViteConfig(true))
    ]);

    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log('bundle Err', e);
  }
}

export async function renderPage(
  render: (url: string) => string,
  routes: Route[],
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  console.log('Rendering page in server side...');
  return Promise.all(
    routes.map(async (route) => {
      const routePath = route.path;
      const appHtml = render(routePath);
      const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
      const fileName = routePath.endsWith('/')
        ? `${routePath}index.html`
        : `${routePath}.html`;
      await fs.ensureDir(join(root, 'build', dirname(fileName)));
      await fs.writeFile(join(root, 'build', fileName), html);
    })
  );
}

export async function build(root: string = process.cwd(), config: SiteConfig) {
  const [clientBundle] = await bundle(root, config);
  // 引入ssr入口模块
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js');
  const { render, routes } = await import(serverEntryPath);
  try {
    await renderPage(render, routes, root, clientBundle);
  } catch (e) {
    console.log('Render page error.\n', e);
  }
}
