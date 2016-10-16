export default class MicroEmitter {
  constructor() {
    this._listeners = {};
  }

  /**
   * Adds a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @param {Boolean} once
   */
  _addListener(type, listener, once) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push({listener, once});
    return this;
  }

  /**
   * Adds a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @return {Object} Current instance of MicroEmitter for chaining.
   */
  addListener(type, listener) {
    return this._addListener(type, listener, false);
  }

  /* Alias of addListener */
  on(type, listener) {
    return this.addListener(type, listener);
  }

  addOnceListener(type, listener) {
    return this._addListener(type, listener, true);
  }

  /* Alias of addOnceListener */
  once(type, listener) {
    return this.addOnceListener(type, listener);
  }

  /**
   * Removes a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @return {Object} Current instance of MicroEmitter for chaining.
   */
  removeListener(type, listener) { // alias
    if (!this._listeners[type]) {
      return this;
    }
    if (!this._listeners[type].length) {
      return this;
    }
    if (!listener) {
      delete this._listeners[type];
      return this;
    }
    this._listeners[type] = this._listeners[type].filter(
      _listener => !(_listener.listener === listener)
    );
    return this;
  }

  /* Alias of removeListener */
  off(type, listener) {
    return this.removeListener(type, listener);
  }

  /**
   * Emits an specified event.
   * @param {String} type
   * @param {Object} payload
   * @return {Object} Current instance of MicroEmitter for chaining.
   */
  emit(type, payload) {
    if (!this._listeners[type]) {
      return this;
    }
    this._listeners[type].forEach(_listener => {
      _listener.listener.apply(this, [payload]);
      if (_listener.once) {
        this.removeListener(type, _listener.listener);
      }
    });
    return this;
  }

  /* Alias of emit */
  trigger(type, payload) {
    return this.emit(type, payload);
  }
}
