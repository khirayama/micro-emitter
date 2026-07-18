import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

import { build } from 'esbuild';

await rm('lib', { recursive: true, force: true });
await mkdir('lib', { recursive: true });

execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', '--project', 'tsconfig.build.json'], {
  stdio: 'inherit',
});

const esmDeclaration = await readFile('lib/index.d.ts', 'utf8');
const commonJsDeclaration = `${esmDeclaration
  .replace('export type Listener', 'type Listener')
  .replace('export default class MicroEmitter', 'declare class MicroEmitter')}\nexport = MicroEmitter;\n`;

await Promise.all([writeFile('lib/index.d.mts', esmDeclaration), writeFile('lib/index.d.cts', commonJsDeclaration)]);

const sharedOptions = {
  bundle: true,
  entryPoints: ['src/index.ts'],
  logLevel: 'info',
  platform: 'node',
  target: 'es2022',
};

await Promise.all([
  build({
    ...sharedOptions,
    footer: { js: 'module.exports = module.exports.default;' },
    format: 'cjs',
    outfile: 'lib/index.js',
  }),
  build({
    ...sharedOptions,
    format: 'esm',
    outfile: 'lib/index.mjs',
  }),
]);
