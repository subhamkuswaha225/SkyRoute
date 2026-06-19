/* ============================================================
   SkyRoute Onboarding Page
   Sleek complete-profile dashboard for first-time login
   ============================================================ */

function renderOnboardingPage(params) {
  const user = store.get('currentUser');
  
  // If already onboarded, send to profile directly
  if (user && user.profile) {
    setTimeout(() => router.navigate('/profile'), 50);
    return '';
  }

  return `
    <div class="page onboarding-page">
      <div class="container container--narrow">
        <div class="onboarding-card reveal grain-overlay">
          <div class="onboarding-eyebrow">almost there ✦</div>
          <h1 class="onboarding-title">Complete Your Profile</h1>
          <p class="onboarding-subtitle">Provide your details to securely view routes and finalize your flight bookings.</p>
          
          <form id="onboarding-form" onsubmit="handleOnboardingSubmit(event)">
            <div class="form-group">
              <label class="form-label" for="onboard-age">Age</label>
              <input type="number" class="form-input" id="onboard-age" min="12" max="120" placeholder="Enter your age" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="onboard-passport">Passport Number</label>
              <input type="text" class="form-input" id="onboard-passport" placeholder="e.g. Z1234567" required style="letter-spacing: 0.1em; text-transform: uppercase;">
              <small style="font-size: 0.75rem; color: var(--color-warm-gray); margin-top: 4px; display: block;">Used strictly for booking and customs authorization</small>
            </div>

            <div class="form-group">
              <label class="form-label" for="onboard-pan">PAN Number</label>
              <input type="text" class="form-input" id="onboard-pan" placeholder="e.g. ABCDE1234F" required style="letter-spacing: 0.1em; text-transform: uppercase;">
              <small style="font-size: 0.75rem; color: var(--color-warm-gray); margin-top: 4px; display: block;">Required for Indian tax authority aviation compliance</small>
            </div>

            <div class="form-group">
              <label class="form-label" for="onboard-about">About Me</label>
              <textarea class="form-input" id="onboard-about" rows="3" placeholder="Tell us a little about your travel preferences..." style="resize: vertical; min-height: 80px;"></textarea>
            </div>
            
            <button type="submit" class="btn btn-coral btn-lg w-full" style="width: 100%; margin-top: var(--space-md);">
              Save Profile & Continue →
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

async function handleOnboardingSubmit(event) {
  event.preventDefault();
  const user = store.get('currentUser');
  if (!user) return;

  const age = document.getElementById('onboard-age')?.value;
  const passportNumber = document.getElementById('onboard-passport')?.value.trim().toUpperCase();
  const panNumber = document.getElementById('onboard-pan')?.value.trim().toUpperCase();
  const aboutMe = document.getElementById('onboard-about')?.value.trim();

  if (!age || !passportNumber || !panNumber) {
    showToast('⚠️ Please fill out all required fields.');
    return;
  }

  const profileData = {
    age: parseInt(age),
    passportNumber,
    panNumber,
    aboutMe
  };

  try {
    showToast('💾 Saving profile to database...');
    await db.saveUserProfile(user.id, profileData);
    showToast('✅ Profile setup complete!');
    
    // Redirect to profile or run pending actions
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
  } catch (err) {
    console.error(err);
    showToast('❌ Failed to save profile details.');
  }
}
