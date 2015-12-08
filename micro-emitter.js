(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MicroEmitter = (function () {
  function MicroEmitter() {
    _classCallCheck(this, MicroEmitter);

    this._listeners = {};
  }

  /**
   * Adds a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @param {Boolean} once
   */

  _createClass(MicroEmitter, [{
    key: '_addListener',
    value: function _addListener(type, listener, once) {
      this._listeners[type] = this._listeners[type] || [];
      this._listeners[type].push({ listener: listener, once: once });
      return this;
    }

    /**
     * Adds a listener function to the specified event.
     * @param {String} type
     * @param {Function} listener
     * @return {Object} Current instance of MicroEmitter for chaining.
     */
  }, {
    key: 'addListener',
    value: function addListener(type, listener) {
      return this._addListener(type, listener, false);
    }

    /* Alias of addListener */
  }, {
    key: 'on',
    value: function on(type, listener) {
      return this.addListener(type, listener);
    }
  }, {
    key: 'addOnceListener',
    value: function addOnceListener(type, listener) {
      return this._addListener(type, listener, true);
    }

    /* Alias of addOnceListener */
  }, {
    key: 'once',
    value: function once(type, listener) {
      return this.addOnceListener(type, listener);
    }

    /**
     * Removes a listener function to the specified event.
     * @param {String} type
     * @param {Function} listener
     * @return {Object} Current instance of MicroEmitter for chaining.
     */
  }, {
    key: 'removeListener',
    value: function removeListener(type, listener) {
      // alias
      var isRemoved = false;

      if (!this._listeners[type].length) return this;
      if (!listener) {
        delete this._listeners[type];
        return this;
      }
      for (var index = 0; index < this._listeners[type].length; index++) {
        if (this._listeners[type][index].listener === listener) {
          this._listeners[type].splice(index, 1);
          index--;
          isRemoved = true;
        }
      }
      if (!isRemoved) console.warn('not registered this listener.');
      return this;
    }

    /* Alias of removeListener */
  }, {
    key: 'off',
    value: function off(type, listener) {
      return this.removeListener(type, listener);
    }

    /**
     * Emits an specified event.
     * @param {String} type
     * @param {Object} payload
     * @return {Object} Current instance of MicroEmitter for chaining.
     */
  }, {
    key: 'emit',
    value: function emit(type, payload) {
      if (!this._listeners[type]) return this;
      for (var index = 0; index < this._listeners[type].length; index++) {
        this._listeners[type][index].listener.apply(this, [payload]);
        if (this._listeners[type][index].once) {
          this.removeListener(type, this._listeners[type][index].listener);
          index--;
        }
      }
      return this;
    }

    /* Alias of emit */
  }, {
    key: 'trigger',
    value: function trigger(type, payload) {
      return this.emit(type, payload);
    }
  }]);

  return MicroEmitter;
})();

exports['default'] = MicroEmitter;
module.exports = exports['default'];
},{}]},{},[1]);
