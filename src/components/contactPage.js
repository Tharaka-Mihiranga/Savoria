import { RESTAURANT_INFO } from '../data/restaurantData.js';
import { icon } from '../icons.js';
import { showToast } from './toast.js';

export function renderContactPage() {
  const faqs = [
    {
      q: 'What is the recommended dining room dress code?',
      a: 'We welcome smart elegant or elevated casual attire. We kindly request that guests refrain from athletic wear, swimwear, or casual flip-flops in the evening dining rooms.'
    },
    {
      q: 'Is valet parking available upon arrival?',
      a: 'Yes, complimentary white-glove valet parking is provided directly in front of our portico at 428 Heritage Boulevard from 5:00 PM onward every evening.'
    },
    {
      q: 'Can the kitchen accommodate severe dietary allergies?',
      a: 'Absolutely. Chef Antoine and his team craft dedicated gluten-free, dairy-free, vegetarian, and vegan variations for almost every course. Please specify your allergy in the order notes or concierge message.'
    },
    {
      q: 'How far in advance can private catering and banquets be booked?',
      a: 'Private dining, executive banquets, and off-premise catering are booked up to 90 days in advance. Reach out via our concierge form to discuss date availability.'
    }
  ];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      <!-- HEADER -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold uppercase tracking-widest">
          Concierge & Guest Relations
        </div>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold text-[#2C2724]">Contact & Dining Hours</h1>
        <p class="text-stone-600 text-sm sm:text-base leading-relaxed">
          We invite your inquiries regarding bespoke catering, private chef services, cellar tastings, and dietary accommodations.
        </p>
      </div>

      <!-- MAIN CONTACT GRID (Form on Left, Details on Right) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Left: Concierge Message Form -->
        <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
          <div class="space-y-2">
            <h2 class="font-serif text-2xl font-bold text-stone-900">Send an Inquiry to Our Concierge</h2>
            <p class="text-xs text-stone-500">We respond to all guest inquiries within 2 business hours.</p>
          </div>

          <form id="concierge-contact-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="contact-name" class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Your Full Name *
                </label>
                <input 
                  id="contact-name"
                  type="text" 
                  required
                  placeholder="e.g. Vivienne Westwood"
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm bg-stone-50/50"
                />
              </div>

              <div>
                <label for="contact-email" class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Email Address *
                </label>
                <input 
                  id="contact-email"
                  type="email" 
                  required
                  placeholder="name@domain.com"
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm bg-stone-50/50"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="contact-phone" class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Phone Number
                </label>
                <input 
                  id="contact-phone"
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm bg-stone-50/50"
                />
              </div>

              <div>
                <label for="contact-topic" class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Subject / Topic
                </label>
                <select 
                  id="contact-topic"
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm bg-white"
                >
                  <option value="general">General Inquiries & Hospitality</option>
                  <option value="private-dining">Private Dining & Banquets</option>
                  <option value="catering">Off-Premise Bespoke Catering</option>
                  <option value="sommelier">Sommelier Cellar Experience</option>
                  <option value="feedback">Culinary Experience Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label for="contact-message" class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                Message / Details *
              </label>
              <textarea 
                id="contact-message"
                required
                rows="4" 
                placeholder="How may our concierge team be of assistance to you today?"
                class="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm bg-stone-50/50"
              ></textarea>
            </div>

            <button 
              type="submit"
              class="w-full py-3.5 px-6 rounded-xl bg-[#2C2724] hover:bg-amber-900 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Transmit Message to Concierge</span>
              ${icon('arrow-right', 'w-4 h-4 text-amber-300')}
            </button>
          </form>
        </div>

        <!-- Right: Contact Cards & Operating Hours -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Direct Contact Cards -->
          <div class="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-4">
            <h3 class="font-serif text-lg font-bold text-stone-900">Direct Concierge Details</h3>
            
            <div class="space-y-3 text-xs text-stone-700">
              <div class="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                ${icon('map-pin', 'w-5 h-5 text-amber-800 shrink-0 mt-0.5')}
                <div>
                  <strong class="block text-stone-900 font-semibold">Bistro Sanctuary Address</strong>
                  <span>${RESTAURANT_INFO.address}</span>
                  <span class="block text-[11px] text-stone-500 mt-0.5">Complimentary Valet at Portico</span>
                </div>
              </div>

              <div class="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                ${icon('phone', 'w-5 h-5 text-amber-800 shrink-0 mt-0.5')}
                <div>
                  <strong class="block text-stone-900 font-semibold">Guest Concierge Desk</strong>
                  <span class="font-medium">${RESTAURANT_INFO.reservationPhone}</span>
                  <span class="block text-[11px] text-stone-500 mt-0.5">Direct Line: ${RESTAURANT_INFO.phone}</span>
                </div>
              </div>

              <div class="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                ${icon('mail', 'w-5 h-5 text-amber-800 shrink-0 mt-0.5')}
                <div>
                  <strong class="block text-stone-900 font-semibold">Direct Email Inquiries</strong>
                  <span>${RESTAURANT_INFO.email}</span>
                  <span class="block text-[11px] text-stone-500 mt-0.5">Private Events: ${RESTAURANT_INFO.cateringEmail}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Operating Hours Card -->
          <div class="bg-[#24201D] text-stone-100 rounded-3xl p-6 border border-stone-800 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-serif text-lg font-bold text-amber-200">Dining Room Hours</h3>
              <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                Accepting Guests
              </span>
            </div>

            <div class="space-y-3 text-xs divide-y divide-stone-800/80">
              ${RESTAURANT_INFO.hours.map(h => `
                <div class="pt-2.5 first:pt-0">
                  <div class="font-semibold text-stone-200 mb-1">${h.days}</div>
                  <div class="flex justify-between text-stone-400">
                    <span>Lunch Service:</span>
                    <span class="text-stone-300 font-medium">${h.lunch}</span>
                  </div>
                  <div class="flex justify-between text-stone-400">
                    <span>Dinner Service:</span>
                    <span class="text-stone-300 font-medium">${h.dinner}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>

      <!-- FAQ ACCORDION -->
      <section class="space-y-6 pt-4">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-amber-800">Frequently Asked Inquiries</span>
          <h2 class="font-serif text-3xl font-bold text-[#2C2724]">Guest Dining Guidelines</h2>
        </div>

        <div class="max-w-3xl mx-auto space-y-3" id="faq-accordion-container">
          ${faqs.map((faq, idx) => `
            <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <button 
                class="faq-toggle-btn w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-stone-50 transition-colors"
                data-idx="${idx}"
              >
                <span class="font-serif text-base font-semibold text-stone-900">${faq.q}</span>
                <span class="faq-icon text-amber-800 transform transition-transform duration-200">
                  ${icon('chevron-down', 'w-4 h-4')}
                </span>
              </button>
              <div class="faq-content hidden px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                ${faq.a}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

    </div>
  `;
}

export function initContactEvents() {
  const form = document.getElementById('concierge-contact-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      showToast(`Thank you, ${name}! Your inquiry has been forwarded to our Head Concierge.`);
      form.reset();
    };
  }

  // FAQ Accordion toggles
  document.querySelectorAll('.faq-toggle-btn').forEach(btn => {
    btn.onclick = () => {
      const container = btn.closest('.bg-white');
      const content = container.querySelector('.faq-content');
      const iconSpan = btn.querySelector('.faq-icon');
      
      const isOpen = !content.classList.contains('hidden');
      if (isOpen) {
        content.classList.add('hidden');
        iconSpan.classList.remove('rotate-180');
      } else {
        content.classList.remove('hidden');
        iconSpan.classList.add('rotate-180');
      }
    };
  });
}
