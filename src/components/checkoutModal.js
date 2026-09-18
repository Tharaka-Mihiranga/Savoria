import { state, getCartTotals, clearCart, saveOrders, renderApp } from '../state.js';
import { icon } from '../icons.js';
import { showToast } from './toast.js';

let orderCompletedReceipt = null;

export function renderCheckoutModal() {
  if (!state.isCheckoutOpen) return '';

  const { total, count } = getCartTotals();

  return `
    <div id="checkout-backdrop" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div 
        id="checkout-dialog"
        class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        ${orderCompletedReceipt ? renderSuccessReceipt() : renderCheckoutForm(total, count)}
      </div>
    </div>
  `;
}

function renderCheckoutForm(total, count) {
  return `
    <div class="flex justify-between items-center border-b border-stone-100 pb-4">
      <div>
<<<<<<< HEAD
        <h3 class="font-serif text-2xl font-bold text-stone-900">White-Glove Checkout</h3>
=======
        <h3 class="font-serif text-2xl font-bold text-stone-900">Fast Checkout</h3>
>>>>>>> 1dbc971 (Initial commit)
        <p class="text-xs text-stone-500">${state.deliveryType === 'delivery' ? 'Express Delivery' : 'Bistro Takeout'} • ${count} items</p>
      </div>
      <button id="close-checkout-btn" class="p-2 text-stone-400 hover:text-stone-700 rounded-lg">
        ${icon('x', 'w-5 h-5')}
      </button>
    </div>

    <form id="checkout-form" class="space-y-4">
      <div>
        <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Recipient Name *</label>
        <input 
          id="co-name" 
          type="text" 
          required 
          value="${state.currentUser ? state.currentUser.name : ''}" 
          placeholder="e.g. Marcella Sterling" 
          class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-800"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Phone Number *</label>
          <input 
            id="co-phone" 
            type="tel" 
            required 
            placeholder="+1 (555) 000-0000" 
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
        </div>
        <div>
          <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Email for Receipt *</label>
          <input 
            id="co-email" 
            type="email" 
            required 
            value="${state.currentUser ? state.currentUser.email : ''}" 
            placeholder="guest@domain.com" 
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
        </div>
      </div>

      ${state.deliveryType === 'delivery' ? `
        <div>
          <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Delivery Address *</label>
          <input 
            id="co-address" 
            type="text" 
            required 
<<<<<<< HEAD
            placeholder="e.g. Apt 4B, 742 Evergreen Terrace, Metropolis" 
=======
            placeholder="e.g. Apt 4B, 742 Evergreen Terrace, Srilnka" 
>>>>>>> 1dbc971 (Initial commit)
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
        </div>

        <div>
          <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Courier Gate / Door Code</label>
          <input 
            id="co-notes" 
            type="text" 
            placeholder="e.g. Ring code #1294, leave with doorman" 
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
        </div>
      ` : `
        <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
          <strong class="font-semibold block">Pick-Up Sanctuary:</strong>
          <span>428 Heritage Boulevard, Culinary District. Your order will be boxed in heated presentation packaging at the host stand.</span>
        </div>
      `}

      <!-- Payment Method -->
      <div class="space-y-2 pt-1">
        <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block">Payment Preference</label>
        <div class="grid grid-cols-3 gap-2">
          <label class="border border-amber-800 bg-amber-50/80 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer text-xs font-semibold text-amber-950">
            <input type="radio" name="payment-method" value="card" checked class="hidden" />
            ${icon('credit-card', 'w-4 h-4 text-amber-800 mb-1')}
            <span>Credit Card</span>
          </label>
          <label class="border border-stone-200 bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer text-xs font-medium text-stone-700 hover:bg-stone-50">
            <input type="radio" name="payment-method" value="apple" class="hidden" />
            ${icon('sparkles', 'w-4 h-4 text-stone-700 mb-1')}
            <span>Apple Pay</span>
          </label>
          <label class="border border-stone-200 bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer text-xs font-medium text-stone-700 hover:bg-stone-50">
            <input type="radio" name="payment-method" value="arrival" class="hidden" />
            ${icon('shield-check', 'w-4 h-4 text-stone-700 mb-1')}
            <span>On Delivery</span>
          </label>
        </div>
      </div>

      <!-- Submit Order Button -->
      <div class="pt-4 border-t border-stone-100">
        <button 
          type="submit"
          class="w-full py-4 px-6 rounded-xl bg-[#2C2724] hover:bg-amber-900 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          ${icon('shield-check', 'w-4 h-4 text-amber-300')}
          <span>Authorize Order • $${total.toFixed(2)}</span>
        </button>
      </div>
    </form>
  `;
}

function renderSuccessReceipt() {
  const o = orderCompletedReceipt;
  return `
    <div class="text-center space-y-4 py-4">
      <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
        ${icon('check-circle', 'w-8 h-8')}
      </div>

      <div class="space-y-1">
        <span class="text-xs uppercase tracking-widest text-emerald-800 font-bold">Order Confirmed & Sent to Hearth</span>
        <h3 class="font-serif text-3xl font-bold text-stone-900">${o.id}</h3>
        <p class="text-xs text-stone-500">Estimated delivery: 30 - 45 mins</p>
      </div>

      <div class="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left text-xs space-y-2">
        <div class="font-semibold text-stone-900 border-b border-stone-200 pb-2">Order Summary:</div>
        ${o.items.map(item => `
          <div class="flex justify-between text-stone-600">
            <span>${item.quantity}x ${item.name}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('')}
        <div class="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-200">
          <span>Total Paid:</span>
          <span class="font-serif text-sm text-amber-900">$${o.total.toFixed(2)}</span>
        </div>
      </div>

      <button 
        id="dismiss-order-receipt-btn"
        class="w-full py-3.5 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        Return to Experience
      </button>
    </div>
  `;
}

export function initCheckoutEvents() {
  const closeBtn = document.getElementById('close-checkout-btn');
  const backdrop = document.getElementById('checkout-backdrop');
  const form = document.getElementById('checkout-form');
  const dismissBtn = document.getElementById('dismiss-order-receipt-btn');

  if (closeBtn) {
    closeBtn.onclick = () => {
      state.isCheckoutOpen = false;
      orderCompletedReceipt = null;
      renderApp();
    };
  }

  if (backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) {
        state.isCheckoutOpen = false;
        orderCompletedReceipt = null;
        renderApp();
      }
    };
  }

  if (dismissBtn) {
    dismissBtn.onclick = () => {
      state.isCheckoutOpen = false;
      orderCompletedReceipt = null;
      renderApp();
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const { total } = getCartTotals();
      const newOrder = {
        id: 'SAV-' + Math.floor(10000 + Math.random() * 90000),
        date: 'Just now',
        items: [...state.cart],
        total,
        status: 'Preparing at Hearth',
        type: state.deliveryType === 'delivery' ? 'Delivery' : 'Pick-Up'
      };

      state.orders.unshift(newOrder);
      saveOrders();
      clearCart();
      orderCompletedReceipt = newOrder;
<<<<<<< HEAD
      showToast('Order confirmed! Chef Antoine is preparing your dishes.');
=======
      showToast('Order confirmed! Chef Silva is preparing your dishes.');
>>>>>>> 1dbc971 (Initial commit)
      renderApp();
    };
  }
}
