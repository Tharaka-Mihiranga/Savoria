import { CHEF_DATA, RESTAURANT_INFO } from '../data/restaurantData.js';
import { icon } from '../icons.js';
import { navigateTo } from '../state.js';

export function renderAboutPage() {
  const { headChef, team, historyMilestones } = CHEF_DATA;

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 sm:space-y-24">
      
      <!-- HERO & CHEF ESSENCE -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold uppercase tracking-widest">
          Gastronomic Heritage & Artisans
        </div>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold text-[#2C2724]">Our Story & The Kitchen Hearth</h1>
        <p class="text-stone-600 text-sm sm:text-base leading-relaxed">
<<<<<<< HEAD
          Founded in ${RESTAURANT_INFO.foundedYear} on the principle that true luxury is found in hyper-seasonal provenance, patient craft, and honest French soul.
=======
          Founded in ${RESTAURANT_INFO.foundedYear} on the principle that true luxury is found in hyper-seasonal provenance, patient craft, and honest Srilankan soul.
>>>>>>> 1dbc971 (Initial commit)
        </p>
      </div>

      <!-- CHEF DEEP PROFILE -->
      <section class="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200/90 shadow-md">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <!-- Chef Image -->
          <div class="lg:col-span-5">
            <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-3/4">
              <img 
                src="${headChef.image}" 
                alt="${headChef.name}" 
                class="w-full h-full object-cover object-top"
              />
              <div class="absolute bottom-4 left-4 right-4 bg-stone-950/85 backdrop-blur-md p-4 rounded-xl text-stone-100 border border-white/10">
                <span class="text-xs uppercase tracking-widest text-amber-400 font-bold block">${headChef.title}</span>
                <span class="text-base font-serif font-bold text-white">${headChef.name}</span>
                <span class="text-xs text-stone-300 block mt-0.5">Origin: ${headChef.origin} • ${headChef.experience}</span>
              </div>
            </div>
          </div>

          <!-- Chef Philosophy & Bio -->
          <div class="lg:col-span-7 space-y-6">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-amber-800">Master of the Hearth</span>
              <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#2C2724] mt-1">${headChef.name}</h2>
<<<<<<< HEAD
              <p class="text-xs text-stone-500 mt-1">${headChef.experience} in French Haute Cuisine</p>
=======
              <p class="text-xs text-stone-500 mt-1">${headChef.experience} in Srilanka Cuisine</p>
>>>>>>> 1dbc971 (Initial commit)
            </div>

            <blockquote class="border-l-4 border-amber-800 pl-4 py-2 italic font-serif text-base sm:text-lg text-stone-800 leading-relaxed bg-stone-50/70 rounded-r-xl">
              "${headChef.quote}"
            </blockquote>

            <p class="text-sm text-stone-600 leading-relaxed">
              ${headChef.bio}
            </p>

            <p class="text-sm text-stone-600 leading-relaxed">
<<<<<<< HEAD
              Chef Antoine’s culinary creed avoids unneeded theatrics. Every reduction, emulsion, and ember-roasted cut is designed to reveal the pure resonance of ingredients cultivated within hours of harvest at our valley farmstead.
=======
              Chef Silva’s culinary creed avoids unneeded theatrics. Every reduction, emulsion, and ember-roasted cut is designed to reveal the pure resonance of ingredients cultivated within hours of harvest at our valley farmstead.
>>>>>>> 1dbc971 (Initial commit)
            </p>

            <!-- Accolades List -->
            <div class="space-y-2 pt-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-stone-700">Honors & Accolades</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${headChef.accolades.map(acc => `
                  <div class="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs font-medium text-amber-950">
                    ${icon('award', 'w-4 h-4 text-amber-700 shrink-0')}
                    <span>${acc}</span>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- HISTORICAL MILESTONES (12-Year Journey) -->
      <section class="space-y-10">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-amber-800">Evolution of Savoria</span>
          <h2 class="font-serif text-3xl font-bold text-[#2C2724]">Our Historical Milestones</h2>
          <p class="text-xs text-stone-500">From a humble 12-seat room to Metropolis' celebrated dining sanctuary.</p>
        </div>

        <div class="relative border-l-2 border-stone-200 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
          ${historyMilestones.map(mile => `
            <div class="relative group">
              <!-- Marker Point -->
              <div class="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#2C2724] border-4 border-amber-200 text-white flex items-center justify-center text-[10px] font-bold"></div>
              
              <!-- Content Card -->
              <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                  <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-serif font-bold text-xs">
                    ${mile.year}
                  </span>
                  <h3 class="font-serif text-lg font-bold text-stone-900">
                    ${mile.title}
                  </h3>
                </div>
                <p class="text-xs text-stone-600 leading-relaxed">
                  ${mile.description}
                </p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- CULINARY ARTISANS TEAM -->
      <section class="space-y-10">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-amber-800">The Kitchen Guild</span>
          <h2 class="font-serif text-3xl font-bold text-[#2C2724]">Our Master Artisans</h2>
          <p class="text-xs text-stone-500">A collective of pastry artists, cellar curators, and cuisine perfectionists.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${team.map(member => `
            <div class="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div class="h-64 overflow-hidden bg-stone-100 relative">
                <img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover object-center" />
                <div class="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium">
                  ${member.origin}
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 class="font-serif text-xl font-bold text-stone-900">${member.name}</h3>
                  <div class="text-xs font-semibold uppercase tracking-wider text-amber-800 mt-0.5">${member.role}</div>
                  <p class="text-xs text-stone-600 leading-relaxed mt-3">
                    ${member.description}
                  </p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SUSTAINABLE BIO-FARMSTEAD SECTION -->
      <section class="bg-[#24201D] text-stone-100 rounded-3xl p-8 sm:p-12 border border-stone-800">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Valley Bio-Farmstead</span>
            <h2 class="font-serif text-3xl font-bold">15 Acres of Soil Stewardship</h2>
            <p class="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Every morning at dawn, our kitchen van receives fresh heirloom carrots, micro-herbs, wild garlic flowers, and seasonal stone fruits harvested directly from our regenerative bio-farm in the valley.
            </p>
            <div class="grid grid-cols-2 gap-4 pt-2">
              <div class="bg-white/5 p-4 rounded-xl border border-white/5">
                <div class="font-serif text-2xl font-bold text-amber-300">Zero</div>
                <div class="text-[11px] text-stone-400 uppercase tracking-wider mt-1">Chemical Pesticides</div>
              </div>
              <div class="bg-white/5 p-4 rounded-xl border border-white/5">
                <div class="font-serif text-2xl font-bold text-amber-300">100%</div>
                <div class="text-[11px] text-stone-400 uppercase tracking-wider mt-1">Kitchen Composting</div>
              </div>
            </div>
          </div>
          <div class="rounded-2xl overflow-hidden shadow-xl aspect-4/3">
            <img 
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80" 
              alt="Savoria Bio-Farm" 
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  `;
}
