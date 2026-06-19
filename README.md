# SkyRoute ✈️ — Premium Flight Booking, Smart Layovers & Secure Passenger Dashboard

SkyRoute is a state-of-the-art flight booking and routing Single Page Application (SPA) built using vanilla web technologies. It combines high-end visual excellence (frosted glassmorphism, warm off-white tones, premium geometric typography, and micro-animations) with robust backend logic powered by **Firebase (Google Auth & Cloud Firestore)** and a mock local persistence layer.

---

## ✨ Features

### 🛫 Smart & Intuitive Search
- Instantly search routes between global airport hubs (DEL, BOM, DXB, SIN, LHR, JFK, etc.).
- Responsive passenger counter and min/max date controls.
- Seamless search state preservation across page routes.

### 🏨 Smart Layover Hotel Detection
- Programmatic detection of long transit connections (layovers $\ge$ 4 hours).
- Automatically queries and displays hotel availability (name, distance, price, rating, and description) inside the vertical timeline.

### 🔒 Login Wall & Google Authentication
- Glassmorphic modal blockages intercept unauthenticated search or booking requests.
- Integrated official **Firebase Google Auth** with a custom **Google Account Chooser dialog** fallback for local/offline testing.

### 🛂 Passenger Onboarding & Identity Masking
- Sleek profile setup dashboard collecting Age, Passport Number, and PAN Number.
- High-security minimalist layouts with mask-string formatting (`Z1 • • • • • 03`) and an eye-icon toggle to dynamically show/hide sensitive credentials.

### ✈️ Massive 1,200+ Flight Seeder
- A programmatic generator in `js/mockData.js` that seeds 1,200+ flights dynamically on load, ensuring all paired routes are fully populated across multiple booking classes (Economy, Premium Economy, Business, First Class) and airlines.

---

## 📂 Project Structure

```
e:\Flight\
├── index.html            # Main SPA entry point
├── firestore.rules       # Strict database security rules
├── README.md             # Project documentation
├── server.ps1            # Lightweight dev server launcher
├── css/
│   ├── design-system.css # HSL color variables, grain texture, organic blobs
│   ├── animations.css    # Staggered entry transitions, pulse effects, custom cursor
│   ├── components.css    # Glassmorphism search bars, auth modals, Googlechooser popups
│   └── pages.css         # Onboarding, profile, results, details and timeline pages
├── js/
│   ├── app.js            # App boots, registers router mapping, and route guards
│   ├── router.js         # Hash-based client-side router with transitions
│   ├── store.js          # Reactive state store with SessionStorage sync
│   ├── firebase.js       # Firebase SDK & mock local persistence integration layer
│   ├── mockData.js       # Static data structure + 1,200+ Flight Seeder script
│   ├── pages/
│   │   ├── home.js
│   │   ├── flightResults.js
│   │   ├── flightDetails.js
│   │   ├── booking.js
│   │   ├── dashboard.js
│   │   ├── onboarding.js
│   │   └── profile.js
│   └── components/
│       ├── navbar.js
│       ├── aiAssistant.js
│       ├── cursor.js
│       └── scrollReveal.js
```

---

## ⚡ Quick Start

### 1. Run Locally
Execute the dev server script to launch the app locally:
```powershell
./server.ps1
```
Open `http://localhost:8080` in your web browser.

### 2. Configure Firebase (Production)
To move from local mock database storage to production Firebase, open `js/firebase.js` and update the config with your credentials:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```
The application will automatically detect the configuration change, switch from mock mode to the real Firebase SDK, and link up Google Authentication and Cloud Firestore!

### 3. Deploy Firestore Security Rules
Upload the security rules defined in `firestore.rules` to ensure passport and PAN details are accessible only by the owner:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /bookings/{bookingId} {
      allow read, update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 🎨 Design Guidelines & Aesthetics
- **Color Palette**: Off-white (#FDFCF8), Sage Green, Soft Coral, and Lavender accents.
- **Typography**: Heavy Outfit sans-serif headings paired with organic handwritten accents.
- **Grain & Depth**: CSS noise textures and backdrop blur (`backdrop-filter`) creating glassmorphic depth.
