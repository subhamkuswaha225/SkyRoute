/* ============================================================
   SkyRoute State Store
   Simple reactive state management with pub/sub
   ============================================================ */

class Store {
  constructor() {
    this.state = {
      searchParams: {
        origin: '',
        destination: '',
        date: '',
        passengers: 1
      },
      selectedFlight: null,
      currentUser: null,
      bookings: [],
      filters: {
        airlines: [],
        stops: null,
        priceRange: [0, 100000],
        sortBy: 'price'
      },
      isAuthenticated: false
    };
    
    this.listeners = {};
    this.loadFromSession();
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;
    this.saveToSession();
    this.emit(key, value, oldValue);
  }

  update(key, updater) {
    const oldValue = this.state[key];
    const newValue = typeof updater === 'function' ? updater(oldValue) : { ...oldValue, ...updater };
    this.state[key] = newValue;
    this.saveToSession();
    this.emit(key, newValue, oldValue);
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, newValue, oldValue) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(newValue, oldValue));
    }
    // Also emit a wildcard event
    if (this.listeners['*']) {
      this.listeners['*'].forEach(cb => cb(event, newValue, oldValue));
    }
  }

  saveToSession() {
    try {
      const serializable = {
        searchParams: this.state.searchParams,
        selectedFlight: this.state.selectedFlight,
        filters: this.state.filters,
        isAuthenticated: this.state.isAuthenticated
      };
      sessionStorage.setItem('skyroute_state', JSON.stringify(serializable));
    } catch (e) {
      // SessionStorage might be unavailable
    }
  }

  loadFromSession() {
    try {
      const saved = sessionStorage.getItem('skyroute_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  // Initialize with mock user data
  initMockUser() {
    this.set('currentUser', MOCK_USER);
    this.set('bookings', MOCK_USER.bookings);
    this.set('isAuthenticated', true);
  }

  reset() {
    sessionStorage.removeItem('skyroute_state');
    this.state.searchParams = { origin: '', destination: '', date: '', passengers: 1 };
    this.state.selectedFlight = null;
    this.state.filters = { airlines: [], stops: null, priceRange: [0, 100000], sortBy: 'price' };
  }
}

// Global store instance
const store = new Store();
