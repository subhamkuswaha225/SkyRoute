/* ============================================================
   SkyRoute Booking Page
   Passenger form with cost breakdown
   ============================================================ */

function renderBookingPage(params) {
  const flightId = params.id;
  const flight = getFlightById(flightId);

  if (!flight) {
    return `
      <div class="page booking-page">
        <div class="container">
          <div class="empty-state">
            <div class="empty-state-icon">✈️</div>
            <div class="empty-state-title">Flight Not Found</div>
            <p class="empty-state-text">We couldn't find this flight. Please try searching again.</p>
            <a href="#/" class="btn btn-primary">Search Flights</a>
          </div>
        </div>
      </div>
    `;
  }

  const airline = getAirline(flight.airline);
  const originAirport = getAirport(flight.origin);
  const destAirport = getAirport(flight.destination);
  const passengers = store.get('searchParams')?.passengers || 1;
  const baseFare = flight.price * passengers;
  const taxes = Math.round(baseFare * 0.12);
  const serviceFee = 299;
  const total = baseFare + taxes + serviceFee;

  return `
    <div class="page booking-page">
      <div class="container">
        <!-- Header -->
        <div class="booking-header reveal">
          <a href="javascript:history.back()" class="details-back">← Back to flight details</a>
          <h1 class="booking-title">Complete Your Booking</h1>
          <p class="booking-subtitle">
            ${airline?.name} ${flight.flightNumber} · ${originAirport?.city} → ${destAirport?.city} · ${formatDuration(flight.duration)}
          </p>
        </div>

        <!-- Layout -->
        <div class="booking-layout">
          <!-- Form -->
          <div class="booking-form-section reveal">
            <div class="booking-form-title">👤 Passenger Details</div>
            
            <form id="booking-form" onsubmit="handleBookingSubmit(event, '${flight.id}')">
              ${Array.from({length: passengers}, (_, i) => `
                ${passengers > 1 ? `<div style="font-weight: 600; font-size: var(--text-body); margin-bottom: var(--space-md); ${i > 0 ? 'margin-top: var(--space-xl);' : ''}">
                  Passenger ${i + 1}
                </div>` : ''}
                <div class="booking-form-row">
                  <div class="form-group">
                    <label class="form-label" for="firstName-${i}">First Name</label>
                    <input type="text" class="form-input" id="firstName-${i}" placeholder="Enter first name" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="lastName-${i}">Last Name</label>
                    <input type="text" class="form-input" id="lastName-${i}" placeholder="Enter last name" required>
                  </div>
                </div>
                <div class="booking-form-row">
                  <div class="form-group">
                    <label class="form-label" for="email-${i}">Email</label>
                    <input type="email" class="form-input" id="email-${i}" placeholder="you@email.com" ${i === 0 ? 'required' : ''}>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="phone-${i}">Phone</label>
                    <input type="tel" class="form-input" id="phone-${i}" placeholder="+91 XXXXX XXXXX" ${i === 0 ? 'required' : ''}>
                  </div>
                </div>
                ${i === 0 ? `
                  <div class="booking-form-divider"></div>
                  <div class="booking-form-title">🛂 Travel Document</div>
                ` : ''}
                <div class="booking-form-row">
                  <div class="form-group">
                    <label class="form-label" for="docType-${i}">Document Type</label>
                    <select class="form-select" id="docType-${i}">
                      <option value="passport">Passport</option>
                      <option value="aadhar">Aadhar Card</option>
                      <option value="driving">Driving License</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="docNumber-${i}">Document Number</label>
                    <input type="text" class="form-input" id="docNumber-${i}" placeholder="Enter document number" required>
                  </div>
                </div>
              `).join('')}

              <div class="booking-form-divider"></div>
              <div class="booking-form-title">📝 Special Requests</div>
              <div class="form-group">
                <label class="form-label" for="special-requests">Additional Notes (Optional)</label>
                <textarea class="form-input" id="special-requests" rows="3" placeholder="Wheelchair assistance, dietary requirements, etc." style="resize: vertical; min-height: 80px;"></textarea>
              </div>

              <button type="submit" class="btn btn-coral btn-lg w-full" id="confirm-booking-btn" style="width: 100%; margin-top: var(--space-lg);">
                ✈ Confirm Booking · ${formatPrice(total)}
              </button>
            </form>
          </div>

          <!-- Cost Panel -->
          <aside class="reveal-right">
            <div class="cost-panel">
              <div class="cost-panel-title">💳 Cost Breakdown</div>
              
              <!-- Flight Summary -->
              <div style="background: var(--color-foundation); border-radius: var(--radius-lg); padding: var(--space-lg); margin-bottom: var(--space-xl);">
                <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-sm);">
                  <div class="airline-logo" style="background: ${airline?.color || '#666'}; width: 32px; height: 32px; font-size: 0.6rem;">
                    ${flight.airline}
                  </div>
                  <div>
                    <div style="font-weight: 600; font-size: var(--text-small);">${airline?.name}</div>
                    <div style="font-size: var(--text-xs); color: var(--color-warm-gray);">${flight.flightNumber}</div>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: var(--text-small);">
                  <span>${flight.origin}</span>
                  <span style="color: var(--color-coral);">→</span>
                  <span>${flight.destination}</span>
                  <span style="color: var(--color-warm-gray);">${formatDuration(flight.duration)}</span>
                </div>
              </div>

              <div class="cost-row">
                <span class="cost-label">Base fare (×${passengers})</span>
                <span class="cost-value">${formatPrice(baseFare)}</span>
              </div>
              <div class="cost-row">
                <span class="cost-label">Taxes & surcharges</span>
                <span class="cost-value">${formatPrice(taxes)}</span>
              </div>
              <div class="cost-row">
                <span class="cost-label">Service fee</span>
                <span class="cost-value">${formatPrice(serviceFee)}</span>
              </div>

              <div class="promo-code">
                <input type="text" id="promo-input" placeholder="Promo code">
                <button class="btn btn-sm btn-ghost" onclick="applyPromo()">Apply</button>
              </div>
              
              <div class="cost-total">
                <span class="cost-total-label">Total</span>
                <span class="cost-total-value" id="booking-total">${formatPrice(total)}</span>
              </div>

              <div style="margin-top: var(--space-lg); padding: var(--space-md); background: var(--color-sage); border-radius: var(--radius-md); font-size: var(--text-xs); color: var(--color-charcoal-soft); display: flex; align-items: center; gap: var(--space-sm);">
                🔒 Your payment is secured with 256-bit SSL encryption
              </div>
            </div>
          </aside>
        </div>
      </div>
      ${renderFooter()}
    </div>
  `;
}

function handleBookingSubmit(event, flightId) {
  event.preventDefault();

  const form = document.getElementById('booking-form');
  const firstName = document.getElementById('firstName-0')?.value;
  const lastName = document.getElementById('lastName-0')?.value;
  const email = document.getElementById('email-0')?.value;
  const phone = document.getElementById('phone-0')?.value;

  if (!firstName || !lastName) {
    showToast('⚠️ Please fill in passenger details');
    return;
  }

  // Ensure user is authenticated
  if (!store.get('isAuthenticated')) {
    showToast('⚠️ Please log in to complete booking.');
    showAuthModal('Sign in with Google to book your flight');
    return;
  }

  const flight = getFlightById(flightId);
  const passengers = store.get('searchParams')?.passengers || 1;
  const currentUser = store.get('currentUser');

  // Create booking data structure
  const booking = {
    userId: currentUser?.id || 'GUEST',
    flightId: flightId,
    status: 'upcoming',
    bookedAt: new Date().toISOString(),
    passengers: passengers,
    totalPaid: Math.round(flight.price * passengers * 1.12) + 299,
    passengerName: firstName + ' ' + lastName,
    email: email,
    phone: phone
  };

  try {
    showToast('💳 Creating your reservation...');
    const result = await db.createBooking(booking);
    showToast('🎉 Booking confirmed! PNR: ' + result.pnr);
    
    // Redirect to dashboard
    setTimeout(() => {
      router.navigate('/dashboard');
    }, 1500);
  } catch (error) {
    console.error('Booking failed:', error);
    showToast('❌ Failed to create booking. Please try again.');
  }
}

function applyPromo() {
  const input = document.getElementById('promo-input');
  if (!input || !input.value.trim()) {
    showToast('⚠️ Please enter a promo code');
    return;
  }
  
  const code = input.value.trim().toUpperCase();
  if (code === 'SKYROUTE10' || code === 'FLY10') {
    showToast('✅ Promo code applied! 10% discount');
    const totalEl = document.getElementById('booking-total');
    if (totalEl) {
      const currentText = totalEl.textContent;
      const numericValue = parseInt(currentText.replace(/[^0-9]/g, ''));
      const discounted = Math.round(numericValue * 0.9);
      totalEl.textContent = formatPrice(discounted);
      totalEl.style.color = 'var(--color-sage-rich)';
    }
  } else {
    showToast('❌ Invalid promo code. Try SKYROUTE10');
  }
}
