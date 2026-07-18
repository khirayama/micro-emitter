import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

import MicroEmitterEsm from '../lib/index.mjs';

const require = createRequire(import.meta.url);
const MicroEmitterCommonJs = require('../lib/index.js');

test('loads the distributable through ESM', () => {
  const emitter = new MicroEmitterEsm();
  assert.equal(emitter.emit('missing'), emitter);
});

test('loads the distributable through CommonJS', () => {
  const emitter = new MicroEmitterCommonJs();
  assert.equal(emitter.emit('missing'), emitter);
});
