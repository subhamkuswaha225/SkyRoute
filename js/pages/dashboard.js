/* ============================================================
   SkyRoute Dashboard Page
   User bookings, stats, and quick actions
   ============================================================ */

function renderDashboardPage() {
  const user = store.get('currentUser');
  const bookings = store.get('bookings') || [];
  
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalPaid || 0), 0);

  return `
    <div class="page dashboard-page">
      <div class="container">
        <!-- Header -->
        <div class="dashboard-header reveal">
          <div class="dashboard-greeting">
            <div class="dashboard-avatar">${user?.name?.charAt(0) || 'T'}</div>
            <div>
              <h1 class="dashboard-welcome">Welcome back, ${user?.name?.split(' ')[0] || 'Traveler'}!</h1>
              <p class="dashboard-welcome-sub">Here's an overview of your travel journey ✈</p>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="dashboard-quick-stats reveal-stagger">
          <div class="quick-stat-card reveal">
            <div class="quick-stat-icon" style="background: var(--color-coral-light);">✈️</div>
            <div>
              <div class="quick-stat-value">${bookings.length}</div>
              <div class="quick-stat-label">Total Bookings</div>
            </div>
          </div>
          <div class="quick-stat-card reveal" style="transition-delay: 100ms;">
            <div class="quick-stat-icon" style="background: var(--color-sage);">🎯</div>
            <div>
              <div class="quick-stat-value">${upcomingBookings.length}</div>
              <div class="quick-stat-label">Upcoming Flights</div>
            </div>
          </div>
          <div class="quick-stat-card reveal" style="transition-delay: 200ms;">
            <div class="quick-stat-icon" style="background: var(--color-lavender);">💰</div>
            <div>
              <div class="quick-stat-value">${formatPrice(totalSpent)}</div>
              <div class="quick-stat-label">Total Spent</div>
            </div>
          </div>
        </div>

        <!-- Upcoming Flights -->
        <div class="dashboard-section">
          <div class="dashboard-section-title reveal">
            🛫 Upcoming Flights
          </div>
          ${upcomingBookings.length > 0 ? `
            <div class="dashboard-bookings-grid reveal-stagger">
              ${upcomingBookings.map((booking, i) => renderDashBookingCard(booking, i)).join('')}
            </div>
          ` : `
            <div class="empty-state reveal">
              <div class="empty-state-icon">🌤️</div>
              <div class="empty-state-title">No Upcoming Flights</div>
              <p class="empty-state-text">Your next adventure awaits! Start searching for flights.</p>
              <a href="#/" class="btn btn-primary">Search Flights</a>
            </div>
          `}
        </div>

        <!-- Past Flights -->
        <div class="dashboard-section">
          <div class="dashboard-section-title reveal">
            ✅ Past Flights
          </div>
          ${completedBookings.length > 0 ? `
            <div class="dashboard-bookings-grid reveal-stagger">
              ${completedBookings.map((booking, i) => renderDashBookingCard(booking, i)).join('')}
            </div>
          ` : `
            <div class="empty-state reveal">
              <div class="empty-state-icon">📝</div>
              <div class="empty-state-title">No Past Flights</div>
              <p class="empty-state-text">Your travel history will appear here after completing a trip.</p>
            </div>
          `}
        </div>
      </div>
      ${renderFooter()}
    </div>
  `;
}

function renderDashBookingCard(booking, index) {
  const flight = getFlightById(booking.flightId);
  if (!flight) return '';

  const airline = getAirline(flight.airline);
  const originAirport = getAirport(flight.origin);
  const destAirport = getAirport(flight.destination);
  const isUpcoming = booking.status === 'upcoming';
  const bookedDate = new Date(booking.bookedAt);

  // Calculate countdown for upcoming flights
  let countdown = '';
  if (isUpcoming) {
    const now = new Date();
    const flightDate = new Date(bookedDate);
    flightDate.setDate(flightDate.getDate() + 7 + Math.floor(Math.random() * 14)); // Mock future date
    const daysLeft = Math.max(0, Math.ceil((flightDate - now) / (1000 * 60 * 60 * 24)));
    countdown = `${daysLeft} days to go`;
  }

  const statusConfig = {
    'upcoming': { label: 'Upcoming', class: 'badge-sage', icon: '🟢' },
    'completed': { label: 'Completed', class: 'badge-lavender', icon: '✅' },
    'cancelled': { label: 'Cancelled', class: 'badge-coral', icon: '❌' },
    'pending': { label: 'Pending', class: 'badge-warning', icon: '⏳' }
  };

  const status = statusConfig[booking.status] || statusConfig['pending'];

  return `
    <div class="reveal" style="transition-delay: ${index * 100}ms;">
      <div class="dash-card">
        <div class="dash-card-header">
          <div class="dash-booking-route">
            <span>${originAirport?.city || flight.origin}</span>
            <span class="dash-route-arrow">→</span>
            <span>${destAirport?.city || flight.destination}</span>
          </div>
          <span class="badge ${status.class}">
            ${status.icon} ${status.label}
          </span>
        </div>

        <div class="dash-card-body">
          <div class="dash-detail">
            <span class="dash-detail-label">Airline</span>
            <span class="dash-detail-value">${airline?.name || flight.airline}</span>
          </div>
          <div class="dash-detail">
            <span class="dash-detail-label">Flight</span>
            <span class="dash-detail-value">${flight.flightNumber}</span>
          </div>
          <div class="dash-detail">
            <span class="dash-detail-label">PNR</span>
            <span class="dash-detail-value" style="font-family: monospace; letter-spacing: 0.05em;">${booking.pnr}</span>
          </div>
          <div class="dash-detail">
            <span class="dash-detail-label">Departure</span>
            <span class="dash-detail-value">${flight.departureTime}</span>
          </div>
          <div class="dash-detail">
            <span class="dash-detail-label">Passengers</span>
            <span class="dash-detail-value">${booking.passengers}</span>
          </div>
          <div class="dash-detail">
            <span class="dash-detail-label">Paid</span>
            <span class="dash-detail-value">${formatPrice(booking.totalPaid)}</span>
          </div>
        </div>

        <div class="dash-card-footer">
          <span style="font-size: var(--text-xs); color: var(--color-warm-gray);">
            ${isUpcoming ? '✈ ' + countdown : 'Booked on ' + bookedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <div style="display: flex; gap: var(--space-sm);">
            <button class="btn btn-sm btn-ghost" onclick="viewFlightDetails('${booking.flightId}')">
              View Details
            </button>
            ${isUpcoming ? `
              <button class="btn btn-sm btn-coral" onclick="downloadTicket('${booking.pnr}')">
                🎫 Ticket
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

function downloadTicket(pnr) {
  showToast(`🎫 Ticket ${pnr} — downloading PDF...`);
  setTimeout(() => {
    showToast('✅ Ticket downloaded successfully!');
  }, 1500);
}
