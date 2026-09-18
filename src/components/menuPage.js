import { FOOD_ITEMS } from '../data/restaurantData.js';
import { state, navigateTo, addToCart, toggleFavorite, renderApp } from '../state.js';
import { icon } from '../icons.js';
import { showToast } from './toast.js';

export function renderMenuPage() {
  const categories = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'starters', label: 'Starters & Crudo' },
    { id: 'mains', label: 'Mains & Hearth' },
    { id: 'pasta', label: 'Handmade Pasta' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Artisan Elixirs' }
  ];

  const dietaryFilters = [
    'all',
    "Chef's Choice",
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Organic',
    'Spicy'
  ];

  // Filtering logic
  let filtered = FOOD_ITEMS.filter(item => {
    // Category filter
    if (state.menuFilter !== 'all' && item.category !== state.menuFilter) {
      return false;
    }
    // Dietary tag filter
    if (state.menuDietary !== 'all') {
      if (!item.tags.includes(state.menuDietary)) return false;
    }
    // Search filter
    if (state.menuSearch.trim() !== '') {
      const q = state.menuSearch.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.shortDescription.toLowerCase().includes(q);
      const matchIng = item.ingredients.some(ing => ing.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchIng) return false;
    }
    return true;
  });

  // Sorting
  if (state.menuSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.menuSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.menuSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (state.menuSort === 'calories') {
    filtered.sort((a, b) => a.calories - b.calories);
  }

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- PAGE HEADER -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold uppercase tracking-widest">
          Haute Cuisine & Seasonality
        </div>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold text-[#2C2724]">Artisanal Menu</h1>
        <p class="text-stone-600 text-sm sm:text-base leading-relaxed">
          Crafted from seasonal botanicals, heritage livestock, and wild-harvested seafood. Prepared to order with temperature-controlled precision.
        </p>
      </div>

      <!-- SEARCH & CONTROLS BAR -->
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200/80 space-y-4">
        
        <div class="flex flex-col md:flex-row gap-4 justify-between items-center">
          <!-- Search Input -->
          <div class="relative w-full md:w-96">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              ${icon('search', 'w-4 h-4')}
            </span>
            <input 
              id="menu-search-input"
              type="text" 
              placeholder="Search dishes, ingredients (e.g. Scallop, Truffle, Fig)..."
              value="${state.menuSearch}"
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm bg-stone-50/50"
            />
            ${state.menuSearch ? `
              <button id="clear-search-btn" class="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700">
                ${icon('x', 'w-4 h-4')}
              </button>
            ` : ''}
          </div>

          <!-- Sorting Selector -->
          <div class="flex items-center gap-2 w-full md:w-auto justify-end">
            <label for="menu-sort-select" class="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0">
              Sort By:
            </label>
            <select 
              id="menu-sort-select"
              class="px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
            >
              <option value="recommended" ${state.menuSort === 'recommended' ? 'selected' : ''}>Chef's Recommendation</option>
              <option value="price-low" ${state.menuSort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${state.menuSort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              <option value="rating" ${state.menuSort === 'rating' ? 'selected' : ''}>Connoisseur Rating (4.9+)</option>
              <option value="calories" ${state.menuSort === 'calories' ? 'selected' : ''}>Calories: Light to Rich</option>
            </select>
          </div>
        </div>

        <!-- CATEGORY TABS -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 pt-2 border-t border-stone-100 scrollbar-none">
          ${categories.map(cat => {
            const isActive = state.menuFilter === cat.id;
            return `
              <button 
                data-category="${cat.id}"
                class="category-tab-btn px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                  isActive 
                    ? 'bg-[#2C2724] text-amber-200 shadow-sm' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                }"
              >
                ${cat.label}
              </button>
            `;
          }).join('')}
        </div>

        <!-- DIETARY PILL FILTERS -->
        <div class="flex items-center gap-2 overflow-x-auto pt-2 border-t border-stone-100/60">
          <span class="text-[11px] font-bold text-stone-400 uppercase tracking-widest shrink-0 mr-1">
            Dietary:
          </span>
          ${dietaryFilters.map(diet => {
            const isActive = state.menuDietary === diet;
            return `
              <button 
                data-dietary="${diet}"
                class="dietary-filter-btn px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
                  isActive 
                    ? 'bg-amber-800 text-white shadow-xs' 
                    : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
                }"
              >
                ${diet === 'all' ? 'All Diets' : diet}
              </button>
            `;
          }).join('')}
        </div>

      </div>

      <!-- RESULTS COUNT -->
      <div class="flex justify-between items-center text-xs text-stone-500 px-1">
        <span>Displaying <strong class="text-stone-900 font-semibold">${filtered.length}</strong> delicacies</span>
        ${(state.menuFilter !== 'all' || state.menuDietary !== 'all' || state.menuSearch) ? `
          <button id="reset-filters-btn" class="text-amber-800 hover:underline font-semibold flex items-center gap-1">
            ${icon('x', 'w-3 h-3')} Reset All Filters
          </button>
        ` : ''}
      </div>

      <!-- DISHES GRID -->
      ${filtered.length === 0 ? `
        <div class="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-4 max-w-md mx-auto">
          <div class="w-14 h-14 mx-auto rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
            ${icon('search', 'w-6 h-6')}
          </div>
          <h3 class="font-serif text-xl font-bold text-stone-800">No Delicacies Match Your Filter</h3>
          <p class="text-xs text-stone-500">
            We couldn't find any dishes matching "${state.menuSearch}". Try adjusting your dietary tags or search terms.
          </p>
          <button id="reset-empty-btn" class="px-6 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-semibold tracking-wider uppercase">
            Reset Filters
          </button>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${filtered.map(food => {
            const isFav = state.favorites.includes(food.id);
            return `
              <div class="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                
                <!-- Food Image & Badges -->
                <div class="relative h-60 overflow-hidden bg-stone-100 cursor-pointer" data-action="view-food" data-id="${food.id}">
                  <img 
                    src="${food.image}" 
                    alt="${food.name}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                    ${food.tags.map(tag => `
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-900/80 text-amber-200 backdrop-blur-md">
                        ${tag}
                      </span>
                    `).join('')}
                  </div>
                  <!-- Favorite Toggle -->
                  <button 
                    data-action="toggle-fav" 
                    data-id="${food.id}"
                    class="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-rose-600 transition-colors shadow-md z-10"
                    title="${isFav ? 'Remove favorite' : 'Add favorite'}"
                  >
                    ${isFav ? icon('heart-filled', 'w-4 h-4 text-rose-600') : icon('heart', 'w-4 h-4')}
                  </button>
                  <div class="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-black/75 text-white text-[11px] font-semibold backdrop-blur-sm pointer-events-none">
                    ${food.prepTime}
                  </div>
                </div>

                <!-- Food Information -->
                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div class="flex justify-between items-start gap-2 mb-1.5">
                      <h3 
                        data-action="view-food" 
                        data-id="${food.id}"
                        class="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1 cursor-pointer"
                      >
                        ${food.name}
                      </h3>
                      <span class="font-serif text-xl font-bold text-amber-900 shrink-0">
                        $${food.price}
                      </span>
                    </div>
                    <p class="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      ${food.shortDescription}
                    </p>
                  </div>

                  <!-- Ingredients & Details Preview -->
                  <div class="space-y-2">
                    <div class="flex flex-wrap gap-1">
                      ${food.ingredients.slice(0, 3).map(ing => `
                        <span class="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                          ${ing}
                        </span>
                      `).join('')}
                      ${food.ingredients.length > 3 ? `<span class="text-[10px] text-stone-400 self-center">+${food.ingredients.length - 3} more</span>` : ''}
                    </div>

                    <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span class="flex items-center gap-1 text-amber-700 font-medium">
                        ${icon('star-filled', 'w-3.5 h-3.5 text-amber-500')}
                        ${food.rating} (${food.reviewCount})
                      </span>
                      <span>${food.calories} kcal</span>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="grid grid-cols-2 gap-2 pt-1">
                    <button 
                      data-action="view-food" 
                      data-id="${food.id}"
                      class="py-2 px-3 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors text-center"
                    >
                      Food Details
                    </button>
                    <button 
                      data-action="quick-add" 
                      data-id="${food.id}"
                      class="py-2 px-3 rounded-xl bg-[#2C2724] hover:bg-amber-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      ${icon('plus', 'w-3.5 h-3.5 text-amber-300')}
                      <span>Order</span>
                    </button>
                  </div>

                </div>

              </div>
            `;
          }).join('')}
        </div>
      `}

    </div>
  `;
}
