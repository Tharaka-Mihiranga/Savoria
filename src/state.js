import { FOOD_ITEMS } from './data/restaurantData.js';

// Local storage keys
const CART_KEY = 'savoria_cart';
const USER_KEY = 'savoria_user';
const ORDERS_KEY = 'savoria_orders';
const FAVORITES_KEY = 'savoria_favorites';

// Default initial state
export const state = {
  currentPage: 'home', // 'home' | 'menu' | 'food-detail' | 'about' | 'services' | 'contact' | 'auth'
  selectedFoodId: 'food-1',
  menuFilter: 'all',
  menuDietary: 'all',
  menuSearch: '',
  menuSort: 'recommended',
  
  cart: loadFromStorage(CART_KEY, []),
  deliveryType: 'delivery', // 'delivery' | 'pickup'
  appliedPromo: null, // { code: 'SAVORIA10', discountPercent: 10 }
  
  currentUser: loadFromStorage(USER_KEY, null),
  orders: loadFromStorage(ORDERS_KEY, [
    {
      id: 'SAV-88421',
      date: 'Yesterday, 7:15 PM',
      items: [
        { name: 'Prime Black Angus Filet Mignon', quantity: 1, price: 48 },
        { name: 'Smoked Rosemary Fig Elixir', quantity: 2, price: 13 }
      ],
      total: 81.25,
      status: 'Delivered',
      type: 'Delivery'
    }
  ]),
  favorites: loadFromStorage(FAVORITES_KEY, ['food-1', 'food-3', 'food-7']),
  
  // UI states
  isCartOpen: false,
  isCheckoutOpen: false,
  isReservationOpen: false,
  isMobileMenuOpen: false,
  reservationData: {
    guests: '2 Guests',
    date: new Date().toISOString().split('T')[0],
    time: '7:00 PM',
    sanctuary: 'Main Dining Hall'
  }
};

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  } catch (e) {}
}

export function saveUser() {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(state.currentUser));
  } catch (e) {}
}

export function saveOrders() {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(state.orders));
  } catch (e) {}
}

export function saveFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
  } catch (e) {}
}

// Navigation helper
export function navigateTo(page, foodId = null) {
  state.currentPage = page;
  if (foodId) {
    state.selectedFoodId = foodId;
  }
  state.isMobileMenuOpen = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
}

// Global render trigger
let globalRender = () => {};
export function registerRenderer(fn) {
  globalRender = fn;
}
export function renderApp() {
  globalRender();
}

// Cart helpers
export function addToCart(foodItem, quantity = 1, side = null, spice = null, specialInstructions = '') {
  const existingIndex = state.cart.findIndex(
    item => item.id === foodItem.id && 
            item.selectedSide === side && 
            item.selectedSpice === spice && 
            item.specialInstructions === specialInstructions
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: foodItem.id,
      name: foodItem.name,
      price: foodItem.price,
      image: foodItem.image,
      quantity,
      selectedSide: side,
      selectedSpice: spice,
      specialInstructions
    });
  }
  saveCart();
  renderApp();
}

export function updateCartQuantity(index, delta) {
  if (index >= 0 && index < state.cart.length) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
    renderApp();
  }
}

export function removeFromCart(index) {
  if (index >= 0 && index < state.cart.length) {
    state.cart.splice(index, 1);
    saveCart();
    renderApp();
  }
}

export function clearCart() {
  state.cart = [];
  state.appliedPromo = null;
  saveCart();
  renderApp();
}

export function toggleFavorite(foodId) {
  const index = state.favorites.indexOf(foodId);
  if (index > -1) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push(foodId);
  }
  saveFavorites();
  renderApp();
}

export function getCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = state.appliedPromo ? (subtotal * state.appliedPromo.discountPercent) / 100 : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const deliveryFee = state.deliveryType === 'pickup' || discountedSubtotal >= 75 || discountedSubtotal === 0 ? 0 : 4.50;
  const tax = discountedSubtotal * 0.085;
  const total = discountedSubtotal > 0 ? discountedSubtotal + deliveryFee + tax : 0;
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, discount, deliveryFee, tax, total, count };
}
