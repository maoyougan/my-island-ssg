import path from 'path';
import fse from 'fs-extra';
import * as excema from 'execa';

const exampleDir = path.resolve(__dirname, '../e2e/playground/basic');
const rootPath = path.resolve(__dirname, '../');
const defaultOpts = {
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

const buildAndInstallOpts = {
  cwd: rootPath,
  ...defaultOpts
};
const defaultExecaOpts = {
  cwd: exampleDir,
  ...defaultOpts
};

async function prepareE2E() {
  // ensure after build
  if (!fse.existsSync(path.resolve(__dirname, '../dist'))) {
    excema.execaCommandSync('pnpm build', buildAndInstallOpts);
  }

  excema.execaCommandSync('npx playwright install', buildAndInstallOpts);

  // excema.execaCommandSync('pnpm i', defaultExecaOpts);

  // exec dev command
  excema.execaCommandSync('pnpm dev', defaultExecaOpts);
}

prepareE2E();
