# MicroEmitter
[![npm version](https://badge.fury.io/js/micro-emitter.svg)](https://badge.fury.io/js/micro-emitter)
[![Circle CI](https://circleci.com/gh/khirayama/micro-emitter.svg?style=svg)](https://circleci.com/gh/khirayama/micro-emitter)  
micro event emitter in es6.

## Motivation
I need micro emitter for learning some apps.  
And I make a emitter in 100 lines.

## Getting Started

```
$ npm install micro-emitter
```

```javascript
import MicroEmitter from 'micro-emitter';

let AppEmitter = new MicroEmitter();
```

```javascript
var MicroEmitter = require('micro-emitter');

var AppEmitter = new MicroEmitter();
```

## API
It has 4 API and some alias only.

- addListener(on)
- addOnceListener(once)
- removeLister(off)
- emit(trigger)


### addListene(on)/addOnceListener(once)

```javascript
const CHANGE_EVENT = 'CHANGE_EVENT';

AppEmitter.addListener(CHANGE_EVENT, callbak);
AppEmitter.on(CHANGE_EVENT, callbak);
AppEmitter.addOnceListener(CHANGE_EVENT, callbak); // only first time
AppEmitter.once(CHANGE_EVENT, callbak); // only first time
```

### removeListener(off)

```javascript
const CHANGE_EVENT = 'CHANGE_EVENT';

AppEmitter.removeListener(CHANGE_EVENT);
AppEmitter.off(CHANGE_EVENT);
```

### emit(trigger)

```javascript
const CHANGE_EVENT = 'CHANGE_EVENT';

AppEmitter.addListener(CHANGE_EVENT, (payload) => {
  console.log(payload); // { message: 'Hello MicroEmitter!' }
});
AppEmitter.emit(CHANGE_EVENT, { message: 'Hello MicroEmitter!' });
```

## Example

### simple and complete example.

```javascript

import MicroEmitter from 'micro-emitter';

const CHANGE_EVENT = 'CHANGE_EVENT';

AppEmitter.addListener(CHANGE_EVENT, (payload) => {
  alert(payload.message);
});

setTimeout(() => {
  AppEmitter.emit(CHANGE_EVENT, { message: 'Hello MicroEmitter!' }});
}, 1000);

```

### example in Flux Store.
Recommend: [MicroStore](https://github.com/khirayama/MicroStore)

```javascript
import MicroEmitter from 'micro-emitter';

const CHANGE_EVENT = 'CHANGE';

class Store extends MicroEmitter {
  constructor() {
    super();
  }
  dispatchChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.addListener(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

class SomeStore extends Store {
  constructor() {
    super();
    this._message = '';
  }
  _create(message) {
    this._message = message;
    this.dispatchChange(); // define Store extened TinyDispatcher.
  }
  getMessage() {
    return this._message;
  }
}
new SomeStore();
```


### if you use React....
Recommend: [MicroStore](https://github.com/khirayama/MicroStore)

Linten Store's events at ```componentDisMount```.

```javascript
class SomeComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Hello World.'
    };
  }
  componentDidMount() {
    SomeStore.addChangeListener(this._onChange.bind(this));
  }
  render() {
    return <div>{this.state.message}</div>;
  }
  _onChange() {
    this.setState({
      message: SomeStore.getMessage()
    });
  }
}
```
