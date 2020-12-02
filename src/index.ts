type Payload = any;
type Listener = any;

export default class MicroEmitter {
  private listeners: { [key: string]: Listener } = {};

  /* Adds a listener function to the specified event. */
  private _addListener(eventType: string, listener: Listener, once?: boolean): MicroEmitter {
    this.listeners[eventType] = this.listeners[eventType] || [];
    this.listeners[eventType].push({ listener, once });
    return this;
  }

  /* Adds a listener function to the specified event. */
  public addListener(eventType: string, listener: Listener): MicroEmitter {
    return this._addListener(eventType, listener, false);
  }

  /* Alias of addListener */
  public on(eventType: string, listener: Listener): MicroEmitter {
    return this.addListener(eventType, listener);
  }

  public addOnceListener(eventType: string, listener: Listener): MicroEmitter {
    return this._addListener(eventType, listener, true);
  }

  /* Alias of addOnceListener */
  public once(eventType: string, listener: Listener): MicroEmitter {
    return this.addOnceListener(eventType, listener);
  }

  /* Removes a listener function to the specified event. */
  public removeListener(eventType: string, listener: Listener): MicroEmitter {
    if (!this.listeners[eventType]) {
      return this;
    }
    if (!this.listeners[eventType].length) {
      return this;
    }
    if (!listener) {
      delete this.listeners[eventType];
      return this;
    }
    this.listeners[eventType] = this.listeners[eventType].filter((_listener) => !(_listener.listener === listener));
    return this;
  }

  /* Alias of removeListener */
  public off(eventType: string, listener: Listener): MicroEmitter {
    return this.removeListener(eventType, listener);
  }

  /*  Emits an specified event. */
  public emit(eventType: string, payload: Payload): MicroEmitter {
    if (!this.listeners[eventType]) {
      return this;
    }
    this.listeners[eventType].forEach((listener: Listener) => {
      listener.listener.apply(this, [payload]);
      if (listener.once) {
        this.removeListener(eventType, listener.listener);
      }
    });
    return this;
  }

  /* Alias of emit */
  public trigger(eventType: string, payload: Payload): MicroEmitter {
    return this.emit(eventType, payload);
  }
}
