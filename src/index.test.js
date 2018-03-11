import test from 'ava';
import sinon from 'sinon';

import MicroEmitter from './index';

test.beforeEach(t => {
  t.context.emitter = new MicroEmitter();
});

// AddListener
test('addListener > add an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 1);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(callback.callCount, 0);
});

test('addListener > add multi callback with an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addListener(EVENT_NAME, callback1);
  emitter.addListener(EVENT_NAME, callback2);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback1);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback2);
  t.false(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);
});

test('addListener > add some event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME_1 = '__TEST_EVENT_1';
  const EVENT_NAME_2 = '__TEST_EVENT_2';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addListener(EVENT_NAME_1, callback1);
  emitter.addListener(EVENT_NAME_2, callback2);
  t.is(emitter._listeners[EVENT_NAME_1].length, 1);
  t.is(emitter._listeners[EVENT_NAME_2].length, 1);
  t.is(emitter._listeners[EVENT_NAME_1][0].listener, callback1);
  t.false(emitter._listeners[EVENT_NAME_1][0].once);
  t.is(emitter._listeners[EVENT_NAME_2][0].listener, callback2);
  t.false(emitter._listeners[EVENT_NAME_2][0].once);
  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);
});

test('addListener > add same callback', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addListener(EVENT_NAME, callback);
  emitter.addListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback.callCount, 0);
});

// On
test('on: same "addListener > add an event"', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.on(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 1);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(callback.callCount, 0);
});

// AddOnceListener
test('addOnceListener > add an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addOnceListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 1);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.true(emitter._listeners[EVENT_NAME][0].once);
  t.is(callback.callCount, 0);
});

test('addOnceListener > add multi callback with an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addOnceListener(EVENT_NAME, callback1);
  emitter.addOnceListener(EVENT_NAME, callback2);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback1);
  t.true(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback2);
  t.true(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);
});

test('addOnceListener > add some event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME_1 = '__TEST_EVENT_1';
  const EVENT_NAME_2 = '__TEST_EVENT_2';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addOnceListener(EVENT_NAME_1, callback1);
  emitter.addOnceListener(EVENT_NAME_2, callback2);
  t.is(emitter._listeners[EVENT_NAME_1].length, 1);
  t.is(emitter._listeners[EVENT_NAME_2].length, 1);
  t.is(emitter._listeners[EVENT_NAME_1][0].listener, callback1);
  t.true(emitter._listeners[EVENT_NAME_1][0].once);
  t.is(emitter._listeners[EVENT_NAME_2][0].listener, callback2);
  t.true(emitter._listeners[EVENT_NAME_2][0].once);
  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);
});

test('addOnceListener > add same callback', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addOnceListener(EVENT_NAME, callback);
  emitter.addOnceListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.true(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback);
  t.true(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback.callCount, 0);
});

// Once
test('once: same "addOnceListener > add an event"', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.once(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 1);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.true(emitter._listeners[EVENT_NAME][0].once);
  t.is(callback.callCount, 0);
});

// Remove
test('removeListener > remove an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 1);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);

  emitter.removeListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 0);

  t.is(callback.callCount, 0);
});

test('removeListener > add multi callback with an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addListener(EVENT_NAME, callback1);
  emitter.addListener(EVENT_NAME, callback2);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback1);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback2);
  t.false(emitter._listeners[EVENT_NAME][1].once);

  emitter.removeListener(EVENT_NAME, callback1);
  emitter.removeListener(EVENT_NAME, callback2);
  t.is(emitter._listeners[EVENT_NAME].length, 0);

  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);
});

test('removeListener > add some event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME_1 = '__TEST_EVENT_1';
  const EVENT_NAME_2 = '__TEST_EVENT_2';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addListener(EVENT_NAME_1, callback1);
  emitter.addListener(EVENT_NAME_2, callback2);
  t.is(emitter._listeners[EVENT_NAME_1].length, 1);
  t.is(emitter._listeners[EVENT_NAME_2].length, 1);
  t.is(emitter._listeners[EVENT_NAME_1][0].listener, callback1);
  t.false(emitter._listeners[EVENT_NAME_1][0].once);
  t.is(emitter._listeners[EVENT_NAME_2][0].listener, callback2);
  t.false(emitter._listeners[EVENT_NAME_2][0].once);

  emitter.removeListener(EVENT_NAME_1, callback1);
  emitter.removeListener(EVENT_NAME_2, callback2);
  t.is(emitter._listeners[EVENT_NAME_1].length, 0);
  t.is(emitter._listeners[EVENT_NAME_2].length, 0);

  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);
});

test('removeListener > add same callback', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addListener(EVENT_NAME, callback);
  emitter.addListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][1].once);

  emitter.removeListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 0);

  t.is(callback.callCount, 0);
});

// Off
test('off: same "removeListener > remove an event"', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 1);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);

  emitter.removeListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 0);

  t.is(callback.callCount, 0);
});

// Emit
test('emit > addListener > add an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 1);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(callback.callCount, 0);

  emitter.emit(EVENT_NAME);
  t.is(emitter._listeners[EVENT_NAME].length, 1);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(callback.callCount, 1);
});

test('emit > addListener > add multi callback with an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addListener(EVENT_NAME, callback1);
  emitter.addListener(EVENT_NAME, callback2);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback1);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback2);
  t.false(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);

  emitter.emit(EVENT_NAME);
  emitter.emit(EVENT_NAME);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback1);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback2);
  t.false(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback1.callCount, 2);
  t.is(callback2.callCount, 2);
});

test('emit > addListener > add some event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME_1 = '__TEST_EVENT_1';
  const EVENT_NAME_2 = '__TEST_EVENT_2';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addListener(EVENT_NAME_1, callback1);
  emitter.addListener(EVENT_NAME_2, callback2);
  t.is(emitter._listeners[EVENT_NAME_1].length, 1);
  t.is(emitter._listeners[EVENT_NAME_2].length, 1);
  t.is(emitter._listeners[EVENT_NAME_1][0].listener, callback1);
  t.false(emitter._listeners[EVENT_NAME_1][0].once);
  t.is(emitter._listeners[EVENT_NAME_2][0].listener, callback2);
  t.false(emitter._listeners[EVENT_NAME_2][0].once);
  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);

  emitter.emit(EVENT_NAME_1);
  emitter.emit(EVENT_NAME_2);
  t.is(emitter._listeners[EVENT_NAME_1].length, 1);
  t.is(emitter._listeners[EVENT_NAME_2].length, 1);
  t.is(emitter._listeners[EVENT_NAME_1][0].listener, callback1);
  t.false(emitter._listeners[EVENT_NAME_1][0].once);
  t.is(emitter._listeners[EVENT_NAME_2][0].listener, callback2);
  t.false(emitter._listeners[EVENT_NAME_2][0].once);
  t.is(callback1.callCount, 1);
  t.is(callback2.callCount, 1);
});

test('emit > addListener > add same callback', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addListener(EVENT_NAME, callback);
  emitter.addListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback.callCount, 0);

  emitter.emit(EVENT_NAME);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback);
  t.false(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback.callCount, 2);
});

test('emit > addOnceListener > add an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addOnceListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 1);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.true(emitter._listeners[EVENT_NAME][0].once);
  t.is(callback.callCount, 0);

  emitter.emit(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 0);
  t.is(callback.callCount, 1);
});

test('emit > addOnceListener > add multi callback with an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addOnceListener(EVENT_NAME, callback1);
  emitter.addOnceListener(EVENT_NAME, callback2);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback1);
  t.true(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback2);
  t.true(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);

  emitter.emit(EVENT_NAME);
  t.is(emitter._listeners[EVENT_NAME].length, 0);
  t.is(callback1.callCount, 1);
  t.is(callback2.callCount, 1);
});

test('emit > addOnceListener > add some event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME_1 = '__TEST_EVENT_1';
  const EVENT_NAME_2 = '__TEST_EVENT_2';
  const callback1 = sinon.spy();
  const callback2 = sinon.spy();

  emitter.addOnceListener(EVENT_NAME_1, callback1);
  emitter.addOnceListener(EVENT_NAME_2, callback2);
  t.is(emitter._listeners[EVENT_NAME_1].length, 1);
  t.is(emitter._listeners[EVENT_NAME_2].length, 1);
  t.is(emitter._listeners[EVENT_NAME_1][0].listener, callback1);
  t.true(emitter._listeners[EVENT_NAME_1][0].once);
  t.is(emitter._listeners[EVENT_NAME_2][0].listener, callback2);
  t.true(emitter._listeners[EVENT_NAME_2][0].once);
  t.is(callback1.callCount, 0);
  t.is(callback2.callCount, 0);

  emitter.emit(EVENT_NAME_1, callback1);
  emitter.emit(EVENT_NAME_2, callback2);
  t.is(emitter._listeners[EVENT_NAME_1].length, 0);
  t.is(emitter._listeners[EVENT_NAME_2].length, 0);
  t.is(callback1.callCount, 1);
  t.is(callback2.callCount, 1);
});

test('emit > addOnceListener > add same callback', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = sinon.spy();

  emitter.addOnceListener(EVENT_NAME, callback);
  emitter.addOnceListener(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 2);
  t.is(emitter._listeners[EVENT_NAME][0].listener, callback);
  t.true(emitter._listeners[EVENT_NAME][0].once);
  t.is(emitter._listeners[EVENT_NAME][1].listener, callback);
  t.true(emitter._listeners[EVENT_NAME][1].once);
  t.is(callback.callCount, 0);

  emitter.emit(EVENT_NAME, callback);
  t.is(emitter._listeners[EVENT_NAME].length, 0);
  t.is(callback.callCount, 2);
});

test('emit with payload > addListener > add an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = payload => {
    t.deepEqual(payload, {message: 'hello world'});
  };

  emitter.addListener(EVENT_NAME, callback);
  emitter.emit(EVENT_NAME, {message: 'hello world'});
});

test('emit with payload > addOnceListener > add an event', t => {
  const emitter = t.context.emitter;
  const EVENT_NAME = '__TEST_EVENT';
  const callback = payload => {
    t.deepEqual(payload, {message: 'hello world'});
  };

  emitter.addOnceListener(EVENT_NAME, callback);
  emitter.emit(EVENT_NAME, {message: 'hello world'});
});
