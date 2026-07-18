# MicroEmitter

[![npm version](https://badge.fury.io/js/micro-emitter.svg)](https://badge.fury.io/js/micro-emitter)

A small, dependency-free event emitter for TypeScript and JavaScript.

## Installation

```sh
npm install micro-emitter
```

MicroEmitter supports Node.js 22 and later.

## Usage

```ts
import MicroEmitter from 'micro-emitter';

const emitter = new MicroEmitter();

emitter.on('change', (payload) => {
  console.log(payload);
});

emitter.emit('change', { message: 'Hello MicroEmitter!' });
```

CommonJS is also supported:

```js
const MicroEmitter = require('micro-emitter');
```

## API

All methods return the emitter so calls can be chained.

### `addListener(eventType, listener)` / `on(eventType, listener)`

Registers a listener for an event. Registering the same function more than once creates multiple registrations.

### `addOnceListener(eventType, listener)` / `once(eventType, listener)`

Registers a listener that is removed before its first invocation. Removing it first keeps recursive emissions from invoking it again.

### `removeListener(eventType, listener?)` / `off(eventType, listener?)`

Removes all registrations of `listener` for the event. If `listener` is omitted, removes every listener for the event.

### `emit(eventType, payload?)` / `trigger(eventType, payload?)`

Invokes the listeners registered when emission starts, in registration order. The listener receives `payload`, and its `this` value is the emitter.

## Development

Use Node.js 22 or later and the npm version declared in `packageManager`.

```sh
npm ci
npm run check
```

`npm run check` verifies formatting, linting, types, tests, and the distributable build. The same command runs automatically before `npm pack` and `npm publish`.
