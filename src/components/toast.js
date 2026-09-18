import { icon } from '../icons.js';

let toastTimeout = null;

export function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const iconHtml = type === 'success' ? icon('check-circle', 'w-5 h-5 text-emerald-400') : icon('sparkles', 'w-5 h-5 text-amber-400');
  
  toast.className = 'pointer-events-auto flex items-center gap-3 bg-neutral-900/95 text-stone-100 px-4 py-3 rounded-xl shadow-xl border border-stone-800 text-sm font-medium backdrop-blur-md transform transition-all duration-300 translate-y-2 opacity-0';
  toast.innerHTML = `
    <span>${iconHtml}</span>
    <div class="flex-1">${message}</div>
  `;

  toastContainer.appendChild(toast);

  // Trigger entry animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  // Automatically dismiss
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-4');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
