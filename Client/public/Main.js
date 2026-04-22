// ─── MODAL LOGIC ───
const overlay = document.getElementById('modalOverlay');
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
const closeBtn = document.getElementById('modalClose');
const tabs = document.querySelectorAll('.modal-tab');
const panels = document.querySelectorAll('.tab-panel');

function openModal(tab = 'login') {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  switchTab(tab);
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(tabName) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  panels.forEach(p => p.classList.toggle('active', p.id === tabName + 'Panel'));
}

if (loginBtn) loginBtn.addEventListener('click', () => openModal('login'));
if (registerBtn) registerBtn.addEventListener('click', () => openModal('register'));
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));

// Switch links inside modal
document.querySelectorAll('[data-open-tab]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); switchTab(el.dataset.openTab); });
});

// ESC key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── ACTIVE NAV ───
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ─── SEARCH (Hero) ───
const heroSearchBtn = document.querySelector('.search-btn');
if (heroSearchBtn) {
  heroSearchBtn.addEventListener('click', () => {
    const q = document.querySelector('.search-box .search-input input')?.value.trim();
    const loc = document.querySelectorAll('.search-box .search-input input')[1]?.value.trim();
    let url = 'jobs.html';
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (loc) params.set('loc', loc);
    if ([...params].length) url += '?' + params.toString();
    window.location.href = url;
  });

  // Enter key
  document.querySelectorAll('.search-box .search-input input').forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') heroSearchBtn.click(); });
  });
}

// ─── SEARCH (Jobs page) ───
const pageSearchBtn = document.querySelector('.search-bar-page button');
const pageSearchInput = document.querySelector('.search-bar-page input');
if (pageSearchBtn && pageSearchInput) {
  // Prefill from URL
  const params = new URLSearchParams(location.search);
  if (params.get('q')) pageSearchInput.value = params.get('q');

  pageSearchBtn.addEventListener('click', filterJobs);
  pageSearchInput.addEventListener('keydown', e => { if (e.key === 'Enter') filterJobs(); });
}

function filterJobs() {
  const q = pageSearchInput?.value.toLowerCase().trim();
  document.querySelectorAll('.job-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = (!q || text.includes(q)) ? '' : 'none';
  });
}

// Auto-filter on page load if query present
if (location.search && pageSearchInput) filterJobs();