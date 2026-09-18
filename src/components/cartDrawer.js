import { state, getCartTotals, updateCartQuantity, removeFromCart, clearCart, renderApp } from '../state.js';
import { icon } from '../icons.js';
import { showToast } from './toast.js';

export function renderCartDrawer() {
  if (!state.isCartOpen) return '';

  const { subtotal, discount, deliveryFee, tax, total, count } = getCartTotals();

  return `
    <div id="cart-backdrop" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        id="cart-panel"
        class="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 overflow-hidden transform transition-transform duration-300"
      >
        <!-- Top Header -->
        <div class="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div class="flex items-center gap-2">
            <span class="p-2 rounded-xl bg-amber-50 text-amber-900">
              ${icon('shopping-bag', 'w-5 h-5')}
            </span>
            <div>
              <h3 class="font-serif text-lg font-bold text-stone-900">Your Order Cart</h3>
              <span class="text-xs text-stone-500">${count} item${count === 1 ? '' : 's'} selected</span>
            </div>
          </div>
          <button id="close-cart-btn" class="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors">
            ${icon('x', 'w-5 h-5')}
          </button>
        </div>

        <!-- Order Type Toggle (Delivery vs Pickup) -->
        <div class="px-5 py-3 bg-stone-100/70 border-b border-stone-200 flex gap-2">
          <button 
            id="cart-type-delivery"
            class="flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              state.deliveryType === 'delivery' ? 'bg-[#2C2724] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200/60'
            }"
          >
            ${icon('truck', 'w-3.5 h-3.5')}
            <span>Delivery (30-45m)</span>
          </button>
          <button 
            id="cart-type-pickup"
            class="flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              state.deliveryType === 'pickup' ? 'bg-[#2C2724] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200/60'
            }"
          >
            ${icon('store', 'w-3.5 h-3.5')}
            <span>Pick-Up at Bistro</span>
          </button>
        </div>

        <!-- Cart Items List -->
        <div class="flex-1 overflow-y-auto p-5 space-y-4">
          ${state.cart.length === 0 ? `
            <div class="text-center py-16 space-y-3">
              <div class="w-16 h-16 rounded-full bg-stone-200/60 text-stone-400 flex items-center justify-center mx-auto">
                ${icon('shopping-bag', 'w-8 h-8')}
              </div>
              <p class="font-serif text-lg font-bold text-stone-800">Your Order is Empty</p>
              <p class="text-xs text-stone-500 max-w-xs mx-auto">
                Discover Chef Antoine's signature creations and add them to your fine dining experience.
              </p>
            </div>
          ` : `
            <div class="space-y-3">
              ${state.cart.map((item, index) => `
                <div class="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex gap-3 items-center">
                  <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover shrink-0" />
                  
                  <div class="flex-1 min-w-0 space-y-1">
                    <div class="flex justify-between items-start">
                      <h4 class="font-serif text-sm font-bold text-stone-900 truncate pr-2">${item.name}</h4>
                      <button 
                        data-cart-remove="${index}" 
                        class="text-stone-400 hover:text-rose-600 transition-colors"
                        title="Remove dish"
                      >
                        ${icon('trash-2', 'w-3.5 h-3.5')}
                      </button>
                    </div>

                    ${(item.selectedSide || item.selectedSpice) ? `
                      <div class="text-[10px] text-stone-500 truncate">
                        ${[item.selectedSide, item.selectedSpice].filter(Boolean).join(' • ')}
                      </div>
                    ` : ''}

                    <div class="flex justify-between items-center pt-1">
                      <span class="font-serif font-bold text-sm text-amber-900">$${(item.price * item.quantity).toFixed(2)}</span>
                      
                      <!-- Quantity +/- -->
                      <div class="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
                        <button 
                          data-cart-delta="${index}" 
                          data-val="-1" 
                          class="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded text-xs"
                        >
                          -
                        </button>
                        <span class="w-6 text-center text-xs font-bold text-stone-900">${item.quantity}</span>
                        <button 
                          data-cart-delta="${index}" 
                          data-val="1" 
                          class="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Footer / Checkout Breakdown -->
        ${state.cart.length > 0 ? `
          <div class="p-5 bg-white border-t border-stone-200 space-y-4">
            
            <!-- Promo Code Input -->
            <div class="flex gap-2">
              <input 
                id="promo-code-input"
                type="text" 
                placeholder="Promo code (e.g. SAVORIA10)"
                value="${state.appliedPromo ? state.appliedPromo.code : ''}"
                class="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-800 bg-stone-50"
              />
              <button 
                id="apply-promo-btn"
                class="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
              >
                ${state.appliedPromo ? 'Applied' : 'Apply'}
              </button>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span class="font-medium text-stone-900">$${subtotal.toFixed(2)}</span>
              </div>
              ${discount > 0 ? `
                <div class="flex justify-between text-emerald-700">
                  <span>Connoisseur Discount (10%):</span>
                  <span>-$${discount.toFixed(2)}</span>
                </div>
              ` : ''}
              <div class="flex justify-between">
                <span>Estimated Tax (8.5%):</span>
                <span>$${tax.toFixed(2)}</span>
              </div>
              <div class="flex justify-between">
                <span>White-Glove Delivery:</span>
                <span class="${deliveryFee === 0 ? 'text-emerald-700 font-semibold' : ''}">
                  ${deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div class="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total Amount:</span>
                <span class="font-serif text-base text-amber-900">$${total.toFixed(2)}</span>
              </div>
            </div>

            <!-- Checkout CTA Button -->
            <button 
              id="proceed-checkout-btn"
              class="w-full py-3.5 px-4 rounded-xl bg-[#2C2724] hover:bg-amber-900 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              ${icon('arrow-right', 'w-4 h-4 text-amber-300')}
            </button>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

export function initCartEvents() {
  const closeBtn = document.getElementById('close-cart-btn');
  const backdrop = document.getElementById('cart-backdrop');
  const checkoutBtn = document.getElementById('proceed-checkout-btn');
  const deliveryBtn = document.getElementById('cart-type-delivery');
  const pickupBtn = document.getElementById('cart-type-pickup');
  const applyPromoBtn = document.getElementById('apply-promo-btn');

  if (closeBtn) {
    closeBtn.onclick = () => {
      state.isCartOpen = false;
      renderApp();
    };
  }

  if (backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) {
        state.isCartOpen = false;
        renderApp();
      }
    };
  }

  if (deliveryBtn && pickupBtn) {
    deliveryBtn.onclick = () => {
      state.deliveryType = 'delivery';
      renderApp();
    };
    pickupBtn.onclick = () => {
      state.deliveryType = 'pickup';
      renderApp();
    };
  }

  // Remove / Delta buttons
  document.querySelectorAll('[data-cart-remove]').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-cart-remove'), 10);
      removeFromCart(idx);
    };
  });

  document.querySelectorAll('[data-cart-delta]').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-cart-delta'), 10);
      const val = parseInt(btn.getAttribute('data-val'), 10);
      updateCartQuantity(idx, val);
    };
  });

  // Promo code
  if (applyPromoBtn) {
    applyPromoBtn.onclick = () => {
      const input = document.getElementById('promo-code-input');
      const val = input ? input.value.trim().toUpperCase() : '';
      if (val === 'SAVORIA10') {
        state.appliedPromo = { code: 'SAVORIA10', discountPercent: 10 };
        showToast('Promo code SAVORIA10 applied (10% discount)!');
        renderApp();
      } else if (val) {
        showToast('Invalid promo code. Try SAVORIA10 for 10% off.', 'info');
      }
    };
  }

  // Checkout trigger
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      state.isCartOpen = false;
      state.isCheckoutOpen = true;
      renderApp();
    };
  }
}
