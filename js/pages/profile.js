/* ============================================================
   SkyRoute Profile Page
   Elegantly displays profile details and saved/booked flights
   ============================================================ */

let isSensitiveVisible = false;

function renderProfilePage(params) {
  const user = store.get('currentUser');
  if (!user) return '';
  
  isSensitiveVisible = false; // Reset toggle on load

  // Load bookings asynchronously
  setTimeout(loadProfileBookings, 50);

  return `
    <div class="page profile-page">
      <div class="container">
        <!-- Top Greeting -->
        <div class="profile-header reveal">
          <div class="profile-greeting">
            <div class="profile-avatar-large">
              ${user.avatar ? `<img src="${user.avatar}" alt="Avatar">` : (user.name?.charAt(0) || 'U')}
            </div>
            <div>
              <h1 class="profile-name">${user.name}</h1>
              <p class="profile-email">${user.email}</p>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" id="profile-toggle-btn" onclick="toggleSensitiveDetails()">
            👁️ Show Sensitive Info
          </button>
        </div>

        <!-- Layout: Profile details + Bookings -->
        <div class="profile-layout">
          <!-- Profile Card -->
          <div class="profile-details-card reveal">
            <h3 class="profile-card-title">🪪 Identity Information</h3>
            <div class="profile-info-grid">
              <div class="profile-info-item">
                <span class="profile-info-label">Age</span>
                <span class="profile-info-value">${user.profile?.age || 'N/A'}</span>
              </div>
              <div class="profile-info-item">
                <span class="profile-info-label">Passport Number</span>
                <span class="profile-info-value" id="profile-passport-val">${maskString(user.profile?.passportNumber)}</span>
              </div>
              <div class="profile-info-item">
                <span class="profile-info-label">PAN Number</span>
                <span class="profile-info-value" id="profile-pan-val">${maskString(user.profile?.panNumber)}</span>
              </div>
            </div>
            <div style="margin-top: var(--space-xl);">
              <span class="profile-info-label">About Me</span>
              <p class="profile-bio">${user.profile?.aboutMe || 'No bio provided. Customize your details below.'}</p>
            </div>
            <button class="btn btn-sm btn-ghost" style="margin-top: var(--space-lg); width: 100%; border-color: var(--color-lavender-deep);" onclick="router.navigate('/onboarding')">
              ✏️ Edit Profile Details
            </button>
          </div>

          <!-- Booked Flights Section -->
          <div class="profile-bookings-section">
            <h2 class="profile-section-title">🎫 Your Booked Flights</h2>
            <div id="profile-bookings-list">
              <div class="profile-bookings-loading">Loading your bookings...</div>
            </div>
          </div>
        </div>
      </div>
      ${renderFooter()}
    </div>
  `;
}

function toggleSensitiveDetails() {
  isSensitiveVisible = !isSensitiveVisible;
  const passportEl = document.getElementById('profile-passport-val');
  const panEl = document.getElementById('profile-pan-val');
  const toggleBtn = document.getElementById('profile-toggle-btn');
  const user = store.get('currentUser');
  
  if (passportEl && panEl && user?.profile) {
    if (isSensitiveVisible) {
      passportEl.textContent = user.profile.passportNumber;
      panEl.textContent = user.profile.panNumber;
      if (toggleBtn) toggleBtn.innerHTML = '🔒 Hide Sensitive Info';
    } else {
      passportEl.textContent = maskString(user.profile.passportNumber);
      panEl.textContent = maskString(user.profile.panNumber);
      if (toggleBtn) toggleBtn.innerHTML = '👁️ Show Sensitive Info';
    }
  }
}

function maskString(str) {
  if (!str) return 'N/A';
  if (str.length <= 3) return '• • •';
  return str.substring(0, 2) + ' • • • • • ' + str.substring(str.length - 2);
}

async function loadProfileBookings() {
  const listEl = document.getElementById('profile-bookings-list');
  if (!listEl) return;

  const user = store.get('currentUser');
  if (!user) return;

  try {
    const bookings = await db.getUserBookings(user.id);
    
    if (bookings.length === 0) {
      listEl.innerHTML = `
        <div class="profile-bookings-empty">
          <div style="font-size: 2.5rem; margin-bottom: var(--space-sm);">✈️</div>
          <div style="font-weight: 600; color: var(--color-charcoal-soft);">No booked flights yet</div>
          <p style="font-size: var(--text-xs); color: var(--color-warm-gray); margin-top: 4px;">Start searching and book your next adventure!</p>
          <a href="#/" class="btn btn-sm btn-primary" style="margin-top: var(--space-md); display: inline-block;">Search Flights</a>
        </div>
      `;
      return;
    }

    listEl.innerHTML = bookings.map(booking => {
      const flight = getFlightById(booking.flightId);
      if (!flight) return '';
      
      const airline = getAirline(flight.airline);
      const originCity = getAirport(flight.origin)?.city || flight.origin;
      const destCity = getAirport(flight.destination)?.city || flight.destination;
      
      const isUpcoming = booking.status === 'upcoming';
      const badgeClass = isUpcoming ? 'badge-sage' : 'badge-lavender';
      
      return `
        <div class="profile-booking-item">
          <div class="profile-booking-header">
            <div style="display: flex; align-items: center; gap: var(--space-sm);">
              <div class="airline-logo" style="background: ${airline?.color || '#666'}; width: 28px; height: 28px; font-size: 0.6rem; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: white;">
                ${flight.airline}
              </div>
              <div>
                <div style="font-weight: 600; font-size: var(--text-small);">${originCity} → ${destCity}</div>
                <div style="font-size: var(--text-xs); color: var(--color-warm-gray);">${flight.flightNumber} · PNR: ${booking.pnr}</div>
              </div>
            </div>
            <span class="badge ${badgeClass}">${booking.status}</span>
          </div>
          <div class="profile-booking-body">
            <div class="profile-booking-detail">
              <span class="profile-detail-lbl">Departs</span>
              <span class="profile-detail-val">${flight.departureTime}</span>
            </div>
            <div class="profile-booking-detail">
              <span class="profile-detail-lbl">Passengers</span>
              <span class="profile-detail-val">${booking.passengers}</span>
            </div>
            <div class="profile-booking-detail">
              <span class="profile-detail-lbl">Total Paid</span>
              <span class="profile-detail-val">${formatPrice(booking.totalPaid)}</span>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; padding: var(--space-sm) var(--space-lg); background: var(--color-foundation); border-top: 1px solid var(--color-lavender); border-radius: 0 0 var(--radius-lg) var(--radius-lg);">
            <button class="btn btn-sm btn-ghost" onclick="viewFlightDetails('${flight.id}')">View Route Details</button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
    listEl.innerHTML = '<div class="error-text">⚠️ Failed to load bookings. Please check connection.</div>';
  }
}
