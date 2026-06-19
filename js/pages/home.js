/* ============================================================
   SkyRoute Home Page
   Hero section, search bar, destinations, stats, features
   ============================================================ */

function renderHomePage() {
  const today = new Date().toISOString().split('T')[0];
  
  return `
    <div class="page home-page">
      <!-- Hero Section -->
      <section class="home-hero grain-overlay">
        <div class="organic-shapes">
          <div class="organic-blob organic-blob--coral" style="top: 10%; left: -5%;"></div>
          <div class="organic-blob organic-blob--sage" style="top: 50%; right: -10%;"></div>
          <div class="organic-blob organic-blob--lavender" style="bottom: 5%; left: 30%;"></div>
        </div>
        
        <div class="home-hero-content reveal">
          <div class="home-hero-eyebrow">your journey begins here ✦</div>
          <h1 class="home-hero-title">
            Find Your<br><span>SkyRoute</span>
          </h1>
          <p class="home-hero-subtitle">
            Discover seamless flights, smart layover recommendations, and premium travel experiences — all in one place.
          </p>
        </div>

        <div class="home-search-section reveal" style="transition-delay: 200ms;">
          <div class="search-bar" id="home-search-bar">
            <div class="search-field">
              <label class="search-field-label">From</label>
              <select class="search-field-input" id="search-origin">
                <option value="">Select origin</option>
                ${Object.values(AIRPORTS).map(a => 
                  `<option value="${a.code}">${a.city} (${a.code})</option>`
                ).join('')}
              </select>
            </div>
            <div class="search-divider"></div>
            <div class="search-field">
              <label class="search-field-label">To</label>
              <select class="search-field-input" id="search-dest">
                <option value="">Select destination</option>
                ${Object.values(AIRPORTS).map(a => 
                  `<option value="${a.code}">${a.city} (${a.code})</option>`
                ).join('')}
              </select>
            </div>
            <div class="search-divider"></div>
            <div class="search-field">
              <label class="search-field-label">Date</label>
              <input type="date" class="search-field-input" id="search-date" value="${today}" min="${today}">
            </div>
            <div class="search-divider"></div>
            <div class="search-field">
              <label class="search-field-label">Passengers</label>
              <div class="passenger-counter">
                <button class="counter-btn" onclick="updatePassengers(-1)" id="pass-dec">−</button>
                <span class="counter-value" id="pass-count">1</span>
                <button class="counter-btn" onclick="updatePassengers(1)" id="pass-inc">+</button>
              </div>
            </div>
            <button class="search-btn" onclick="handleSearch()" id="search-submit" aria-label="Search flights">
              ✈
            </button>
          </div>
        </div>
      </section>

      <!-- Popular Destinations -->
      <section class="home-destinations container">
        <div class="home-section-header reveal">
          <div>
            <span class="home-section-accent">explore the world ✦</span>
            <h2 class="home-section-title">Popular Destinations</h2>
          </div>
          <a href="#/flights?origin=DEL&dest=GOI" class="btn btn-ghost btn-sm">View All →</a>
        </div>
        <div class="dest-grid reveal-stagger">
          ${POPULAR_DESTINATIONS.map((dest, i) => `
            <div class="reveal" style="transition-delay: ${i * 100}ms;">
              <a href="#/flights?origin=DEL&dest=${dest.code}" class="dest-card" style="display:block; height: ${i === 0 ? '100%' : '280px'};">
                <div class="dest-card-image" style="width:100%;height:100%;background: ${getDestGradient(i)}; display:flex;align-items:center;justify-content:center;">
                  <span style="font-size: ${i === 0 ? '5rem' : '3.5rem'}; filter: grayscale(80%); transition: filter 0.8s ease;">${getDestEmoji(dest.city)}</span>
                </div>
                <div class="dest-card-overlay">
                  <div class="dest-card-city">${dest.city}</div>
                  <div class="dest-card-tagline">${dest.tagline}</div>
                  <div class="dest-card-price">From ${formatPrice(dest.priceFrom)}</div>
                </div>
              </a>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Stats -->
      <section class="home-stats container">
        <div class="home-stats-grid reveal-stagger">
          <div class="stat-counter reveal">
            <div class="stat-number" data-count="250">250+</div>
            <div class="stat-label">Routes Worldwide</div>
          </div>
          <div class="stat-counter reveal" style="transition-delay: 100ms;">
            <div class="stat-number" data-count="50">50+</div>
            <div class="stat-label">Airlines Partners</div>
          </div>
          <div class="stat-counter reveal" style="transition-delay: 200ms;">
            <div class="stat-number" data-count="15000">15K+</div>
            <div class="stat-label">Happy Travelers</div>
          </div>
          <div class="stat-counter reveal" style="transition-delay: 300ms;">
            <div class="stat-number" data-count="98">98%</div>
            <div class="stat-label">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="home-features container">
        <div class="home-section-header reveal">
          <div>
            <span class="home-section-accent">why choose us ✦</span>
            <h2 class="home-section-title">The SkyRoute Difference</h2>
          </div>
        </div>
        <div class="features-grid reveal-stagger">
          <div class="feature-card reveal">
            <div class="feature-icon feature-icon--coral">🧠</div>
            <h3 class="feature-title">Smart Layovers</h3>
            <p class="feature-desc">Our AI detects long layovers and automatically recommends nearby hotels so you can rest in comfort.</p>
          </div>
          <div class="feature-card reveal" style="transition-delay: 100ms;">
            <div class="feature-icon feature-icon--sage">💎</div>
            <h3 class="feature-title">Premium Experience</h3>
            <p class="feature-desc">Every interaction is designed with care. From search to boarding — feel the luxury at every step.</p>
          </div>
          <div class="feature-card reveal" style="transition-delay: 200ms;">
            <div class="feature-icon feature-icon--lavender">🔒</div>
            <h3 class="feature-title">Secure Booking</h3>
            <p class="feature-desc">Your data is protected with enterprise-grade security. Book with confidence, travel with peace.</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      ${renderFooter()}
    </div>
  `;
}

function getDestGradient(index) {
  const gradients = [
    'linear-gradient(135deg, #FFB7B2 0%, #FFA07A 50%, #FF7F50 100%)',
    'linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #1E90FF 100%)',
    'linear-gradient(135deg, #98FB98 0%, #3CB371 50%, #2E8B57 100%)',
    'linear-gradient(135deg, #DDA0DD 0%, #BA55D3 50%, #8B008B 100%)',
    'linear-gradient(135deg, #F0E68C 0%, #DAA520 50%, #B8860B 100%)',
    'linear-gradient(135deg, #E8EFE8 0%, #87CEEB 50%, #4169E1 100%)'
  ];
  return gradients[index % gradients.length];
}

function getDestEmoji(city) {
  const emojis = {
    'Goa': '🏖️',
    'Dubai': '🏙️',
    'Singapore': '🌆',
    'London': '🎡',
    'Bangkok': '🏯',
    'New York': '🗽'
  };
  return emojis[city] || '✈️';
}

let passengerCount = 1;

function updatePassengers(delta) {
  passengerCount = Math.max(1, Math.min(9, passengerCount + delta));
  const el = document.getElementById('pass-count');
  if (el) el.textContent = passengerCount;
  
  const decBtn = document.getElementById('pass-dec');
  const incBtn = document.getElementById('pass-inc');
  if (decBtn) decBtn.disabled = passengerCount <= 1;
  if (incBtn) incBtn.disabled = passengerCount >= 9;
}

function handleSearch() {
  const origin = document.getElementById('search-origin')?.value;
  const dest = document.getElementById('search-dest')?.value;
  const date = document.getElementById('search-date')?.value;

  if (!origin) {
    showToast('⚠️ Please select an origin city');
    return;
  }
  if (!dest) {
    showToast('⚠️ Please select a destination');
    return;
  }
  if (origin === dest) {
    showToast('⚠️ Origin and destination cannot be the same');
    return;
  }

  // Save to store
  store.set('searchParams', { origin, destination: dest, date, passengers: passengerCount });
  
  const searchPath = `/flights?origin=${origin}&dest=${dest}&date=${date || ''}&passengers=${passengerCount}`;

  // If not authenticated, block with Login Wall
  if (!store.get('isAuthenticated')) {
    store.set('pendingAction', () => router.navigate(searchPath));
    showAuthModal('Sign in with Google to view detailed routes');
    return;
  }

  // Navigate to results
  router.navigate(searchPath);
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">✈ SkyRoute</div>
            <p class="footer-desc">Your premium flight companion. Smart search, seamless bookings, and personalized travel experiences.</p>
          </div>
          <div>
            <div class="footer-title">Explore</div>
            <a href="#/" class="footer-link">Home</a>
            <a href="#/flights?origin=DEL&dest=BOM" class="footer-link">Flights</a>
            <a href="#/dashboard" class="footer-link">Dashboard</a>
          </div>
          <div>
            <div class="footer-title">Popular Routes</div>
            <a href="#/flights?origin=DEL&dest=BOM" class="footer-link">Delhi → Mumbai</a>
            <a href="#/flights?origin=DEL&dest=GOI" class="footer-link">Delhi → Goa</a>
            <a href="#/flights?origin=BOM&dest=DXB" class="footer-link">Mumbai → Dubai</a>
            <a href="#/flights?origin=DEL&dest=LHR" class="footer-link">Delhi → London</a>
          </div>
          <div>
            <div class="footer-title">Support</div>
            <a href="#" class="footer-link">Help Center</a>
            <a href="#" class="footer-link">Contact Us</a>
            <a href="#" class="footer-link">Privacy Policy</a>
            <a href="#" class="footer-link">Terms of Service</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 SkyRoute. All rights reserved.</span>
          <span>Made with ♡ for modern travelers</span>
        </div>
      </div>
    </footer>
  `;
}
