export type Listener = (this: MicroEmitter, payload?: any) => unknown;

interface RegisteredListener {
  listener: Listener;
  once: boolean;
  invoked: boolean;
}

export default class MicroEmitter {
  private readonly listeners: Record<string, RegisteredListener[]> = Object.create(null) as Record<
    string,
    RegisteredListener[]
  >;

  private registerListener(eventType: string, listener: Listener, once: boolean): this {
    const registeredListeners = this.listeners[eventType] ?? [];
    registeredListeners.push({ listener, once, invoked: false });
    this.listeners[eventType] = registeredListeners;
    return this;
  }

  private removeRegisteredListener(eventType: string, registeredListener: RegisteredListener): void {
    const registeredListeners = this.listeners[eventType];

    if (!registeredListeners) {
      return;
    }

    const index = registeredListeners.indexOf(registeredListener);
    if (index !== -1) {
      registeredListeners.splice(index, 1);
    }

    if (registeredListeners.length === 0) {
      delete this.listeners[eventType];
    }
  }

  /** Adds a listener to an event. */
  public addListener(eventType: string, listener: Listener): this {
    return this.registerListener(eventType, listener, false);
  }

  /** Alias of addListener. */
  public on(eventType: string, listener: Listener): this {
    return this.addListener(eventType, listener);
  }

  /** Adds a listener that is removed before its first invocation. */
  public addOnceListener(eventType: string, listener: Listener): this {
    return this.registerListener(eventType, listener, true);
  }

  /** Alias of addOnceListener. */
  public once(eventType: string, listener: Listener): this {
    return this.addOnceListener(eventType, listener);
  }

  /** Removes matching listeners, or every listener for the event when omitted. */
  public removeListener(eventType: string, listener?: Listener): this {
    const registeredListeners = this.listeners[eventType];

    if (!registeredListeners) {
      return this;
    }

    if (!listener) {
      delete this.listeners[eventType];
      return this;
    }

    const remainingListeners = registeredListeners.filter((registered) => registered.listener !== listener);
    if (remainingListeners.length === 0) {
      delete this.listeners[eventType];
    } else {
      this.listeners[eventType] = remainingListeners;
    }

    return this;
  }

  /** Alias of removeListener. */
  public off(eventType: string, listener?: Listener): this {
    return this.removeListener(eventType, listener);
  }

  /** Emits an event to a snapshot of its current listeners. */
  public emit<T = any>(eventType: string, payload?: T): this {
    const registeredListeners = this.listeners[eventType];

    if (!registeredListeners) {
      return this;
    }

    for (const registeredListener of [...registeredListeners]) {
      if (registeredListener.once) {
        if (registeredListener.invoked) {
          continue;
        }

        registeredListener.invoked = true;
        this.removeRegisteredListener(eventType, registeredListener);
      }

      registeredListener.listener.call(this, payload);
    }

    return this;
  }

  /** Alias of emit. */
  public trigger<T = any>(eventType: string, payload?: T): this {
    return this.emit(eventType, payload);
  }
}
