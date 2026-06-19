/* ============================================================
   SkyRoute Flight Details Page
   Vertical timeline with smart layover detection
   ============================================================ */

function renderFlightDetailsPage(params) {
  const flightId = params.id;
  const flight = getFlightById(flightId);

  if (!flight) {
    return `
      <div class="page details-page">
        <div class="container">
          <div class="empty-state">
            <div class="empty-state-icon">✈️</div>
            <div class="empty-state-title">Flight Not Found</div>
            <p class="empty-state-text">We couldn't find this flight. It may have been removed or the ID is incorrect.</p>
            <a href="#/" class="btn btn-primary">Go Home</a>
          </div>
        </div>
      </div>
    `;
  }

  const airline = getAirline(flight.airline);
  const originAirport = getAirport(flight.origin);
  const destAirport = getAirport(flight.destination);
  const passengers = store.get('searchParams')?.passengers || 1;
  const hasLongLayover = flight.layoverMinutes && flight.layoverMinutes >= 240; // 4 hours
  const layoverHotels = hasLongLayover ? getHotelsByAirport(flight.layoverAirport) : [];

  return `
    <div class="page details-page">
      <div class="container">
        <!-- Header -->
        <div class="details-header">
          <a href="javascript:history.back()" class="details-back reveal">
            ← Back to results
          </a>
          <div class="details-title-section reveal">
            <div>
              <div class="details-airline">
                <div class="airline-logo" style="background: ${airline?.color || '#666'}; width: 48px; height: 48px; font-size: 0.85rem;">
                  ${flight.airline}
                </div>
                <div>
                  <div class="airline-name" style="font-size: 1.1rem;">${airline?.name || flight.airline}</div>
                  <div class="airline-flight-num">${flight.flightNumber} · ${flight.class}</div>
                </div>
              </div>
              <div class="details-route-text">
                ${originAirport?.city || flight.origin} → ${destAirport?.city || flight.destination}
              </div>
            </div>
            <div class="details-price-section">
              <div class="details-price">${formatPrice(flight.price * passengers)}</div>
              <div class="details-price-per">${passengers > 1 ? passengers + ' passengers' : 'per person'}</div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="details-content">
          <!-- Timeline -->
          <div class="details-timeline-section">
            <h3 class="text-h3 reveal" style="margin-bottom: var(--space-2xl);">
              ✈ Flight Timeline
            </h3>
            
            <div class="timeline reveal">
              <div class="timeline-line"></div>

              ${flight.segments.map((segment, segIdx) => {
                const segOrigin = getAirport(segment.from);
                const segDest = getAirport(segment.to);
                const isLastSegment = segIdx === flight.segments.length - 1;
                
                let html = '';

                // Departure node
                html += `
                  <div class="timeline-node">
                    <div class="timeline-dot timeline-dot--active"></div>
                    <div class="timeline-content">
                      <div class="timeline-time">${segment.departure}</div>
                      <div style="font-weight: 600; margin-top: 4px;">${segOrigin?.city || segment.from} (${segment.from})</div>
                      <div class="timeline-airport-name">${segOrigin?.name || ''}</div>
                      <div class="timeline-detail">
                        <span>🛫 Departure</span>
                        <span>•</span>
                        <span>Terminal ${Math.floor(Math.random() * 3) + 1}</span>
                      </div>
                    </div>
                  </div>
                `;

                // In-flight segment
                html += `
                  <div class="timeline-segment">
                    <div class="timeline-segment-card">
                      <div class="timeline-segment-icon">✈️</div>
                      <div class="timeline-segment-info">
                        <div class="timeline-segment-label">In Flight · ${segment.flightNum}</div>
                        <div class="timeline-segment-duration">${formatDuration(segment.duration)}</div>
                        <div style="font-size: 0.75rem; color: var(--color-warm-gray); margin-top: 4px;">
                          ${segment.aircraft} · ${flight.baggage}
                        </div>
                      </div>
                    </div>
                  </div>
                `;

                // Arrival node
                html += `
                  <div class="timeline-node">
                    <div class="timeline-dot timeline-dot--sage ${isLastSegment ? 'timeline-dot--active' : ''}"></div>
                    <div class="timeline-content">
                      <div class="timeline-time">${segment.arrival}</div>
                      <div style="font-weight: 600; margin-top: 4px;">${segDest?.city || segment.to} (${segment.to})</div>
                      <div class="timeline-airport-name">${segDest?.name || ''}</div>
                      <div class="timeline-detail">
                        <span>${isLastSegment ? '🛬 Final Arrival' : '🛬 Arrival'}</span>
                        <span>•</span>
                        <span>Terminal ${Math.floor(Math.random() * 3) + 1}</span>
                      </div>
                    </div>
                  </div>
                `;

                // Layover between segments (if not last segment)
                if (!isLastSegment && flight.layoverMinutes) {
                  html += `
                    <div class="timeline-segment">
                      <div class="timeline-segment-card" style="background: var(--color-coral-light);">
                        <div class="timeline-segment-icon">⏳</div>
                        <div class="timeline-segment-info">
                          <div class="timeline-segment-label">Layover at ${flight.layoverAirport}</div>
                          <div class="timeline-segment-duration">${formatDuration(flight.layoverMinutes)}</div>
                          <div style="font-size: 0.75rem; color: var(--color-charcoal-light); margin-top: 4px;">
                            ${hasLongLayover ? '⚠️ Long layover detected' : 'Short connection'}
                          </div>
                        </div>
                      </div>
                    </div>
                  `;

                  // 🏨 SMART LAYOVER DETECTION — Hotel Recommendations
                  if (hasLongLayover && layoverHotels.length > 0) {
                    html += `
                      <div class="hotel-reveal">
                        <div class="hotel-reveal-card">
                          <div class="hotel-reveal-header">
                            <div class="hotel-reveal-icon">🏨</div>
                            <div>
                              <div class="hotel-reveal-title">Long Layover? Rest in comfort.</div>
                              <div class="hotel-reveal-subtitle">recommended stays near ${flight.layoverAirport}</div>
                            </div>
                          </div>
                          <div class="hotel-grid">
                            ${layoverHotels.slice(0, 3).map(hotel => `
                              <div class="hotel-card">
                                <div class="hotel-card-image">
                                  <span style="font-size: 2.5rem;">🏨</span>
                                </div>
                                <div class="hotel-card-name">${hotel.name}</div>
                                <div class="hotel-card-meta">
                                  <span class="hotel-card-rating">★ ${hotel.rating}</span>
                                  <span>•</span>
                                  <span>${hotel.distanceKm}km from airport</span>
                                  <span>•</span>
                                  <span class="badge badge-sage" style="font-size: 0.6rem;">${hotel.type}</span>
                                </div>
                                <div style="font-size: 0.8rem; color: var(--color-charcoal-light); margin-bottom: 8px;">
                                  ${hotel.description}
                                </div>
                                <div class="hotel-card-price">
                                  ${formatPrice(hotel.pricePerNight)} <span>/ night</span>
                                </div>
                              </div>
                            `).join('')}
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }

                return html;
              }).join('')}
            </div>

            <!-- Amenities -->
            <div class="reveal" style="margin-top: var(--space-3xl);">
              <h4 class="text-h4" style="margin-bottom: var(--space-lg);">Included Amenities</h4>
              <div style="display: flex; flex-wrap: wrap; gap: var(--space-md);">
                ${flight.amenities.map(a => {
                  const icons = {
                    'wifi': '📶 Wi-Fi', 'meal': '🍽 Meals', 'entertainment': '🎬 Entertainment',
                    'power': '🔌 Power Outlets', 'lounge': '🛋 Lounge Access', 'blanket': '🛏 Blanket & Pillow',
                    'amenity-kit': '🎁 Amenity Kit'
                  };
                  return `<span class="badge badge-lavender">${icons[a] || a}</span>`;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="details-sidebar">
            <!-- Price Summary -->
            <div class="details-info-card reveal-right">
              <div class="details-info-title">💰 Price Summary</div>
              <div class="details-info-row">
                <span class="details-info-label">Base fare (×${passengers})</span>
                <span class="details-info-value">${formatPrice(flight.price * passengers)}</span>
              </div>
              <div class="details-info-row">
                <span class="details-info-label">Taxes & fees</span>
                <span class="details-info-value">${formatPrice(Math.round(flight.price * passengers * 0.12))}</span>
              </div>
              <div class="details-info-row">
                <span class="details-info-label">Service charge</span>
                <span class="details-info-value">${formatPrice(299)}</span>
              </div>
              <div class="divider" style="margin: var(--space-md) 0;"></div>
              <div class="details-info-row">
                <span class="details-info-label" style="font-weight: 700; color: var(--color-charcoal);">Total</span>
                <span class="details-info-value" style="font-size: 1.3rem; font-weight: 800;">${formatPrice(Math.round(flight.price * passengers * 1.12) + 299)}</span>
              </div>
              <button class="btn btn-coral btn-lg w-full" style="width: 100%; margin-top: var(--space-lg);" onclick="goToBooking('${flight.id}')">
                Book This Flight →
              </button>
            </div>

            <!-- Flight Info -->
            <div class="details-info-card reveal-right" style="transition-delay: 100ms;">
              <div class="details-info-title">📋 Flight Info</div>
              <div class="details-info-row">
                <span class="details-info-label">Flight</span>
                <span class="details-info-value">${flight.flightNumber}</span>
              </div>
              <div class="details-info-row">
                <span class="details-info-label">Class</span>
                <span class="details-info-value">${flight.class}</span>
              </div>
              <div class="details-info-row">
                <span class="details-info-label">Duration</span>
                <span class="details-info-value">${formatDuration(flight.duration)}</span>
              </div>
              <div class="details-info-row">
                <span class="details-info-label">Stops</span>
                <span class="details-info-value">${flight.stops === 0 ? 'Non-stop' : flight.stops + ' stop'}</span>
              </div>
              <div class="details-info-row">
                <span class="details-info-label">Baggage</span>
                <span class="details-info-value">${flight.baggage}</span>
              </div>
              <div class="details-info-row">
                <span class="details-info-label">Seats Left</span>
                <span class="details-info-value ${flight.seatsLeft <= 5 ? 'low' : ''}" style="${flight.seatsLeft <= 5 ? 'color: var(--color-error);' : ''}">${flight.seatsLeft}</span>
              </div>
            </div>

            ${hasLongLayover ? `
              <div class="details-info-card reveal-right" style="transition-delay: 200ms; border-color: var(--color-coral-light); background: var(--color-coral-light);">
                <div class="details-info-title">⚠️ Layover Notice</div>
                <p style="font-size: var(--text-small); line-height: 1.6; color: var(--color-charcoal-soft);">
                  This flight has a <strong>${formatDuration(flight.layoverMinutes)}</strong> layover at 
                  <strong>${getAirport(flight.layoverAirport)?.city || flight.layoverAirport}</strong>. 
                  We've recommended nearby hotels for your comfort. Scroll the timeline to see options.
                </p>
              </div>
            ` : ''}
          </aside>
        </div>
      </div>
      ${renderFooter()}
    </div>
  `;
}

function goToBooking(flightId) {
  if (!store.get('isAuthenticated')) {
    store.set('pendingAction', () => {
      store.set('selectedFlight', flightId);
      router.navigate(`/booking/${flightId}`);
    });
    showAuthModal('Sign in with Google to view detailed routes');
    return;
  }
  store.set('selectedFlight', flightId);
  router.navigate(`/booking/${flightId}`);
}
