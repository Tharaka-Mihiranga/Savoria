import { state, saveUser, renderApp, addToCart, navigateTo } from '../state.js';
import { FOOD_ITEMS } from '../data/restaurantData.js';
import { icon } from '../icons.js';
import { showToast } from './toast.js';

let authMode = 'login'; // 'login' | 'signup'

export function renderAuthPage() {
  if (state.currentUser) {
    return renderMemberDashboard();
  }

  return `
    <div class="max-w-xl mx-auto px-4 py-12">
      <div class="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-md space-y-8">
        
        <!-- Header -->
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-full bg-[#2C2724] text-amber-300 flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-2">
            S
          </div>
          <h1 class="font-serif text-3xl font-bold text-stone-900">
            ${authMode === 'login' ? 'Connoisseur Sign In' : 'Create Member Account'}
          </h1>
          <p class="text-xs text-stone-500">
            ${authMode === 'login' 
              ? 'Access your private orders, saved tasting favorites, and exclusive member privileges.' 
              : 'Join the Savoria Epicurean Guild for bespoke member rewards and cellar invites.'}
          </p>
        </div>

        <!-- Auth Tabs (Login vs Sign Up) -->
        <div class="grid grid-cols-2 p-1 bg-stone-100 rounded-xl">
          <button 
            id="tab-login-btn"
            class="py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              authMode === 'login' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
            }"
          >
            Member Sign In
          </button>
          <button 
            id="tab-signup-btn"
            class="py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              authMode === 'signup' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
            }"
          >
            Create Account
          </button>
        </div>

        <!-- Form -->
        <form id="auth-main-form" class="space-y-4">
          ${authMode === 'signup' ? `
            <div>
              <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">Full Name</label>
              <input 
                id="auth-name" 
                type="text" 
                required 
                placeholder="e.g. Eleanor Vance" 
                class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 bg-stone-50/50"
              />
            </div>
          ` : ''}

          <div>
            <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">Email Address</label>
            <input 
              id="auth-email" 
              type="email" 
              required 
              placeholder="e.g. eleanor@epicurean.com" 
              class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 bg-stone-50/50"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">Password</label>
            <input 
              id="auth-password" 
              type="password" 
              required 
              placeholder="••••••••••••" 
              class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 bg-stone-50/50"
            />
          </div>

          <button 
            type="submit" 
            class="w-full py-3.5 px-6 rounded-xl bg-[#2C2724] hover:bg-amber-900 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm mt-2"
          >
            ${authMode === 'login' ? 'Sign In to Account' : 'Register Member Account'}
          </button>
        </form>

        <!-- Instant Demo Logins -->
        <div class="pt-4 border-t border-stone-100 space-y-3">
          <div class="text-[11px] font-bold text-stone-400 uppercase tracking-widest text-center">
            One-Click Instant Demo Access
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button 
              id="demo-login-vip"
              class="py-2.5 px-3 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-amber-950 text-xs font-medium transition-colors text-left flex items-center gap-2"
            >
              ${icon('sparkles', 'w-4 h-4 text-amber-700')}
              <span>VIP: Eleanor (Gold Member)</span>
            </button>
            <button 
              id="demo-login-critic"
              class="py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-medium transition-colors text-left flex items-center gap-2"
            >
              ${icon('award', 'w-4 h-4 text-amber-700')}
              <span>Critic: Dr. Evelyn Reed</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

function renderMemberDashboard() {
  const user = state.currentUser;
  const favItems = FOOD_ITEMS.filter(item => state.favorites.includes(item.id));

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- USER PROFILE HEADER -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-[#2C2724] text-amber-200 font-serif text-2xl font-bold flex items-center justify-center border-2 border-amber-400/30">
            ${user.name.charAt(0)}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-serif text-2xl font-bold text-stone-900">${user.name}</h2>
              <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase">
                ${user.tier || 'Epicurean Club'}
              </span>
            </div>
            <p class="text-xs text-stone-500 mt-0.5">${user.email}</p>
          </div>
        </div>

        <button 
          id="logout-btn"
          class="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          ${icon('log-out', 'w-4 h-4')}
          <span>Sign Out</span>
        </button>
      </div>

      <!-- DASHBOARD TABS -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- LEFT: ORDERS & HISTORY -->
        <div class="lg:col-span-7 space-y-4">
          <h3 class="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            ${icon('clock', 'w-5 h-5 text-amber-800')}
            Recent Orders & History
          </h3>

          ${state.orders.length === 0 ? `
            <div class="bg-white rounded-2xl p-8 text-center border border-stone-200 text-stone-500 text-xs">
              No orders placed yet. Explore our seasonal menu to order delivery!
            </div>
          ` : `
            <div class="space-y-3">
              ${state.orders.map(order => `
                <div class="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs space-y-3">
                  <div class="flex justify-between items-center border-b border-stone-100 pb-2">
                    <div>
                      <span class="font-mono text-xs font-bold text-stone-900">${order.id}</span>
                      <span class="text-[11px] text-stone-400 ml-2">${order.date}</span>
                    </div>
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Delivered' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-900'
                    }">
                      ${order.status}
                    </span>
                  </div>

                  <div class="space-y-1 text-xs text-stone-600">
                    ${order.items.map(item => `
                      <div class="flex justify-between">
                        <span>${item.quantity}x ${item.name}</span>
                        <span class="font-semibold text-stone-800">$${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    `).join('')}
                  </div>

                  <div class="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
                    <span class="text-stone-500">Total Charged:</span>
                    <span class="font-serif text-base font-bold text-amber-900">$${order.total.toFixed(2)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- RIGHT: SAVED FAVORITES -->
        <div class="lg:col-span-5 space-y-4">
          <h3 class="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            ${icon('heart', 'w-5 h-5 text-rose-600')}
            Saved Delicacies (${favItems.length})
          </h3>

          ${favItems.length === 0 ? `
            <div class="bg-white rounded-2xl p-8 text-center border border-stone-200 text-stone-500 text-xs">
              No saved favorites yet. Click the heart icon on any dish to save it here!
            </div>
          ` : `
            <div class="space-y-3">
              ${favItems.map(item => `
                <div class="bg-white rounded-2xl p-3.5 border border-stone-200/90 flex items-center gap-3">
                  <a href="food-detail.html?id=${item.id}" class="shrink-0">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover hover:opacity-90 transition-opacity" />
                  </a>
                  <a href="food-detail.html?id=${item.id}" class="flex-1 min-w-0 hover:text-amber-900 transition-colors">
                    <h4 class="font-serif text-sm font-bold text-stone-900 truncate">${item.name}</h4>
                    <span class="font-serif text-xs font-bold text-amber-900">$${item.price}</span>
                  </a>
                  <button 
                    data-action="quick-add" 
                    data-id="${item.id}"
                    class="p-2 rounded-xl bg-stone-900 hover:bg-amber-900 text-white transition-colors"
                    title="Quick Add to Order"
                  >
                    ${icon('plus', 'w-4 h-4 text-amber-300')}
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>

      </div>

    </div>
  `;
}

export function initAuthEvents() {
  const tabLogin = document.getElementById('tab-login-btn');
  const tabSignup = document.getElementById('tab-signup-btn');
  const authForm = document.getElementById('auth-main-form');
  const demoVip = document.getElementById('demo-login-vip');
  const demoCritic = document.getElementById('demo-login-critic');
  const logoutBtn = document.getElementById('logout-btn');

  if (tabLogin && tabSignup) {
    tabLogin.onclick = () => {
      authMode = 'login';
      renderApp();
    };
    tabSignup.onclick = () => {
      authMode = 'signup';
      renderApp();
    };
  }

  if (authForm) {
    authForm.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email').value;
      const nameInput = document.getElementById('auth-name');
      const name = nameInput ? nameInput.value : email.split('@')[0];

      state.currentUser = {
        name,
        email,
        tier: 'Epicurean Gold Tier'
      };
      saveUser();
      showToast(`Welcome to Savoria, ${name}!`);
      renderApp();
    };
  }

  if (demoVip) {
    demoVip.onclick = () => {
      state.currentUser = {
        name: 'Eleanor Vance',
        email: 'eleanor@epicurean.com',
        tier: 'VIP Gold Patron'
      };
      saveUser();
      showToast('Logged in as VIP Patron Eleanor Vance');
      renderApp();
    };
  }

  if (demoCritic) {
    demoCritic.onclick = () => {
      state.currentUser = {
        name: 'Dr. Evelyn Reed',
        email: 'evelyn@foodcritic.org',
        tier: 'Gastronomy Critic'
      };
      saveUser();
      showToast('Logged in as Connoisseur Critic Dr. Evelyn Reed');
      renderApp();
    };
  }

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      state.currentUser = null;
      saveUser();
      showToast('Signed out of account.');
      renderApp();
    };
  }
}
