/* ============================================================
   SkyRoute Firebase Configuration & Data Access Layer
   Graceful fallback to mock localStorage database when offline
   ============================================================ */

// Replace these with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyC5Ml4ZfjU-RgXNdI0GDDqNtkgOHBH_BXU",
  authDomain: "skyroute-cdc44.firebaseapp.com",
  projectId: "skyroute-cdc44",
  storageBucket: "skyroute-cdc44.firebasestorage.app",
  messagingSenderId: "563463382599",
  appId: "1:563463382599:web:f963b3596e1234644ff362",
  measurementId: "G-6DVE0HEFD2"
};

let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;
let isFirebaseConfigured = false;

// Initialize Firebase (only if real credentials are provided)
function initFirebase() {
  try {
    if (firebaseConfig.apiKey === "YOUR_API_KEY") {
      console.info('🔥 Firebase: Running with mock data (no Firebase credentials configured)');
      isFirebaseConfigured = false;
      return;
    }

    if (typeof firebase !== 'undefined') {
      firebaseApp = firebase.initializeApp(firebaseConfig);
      firebaseAuth = firebase.auth();
      firebaseDb = firebase.firestore();
      isFirebaseConfigured = true;
      console.info('🔥 Firebase: Connected successfully');
      
      // Listen for auth changes
      firebaseAuth.onAuthStateChanged(async user => {
        if (user) {
          const profile = await db.getUserProfile(user.uid);
          store.set('currentUser', {
            id: user.uid,
            name: user.displayName || 'Traveler',
            email: user.email,
            avatar: user.photoURL,
            profile: profile
          });
          store.set('isAuthenticated', true);
        } else {
          store.set('currentUser', null);
          store.set('isAuthenticated', false);
        }
      });
    }
  } catch (error) {
    console.warn('Firebase initialization failed, using mock data:', error);
    isFirebaseConfigured = false;
  }
}

// User sign-in post-processing (onboarding checker)
async function handleUserLogin(user) {
  const profile = await db.getUserProfile(user.uid);
  const updatedUser = {
    id: user.uid,
    name: user.displayName || 'Traveler',
    email: user.email,
    avatar: user.photoURL,
    profile: profile
  };
  store.set('currentUser', updatedUser);
  store.set('isAuthenticated', true);
  
  // Sync the bookings in store for mock mode
  if (!isFirebaseConfigured) {
    const bookings = await db.getUserBookings(user.uid);
    store.set('bookings', bookings);
  }

  // Check if onboarding is completed
  if (!profile) {
    // First-time login: redirect to complete profile onboarding
    router.navigate('/onboarding');
  } else {
    // Existing user: execute pending action or redirect to dashboard/profile
    const pending = store.get('pendingAction');
    if (pending) {
      store.set('pendingAction', null);
      if (typeof pending === 'function') {
        pending();
      } else if (typeof pending === 'string') {
        router.navigate(pending);
      }
    } else {
      router.navigate('/profile');
    }
  }
}

// Auth helpers
const auth = {
  async signInWithGoogle() {
    if (!isFirebaseConfigured) {
      // Mock Google Auth Popup Flow
      const mockUser = await showMockGoogleAuthPopup();
      await handleUserLogin(mockUser);
      return mockUser;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebaseAuth.signInWithPopup(provider);
    await handleUserLogin(result.user);
    return result.user;
  },

  async signOut() {
    if (!isFirebaseConfigured) {
      store.set('currentUser', null);
      store.set('bookings', []);
      store.set('isAuthenticated', false);
      router.navigate('/');
      return;
    }
    await firebaseAuth.signOut();
    store.set('currentUser', null);
    store.set('bookings', []);
    store.set('isAuthenticated', false);
    router.navigate('/');
  },

  getCurrentUser() {
    if (!isFirebaseConfigured) {
      return store.get('currentUser');
    }
    return firebaseAuth?.currentUser;
  }
};

// Database helpers
const db = {
  // Get user profile details
  async getUserProfile(userId) {
    if (!isFirebaseConfigured) {
      const mockProfile = localStorage.getItem(`skyroute_profile_${userId}`);
      // Fallback for MOCK_USER (Aryan) profile details
      if (!mockProfile && userId === 'MOCK_UID_ARYAN.SHARMA') {
        const aryanProfile = {
          age: 26,
          passportNumber: 'Z8765432',
          panNumber: 'ABCDE1234F',
          aboutMe: 'Avid traveler, design lover, and technology explorer.'
        };
        localStorage.setItem(`skyroute_profile_${userId}`, JSON.stringify(aryanProfile));
        return aryanProfile;
      }
      return mockProfile ? JSON.parse(mockProfile) : null;
    }
    const doc = await firebaseDb.collection('users').doc(userId).get();
    return doc.exists ? doc.data() : null;
  },

  // Save user profile details
  async saveUserProfile(userId, profileData) {
    if (!isFirebaseConfigured) {
      localStorage.setItem(`skyroute_profile_${userId}`, JSON.stringify(profileData));
      // Update store currentUser
      const currentUser = store.get('currentUser') || {};
      store.set('currentUser', { ...currentUser, profile: profileData });
      return profileData;
    }
    await firebaseDb.collection('users').doc(userId).set(profileData, { merge: true });
    // Update store currentUser
    const currentUser = store.get('currentUser') || {};
    store.set('currentUser', { ...currentUser, profile: profileData });
    return profileData;
  },

  async getFlights(origin, destination) {
    if (!isFirebaseConfigured) {
      return searchFlights(origin, destination);
    }
    const snapshot = await firebaseDb.collection('flights')
      .where('origin', '==', origin)
      .where('destination', '==', destination)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getFlightById(id) {
    if (!isFirebaseConfigured) {
      return getFlightById(id);
    }
    const doc = await firebaseDb.collection('flights').doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async getHotels(airportCode) {
    if (!isFirebaseConfigured) {
      return getHotelsByAirport(airportCode);
    }
    const snapshot = await firebaseDb.collection('hotels')
      .where('airport', '==', airportCode)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createBooking(bookingData) {
    if (!isFirebaseConfigured) {
      const newBooking = {
        id: 'BK' + Date.now(),
        ...bookingData,
        status: 'upcoming',
        bookedAt: new Date().toISOString(),
        pnr: generatePNR()
      };
      
      const key = `skyroute_bookings_${bookingData.userId || 'GUEST'}`;
      const savedBookings = JSON.parse(localStorage.getItem(key) || '[]');
      const updated = [...savedBookings, newBooking];
      localStorage.setItem(key, JSON.stringify(updated));
      
      store.set('bookings', updated);
      return newBooking;
    }
    const docRef = await firebaseDb.collection('bookings').add(bookingData);
    return { id: docRef.id, ...bookingData };
  },

  async getUserBookings(userId) {
    if (!isFirebaseConfigured) {
      const key = `skyroute_bookings_${userId}`;
      let bookings = localStorage.getItem(key);
      if (!bookings) {
        // Mock bookings for Aryan Sharma
        if (userId === 'MOCK_UID_ARYAN.SHARMA') {
          const initialBookings = MOCK_USER.bookings.map(b => ({ ...b, userId }));
          localStorage.setItem(key, JSON.stringify(initialBookings));
          return initialBookings;
        }
        return [];
      }
      return JSON.parse(bookings);
    }
    const snapshot = await firebaseDb.collection('bookings')
      .where('userId', '==', userId)
      .orderBy('bookedAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

/* ============================================================
   Mock Google Account Chooser Dialog
   ============================================================ */
function showMockGoogleAuthPopup() {
  return new Promise((resolve, reject) => {
    if (document.getElementById('mock-google-popup')) return;

    const popupHtml = `
      <div id="mock-google-popup" class="mock-google-backdrop">
        <div class="mock-google-card">
          <div class="mock-google-header">
            <svg class="google-logo" viewBox="0 0 24 24" width="24" height="24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <h2 class="mock-google-title">Sign in with Google</h2>
            <p class="mock-google-subtitle">to continue to <strong>SkyRoute</strong></p>
          </div>
          
          <div class="mock-google-accounts">
            <div class="mock-google-account-item" data-email="aryan.sharma@gmail.com" data-name="Aryan Sharma">
              <div class="account-avatar">A</div>
              <div class="account-details">
                <span class="account-name">Aryan Sharma</span>
                <span class="account-email">aryan.sharma@gmail.com</span>
              </div>
            </div>
            <div class="mock-google-account-item" data-email="guest.traveler@gmail.com" data-name="Guest Traveler">
              <div class="account-avatar" style="background-color: var(--color-sage-rich);">G</div>
              <div class="account-details">
                <span class="account-name">Guest Traveler</span>
                <span class="account-email">guest.traveler@gmail.com</span>
              </div>
            </div>
            <div class="mock-google-account-item" data-email="new.traveler@gmail.com" data-name="New Traveler">
              <div class="account-avatar" style="background-color: var(--color-coral);">N</div>
              <div class="account-details">
                <span class="account-name">New Traveler (Needs Onboarding)</span>
                <span class="account-email">new.traveler@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div class="mock-google-footer">
            <span>English (United States)</span>
            <button class="mock-google-cancel-btn" id="mock-google-cancel">Cancel</button>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = popupHtml;
    document.body.appendChild(div.firstElementChild);

    // Setup click handlers
    const popupEl = document.getElementById('mock-google-popup');
    const items = popupEl.querySelectorAll('.mock-google-account-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const email = item.getAttribute('data-email');
        const name = item.getAttribute('data-name');
        const uid = 'MOCK_UID_' + email.split('@')[0].toUpperCase();
        
        popupEl.classList.add('fade-out');
        setTimeout(() => {
          popupEl.remove();
          resolve({
            uid: uid,
            displayName: name,
            email: email,
            photoURL: null
          });
        }, 300);
      });
    });

    document.getElementById('mock-google-cancel').addEventListener('click', () => {
      popupEl.classList.add('fade-out');
      setTimeout(() => {
        popupEl.remove();
        reject(new Error('Google sign-in cancelled'));
      }, 300);
    });
  });
}
