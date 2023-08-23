# MicroEmitter

[![npm version](https://badge.fury.io/js/micro-emitter.svg)](https://badge.fury.io/js/micro-emitter)  
micro event emitter in TypeScript.  
Before v1.2.0, micro-emitter made by es6. If you want see that, please check it.

## Motivation

I wanted a simple emitter for my apps I created. So, I made an independent, no-dependency emitter under 100 lines.

## Getting Started

```
$ npm install micro-emitter
```

```javascript
import MicroEmitter from 'micro-emitter';

let emitter = new MicroEmitter();
```

```javascript
var MicroEmitter = require('micro-emitter');

var emitter = new MicroEmitter();
```

## API

It has 4 API and some alias only.

-   addListener(on)
-   addOnceListener(once)
-   removeLister(off)
-   emit(trigger)

### addListene(on)/addOnceListener(once)

```javascript
const CHANGE_EVENT = 'CHANGE_EVENT';

emitter.addListener(CHANGE_EVENT, callbak);
emitter.on(CHANGE_EVENT, callbak);
emitter.addOnceListener(CHANGE_EVENT, callbak); // only first time
emitter.once(CHANGE_EVENT, callbak); // only first time
```

### removeListener(off)

```javascript
const CHANGE_EVENT = 'CHANGE_EVENT';

emitter.removeListener(CHANGE_EVENT);
emitter.off(CHANGE_EVENT);
```

### emit(trigger)

```javascript
const CHANGE_EVENT = 'CHANGE_EVENT';

emitter.addListener(CHANGE_EVENT, (payload) => {
    console.log(payload); // { message: 'Hello MicroEmitter!' }
});
emitter.emit(CHANGE_EVENT, { message: 'Hello MicroEmitter!' });
```

## Example

### simple and complete example.

```javascript

import MicroEmitter from 'micro-emitter';

const CHANGE_EVENT = 'CHANGE_EVENT';

const emitter = new MicroEmitter();

emitter.addListener(CHANGE_EVENT, (payload) => {
  alert(payload.message);
});

setTimeout(() => {
  emitter.emit(CHANGE_EVENT, { message: 'Hello MicroEmitter!' }});
}, 1000);

```
