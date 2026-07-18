import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import MicroEmitter from './index';

describe('MicroEmitter', () => {
  test('registers listeners in order, forwards payloads, and binds this', () => {
    const emitter = new MicroEmitter();
    const calls: Array<[string, unknown, unknown]> = [];

    emitter
      .addListener('change', function (payload) {
        calls.push(['first', payload, this]);
      })
      .on('change', function (payload) {
        calls.push(['second', payload, this]);
      });

    assert.equal(emitter.emit('change', { value: 1 }), emitter);
    assert.deepEqual(
      calls.map(([name, payload]) => [name, payload]),
      [
        ['first', { value: 1 }],
        ['second', { value: 1 }],
      ],
    );
    assert.ok(calls.every(([, , thisValue]) => thisValue === emitter));
  });

  test('invokes once listeners only once', () => {
    const emitter = new MicroEmitter();
    let callCount = 0;

    emitter.once('change', () => {
      callCount += 1;
    });

    emitter.emit('change').emit('change');
    assert.equal(callCount, 1);
  });

  test('removes a once registration without removing a persistent registration of the same function', () => {
    const emitter = new MicroEmitter();
    let callCount = 0;
    const listener = () => {
      callCount += 1;
    };

    emitter.once('change', listener).on('change', listener);
    emitter.emit('change').emit('change');

    assert.equal(callCount, 3);
  });

  test('removes a once listener before invoking it during a recursive emit', () => {
    const emitter = new MicroEmitter();
    let callCount = 0;

    emitter.once('change', () => {
      callCount += 1;
      emitter.emit('change');
    });

    emitter.emit('change');
    assert.equal(callCount, 1);
  });

  test('does not invoke a later once listener twice during a recursive emit', () => {
    const emitter = new MicroEmitter();
    let emittedRecursively = false;
    let callCount = 0;

    emitter
      .on('change', () => {
        if (!emittedRecursively) {
          emittedRecursively = true;
          emitter.emit('change');
        }
      })
      .once('change', () => {
        callCount += 1;
      });

    emitter.emit('change');
    assert.equal(callCount, 1);
  });

  test('keeps a throwing once listener removed', () => {
    const emitter = new MicroEmitter();
    const error = new Error('listener failed');

    emitter.once('change', () => {
      throw error;
    });

    assert.throws(() => emitter.emit('change'), error);
    assert.doesNotThrow(() => emitter.emit('change'));
  });

  test('removes every matching registration', () => {
    const emitter = new MicroEmitter();
    let callCount = 0;
    const listener = () => {
      callCount += 1;
    };

    emitter.on('change', listener).on('change', listener).off('change', listener).emit('change');
    assert.equal(callCount, 0);
  });

  test('removes every listener for an event when the listener is omitted', () => {
    const emitter = new MicroEmitter();
    let callCount = 0;

    emitter.on('change', () => callCount++).on('change', () => callCount++);

    assert.equal(emitter.removeListener('change'), emitter);
    emitter.emit('change');
    assert.equal(callCount, 0);
  });

  test('supports event names inherited by ordinary objects', () => {
    const emitter = new MicroEmitter();
    const eventNames = ['__proto__', 'constructor', 'toString'];
    const calls: string[] = [];

    for (const eventName of eventNames) {
      emitter.on(eventName, () => calls.push(eventName));
      emitter.emit(eventName);
    }

    assert.deepEqual(calls, eventNames);
  });

  test('uses a listener snapshot while emitting', () => {
    const emitter = new MicroEmitter();
    const calls: string[] = [];
    const addedDuringEmit = () => calls.push('added');

    emitter.on('change', () => {
      calls.push('original');
      emitter.on('change', addedDuringEmit);
    });

    emitter.emit('change');
    assert.deepEqual(calls, ['original']);

    emitter.emit('change');
    assert.deepEqual(calls, ['original', 'original', 'added']);
  });

  test('provides chainable aliases and ignores unknown events', () => {
    const emitter = new MicroEmitter();
    let payload: unknown;

    assert.equal(
      emitter.addOnceListener('change', (value) => (payload = value)),
      emitter,
    );
    assert.equal(emitter.trigger('change', 42), emitter);
    assert.equal(payload, 42);
    assert.equal(emitter.off('missing'), emitter);
    assert.equal(emitter.trigger('missing'), emitter);
  });
});
