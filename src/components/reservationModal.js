import { state, renderApp } from '../state.js';
import { icon } from '../icons.js';
import { showToast } from './toast.js';

let reservationConfirmedTicket = null;

export function renderReservationModal() {
  if (!state.isReservationOpen) return '';

  return `
    <div id="reservation-backdrop" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div 
        id="reservation-dialog"
        class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        ${reservationConfirmedTicket ? renderConfirmedTicket() : renderBookingForm()}
      </div>
    </div>
  `;
}

function renderBookingForm() {
  const timeSlots = ['5:30 PM', '6:00 PM', '6:45 PM', '7:15 PM', '8:00 PM', '8:45 PM', '9:30 PM'];
  const sanctuaries = ['Main Dining Hall', 'Candlelit Brick Cellar', 'Garden Veranda', "Chef's Hearth Counter"];

  return `
    <div class="flex justify-between items-center border-b border-stone-100 pb-4">
      <div>
        <div class="text-xs uppercase tracking-widest text-amber-800 font-bold">Artisanal Hospitality</div>
        <h3 class="font-serif text-2xl font-bold text-stone-900">Reserve a Table Sanctuary</h3>
      </div>
      <button id="close-reservation-btn" class="p-2 text-stone-400 hover:text-stone-700 rounded-lg">
        ${icon('x', 'w-5 h-5')}
      </button>
    </div>

    <form id="reservation-form" class="space-y-4">
      <!-- Party Size & Date -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Guests</label>
          <select id="res-guests" class="w-full px-3 py-2.5 text-xs rounded-xl border border-stone-300 bg-white">
            <option value="1 Guest">1 Guest (Solo Connoisseur)</option>
            <option value="2 Guests" selected>2 Guests (Intimate Table)</option>
            <option value="4 Guests">4 Guests (Social Table)</option>
            <option value="6 Guests">6 Guests (Salon Alcove)</option>
            <option value="8+ Guests">8+ Guests (Private Dining)</option>
          </select>
        </div>

        <div>
          <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Date</label>
          <input 
            id="res-date" 
            type="date" 
            value="${new Date().toISOString().split('T')[0]}" 
            class="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
          />
        </div>
      </div>

      <!-- Time Slots -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block">Select Seating Time</label>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          ${timeSlots.map((time, idx) => `
            <label class="text-center p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
              idx === 3 ? 'border-amber-800 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-800' : 'border-stone-200 hover:bg-stone-50 text-stone-700'
            }">
              <input type="radio" name="res-time" value="${time}" ${idx === 3 ? 'checked' : ''} class="hidden" />
              <span>${time}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Sanctuary Preference -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block">Dining Room Sanctuary</label>
        <select id="res-sanctuary" class="w-full px-3 py-2.5 text-xs rounded-xl border border-stone-300 bg-white">
          ${sanctuaries.map(s => `<option value="${s}">${s}</option>`).join('')}
        </select>
      </div>

      <!-- Guest Details -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div>
          <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Your Full Name *</label>
          <input 
            id="res-name" 
            type="text" 
            required 
            value="${state.currentUser ? state.currentUser.name : ''}" 
            placeholder="e.g. Marcella Sterling" 
            class="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
          />
        </div>
        <div>
          <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Phone Number *</label>
          <input 
            id="res-phone" 
            type="tel" 
            required 
            placeholder="+1 (555) 000-0000" 
            class="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
          />
        </div>
      </div>

      <div>
        <label class="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">Special Occasion or Notes</label>
        <input 
          id="res-notes" 
          type="text" 
          placeholder="e.g. Anniversary celebration, quiet booth, allergies..." 
          class="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
        />
      </div>

      <div class="pt-3 border-t border-stone-100">
        <button 
          type="submit"
          class="w-full py-3.5 px-6 rounded-xl bg-[#2C2724] hover:bg-amber-900 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2"
        >
          ${icon('calendar', 'w-4 h-4 text-amber-300')}
          <span>Confirm Table Reservation</span>
        </button>
      </div>
    </form>
  `;
}

function renderConfirmedTicket() {
  const t = reservationConfirmedTicket;
  return `
    <div class="text-center space-y-4 py-4">
      <div class="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto">
        ${icon('calendar', 'w-8 h-8')}
      </div>

      <div class="space-y-1">
        <span class="text-xs uppercase tracking-widest text-amber-800 font-bold">Reservation Ticket Confirmed</span>
        <h3 class="font-serif text-3xl font-bold text-stone-900">#${t.code}</h3>
        <p class="text-xs text-stone-500">We look forward to welcoming you to Savoria.</p>
      </div>

      <div class="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left text-xs space-y-2">
        <div class="flex justify-between border-b border-stone-200 pb-2">
          <span class="text-stone-500">Guest:</span>
          <span class="font-bold text-stone-900">${t.name}</span>
        </div>
        <div class="flex justify-between border-b border-stone-200 pb-2">
          <span class="text-stone-500">Party & Sanctuary:</span>
          <span class="font-bold text-stone-900">${t.guests} • ${t.sanctuary}</span>
        </div>
        <div class="flex justify-between border-b border-stone-200 pb-2">
          <span class="text-stone-500">Date & Time:</span>
          <span class="font-bold text-amber-900">${t.date} at ${t.time}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-stone-500">Valet:</span>
          <span class="text-emerald-700 font-medium">Complimentary at Portico</span>
        </div>
      </div>

      <button 
        id="dismiss-reservation-ticket-btn"
        class="w-full py-3.5 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        Complete & Close
      </button>
    </div>
  `;
}

export function initReservationEvents() {
  const closeBtn = document.getElementById('close-reservation-btn');
  const backdrop = document.getElementById('reservation-backdrop');
  const form = document.getElementById('reservation-form');
  const dismissBtn = document.getElementById('dismiss-reservation-ticket-btn');

  if (closeBtn) {
    closeBtn.onclick = () => {
      state.isReservationOpen = false;
      reservationConfirmedTicket = null;
      renderApp();
    };
  }

  if (backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) {
        state.isReservationOpen = false;
        reservationConfirmedTicket = null;
        renderApp();
      }
    };
  }

  if (dismissBtn) {
    dismissBtn.onclick = () => {
      state.isReservationOpen = false;
      reservationConfirmedTicket = null;
      renderApp();
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name').value;
      const guests = document.getElementById('res-guests').value;
      const date = document.getElementById('res-date').value;
      const sanctuary = document.getElementById('res-sanctuary').value;
      const timeRadio = document.querySelector('input[name="res-time"]:checked');
      const time = timeRadio ? timeRadio.value : '7:00 PM';

      reservationConfirmedTicket = {
        code: 'RES-' + Math.floor(1000 + Math.random() * 9000),
        name,
        guests,
        date,
        time,
        sanctuary
      };

      showToast(`Reservation confirmed for ${name} on ${date} at ${time}!`);
      renderApp();
    };
  }
}
