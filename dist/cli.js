"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "island-ssg",
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        start: "tsup --watch",
        build: "tsup",
        test: 'echo "Error: no test specified" && exit 1',
        lint: "eslint --ext .ts,.tsx,.js,.jsx ./",
        "lint:fix": "eslint --fix --ext .ts,.tsx,.js,.jsx --quiet ./",
        prepare: "husky install"
      },
      keywords: [],
      author: "",
      license: "ISC",
      devDependencies: {
        "@commitlint/cli": "^17.4.2",
        "@commitlint/config-conventional": "^17.4.2",
        "@types/fs-extra": "^11.0.1",
        "@types/node": "^18.11.18",
        "@typescript-eslint/eslint-plugin": "^5.50.0",
        "@typescript-eslint/parser": "^5.50.0",
        commitlint: "^17.4.2",
        eslint: "^8.33.0",
        "eslint-config-prettier": "^8.6.0",
        "eslint-plugin-prettier": "^4.2.1",
        "eslint-plugin-react": "^7.32.2",
        "eslint-plugin-react-hooks": "^4.6.0",
        husky: "^8.0.3",
        "lint-staged": "^13.1.0",
        prettier: "^2.8.3",
        rollup: "^3.12.0",
        tsup: "^6.5.0",
        typescript: "^4.9.4"
      },
      dependencies: {
        "@vitejs/plugin-react": "^3.0.1",
        cac: "^6.7.14",
        "fs-extra": "^11.1.0",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        vite: "^4.0.4"
      },
      bin: {
        island: "bin/island.js"
      },
      "lint-staged": {
        "**/*.{js,jsx,tsx,ts}": [
          "eslint --fix"
        ]
      }
    };
  }
});

// src/node/cli.ts
var _cac = require('cac');
var _path = require('path');

// src/node/dev.ts
var _vite = require('vite');

// src/node/plugin-island/indexHtml.ts
var _promises = require('fs/promises');

// src/node/constants/index.ts

var PACKAGE_ROOT = _path.join.call(void 0, __dirname, "..");
var DEFAULT_HTML_PATH = _path.join.call(void 0, PACKAGE_ROOT, "template.html");
var CLIENT_ENTRY_PATH = _path.join.call(void 0, 
  PACKAGE_ROOT,
  "src",
  "runtime",
  "client-entry.tsx"
);
var SERVER_ENTRY_PATH = _path.join.call(void 0, 
  PACKAGE_ROOT,
  "src",
  "runtime",
  "ssr-entry.tsx"
);

// src/node/plugin-island/indexHtml.ts
function pluginIndexHtml() {
  return {
    name: "island:index-html",
    apply: "serve",
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: "body"
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await _promises.readFile.call(void 0, DEFAULT_HTML_PATH, "utf-8");
          try {
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader("Contenty-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}

// src/node/dev.ts
var _pluginreact = require('@vitejs/plugin-react'); var _pluginreact2 = _interopRequireDefault(_pluginreact);
async function createDevServer(root = process.cwd()) {
  return _vite.createServer.call(void 0, {
    root,
    plugins: [pluginIndexHtml(), _pluginreact2.default.call(void 0, )]
  });
}

// src/node/build.ts


var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);

async function bundle(root) {
  const resolveViteConfig = (isServer) => ({
    mode: "production",
    root,
    plugins: [_pluginreact2.default.call(void 0, )],
    build: {
      ssr: isServer,
      outDir: isServer ? ".temp" : "build",
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  });
  console.log("Building client + server bundles...");
  console.log("Lint-stage test");
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      _vite.build.call(void 0, resolveViteConfig(false)),
      _vite.build.call(void 0, resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log("bundle Err", e);
  }
}
async function renderPage(render, root, clientBundle) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  console.log("Rendering page in server side...");
  const appHtml = render();
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
    <script type="module" src="/${_optionalChain([clientChunk, 'optionalAccess', _ => _.fileName])}"><\/script>
  </body>
</html>`.trim();
  await _fsextra2.default.ensureDir(_path.join.call(void 0, root, "build"));
  await _fsextra2.default.writeFile(_path.join.call(void 0, root, "build/index.html"), html);
  await _fsextra2.default.remove(_path.join.call(void 0, root, ".temp"));
}
async function build(root = process.cwd()) {
  const [clientBundle] = await bundle(root);
  const serverEntryPath = _path.join.call(void 0, root, ".temp", "ssr-entry.js");
  const { render } = await Promise.resolve().then(() => require(serverEntryPath));
  await renderPage(render, root, clientBundle);
}

// src/node/cli.ts
var version = require_package().version;
var cli = _cac.cac.call(void 0, "island").version(version).help();
cli.command("[root]", "start dev server").alias("dev").action(async (root) => {
  console.log("dev", root);
  root = root ? _path.resolve.call(void 0, root) : process.cwd();
  const server = await createDevServer(root);
  await server.listen();
  server.printUrls();
});
cli.command("build [root]", "build for production").action(async (root) => {
  console.log("build", root);
  try {
    root = _path.resolve.call(void 0, root);
    await build(root);
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
