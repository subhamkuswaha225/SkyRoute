/* ============================================================
   SkyRoute App Entry Point
   Initializes router, components, and binds everything together
   ============================================================ */

(function() {
  'use strict';

  // Wait for DOM ready
  document.addEventListener('DOMContentLoaded', initApp);

  function initApp() {
    console.log('🛫 SkyRoute — Initializing...');

    // Initialize Firebase (will use mock data if not configured)
    initFirebase();

    // Setup router
    setupRoutes();

    // Initialize global components
    initGlobalComponents();

    console.log('✅ SkyRoute — Ready for takeoff!');
  }

  function guardRoute(renderFn, routeName, requiresOnboarded = true) {
    return (params) => {
      const isAuth = store.get('isAuthenticated');
      const user = store.get('currentUser');
      
      if (!isAuth) {
        // Save pending action to proceed after login
        store.set('pendingAction', () => {
          router.navigate(window.location.hash.slice(1));
        });
        
        // Show auth modal on home page
        setTimeout(() => {
          router.navigate('/');
          showAuthModal(`Sign in with Google to view detailed routes`);
        }, 50);
        return '';
      }
      
      // If onboarding check is required
      if (requiresOnboarded && user && !user.profile) {
        setTimeout(() => {
          router.navigate('/onboarding');
          showToast('📋 Please complete your profile to continue');
        }, 50);
        return '';
      }
      
      return renderFn(params);
    };
  }

  function setupRoutes() {
    // Define all routes
    router.addRoute('/', (params) => renderHomePage(params));
    router.addRoute('/flights', guardRoute((params) => renderFlightResultsPage(params), 'flights'));
    router.addRoute('/flights/details/:id', guardRoute((params) => renderFlightDetailsPage(params), 'flight details'));
    router.addRoute('/booking/:id', guardRoute((params) => renderBookingPage(params), 'booking'));
    router.addRoute('/dashboard', guardRoute((params) => renderDashboardPage(params), 'dashboard'));
    router.addRoute('/onboarding', guardRoute((params) => renderOnboardingPage(params), 'onboarding', false));
    router.addRoute('/profile', guardRoute((params) => renderProfilePage(params), 'profile'));

    // 404 catch-all
    router.addRoute('*', () => {
      return `
        <div class="not-found-page">
          <div class="not-found-code">404</div>
          <div class="not-found-title">Lost in the Clouds</div>
          <p class="not-found-text">The page you're looking for has departed. Let's get you back on track.</p>
          <a href="#/" class="btn btn-primary btn-lg">✈ Back to Home</a>
        </div>
      `;
    });

    // On route change — update navbar + scroll reveals
    router.onRouteChange = (path, params) => {
      // Re-inject persistent components
      setTimeout(() => {
        injectPersistentComponents();
        // Re-observe scroll reveals
        if (window.scrollReveal) {
          window.scrollReveal.observe();
        }
      }, 100);
    };

    // Initialize router
    router.init('app');
  }

  function initGlobalComponents() {
    // Custom cursor
    initCustomCursor();

    // Inject persistent components after first render
    setTimeout(() => {
      injectPersistentComponents();
      if (window.scrollReveal) {
        window.scrollReveal.observe();
      }
    }, 200);
  }

  function injectPersistentComponents() {
    // Navbar
    let navEl = document.getElementById('navbar');
    if (!navEl) {
      const navWrapper = document.createElement('div');
      navWrapper.innerHTML = renderNavbar();
      document.body.insertBefore(navWrapper.firstElementChild, document.body.firstChild);
      initNavbar();
    } else {
      // Update active states
      const links = document.querySelectorAll('[data-nav]');
      const currentPath = router.getCurrentPath();
      links.forEach(link => {
        const href = link.getAttribute('href')?.replace('#', '') || '';
        link.classList.remove('active');
        if (href === '/' && currentPath === '/') {
          link.classList.add('active');
        } else if (href !== '/' && currentPath.startsWith(href.split('?')[0])) {
          link.classList.add('active');
        }
      });
      updateNavbar();
    }

    // AI Assistant
    let aiEl = document.getElementById('ai-widget');
    if (!aiEl) {
      const aiWrapper = document.createElement('div');
      aiWrapper.innerHTML = renderAIAssistant();
      document.body.appendChild(aiWrapper.firstElementChild);
    }
  }
})();
