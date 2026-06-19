/* ============================================================
   SkyRoute Navbar Component
   Glassmorphism navigation with scroll effect and reactive Auth
   ============================================================ */

function renderNavbar() {
  const currentPath = router.getCurrentPath();
  const isAuth = store.get('isAuthenticated');
  const user = store.get('currentUser');
  
  return `
    <nav class="navbar" id="navbar">
      <div class="navbar-inner">
        <a href="#/" class="navbar-logo" id="nav-logo">
          <div class="navbar-logo-icon">✈</div>
          <span>SkyRoute</span>
          <span class="navbar-logo-accent">fly smart</span>
        </a>
        
        <div class="navbar-links" id="nav-links">
          <a href="#/" class="navbar-link ${currentPath === '/' ? 'active' : ''}" data-nav>Home</a>
          <a href="#/flights?origin=DEL&dest=BOM" class="navbar-link ${currentPath.startsWith('/flights') && !currentPath.includes('/details') ? 'active' : ''}" data-nav>Flights</a>
          <a href="#/dashboard" class="navbar-link ${currentPath === '/dashboard' ? 'active' : ''}" data-nav>Dashboard</a>
        </div>

        <div class="navbar-actions">
          ${isAuth ? `
            <div class="navbar-user-menu" style="display: flex; align-items: center; gap: var(--space-md);">
              <a href="#/profile" class="navbar-avatar-link" title="View Profile" style="display: flex; align-items: center; gap: var(--space-xs); text-decoration: none; color: var(--color-charcoal);">
                <div class="navbar-avatar" style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-sage); color: var(--color-charcoal); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; border: 1.5px solid var(--color-sage-rich); overflow: hidden;">
                  ${user?.avatar ? `<img src="${user.avatar}" alt="Avatar" style="width:100%; height:100%; object-fit:cover;">` : (user?.name?.charAt(0) || 'U')}
                </div>
                <span class="navbar-username" style="font-family: 'Outfit', sans-serif; font-weight: 600; font-size: var(--text-small);">${user?.name?.split(' ')[0] || 'Profile'}</span>
              </a>
              <button class="btn btn-sm btn-ghost" onclick="handleLogout()" style="padding: 6px 12px; font-size: var(--text-xs);">Log Out</button>
            </div>
          ` : `
            <button class="btn btn-sm btn-primary" id="nav-auth-btn" onclick="handleNavAuth()">
              Sign In
            </button>
          `}
          <button class="navbar-menu-btn" id="nav-menu-btn" onclick="toggleMobileMenu()" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  `;
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // Reactive store binding
  store.on('isAuthenticated', () => {
    updateNavbar();
  });
  store.on('currentUser', () => {
    updateNavbar();
  });
}

function toggleMobileMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('nav-menu-btn');
  links?.classList.toggle('open');
  btn?.classList.toggle('active');
}

function handleNavAuth() {
  showAuthModal('Sign in with Google to manage your trips');
}

function handleLogout() {
  auth.signOut();
  showToast('👋 Signed out successfully');
}

function updateNavbar() {
  const actionsEl = document.querySelector('.navbar-actions');
  if (actionsEl) {
    const isAuth = store.get('isAuthenticated');
    const user = store.get('currentUser');
    actionsEl.innerHTML = `
      ${isAuth ? `
        <div class="navbar-user-menu" style="display: flex; align-items: center; gap: var(--space-md);">
          <a href="#/profile" class="navbar-avatar-link" title="View Profile" style="display: flex; align-items: center; gap: var(--space-xs); text-decoration: none; color: var(--color-charcoal);">
            <div class="navbar-avatar" style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-sage); color: var(--color-charcoal); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; border: 1.5px solid var(--color-sage-rich); overflow: hidden;">
              ${user?.avatar ? `<img src="${user.avatar}" alt="Avatar" style="width:100%; height:100%; object-fit:cover;">` : (user?.name?.charAt(0) || 'U')}
            </div>
            <span class="navbar-username" style="font-family: 'Outfit', sans-serif; font-weight: 600; font-size: var(--text-small);">${user?.name?.split(' ')[0] || 'Profile'}</span>
          </a>
          <button class="btn btn-sm btn-ghost" onclick="handleLogout()" style="padding: 6px 12px; font-size: var(--text-xs);">Log Out</button>
        </div>
      ` : `
        <button class="btn btn-sm btn-primary" id="nav-auth-btn" onclick="handleNavAuth()">
          Sign In
        </button>
      `}
      <button class="navbar-menu-btn" id="nav-menu-btn" onclick="toggleMobileMenu()" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    `;
  }
}
