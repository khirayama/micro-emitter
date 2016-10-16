# MicroEmitter
[![npm version](https://badge.fury.io/js/micro-emitter.svg)](https://badge.fury.io/js/micro-emitter)
[![CircleCI Status](https://img.shields.io/circleci/project/khirayama/micro-emitter/master.svg?style=flat&label=circle)](https://circleci.com/gh/khirayama/micro-emitter)  
micro event emitter in es6.

## Motivation
I want simple emitter for my apps I created. For that reason, I made independent emitter in 100 lines.

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

- addListener(on)
- addOnceListener(once)
- removeLister(off)
- emit(trigger)


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

emitter.addListener(CHANGE_EVENT, (payload) => {
  alert(payload.message);
});

setTimeout(() => {
  emitter.emit(CHANGE_EVENT, { message: 'Hello MicroEmitter!' }});
}, 1000);

```

### example in flux.

```javascript
import MicroEmitter from 'micro-emitter';

const CHANGE_EVENT = '__CHANGE_EVENT';

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

class MessageStore extends Store {
  constructor() {
    super();
    this._messages = [];
  }
  _create(message) {
    this._messages.push(message);
    this.dispatchChange(); // define Store extened MicroEmitter.
  }
  getMessages() {
    return this._messages;
  }
}
new MessageStore();
```


### example in micro flux with React.

```javascript
class CountComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.emitter = new MicroEmitter();

    this.countUp = this._countUp.bind(this);
    this.countDown = this._countDown.bind(this);
  }
  componentDidMount() {
    this.emitter.on('increment', this.countUp);
    this.emitter.on('decrement', this.countDown);
  }
  _countUp(count = 1) {
    this.setState({
      count: this.state.count + count,
    });
  }
  _countDown(count = 1) {
    this.setState({
      count: this.state.count - count,
    });
  }
  render() {
    return (
    	<section>
      	<div>{this.state.count}</div>
      	<CountUpButton emitter={this.emitter}></CountUpButton>
      	<CountDownButton emitter={this.emitter}></CountDownButton>
      </section>
    );
  }
}

function CountUpButton(props) {
  return <div onClick={() => props.emitter.emit('increment')}>+1</div>;
}

function CountDownButton(props) {
  return <div onClick={() => props.emitter.emit('decrement')}>-1</div>;
}
```
