import assert from 'power-assert';
import MicroEmitter from '../src';

let count;
let message;
let microEmitter;
let TYPE = 'TEST_EVENT';
let MESSAGE = 'TEST_MESSAGE';

function countUp() {
  count += 1;
}

function countDown() {
  count -= 1;
}

function setMessage(payload) {
  message = payload.message;
}

describe('MicroEmitter', () => {
  beforeEach(() => {
    count = 0;
    message = '';
    microEmitter = new MicroEmitter();
  });
  describe('addListener', () => {
    it('when add countUp', () => {
      microEmitter.addListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 1);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
    });
    it('when add countUp and countDown', () => {
      microEmitter.addListener(TYPE, countUp);
      microEmitter.addListener(TYPE, countDown);
      assert(microEmitter._listeners[TYPE].length === 2);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      assert(microEmitter._listeners[TYPE][1].listener === countDown);
    });
    it('when add same function', () => {
      microEmitter.addListener(TYPE, countUp);
      microEmitter.addListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 2);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      assert(microEmitter._listeners[TYPE][1].listener === countUp);
    });
  });
  describe('on', () => {
    it('when add countUp by on method', () => {
      microEmitter.on(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 1);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
    });
  });
  describe('remove', () => {
    it('when remove countUp', () => {
      microEmitter.addListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 1);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      microEmitter.removeListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 0);
    });
    it('when remove countDown(countDown is not registed)', () => {
      microEmitter.addListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 1);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      microEmitter.removeListener(TYPE, countDown);
      assert(microEmitter._listeners[TYPE].length === 1);
    });
    it('when remove countDown(countDown and countUp are registed)', () => {
      microEmitter.addListener(TYPE, countUp);
      microEmitter.addListener(TYPE, countDown);
      assert(microEmitter._listeners[TYPE].length === 2);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      assert(microEmitter._listeners[TYPE][1].listener === countDown);
      microEmitter.removeListener(TYPE, countDown);
      assert(microEmitter._listeners[TYPE].length === 1);
    });
    it('when remove all functions', () => {
      microEmitter.addListener(TYPE, countUp);
      microEmitter.addListener(TYPE, countDown);
      assert(microEmitter._listeners[TYPE].length === 2);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      assert(microEmitter._listeners[TYPE][1].listener === countDown);
      microEmitter.removeListener(TYPE);
      assert(microEmitter._listeners[TYPE] === undefined);
    });

    it('no error when remove without add', () => {
      microEmitter.removeListener(TYPE, countUp);
    });

    it('when remove non registered function', () => {
      microEmitter.addListener(TYPE, countUp);
      microEmitter.removeListener(TYPE, () => {} );
      assert(microEmitter._listeners[TYPE].length === 1);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
    });
  });
  describe('off', () => {
    it('when remove countUp', () => {
      microEmitter.addListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 1);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      microEmitter.off(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 0);
    });

  });
  describe('emit', () => {
    it('when emit event', () => {
      microEmitter.addListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 1);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      microEmitter.emit(TYPE);
      assert(count === 1);
    });
    it('when registed same methods', () => {
      microEmitter.addListener(TYPE, countUp);
      microEmitter.addListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 2);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      assert(microEmitter._listeners[TYPE][1].listener === countUp);
      microEmitter.emit(TYPE);
      assert(count === 2);
    });
    it('when registed same methods', () => {
      microEmitter.addListener(TYPE, countUp);
      microEmitter.addListener(TYPE, countDown);
      assert(microEmitter._listeners[TYPE].length === 2);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      assert(microEmitter._listeners[TYPE][1].listener === countDown);
      microEmitter.emit(TYPE);
      assert(count === 0);
    });
    it('when emit with payload', () => {
      microEmitter.addListener(TYPE, setMessage);
      assert(microEmitter._listeners[TYPE].length === 1);
      assert(microEmitter._listeners[TYPE][0].listener === setMessage);
      microEmitter.emit(TYPE, { message: MESSAGE });
      assert(message === MESSAGE);
    });
  });
  describe('trigger', () => {
    it('when trigger event', () => {
      microEmitter.addListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 1);
      assert(microEmitter._listeners[TYPE][0].listener === countUp);
      microEmitter.trigger(TYPE);
      assert(count === 1);
    });
  });
  describe('addOnceListener', () => {
    it('when add countUp as once event', () => {
      microEmitter.addOnceListener(TYPE, countUp);
      assert(microEmitter._listeners[TYPE].length === 1);
      microEmitter.emit(TYPE);
      assert(count === 1);
      assert(microEmitter._listeners[TYPE].length === 0);
    });
    it('when add countUp and countDown as once event', () => {
      microEmitter.addOnceListener(TYPE, countUp);
      microEmitter.addOnceListener(TYPE, countDown);
      assert(microEmitter._listeners[TYPE].length === 2);
      microEmitter.emit(TYPE);
      assert(count === 0);
      assert(microEmitter._listeners[TYPE].length === 0);
    });
  });
});
