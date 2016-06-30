# MicroEmitter
[![npm version](https://badge.fury.io/js/micro-emitter.svg)](https://badge.fury.io/js/micro-emitter)
[![CircleCI Status](https://img.shields.io/circleci/project/khirayama/micro-emitter/master.svg?style=flat&label=circle)](https://circleci.com/gh/khirayama/micro-emitter)  
micro event emitter in es6.

## Motivation
I want simple emitter for my apps I created.  
For that reason, I made independent emitter in 100 lines.

## Getting Started

```
$ npm install micro-emitter
```

```javascript
import MicroEmitter from 'micro-emitter';

let appEmitter = new MicroEmitter();
```

```javascript
var MicroEmitter = require('micro-emitter');

var appEmitter = new MicroEmitter();
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

appEmitter.addListener(CHANGE_EVENT, callbak);
appEmitter.on(CHANGE_EVENT, callbak);
appEmitter.addOnceListener(CHANGE_EVENT, callbak); // only first time
appEmitter.once(CHANGE_EVENT, callbak); // only first time
```

### removeListener(off)

```javascript
const CHANGE_EVENT = 'CHANGE_EVENT';

appEmitter.removeListener(CHANGE_EVENT);
appEmitter.off(CHANGE_EVENT);
```

### emit(trigger)

```javascript
const CHANGE_EVENT = 'CHANGE_EVENT';

appEmitter.addListener(CHANGE_EVENT, (payload) => {
  console.log(payload); // { message: 'Hello MicroEmitter!' }
});
appEmitter.emit(CHANGE_EVENT, { message: 'Hello MicroEmitter!' });
```

## Example

### simple and complete example.

```javascript

import MicroEmitter from 'micro-emitter';

const CHANGE_EVENT = 'CHANGE_EVENT';

appEmitter.addListener(CHANGE_EVENT, (payload) => {
  alert(payload.message);
});

setTimeout(() => {
  appEmitter.emit(CHANGE_EVENT, { message: 'Hello MicroEmitter!' }});
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
    this.dispatchChange(); // define Store extened MicroEmitter.
  }
  getMessage() {
    return this._message;
  }
}
new SomeStore();
```


### if use React....(like micro flux)
Ref: https://jsfiddle.net/reactjs/69z2wepo/

```javascript
class CountComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.emitter = new MicroEmitter();
  }
  componentDidMount() {
    this.emitter.on('increment', this.countUp.bind(this));
    this.emitter.on('decrement', this.countDown.bind(this));
  }
  countUp(count) {
    this.setState({
      count: this.state.count + count,
    });
  }
  countDown(count) {
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
  return <div onClick={() => props.emitter.emit('increment', 1)}>+1</div>;
}

function CountDownButton(props) {
  return <div onClick={() => props.emitter.emit('decrement', 1)}>-1</div>;
}
```
