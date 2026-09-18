import { FOOD_ITEMS } from '../data/restaurantData.js';
import { state, navigateTo, addToCart, toggleFavorite, renderApp } from '../state.js';
import { icon } from '../icons.js';
import { showToast } from './toast.js';

let localQuantity = 1;
let selectedSide = null;
let selectedSpice = null;
let kitchenNotes = '';

export function renderFoodDetailPage() {
  const food = FOOD_ITEMS.find(item => item.id === state.selectedFoodId) || FOOD_ITEMS[0];
  const isFav = state.favorites.includes(food.id);

  // Set default customizations if not yet set
  if (selectedSide === null && food.customizationOptions?.sides?.length > 0) {
    selectedSide = food.customizationOptions.sides[0];
  }
  if (selectedSpice === null && food.customizationOptions?.spiceLevels?.length > 0) {
    selectedSpice = food.customizationOptions.spiceLevels[0];
  }

  // Complementary dishes (same category or featured, excluding current)
  const pairings = FOOD_ITEMS.filter(item => item.id !== food.id).slice(0, 3);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      <!-- Back Navigation & Breadcrumb -->
      <div class="flex items-center justify-between">
        <a 
          href="menu.html"
          id="back-to-menu-btn"
          class="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-amber-900 transition-colors group"
        >
          <span class="transform group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to Artisanal Menu</span>
        </a>

        <div class="flex items-center gap-3">
          <button 
            id="detail-fav-btn"
            data-id="${food.id}"
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            ${isFav ? icon('heart-filled', 'w-4 h-4 text-rose-600') : icon('heart', 'w-4 h-4')}
            <span>${isFav ? 'Saved in Favorites' : 'Add to Favorites'}</span>
          </button>
        </div>
      </div>

      <!-- MAIN FOOD SPOTLIGHT (2 Columns) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left: Image Gallery & Badges -->
        <div class="lg:col-span-6 space-y-6">
          <div class="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 aspect-4/3">
            <img 
              src="${food.image}" 
              alt="${food.name}"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-4 left-4 flex flex-wrap gap-2">
              ${food.tags.map(tag => `
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-black/75 text-amber-200 backdrop-blur-md">
                  ${tag}
                </span>
              `).join('')}
            </div>
            <div class="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-black/80 text-white text-xs font-medium backdrop-blur-md flex items-center gap-2">
              ${icon('clock', 'w-3.5 h-3.5 text-amber-400')}
              <span>Prep Time: ${food.prepTime}</span>
            </div>
          </div>

          <!-- Nutritional Breakdown Banner -->
          <div class="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
            <h4 class="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-2">
              ${icon('shield-check', 'w-4 h-4 text-amber-700')}
              Nutritional Profile & Macro Composition
            </h4>
            <div class="grid grid-cols-4 gap-3 text-center">
              <div class="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span class="block text-[11px] text-stone-500">Energy</span>
                <span class="font-serif font-bold text-stone-900 text-sm">${food.calories} kcal</span>
              </div>
              <div class="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span class="block text-[11px] text-stone-500">Protein</span>
                <span class="font-serif font-bold text-stone-900 text-sm">${food.nutritionalInfo.protein}</span>
              </div>
              <div class="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span class="block text-[11px] text-stone-500">Carbs</span>
                <span class="font-serif font-bold text-stone-900 text-sm">${food.nutritionalInfo.carbs}</span>
              </div>
              <div class="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span class="block text-[11px] text-stone-500">Fats</span>
                <span class="font-serif font-bold text-stone-900 text-sm">${food.nutritionalInfo.fats}</span>
              </div>
            </div>
          </div>

          <!-- Allergen Advisory -->
          <div class="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
            <span class="mt-0.5">${icon('help-circle', 'w-4 h-4 text-amber-800 shrink-0')}</span>
            <div>
              <strong class="font-semibold">Allergen Notice:</strong> 
              ${food.allergens.length > 0 
                ? `Contains ${food.allergens.join(', ')}. Please notify your server of any severe dietary restrictions.` 
                : 'No major common allergens reported in this preparation.'}
            </div>
          </div>
        </div>

        <!-- Right: Food Details & Customization Form -->
        <div class="lg:col-span-6 space-y-6">
          
          <!-- Title & Price Header -->
          <div class="border-b border-stone-200 pb-6 space-y-3">
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800">
              <span class="capitalize">${food.category}</span>
              <span>•</span>
              <span class="flex items-center gap-1">
                ${icon('star-filled', 'w-3.5 h-3.5 text-amber-500')}
                ${food.rating} (${food.reviewCount} connoisseur reviews)
              </span>
            </div>

            <h1 class="font-serif text-3xl sm:text-4xl font-bold text-[#2C2724] leading-tight">
              ${food.name}
            </h1>

            <div class="text-3xl font-serif font-bold text-amber-900">
              $${food.price}
            </div>

            <p class="text-sm text-stone-700 leading-relaxed pt-2">
              ${food.longDescription}
            </p>
          </div>

          <!-- Farm-to-Table Ingredients -->
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-widest text-stone-700 flex items-center gap-2">
              ${icon('leaf', 'w-3.5 h-3.5 text-emerald-700')}
              Artisanal Ingredients Harvested:
            </label>
            <div class="flex flex-wrap gap-2">
              ${food.ingredients.map(ing => `
                <span class="px-3 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200/60">
                  ${ing}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- CUSTOMIZATION: Side Choice -->
          ${food.customizationOptions?.sides ? `
            <div class="space-y-2 pt-2">
              <label class="text-xs font-bold uppercase tracking-widest text-stone-700 block">
                Select Complimentary Accompaniment:
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${food.customizationOptions.sides.map(side => `
                  <button 
                    data-side="${side}"
                    class="side-select-btn px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                      selectedSide === side 
                        ? 'border-amber-800 bg-amber-50/80 text-amber-950 font-semibold ring-1 ring-amber-800' 
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }"
                  >
                    ${side}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- CUSTOMIZATION: Spice / Seasoning Profile -->
          ${food.customizationOptions?.spiceLevels ? `
            <div class="space-y-2 pt-2">
              <label class="text-xs font-bold uppercase tracking-widest text-stone-700 block">
                Seasoning & Profile Preference:
              </label>
              <div class="flex flex-wrap gap-2">
                ${food.customizationOptions.spiceLevels.map(spice => `
                  <button 
                    data-spice="${spice}"
                    class="spice-select-btn px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                      selectedSpice === spice 
                        ? 'border-amber-800 bg-amber-50/80 text-amber-950 font-semibold ring-1 ring-amber-800' 
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }"
                  >
                    ${spice}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Special Kitchen Instructions -->
          <div class="space-y-2 pt-2">
            <label for="detail-special-notes" class="text-xs font-bold uppercase tracking-widest text-stone-700 block">
              Special Kitchen Notes / Culinary Requests:
            </label>
            <textarea 
              id="detail-special-notes"
              rows="2"
              placeholder="e.g. Extra sauce on side, dressing separate, no onions..."
              class="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-stone-50"
            >${kitchenNotes}</textarea>
          </div>

          <!-- Quantity and Order Button -->
          <div class="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-4">
            <!-- Quantity Counter -->
            <div class="flex items-center border border-stone-300 rounded-xl bg-white p-1">
              <button 
                id="qty-minus-btn"
                class="w-9 h-9 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                title="Decrease quantity"
              >
                ${icon('minus', 'w-4 h-4')}
              </button>
              <span id="detail-qty-display" class="w-12 text-center font-bold text-stone-900 text-sm">
                ${localQuantity}
              </span>
              <button 
                id="qty-plus-btn"
                class="w-9 h-9 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                title="Increase quantity"
              >
                ${icon('plus', 'w-4 h-4')}
              </button>
            </div>

            <!-- Add to Cart CTA -->
            <button 
              id="detail-add-to-cart-btn"
              class="flex-1 w-full py-4 px-6 rounded-xl bg-[#2C2724] hover:bg-amber-900 text-white font-semibold text-sm tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2"
            >
              ${icon('shopping-bag', 'w-4 h-4 text-amber-300')}
              <span>Add to Order • $${food.price * localQuantity}</span>
            </button>
          </div>

        </div>

      </div>

      <!-- REVIEWS & CONNOISSEUR COMMENTS -->
      <section class="border-t border-stone-200 pt-12 space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="font-serif text-2xl font-bold text-stone-900">Guest Connoisseur Reviews</h3>
            <p class="text-xs text-stone-500 mt-1">Authentic dining testimonials from verified guests</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-serif font-bold text-amber-900">${food.rating}</span>
            <div class="flex text-amber-500">
              ${[1,2,3,4,5].map(() => icon('star-filled', 'w-4 h-4')).join('')}
            </div>
            <span class="text-xs text-stone-500">(${food.reviews.length} written reviews)</span>
          </div>
        </div>

        <!-- Existing Reviews List -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="reviews-container">
          ${food.reviews.map(rev => `
            <div class="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-2.5">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-sm text-stone-900">${rev.author}</span>
                <span class="text-[11px] text-stone-400">${rev.date}</span>
              </div>
              <div class="flex text-amber-500">
                ${Array.from({ length: rev.rating }).map(() => icon('star-filled', 'w-3.5 h-3.5')).join('')}
              </div>
              <p class="text-xs text-stone-600 leading-relaxed">
                "${rev.comment}"
              </p>
            </div>
          `).join('')}
        </div>

        <!-- Add A Review Interactive Form -->
        <div class="bg-stone-50 rounded-2xl p-6 border border-stone-200 max-w-xl space-y-4">
          <h4 class="font-serif text-base font-semibold text-stone-900">Share Your Gastronomic Review</h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="text-[11px] font-bold text-stone-600 uppercase block mb-1">Your Name</label>
              <input 
                id="review-author-input"
                type="text" 
                placeholder="e.g. Marcella S." 
                class="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
              />
            </div>
            <div>
              <label class="text-[11px] font-bold text-stone-600 uppercase block mb-1">Rating</label>
              <select id="review-rating-select" class="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white">
                <option value="5">★★★★★ (5 Stars - Superb)</option>
                <option value="4">★★★★☆ (4 Stars - Great)</option>
                <option value="3">★★★☆☆ (3 Stars - Fair)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-[11px] font-bold text-stone-600 uppercase block mb-1">Review Comments</label>
            <textarea 
              id="review-comment-input"
              rows="3" 
              placeholder="Describe flavors, presentation, textures, or wine pairing..." 
              class="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
            ></textarea>
          </div>

          <button 
            id="submit-review-btn" 
            data-food-id="${food.id}"
            class="px-5 py-2.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Publish Guest Review
          </button>
        </div>

      </section>

      <!-- SUGGESTED CHEF PAIRINGS -->
      <section class="border-t border-stone-200 pt-12 space-y-6">
        <div class="text-left">
          <span class="text-xs font-bold uppercase tracking-widest text-amber-800">Sommelier & Chef Recommendation</span>
          <h3 class="font-serif text-2xl font-bold text-stone-900">Complementary Pairings</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          ${pairings.map(p => `
            <div class="bg-white rounded-2xl overflow-hidden border border-stone-200 p-4 flex flex-col justify-between space-y-3 group">
              <div class="h-36 rounded-xl overflow-hidden bg-stone-100">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div>
                <div class="flex justify-between items-center mb-1">
                  <h4 class="font-serif text-sm font-bold text-stone-900 line-clamp-1">${p.name}</h4>
                  <span class="font-serif text-sm font-bold text-amber-900">$${p.price}</span>
                </div>
                <p class="text-[11px] text-stone-500 line-clamp-2">${p.shortDescription}</p>
              </div>
              <a 
                href="food-detail.html?id=${p.id}"
                data-action="view-food" 
                data-id="${p.id}"
                class="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors text-center block"
              >
                View Dish
              </a>
            </div>
          `).join('')}
        </div>
      </section>

    </div>
  `;
}

// Handlers for food detail interactivity
export function initFoodDetailEvents() {
  const minusBtn = document.getElementById('qty-minus-btn');
  const plusBtn = document.getElementById('qty-plus-btn');
  const qtyDisplay = document.getElementById('detail-qty-display');
  const addBtn = document.getElementById('detail-add-to-cart-btn');
  const notesInput = document.getElementById('detail-special-notes');

  if (minusBtn && plusBtn && qtyDisplay) {
    minusBtn.onclick = () => {
      if (localQuantity > 1) {
        localQuantity--;
        qtyDisplay.textContent = localQuantity;
        const food = FOOD_ITEMS.find(item => item.id === state.selectedFoodId);
        if (food && addBtn) {
          addBtn.innerHTML = `${icon('shopping-bag', 'w-4 h-4 text-amber-300')} <span>Add to Order • $${food.price * localQuantity}</span>`;
        }
      }
    };

    plusBtn.onclick = () => {
      localQuantity++;
      qtyDisplay.textContent = localQuantity;
      const food = FOOD_ITEMS.find(item => item.id === state.selectedFoodId);
      if (food && addBtn) {
        addBtn.innerHTML = `${icon('shopping-bag', 'w-4 h-4 text-amber-300')} <span>Add to Order • $${food.price * localQuantity}</span>`;
      }
    };
  }

  // Side buttons
  document.querySelectorAll('.side-select-btn').forEach(btn => {
    btn.onclick = () => {
      selectedSide = btn.getAttribute('data-side');
      document.querySelectorAll('.side-select-btn').forEach(b => {
        b.className = 'side-select-btn px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all border-stone-200 bg-white text-stone-700 hover:bg-stone-50';
      });
      btn.className = 'side-select-btn px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all border-amber-800 bg-amber-50/80 text-amber-950 font-semibold ring-1 ring-amber-800';
    };
  });

  // Spice buttons
  document.querySelectorAll('.spice-select-btn').forEach(btn => {
    btn.onclick = () => {
      selectedSpice = btn.getAttribute('data-spice');
      document.querySelectorAll('.spice-select-btn').forEach(b => {
        b.className = 'spice-select-btn px-3 py-2 rounded-xl border text-xs font-medium transition-all border-stone-200 bg-white text-stone-700 hover:bg-stone-50';
      });
      btn.className = 'spice-select-btn px-3 py-2 rounded-xl border text-xs font-medium transition-all border-amber-800 bg-amber-50/80 text-amber-950 font-semibold ring-1 ring-amber-800';
    };
  });

  // Add to cart click
  if (addBtn) {
    addBtn.onclick = () => {
      const food = FOOD_ITEMS.find(item => item.id === state.selectedFoodId);
      if (food) {
        const notes = notesInput ? notesInput.value.trim() : '';
        addToCart(food, localQuantity, selectedSide, selectedSpice, notes);
        showToast(`Added ${localQuantity}x ${food.name} to order!`);
        localQuantity = 1; // reset counter
      }
    };
  }

  // Favorite button
  const favBtn = document.getElementById('detail-fav-btn');
  if (favBtn) {
    favBtn.onclick = () => {
      const id = favBtn.getAttribute('data-id');
      toggleFavorite(id);
      showToast(state.favorites.includes(id) ? 'Saved to favorites' : 'Removed from favorites');
    };
  }

  // Back button
  const backBtn = document.getElementById('back-to-menu-btn');
  if (backBtn) {
    backBtn.onclick = () => navigateTo('menu');
  }

  // Review form submission
  const submitReviewBtn = document.getElementById('submit-review-btn');
  if (submitReviewBtn) {
    submitReviewBtn.onclick = () => {
      const authorInput = document.getElementById('review-author-input');
      const ratingSelect = document.getElementById('review-rating-select');
      const commentInput = document.getElementById('review-comment-input');
      
      const author = authorInput ? authorInput.value.trim() : '';
      const rating = ratingSelect ? parseInt(ratingSelect.value, 10) : 5;
      const comment = commentInput ? commentInput.value.trim() : '';

      if (!author || !comment) {
        showToast('Please enter your name and review comments.', 'info');
        return;
      }

      const food = FOOD_ITEMS.find(item => item.id === state.selectedFoodId);
      if (food) {
        food.reviews.unshift({
          id: 'r-' + Date.now(),
          author,
          rating,
          date: 'Just now',
          comment
        });
        showToast('Thank you! Your connoisseur review has been published.');
        renderApp();
      }
    };
  }
}
