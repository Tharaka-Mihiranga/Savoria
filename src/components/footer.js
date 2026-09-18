import { RESTAURANT_INFO } from '../data/restaurantData.js';
import { icon } from '../icons.js';

export function renderFooter() {
  return `
    <footer class="bg-[#1C1A17] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          <!-- Column 1: Brand & Philosophy -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-amber-600/20 text-amber-400 flex items-center justify-center font-serif text-xl font-bold border border-amber-500/30">
                S
              </div>
              <div>
                <span class="font-serif text-2xl font-bold text-stone-100">${RESTAURANT_INFO.name}</span>
                <span class="block text-[10px] uppercase tracking-widest text-amber-400">Artisanal Bistro</span>
              </div>
            </div>
            <p class="text-xs text-stone-400 leading-relaxed">
              Crafting unforgettable gastronomic memories with farm-to-table reverence, Michelin-inspired French precision, and sustainable heritage stewardship since ${RESTAURANT_INFO.foundedYear}.
            </p>
            <div class="flex items-center gap-3 pt-2 text-stone-400">
              <span class="text-xs text-amber-400/90 font-medium">★★★★★ 4.9 Rating (600+ Reviews)</span>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h4 class="font-serif text-base font-semibold text-stone-100 mb-4 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Navigation
            </h4>
            <ul class="space-y-2 text-sm text-stone-400">
              <li><a href="index.html" class="footer-nav-link hover:text-amber-300 transition-colors">Home Experience</a></li>
              <li><a href="menu.html" class="footer-nav-link hover:text-amber-300 transition-colors">Artisanal Menu & Wine</a></li>
              <li><a href="about.html" class="footer-nav-link hover:text-amber-300 transition-colors">Chef Antoine & History</a></li>
              <li><a href="services.html" class="footer-nav-link hover:text-amber-300 transition-colors">White-Glove Delivery & Catering</a></li>
              <li><a href="contact.html" class="footer-nav-link hover:text-amber-300 transition-colors">Concierge & Inquiries</a></li>
              <li><a href="login.html" class="footer-nav-link hover:text-amber-300 transition-colors">Connoisseur Club Login</a></li>
            </ul>
          </div>

          <!-- Column 3: Hours & Dining -->
          <div>
            <h4 class="font-serif text-base font-semibold text-stone-100 mb-4 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Dining Hours
            </h4>
            <div class="space-y-3 text-xs text-stone-400">
              ${RESTAURANT_INFO.hours.map(h => `
                <div class="border-b border-stone-800/60 pb-2">
                  <div class="font-semibold text-stone-200">${h.days}</div>
                  <div class="flex justify-between text-stone-400 mt-0.5">
                    <span>Lunch: ${h.lunch}</span>
                  </div>
                  <div class="flex justify-between text-stone-400">
                    <span>Dinner: ${h.dinner}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Column 4: Contact & Location -->
          <div>
            <h4 class="font-serif text-base font-semibold text-stone-100 mb-4 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Location & Contact
            </h4>
            <ul class="space-y-3 text-xs text-stone-400">
              <li class="flex items-start gap-2.5">
                ${icon('map-pin', 'w-4 h-4 text-amber-400 mt-0.5 shrink-0')}
                <span>${RESTAURANT_INFO.address}</span>
              </li>
              <li class="flex items-center gap-2.5">
                ${icon('phone', 'w-4 h-4 text-amber-400 shrink-0')}
                <span>Concierge: ${RESTAURANT_INFO.reservationPhone}</span>
              </li>
              <li class="flex items-center gap-2.5">
                ${icon('mail', 'w-4 h-4 text-amber-400 shrink-0')}
                <span>${RESTAURANT_INFO.email}</span>
              </li>
              <li class="pt-2">
                <a href="menu.html" class="block w-full py-2 px-3 bg-amber-900/80 hover:bg-amber-800 text-amber-100 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors border border-amber-700/50 text-center">
                  Order Artisanal Delivery
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div class="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>© ${new Date().getFullYear()} ${RESTAURANT_INFO.name} Artisanal Bistro. All Rights Reserved.</p>
          <div class="flex gap-6">
            <span class="hover:text-stone-400 cursor-pointer">Organic Culinary Certified</span>
            <span class="hover:text-stone-400 cursor-pointer">Zero-Waste Kitchen Pledge</span>
            <span class="hover:text-stone-400 cursor-pointer">Privacy & Dining Etiquette</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}
