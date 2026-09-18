import { FOOD_ITEMS, CHEF_DATA, TESTIMONIALS, RESTAURANT_INFO } from '../data/restaurantData.js';
import { state, navigateTo, addToCart, toggleFavorite } from '../state.js';
import { icon } from '../icons.js';
import { showToast } from './toast.js';

export function renderHomePage() {
  const featuredDishes = FOOD_ITEMS.filter(item => item.isFeatured);

  return `
    <div class="space-y-16 sm:space-y-24 pb-16">
      
      <!-- HERO SECTION -->
      <section class="relative min-h-[85vh] flex items-center justify-center bg-[#1A1816] text-stone-100 overflow-hidden px-4 sm:px-6 lg:px-8">
        <!-- Background Imagery with Dark Atmospheric Overlay -->
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80" 
            alt="Savoria Bistro Ambience" 
            class="w-full h-full object-cover object-center opacity-30 scale-105 transform animate-pulse-slow"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-[#1A1816]/70 to-[#1A1816]/50"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto text-center py-20 space-y-8">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase animate-fade-in">
            ${icon('sparkles', 'w-3.5 h-3.5')}
            <span>Gastronomic Sanctuary • Est. 2012</span>
          </div>

          <h1 class="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 leading-[1.15]">
            Where Classical Heritage Meets <span class="italic text-amber-200 font-normal">Modern Gastronomy</span>
          </h1>

          <p class="text-base sm:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Curated by Executive Chef Antoine Laurent in the heart of Metropolis. Honoring heirloom agriculture, Michelin precision, and timeless culinary romance.
          </p>

          <!-- Call to Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="menu.html"
              id="hero-explore-menu-btn"
              class="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-medium text-sm tracking-wider uppercase transition-all shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2"
            >
              <span>Explore Seasonal Menu</span>
              ${icon('arrow-right', 'w-4 h-4')}
            </a>

            <a 
              href="services.html"
              id="hero-services-btn"
              class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-stone-100 font-medium text-sm tracking-wider uppercase backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              ${icon('truck', 'w-4 h-4 text-amber-300')}
              <span>White-Glove Services</span>
            </a>
          </div>

          <!-- Quick Service Badge -->
          <div class="pt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-stone-400">
            <span class="flex items-center gap-2">
              ${icon('truck', 'w-4 h-4 text-amber-400')}
              White-Glove Delivery to Your Door (30-45m)
            </span>
            <span class="hidden sm:inline text-stone-600">•</span>
            <span class="flex items-center gap-2">
              ${icon('shield-check', 'w-4 h-4 text-amber-400')}
              100% Zero-Waste Bio-Farm Sourced
            </span>
          </div>
        </div>
      </section>

      <!-- ACCOLADES & NUMBERS STRIP -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div class="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="border-r border-stone-100 last:border-0 p-2">
            <div class="font-serif text-3xl sm:text-4xl font-bold text-amber-900">22</div>
            <div class="text-xs uppercase tracking-wider text-stone-500 font-semibold mt-1">Years Culinary Mastery</div>
          </div>
          <div class="border-r border-stone-100 last:border-0 p-2">
            <div class="font-serif text-3xl sm:text-4xl font-bold text-amber-900">4.9★</div>
            <div class="text-xs uppercase tracking-wider text-stone-500 font-semibold mt-1">Connoisseur Review Score</div>
          </div>
          <div class="border-r border-stone-100 last:border-0 p-2">
            <div class="font-serif text-3xl sm:text-4xl font-bold text-amber-900">15</div>
            <div class="text-xs uppercase tracking-wider text-stone-500 font-semibold mt-1">Acre Organic Bio-Farm</div>
          </div>
          <div class="p-2">
            <div class="font-serif text-3xl sm:text-4xl font-bold text-amber-900">100%</div>
            <div class="text-xs uppercase tracking-wider text-stone-500 font-semibold mt-1">Ethical Heritage Sourcing</div>
          </div>
        </div>
      </section>

      <!-- CHEF'S SIGNATURE DISHES SHOWCASE -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div class="text-xs font-bold uppercase tracking-widest text-amber-800 flex items-center gap-2 mb-2">
              <span class="w-6 h-0.5 bg-amber-700"></span>
              Epicurean Masterpieces
            </div>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#2C2724]">Chef Antoine's Signature Plates</h2>
            <p class="text-sm text-stone-600 mt-2 max-w-xl">
              Each dish reflects seasonal micro-harvests from our valley farm, cooked with deliberate temperature mastery and presented with artistic restraint.
            </p>
          </div>
          <a 
            href="menu.html"
            id="view-full-menu-btn"
            class="inline-flex items-center gap-2 text-sm font-semibold text-amber-900 hover:text-amber-700 transition-colors group"
          >
            <span>View Complete 12-Dish Menu</span>
            <span class="transform group-hover:translate-x-1 transition-transform">${icon('arrow-right', 'w-4 h-4')}</span>
          </a>
        </div>

        <!-- Dishes Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${featuredDishes.map(food => {
            const isFav = state.favorites.includes(food.id);
            return `
              <div class="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <!-- Dish Image Container -->
                <div class="relative h-64 overflow-hidden bg-stone-100">
                  <img 
                    src="${food.image}" 
                    alt="${food.name}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    ${food.tags.map(tag => `
                      <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-neutral-900/80 text-amber-200 backdrop-blur-md">
                        ${tag}
                      </span>
                    `).join('')}
                  </div>
                  <!-- Favorite Toggle -->
                  <button 
                    data-action="toggle-fav" 
                    data-id="${food.id}"
                    class="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-rose-600 transition-colors shadow-md"
                    title="${isFav ? 'Remove from favorites' : 'Save as favorite'}"
                  >
                    ${isFav ? icon('heart-filled', 'w-4 h-4 text-rose-600') : icon('heart', 'w-4 h-4')}
                  </button>
                  <div class="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/75 text-white text-xs font-semibold backdrop-blur-sm">
                    ${food.prepTime}
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div class="flex justify-between items-start gap-2 mb-2">
                      <h3 class="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
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

                  <!-- Metadata Strip -->
                  <div class="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span class="flex items-center gap-1 text-amber-700 font-medium">
                      ${icon('star-filled', 'w-3.5 h-3.5 text-amber-500')}
                      ${food.rating} (${food.reviewCount})
                    </span>
                    <span>${food.calories} kcal</span>
                  </div>

                  <!-- Actions -->
                  <div class="grid grid-cols-2 gap-2 pt-2">
                    <a 
                      href="food-detail.html?id=${food.id}"
                      data-action="view-food" 
                      data-id="${food.id}"
                      class="py-2.5 px-3 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 hover:border-stone-400 transition-colors text-center flex items-center justify-center"
                    >
                      Food Details
                    </a>
                    <button 
                      data-action="quick-add" 
                      data-id="${food.id}"
                      class="py-2.5 px-3 rounded-xl bg-[#2C2724] hover:bg-amber-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      ${icon('plus', 'w-3.5 h-3.5 text-amber-300')}
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- CHEF BIOGRAPHY & HISTORY TEASER -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-[#24201D] text-stone-100 rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <!-- Chef Portrait -->
            <div class="lg:col-span-5 relative h-96 lg:h-full min-h-[440px]">
              <img 
                src="${CHEF_DATA.headChef.image}" 
                alt="${CHEF_DATA.headChef.name}"
                class="w-full h-full object-cover object-top"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#24201D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#24201D]"></div>
              <div class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold block">Origin</span>
                <span class="text-sm font-serif font-bold">${CHEF_DATA.headChef.origin}</span>
              </div>
            </div>

            <!-- Chef Bio Content -->
            <div class="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/30">
                Master Culinary Artisan
              </div>
              <h2 class="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
                ${CHEF_DATA.headChef.name}
              </h2>
              <div class="text-xs uppercase tracking-widest text-stone-400 font-medium">
                ${CHEF_DATA.headChef.title} • ${CHEF_DATA.headChef.experience}
              </div>

              <blockquote class="border-l-2 border-amber-500 pl-4 py-1 italic font-serif text-base sm:text-lg text-amber-100/90 leading-relaxed">
                "${CHEF_DATA.headChef.quote}"
              </blockquote>

              <p class="text-sm text-stone-300 leading-relaxed">
                ${CHEF_DATA.headChef.bio}
              </p>

              <!-- Chef Accolades Pills -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                ${CHEF_DATA.headChef.accolades.slice(0, 4).map(acc => `
                  <div class="flex items-center gap-2 text-xs text-stone-300 bg-white/5 rounded-lg p-2.5 border border-white/5">
                    ${icon('award', 'w-4 h-4 text-amber-400 shrink-0')}
                    <span>${acc}</span>
                  </div>
                `).join('')}
              </div>

              <div class="pt-4 flex flex-wrap gap-4">
                <a 
                  href="about.html"
                  id="home-chef-about-btn"
                  class="px-6 py-3 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2"
                >
                  <span>Explore 12-Year History & Culinary Team</span>
                  ${icon('arrow-right', 'w-3.5 h-3.5')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <div class="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">Gastronomic Acclaim</div>
          <h2 class="font-serif text-3xl font-bold text-stone-900">Praised by Leading Connoisseurs</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${TESTIMONIALS.map(item => `
            <div class="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4">
              <div class="space-y-3">
                <div class="flex text-amber-500 gap-1">
                  ${[1,2,3,4,5].map(() => icon('star-filled', 'w-4 h-4')).join('')}
                </div>
                <p class="font-serif italic text-stone-700 text-sm leading-relaxed">
                  "${item.quote}"
                </p>
              </div>
              <div class="pt-4 border-t border-stone-100">
                <div class="text-xs font-bold text-stone-900">${item.author}</div>
                <div class="text-[11px] text-amber-800 font-medium">${item.outlet}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- ORDER ONLINE & DELIVERY BANNER -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div class="space-y-4 max-w-2xl text-center lg:text-left">
            <span class="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              Artisanal Gastronomy At Home
            </span>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold">
              Immerse Yourself in the Savoria Gastronomic Experience
            </h2>
            <p class="text-sm text-stone-300">
              Experience culinary excellence delivered with heated white-glove thermal packaging or bespoke private chef catering for your special events.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <a 
              href="menu.html"
              id="cta-menu-btn"
              class="px-8 py-4 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors text-center shadow-lg flex items-center justify-center gap-2"
            >
              Explore Full Menu
            </a>
            <a 
              href="services.html"
              id="cta-order-delivery-btn"
              class="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors text-center backdrop-blur-md flex items-center justify-center"
            >
              Order Online Delivery
            </a>
          </div>
        </div>
      </section>

    </div>
  `;
}
