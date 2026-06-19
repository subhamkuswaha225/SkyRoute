/* ============================================================
   SkyRoute Router
   Hash-based client-side router with page transitions
   ============================================================ */

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.appContainer = null;
    this.onRouteChange = null;
  }

  init(containerId) {
    this.appContainer = document.getElementById(containerId);
    window.addEventListener('hashchange', () => this.handleRoute());
    // Handle initial route
    if (!window.location.hash) {
      window.location.hash = '#/';
    } else {
      this.handleRoute();
    }
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.location.hash = '#' + path;
  }

  getParams() {
    const hash = window.location.hash.slice(1);
    const [path, queryString] = hash.split('?');
    const params = {};
    
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value || '');
      });
    }
    
    return params;
  }

  getCurrentPath() {
    return window.location.hash.slice(1).split('?')[0] || '/';
  }

  async handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, queryString] = hash.split('?');
    const params = this.getParams();

    // Find matching route
    let handler = null;
    let routeParams = {};

    for (const [routePath, routeHandler] of Object.entries(this.routes)) {
      const match = this.matchRoute(routePath, path);
      if (match) {
        handler = routeHandler;
        routeParams = { ...match, ...params };
        break;
      }
    }

    if (!handler) {
      handler = this.routes['*'] || (() => '<div class="not-found-page"><div class="not-found-code">404</div><div class="not-found-title">Page Not Found</div><p class="not-found-text">The page you\'re looking for doesn\'t exist.</p><a href="#/" class="btn btn-primary">Go Home</a></div>');
    }

    // Page transition
    await this.transitionTo(handler, routeParams);

    // Notify route change
    if (this.onRouteChange) {
      this.onRouteChange(path, routeParams);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  matchRoute(routePath, actualPath) {
    const routeParts = routePath.split('/').filter(Boolean);
    const actualParts = actualPath.split('/').filter(Boolean);

    if (routeParts.length !== actualParts.length) return null;

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = actualParts[i];
      } else if (routeParts[i] !== actualParts[i]) {
        return null;
      }
    }

    return params;
  }

  async transitionTo(handler, params) {
    const content = this.appContainer.querySelector('.page-content');
    
    if (content) {
      content.classList.add('page-exit-active');
      await this.wait(300);
    }

    // Render new page
    const html = handler(params);
    
    // Create wrapper
    this.appContainer.innerHTML = `<div class="page-content page-enter">${html}</div>`;
    
    // Trigger enter animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const newContent = this.appContainer.querySelector('.page-content');
        if (newContent) {
          newContent.classList.remove('page-enter');
          newContent.classList.add('page-enter-active');
        }
      });
    });

    // Initialize page-specific scripts
    await this.wait(50);
    
    // Re-initialize scroll reveals
    if (window.scrollReveal) {
      window.scrollReveal.observe();
    }
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Global router instance
const router = new Router();
