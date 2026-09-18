import { state, navigateTo, addToCart, toggleFavorite, registerRenderer, renderApp } from './state.js';
import { FOOD_ITEMS } from './data/restaurantData.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage } from './components/homePage.js';
import { renderMenuPage } from './components/menuPage.js';
import { renderFoodDetailPage, initFoodDetailEvents } from './components/foodDetailPage.js';
import { renderAboutPage } from './components/aboutPage.js';
import { renderServicesPage } from './components/servicesPage.js';
import { renderContactPage, initContactEvents } from './components/contactPage.js';
import { renderAuthPage, initAuthEvents } from './components/authPage.js';
import { renderCartDrawer, initCartEvents } from './components/cartDrawer.js';
import { renderCheckoutModal, initCheckoutEvents } from './components/checkoutModal.js';
import { renderReservationModal, initReservationEvents } from './components/reservationModal.js';
import { showToast } from './components/toast.js';

export function main() {
  const root = document.getElementById('root');
  if (!root) return;

  registerRenderer(render);
  render();
}

function render() {
  const root = document.getElementById('root');
  if (!root) return;

  // Choose active page view
  let pageHtml = '';
  switch (state.currentPage) {
    case 'home':
      pageHtml = renderHomePage();
      break;
    case 'menu':
      pageHtml = renderMenuPage();
      break;
    case 'food-detail':
      pageHtml = renderFoodDetailPage();
      break;
    case 'about':
      pageHtml = renderAboutPage();
      break;
    case 'services':
      pageHtml = renderServicesPage();
      break;
    case 'contact':
      pageHtml = renderContactPage();
      break;
    case 'auth':
      pageHtml = renderAuthPage();
      break;
    default:
      pageHtml = renderHomePage();
  }

  root.innerHTML = `
    <div class="min-h-screen flex flex-col justify-between bg-[#FAF8F5] text-[#2C2724]">
      ${renderNavbar()}
      <main class="flex-1">
        ${pageHtml}
      </main>
      ${renderFooter()}
    </div>
    ${renderCartDrawer()}
    ${renderCheckoutModal()}
    ${renderReservationModal()}
  `;

  attachEventListeners();
}

function attachEventListeners() {
  // Global Brand Click
  const brandBtn = document.getElementById('nav-brand-btn');
  if (brandBtn) {
    brandBtn.onclick = () => navigateTo('home');
  }

  // Page Navigation buttons
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-page');
      if (target) navigateTo(target);
    };
  });

  // Open Cart
  const openCartBtn = document.getElementById('open-cart-btn');
  if (openCartBtn) {
    openCartBtn.onclick = () => {
      state.isCartOpen = true;
      render();
    };
  }

  // Open Reservation
  const resButtons = [
    'open-reservation-btn',
    'mobile-reservation-btn',
    'hero-reserve-table-btn',
    'cta-reserve-table-btn',
    'footer-reserve-btn'
  ];
  resButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => {
        state.isReservationOpen = true;
        render();
      };
    }
  });

  // Open Auth
  const authButtons = ['nav-auth-btn', 'mobile-auth-btn'];
  authButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => navigateTo('auth');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle-btn');
  if (mobileToggle) {
    mobileToggle.onclick = () => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
      render();
    };
  }

  // Hero / CTA buttons
  const exploreMenuBtn = document.getElementById('hero-explore-menu-btn');
  if (exploreMenuBtn) exploreMenuBtn.onclick = () => navigateTo('menu');

  const viewFullMenuBtn = document.getElementById('view-full-menu-btn');
  if (viewFullMenuBtn) viewFullMenuBtn.onclick = () => navigateTo('menu');

  const chefAboutBtn = document.getElementById('home-chef-about-btn');
  if (chefAboutBtn) chefAboutBtn.onclick = () => navigateTo('about');

  const ctaDeliveryBtn = document.getElementById('cta-order-delivery-btn');
  if (ctaDeliveryBtn) ctaDeliveryBtn.onclick = () => navigateTo('services');

  const servicesOrderBtn = document.getElementById('services-order-now-btn');
  if (servicesOrderBtn) servicesOrderBtn.onclick = () => navigateTo('menu');

  // Catering Inquire buttons
  document.querySelectorAll('.catering-inquire-btn').forEach(btn => {
    btn.onclick = () => navigateTo('contact');
  });

  // Menu Search
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      state.menuSearch = e.target.value;
      render();
      // refocus input and restore cursor position
      const updatedInput = document.getElementById('menu-search-input');
      if (updatedInput) {
        updatedInput.focus();
        updatedInput.setSelectionRange(updatedInput.value.length, updatedInput.value.length);
      }
    };
  }

  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (clearSearchBtn) {
    clearSearchBtn.onclick = () => {
      state.menuSearch = '';
      render();
    };
  }

  // Menu Sort
  const sortSelect = document.getElementById('menu-sort-select');
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      state.menuSort = e.target.value;
      render();
    };
  }

  // Category Tabs
  document.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.onclick = () => {
      state.menuFilter = btn.getAttribute('data-category');
      render();
    };
  });

  // Dietary Filters
  document.querySelectorAll('.dietary-filter-btn').forEach(btn => {
    btn.onclick = () => {
      state.menuDietary = btn.getAttribute('data-dietary');
      render();
    };
  });

  // Reset Filters
  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      state.menuFilter = 'all';
      state.menuDietary = 'all';
      state.menuSearch = '';
      render();
    };
  }
  const resetEmptyBtn = document.getElementById('reset-empty-btn');
  if (resetEmptyBtn) {
    resetEmptyBtn.onclick = () => {
      state.menuFilter = 'all';
      state.menuDietary = 'all';
      state.menuSearch = '';
      render();
    };
  }

  // Card Actions: Quick Add
  document.querySelectorAll('[data-action="quick-add"]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const food = FOOD_ITEMS.find(f => f.id === id);
      if (food) {
        addToCart(food, 1);
        showToast(`Added 1x ${food.name} to order!`);
      }
    };
  });

  // Card Actions: View Food
  document.querySelectorAll('[data-action="view-food"]').forEach(elem => {
    elem.onclick = () => {
      const id = elem.getAttribute('data-id');
      if (id) navigateTo('food-detail', id);
    };
  });

  // Card Actions: Toggle Favorite
  document.querySelectorAll('[data-action="toggle-fav"]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        toggleFavorite(id);
        showToast(state.favorites.includes(id) ? 'Saved to delicacies' : 'Removed from delicacies');
      }
    };
  });

  // Component-specific inits
  if (state.currentPage === 'food-detail') initFoodDetailEvents();
  if (state.currentPage === 'contact') initContactEvents();
  if (state.currentPage === 'auth') initAuthEvents();
  if (state.isCartOpen) initCartEvents();
  if (state.isCheckoutOpen) initCheckoutEvents();
  if (state.isReservationOpen) initReservationEvents();
}

// Start application on DOM loaded or immediate
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
