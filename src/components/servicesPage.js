import { RESTAURANT_INFO } from '../data/restaurantData.js';
import { icon } from '../icons.js';
import { navigateTo } from '../state.js';

export function renderServicesPage() {
  const { deliveryInfo } = RESTAURANT_INFO;

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 sm:space-y-24">
      
      <!-- HEADER -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold uppercase tracking-widest">
          Culinary Experiences & Delivery
        </div>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold text-[#2C2724]">Services & White-Glove Delivery</h1>
        <p class="text-stone-600 text-sm sm:text-base leading-relaxed">
          From heated temperature-controlled delivery to bespoke in-home private dining and corporate banquets.
        </p>
      </div>

      <!-- ONLINE ORDER & DELIVERY CORE SECTION -->
      <section class="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200/90 shadow-sm space-y-10">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-stone-100 pb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-amber-800">Haute Cuisine At Your Table</span>
            <h2 class="font-serif text-3xl font-bold text-[#2C2724]">White-Glove Delivery Service</h2>
            <p class="text-xs text-stone-500 mt-1">Enjoy Michelin-inspired culinary artistry from the comfort of your private residence.</p>
          </div>
          <a 
            href="menu.html"
            id="services-order-now-btn"
            class="px-8 py-3.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <span>Start Online Order</span>
            ${icon('arrow-right', 'w-4 h-4')}
          </a>
        </div>

        <!-- 4-STEP WORKFLOW -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/70 space-y-3">
            <div class="w-10 h-10 rounded-xl bg-[#2C2724] text-amber-300 flex items-center justify-center font-serif font-bold text-base">
              1
            </div>
            <h4 class="font-serif text-base font-bold text-stone-900">Live Kitchen Prep</h4>
            <p class="text-xs text-stone-600 leading-relaxed">
              Every dish is cooked immediately after your order ticket prints at our kitchen hearth. Never pre-made.
            </p>
          </div>

          <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/70 space-y-3">
            <div class="w-10 h-10 rounded-xl bg-[#2C2724] text-amber-300 flex items-center justify-center font-serif font-bold text-base">
              2
            </div>
            <h4 class="font-serif text-base font-bold text-stone-900">Thermal Packaging</h4>
            <p class="text-xs text-stone-600 leading-relaxed">
              Dishes are sealed inside insulated, eco-friendly containers preserving optimal aroma, crispness, and heat.
            </p>
          </div>

          <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/70 space-y-3">
            <div class="w-10 h-10 rounded-xl bg-[#2C2724] text-amber-300 flex items-center justify-center font-serif font-bold text-base">
              3
            </div>
            <h4 class="font-serif text-base font-bold text-stone-900">Express Courier</h4>
            <p class="text-xs text-stone-600 leading-relaxed">
              Dispatched with single-destination couriers directly to your door in 30 to 45 minutes flat.
            </p>
          </div>

          <div class="bg-stone-50 rounded-2xl p-5 border border-stone-200/70 space-y-3">
            <div class="w-10 h-10 rounded-xl bg-[#2C2724] text-amber-300 flex items-center justify-center font-serif font-bold text-base">
              4
            </div>
            <h4 class="font-serif text-base font-bold text-stone-900">Plating Instructions</h4>
            <p class="text-xs text-stone-600 leading-relaxed">
              Accompanied by Chef Antoine’s printed plating card and garnish recommendations for home presentation.
            </p>
          </div>
        </div>

        <!-- DELIVERY POLICY & ZONES -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <!-- Policy Details -->
          <div class="bg-amber-50/60 rounded-2xl p-6 border border-amber-200/60 space-y-4">
            <h3 class="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
              ${icon('truck', 'w-5 h-5 text-amber-800')}
              Delivery Terms & Guarantees
            </h3>
            <ul class="space-y-2.5 text-xs text-stone-700">
              <li class="flex items-center justify-between border-b border-amber-200/40 pb-2">
                <span class="font-medium text-stone-600">Minimum Order Amount:</span>
                <span class="font-bold text-stone-900">$${deliveryInfo.minimumOrder}.00</span>
              </li>
              <li class="flex items-center justify-between border-b border-amber-200/40 pb-2">
                <span class="font-medium text-stone-600">Standard Delivery Surcharge:</span>
                <span class="font-bold text-stone-900">$${deliveryInfo.standardDeliveryFee.toFixed(2)}</span>
              </li>
              <li class="flex items-center justify-between border-b border-amber-200/40 pb-2">
                <span class="font-medium text-stone-600">Complimentary Free Delivery:</span>
                <span class="font-bold text-emerald-800">Orders over $${deliveryInfo.freeDeliveryThreshold}.00</span>
              </li>
              <li class="flex items-center justify-between border-b border-amber-200/40 pb-2">
                <span class="font-medium text-stone-600">Estimated Delivery Time:</span>
                <span class="font-bold text-stone-900">${deliveryInfo.estimatedTime}</span>
              </li>
              <li class="flex items-center justify-between">
                <span class="font-medium text-stone-600">Temperature Guarantee:</span>
                <span class="font-bold text-stone-900">100% Hot & Crisp Guarantee</span>
              </li>
            </ul>
          </div>

          <!-- Zones Served -->
          <div class="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
            <h3 class="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              ${icon('map-pin', 'w-5 h-5 text-amber-800')}
              Metropolis Delivery Radius
            </h3>
            <p class="text-xs text-stone-500">
              Our direct couriers serve the following prime metropolitan neighborhoods:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${deliveryInfo.zones.map(zone => `
                <div class="flex items-center gap-2 text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200">
                  ${icon('check-circle', 'w-3.5 h-3.5 text-emerald-600 shrink-0')}
                  <span class="font-medium">${zone}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </section>

      <!-- BESPOKE CATERING & PRIVATE DINING -->
      <section class="space-y-8">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-amber-800">Private Events</span>
          <h2 class="font-serif text-3xl font-bold text-[#2C2724]">Bespoke Catering & Banquets</h2>
          <p class="text-xs text-stone-500">Tailored culinary artistry for corporate galas, intimate celebrations, and weddings.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div class="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center">
                ${icon('utensils', 'w-6 h-6')}
              </div>
              <h3 class="font-serif text-xl font-bold text-stone-900">In-Residence Private Chef</h3>
              <p class="text-xs text-stone-600 leading-relaxed">
                Chef Antoine or our Sous Chefs prepare a multi-course tasting menu directly inside your home kitchen, complete with fine china and sommelier pairing.
              </p>
              <div class="text-xs font-semibold text-amber-900">Starting at $180 / guest</div>
            </div>
            <a href="contact.html" class="catering-inquire-btn w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors block text-center">
              Inquire Private Chef
            </a>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center">
                ${icon('users', 'w-6 h-6')}
              </div>
              <h3 class="font-serif text-xl font-bold text-stone-900">Executive Galas & Banquets</h3>
              <p class="text-xs text-stone-600 leading-relaxed">
                Full-service catering for 20 to 180 attendees. Canapés, pass-around hors d'oeuvres, cocktail bars, and synchronized plated dinner courses.
              </p>
              <div class="text-xs font-semibold text-amber-900">Custom tailored menus</div>
            </div>
            <a href="contact.html" class="catering-inquire-btn w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors block text-center">
              Request Banquet Proposal
            </a>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center">
                ${icon('sparkles', 'w-6 h-6')}
              </div>
              <h3 class="font-serif text-xl font-bold text-stone-900">Sommelier Cellar Tastings</h3>
              <p class="text-xs text-stone-600 leading-relaxed">
                Guided sensory journeys led by Mateo Rossi inside our 19th-century exposed brick cellar with 6 rare biodynamic vintages and artisan cheeses.
              </p>
              <div class="text-xs font-semibold text-amber-900">$120 / connoisseur</div>
            </div>
            <a href="contact.html" class="catering-inquire-btn w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors block text-center">
              Reserve Cellar Tasting
            </a>
          </div>

        </div>
      </section>

    </div>
  `;
}
