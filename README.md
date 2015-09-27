# MicroEmitter
micro event emitter in es6.

### Motivation
I need micro emitter for learning some apps.  
because I make a emitter in 100 lines.

### Getting Started

```
$ npm install micro-emitter
```

```es6.js
import MicroEmitter from 'micro-emitter';

let AppEmitter = new MicroEmitter();
```

```es5.js
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

```es6.js
const CHANGE_EVENT = 'CHANGE_EVENT';

AppEmitter.addListener(CHANGE_EVENT, callbak);
AppEmitter.on(CHANGE_EVENT, callbak);
AppEmitter.addOnceListener(CHANGE_EVENT, callbak); // only first time
AppEmitter.once(CHANGE_EVENT, callbak); // only first time
```

### removeListener(off)

```es6.js
const CHANGE_EVENT = 'CHANGE_EVENT';

AppEmitter.removeListener(CHANGE_EVENT);
AppEmitter.off(CHANGE_EVENT);
```

### emit(trigger)

```es6.js
const CHANGE_EVENT = 'CHANGE_EVENT';

AppEmitter.addListener(CHANGE_EVENT, (payload) => {
  console.log(payload); // { message: 'Hello MicroEmitter!' }
});
AppEmitter.emit(CHANGE_EVENT, { message: 'Hello MicroEmitter!' });
```

## example

### simple and complete example.

```sample.es6.js

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

```flux.es6.js
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

Linten Store's events at ```componentDisMount```.

```Component.es6.js
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
