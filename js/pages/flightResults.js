/* ============================================================
   SkyRoute Flight Results Page
   Staggered grid with filters and sorting
   ============================================================ */

function renderFlightResultsPage(params) {
  const origin = params.origin || '';
  const dest = params.dest || '';
  const date = params.date || '';
  const passengers = parseInt(params.passengers) || 1;

  // Get flights matching search
  let flights = searchFlights(origin, dest);
  const originAirport = getAirport(origin);
  const destAirport = getAirport(dest);

  // Get current filters from store
  const filters = store.get('filters');

  // Apply sorting
  flights = sortFlights(flights, filters.sortBy);

  const accentClasses = ['flight-card--coral', 'flight-card--sage', 'flight-card--lavender', 'flight-card--rose'];

  return `
    <div class="page results-page">
      <div class="container">
        <!-- Header -->
        <div class="results-header reveal">
          <div class="results-route">
            <span>${originAirport?.city || origin}</span>
            <span class="results-route-arrow">→</span>
            <span>${destAirport?.city || dest}</span>
          </div>
          <div class="results-meta">
            <span>📅 ${date ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Any date'}</span>
            <span>👤 ${passengers} passenger${passengers > 1 ? 's' : ''}</span>
            <span>✈ ${flights.length} flights found</span>
          </div>
        </div>

        <!-- Layout: Sidebar + Results -->
        <div class="results-layout">
          <!-- Filter Sidebar -->
          <aside class="results-sidebar reveal-left">
            <div class="filter-panel">
              <div class="filter-title">🎛 Filters</div>
              
              <!-- Stops Filter -->
              <div class="filter-group">
                <div class="filter-group-label">Stops</div>
                <div class="filter-option" onclick="toggleFilter('stops', 0)">
                  <div class="filter-checkbox ${filters.stops === 0 ? 'checked' : ''}" id="filter-stop-0">
                    ${filters.stops === 0 ? '✓' : ''}
                  </div>
                  <span>Non-stop</span>
                </div>
                <div class="filter-option" onclick="toggleFilter('stops', 1)">
                  <div class="filter-checkbox ${filters.stops === 1 ? 'checked' : ''}" id="filter-stop-1">
                    ${filters.stops === 1 ? '✓' : ''}
                  </div>
                  <span>1 Stop</span>
                </div>
              </div>

              <!-- Airlines Filter -->
              <div class="filter-group">
                <div class="filter-group-label">Airlines</div>
                ${getUniqueAirlines(flights).map(code => {
                  const airline = getAirline(code);
                  const isChecked = filters.airlines.includes(code);
                  return `
                    <div class="filter-option" onclick="toggleAirlineFilter('${code}')">
                      <div class="filter-checkbox ${isChecked ? 'checked' : ''}" id="filter-airline-${code}">
                        ${isChecked ? '✓' : ''}
                      </div>
                      <span>${airline?.name || code}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Price Range -->
              <div class="filter-group">
                <div class="filter-group-label">Price Range</div>
                <div class="filter-price-range">
                  <input type="range" class="filter-range-slider" min="0" max="100000" value="${filters.priceRange[1]}" id="price-range-slider" oninput="updatePriceFilter(this.value)">
                  <div class="filter-range-values">
                    <span>₹0</span>
                    <span id="price-range-max">${formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <button class="btn btn-ghost btn-sm w-full" onclick="clearFilters()" style="width:100%;">Clear All</button>
            </div>
          </aside>

          <!-- Flight Results -->
          <div class="results-main">
            <!-- Sort Bar -->
            <div class="sort-bar reveal">
              <div class="sort-results-count">
                Showing <strong>${flights.length}</strong> flights
              </div>
              <div class="sort-options">
                <button class="sort-option ${filters.sortBy === 'price' ? 'active' : ''}" onclick="sortResults('price')">Price</button>
                <button class="sort-option ${filters.sortBy === 'duration' ? 'active' : ''}" onclick="sortResults('duration')">Duration</button>
                <button class="sort-option ${filters.sortBy === 'departure' ? 'active' : ''}" onclick="sortResults('departure')">Departure</button>
              </div>
            </div>

            <!-- Flight Cards -->
            <div class="results-flights reveal-stagger">
              ${flights.length > 0 ? flights.map((flight, i) => `
                <div class="reveal" style="transition-delay: ${i * 80}ms;">
                  ${renderFlightCard(flight, accentClasses[i % accentClasses.length], passengers)}
                </div>
              `).join('') : `
                <div class="empty-state">
                  <div class="empty-state-icon">✈️</div>
                  <div class="empty-state-title">No Flights Found</div>
                  <p class="empty-state-text">We couldn't find any flights for this route. Try different dates or destinations.</p>
                  <a href="#/" class="btn btn-primary">Search Again</a>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
      ${renderFooter()}
    </div>
  `;
}

function renderFlightCard(flight, accentClass, passengers = 1) {
  const airline = getAirline(flight.airline);
  const originAirport = getAirport(flight.origin);
  const destAirport = getAirport(flight.destination);

  const amenityIcons = {
    'wifi': '📶', 'meal': '🍽', 'entertainment': '🎬', 'power': '🔌',
    'lounge': '🛋', 'blanket': '🛏', 'amenity-kit': '🎁'
  };

  return `
    <div class="flight-card ${accentClass}" onclick="viewFlightDetails('${flight.id}')" style="cursor: pointer;">
      <div class="flight-card-header">
        <div class="flight-card-airline">
          <div class="airline-logo" style="background: ${airline?.color || '#666'}">
            ${flight.airline}
          </div>
          <div class="airline-info">
            <span class="airline-name">${airline?.name || flight.airline}</span>
            <span class="airline-flight-num">${flight.flightNumber} · ${flight.class}</span>
          </div>
        </div>
        <div class="flight-card-price">
          <div class="flight-price-amount">${formatPrice(flight.price * passengers)}</div>
          <div class="flight-price-label">${passengers > 1 ? `₹${flight.price.toLocaleString('en-IN')}/person` : 'per person'}</div>
        </div>
      </div>

      <div class="flight-card-route">
        <div class="flight-endpoint">
          <div class="flight-time">${flight.departureTime}</div>
          <div class="flight-airport">${flight.origin} · ${originAirport?.city || ''}</div>
        </div>
        <div class="flight-path">
          <div class="flight-duration">${formatDuration(flight.duration)}</div>
          <div class="flight-path-line"></div>
          <div class="flight-stops">${flight.stops === 0 ? 'Non-stop' : flight.stops + ' stop · ' + (flight.layoverAirport || '')}</div>
        </div>
        <div class="flight-endpoint" style="text-align: right;">
          <div class="flight-time">${flight.arrivalTime}</div>
          <div class="flight-airport">${flight.destination} · ${destAirport?.city || ''}</div>
        </div>
      </div>

      <div class="flight-card-footer">
        <div class="flight-amenities">
          ${flight.amenities.slice(0, 4).map(a => 
            `<div class="flight-amenity" title="${a}">${amenityIcons[a] || '✦'}</div>`
          ).join('')}
        </div>
        <div class="flight-seats-left ${flight.seatsLeft <= 5 ? 'low' : ''}">
          ${flight.seatsLeft <= 5 ? '🔥 ' : ''}${flight.seatsLeft} seats left
        </div>
      </div>
    </div>
  `;
}

function viewFlightDetails(flightId) {
  if (!store.get('isAuthenticated')) {
    store.set('pendingAction', () => {
      store.set('selectedFlight', flightId);
      router.navigate(`/flights/details/${flightId}`);
    });
    showAuthModal('Sign in with Google to view detailed routes');
    return;
  }
  store.set('selectedFlight', flightId);
  router.navigate(`/flights/details/${flightId}`);
}

function getUniqueAirlines(flights) {
  return [...new Set(flights.map(f => f.airline))];
}

function sortFlights(flights, sortBy) {
  const sorted = [...flights];
  switch (sortBy) {
    case 'price':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'duration':
      sorted.sort((a, b) => a.duration - b.duration);
      break;
    case 'departure':
      sorted.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
      break;
  }
  return sorted;
}

function sortResults(sortBy) {
  store.update('filters', { sortBy });
  // Re-render the page
  router.handleRoute();
}

function toggleFilter(type, value) {
  const filters = store.get('filters');
  if (type === 'stops') {
    store.update('filters', { stops: filters.stops === value ? null : value });
  }
  router.handleRoute();
}

function toggleAirlineFilter(code) {
  const filters = store.get('filters');
  const airlines = [...filters.airlines];
  const idx = airlines.indexOf(code);
  if (idx > -1) {
    airlines.splice(idx, 1);
  } else {
    airlines.push(code);
  }
  store.update('filters', { airlines });
  router.handleRoute();
}

function updatePriceFilter(value) {
  const el = document.getElementById('price-range-max');
  if (el) el.textContent = formatPrice(parseInt(value));
  store.update('filters', { priceRange: [0, parseInt(value)] });
}

function clearFilters() {
  store.update('filters', { airlines: [], stops: null, priceRange: [0, 100000], sortBy: 'price' });
  router.handleRoute();
}
