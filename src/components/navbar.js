import { state, navigateTo, getCartTotals, renderApp } from '../state.js';
import { icon } from '../icons.js';
import { RESTAURANT_INFO } from '../data/restaurantData.js';

export function renderNavbar() {
  const { count } = getCartTotals();
  const navLinks = [
    { id: 'home', url: 'index.html', label: 'Home' },
    { id: 'menu', url: 'menu.html', label: 'Menu' },
    { id: 'about', url: 'about.html', label: 'About & Chef' },
    { id: 'services', url: 'services.html', label: 'Services & Delivery' },
    { id: 'contact', url: 'contact.html', label: 'Contact & Hours' }
  ];

  return `
    <header class="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      <!-- Announcement Topbar -->
      <div class="bg-[#1F1D1A] text-stone-300 text-xs py-1.5 px-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Artisanal Seasonal Dining • Free White-Glove Delivery over $75</span>
          </div>
          <div class="hidden md:flex items-center gap-6">
            <span class="flex items-center gap-1.5">${icon('phone', 'w-3.5 h-3.5 text-amber-400')} ${RESTAURANT_INFO.phone}</span>
            <span class="text-stone-500">|</span>
            <span class="flex items-center gap-1.5">${icon('map-pin', 'w-3.5 h-3.5 text-amber-400')} Metropolis Historic District</span>
          </div>
        </div>
      </div>

      <!-- Main Navigation -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo & Brand -->
          <a href="index.html" id="nav-brand-btn" class="flex items-center gap-3 text-left focus:outline-none group">
            <div class="w-11 h-11 rounded-full bg-[#2C2724] text-amber-200 flex items-center justify-center font-serif text-2xl font-bold shadow-md group-hover:bg-amber-900 transition-colors">
              S
            </div>
            <div>
              <span class="font-serif text-2xl font-bold tracking-tight text-[#2C2724] block leading-none">
                ${RESTAURANT_INFO.name}
              </span>
              <span class="text-[10px] tracking-[0.2em] uppercase text-stone-500 font-medium block mt-1">
                Artisanal Bistro
              </span>
            </div>
          </a>

          <!-- Desktop Links -->
          <nav class="hidden md:flex items-center space-x-1 lg:space-x-2">
            ${navLinks.map(link => {
              const isActive = state.currentPage === link.id;
              return `
                <a 
                  href="${link.url}"
                  data-page="${link.id}" 
                  class="nav-page-btn px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'text-amber-900 bg-amber-50 font-semibold shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                  }"
                >
                  ${link.label}
                </a>
              `;
            }).join('')}
          </nav>

          <!-- Right Action Items -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- User Auth / Profile Button -->
            <a 
              href="login.html"
              id="nav-auth-btn"
              class="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-xs font-medium rounded-lg text-stone-700 hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200"
              title="${state.currentUser ? 'My Account' : 'Sign In'}"
            >
              ${icon('user', 'w-4 h-4 text-stone-600')}
              <span class="hidden sm:inline">
                ${state.currentUser ? state.currentUser.name.split(' ')[0] : 'Sign In'}
              </span>
            </a>

            <!-- Shopping Cart Button -->
            <button 
              id="open-cart-btn"
              class="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#2C2724] text-white hover:bg-amber-900 transition-all shadow-sm"
              aria-label="View Cart"
            >
              ${icon('shopping-bag', 'w-4 h-4 text-amber-300')}
              <span class="text-xs font-semibold hidden sm:inline">Order Cart</span>
              ${count > 0 ? `
                <span class="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold rounded-full bg-amber-500 text-stone-950 ml-0.5 animate-scale">
                  ${count}
                </span>
              ` : ''}
            </button>

            <!-- Mobile Hamburger Menu Button -->
            <button 
              id="mobile-menu-toggle-btn"
              class="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors focus:outline-none"
            >
              ${state.isMobileMenuOpen ? icon('x', 'w-6 h-6') : icon('menu', 'w-6 h-6')}
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      ${state.isMobileMenuOpen ? `
        <div class="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fade-in">
          <div class="flex flex-col space-y-1">
            ${navLinks.map(link => {
              const isActive = state.currentPage === link.id;
              return `
                <a 
                  href="${link.url}"
                  data-page="${link.id}" 
                  class="nav-page-btn text-left px-4 py-2.5 rounded-lg text-base font-medium ${
                    isActive ? 'bg-amber-100 text-amber-950 font-semibold' : 'text-stone-700 hover:bg-stone-100'
                  }"
                >
                  ${link.label}
                </a>
              `;
            }).join('')}
          </div>
          <div class="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <a 
              href="login.html"
              id="mobile-auth-btn"
              class="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg bg-stone-100 text-stone-800 border border-stone-300"
            >
              ${icon('user', 'w-4 h-4')}
              <span>${state.currentUser ? `Account (${state.currentUser.name})` : 'Login / Register'}</span>
            </a>
          </div>
        </div>
      ` : ''}
    </header>
  `;
}
