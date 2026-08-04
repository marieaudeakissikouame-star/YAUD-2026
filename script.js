// script.js — navigation, carousel, search, guest loading, SW registration
let guests = [];
let slides = [];
let dots = [];
let currentSlide = 0;
let slideInterval = null;
let searchDebounceTimer = null;

async function loadGuests() {
  try {
    const res = await fetch('./guests.json');
    if (!res.ok) throw new Error('guests.json not found');
    guests = await res.json();
    console.log('Guests loaded:', guests.length);
  } catch (err) {
    console.error('Failed to load guests.json', err);
    guests = [];
  }
}

function initCarouselDOM() {
  slides = Array.from(document.querySelectorAll('.carousel-img'));
  dots = Array.from(document.querySelectorAll('.dot'));
}

function updateCarousel() {
  slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function goToSlide(n) {
  if (!slides.length) return;
  currentSlide = ((n % slides.length) + slides.length) % slides.length;
  updateCarousel();
}

function nextSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function setupCarousel() {
  initCarouselDOM();
  if (!slides.length) return;
  updateCarousel();
  dots.forEach((dot, idx) => dot.addEventListener('click', () => goToSlide(idx)));
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

function enterUniverse() {
  const hero = document.querySelector('.hero');
  const appNav = document.getElementById('appNav');
  const appContainer = document.getElementById('appContainer');
  if (hero) hero.classList.add('hidden');
  if (appNav) appNav.classList.remove('hidden');
  if (appContainer) appContainer.classList.remove('hidden');
  showSection('find-place');
}

function goHome() {
  const hero = document.querySelector('.hero');
  const appNav = document.getElementById('appNav');
  const appContainer = document.getElementById('appContainer');
  if (hero) hero.classList.remove('hidden');
  if (appNav) appNav.classList.add('hidden');
  if (appContainer) appContainer.classList.add('hidden');
}

function showSection(sectionId) {
  const appContainer = document.getElementById('appContainer');
  if (appContainer) appContainer.classList.remove('hidden');

  const sections = document.querySelectorAll('.content-section');
  sections.forEach(sec => {
    sec.setAttribute('aria-hidden', 'true');
    sec.style.display = 'none';
  });
  const target = document.getElementById(sectionId);
  if (target) {
    target.setAttribute('aria-hidden', 'false');
    target.style.display = 'flex';
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function normalizeText(s) {
  if (!s) return '';
  return s.toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim();
}

function fuzzyMatch(query, text) {
  const q = normalizeText(query).replace(/\s/g, '');
  const t = normalizeText(text).replace(/\s/g, '');
  if (!q) return false;
  if (t.includes(q)) return true;
  let i = 0;
  for (let j = 0; j < t.length && i < q.length; j++) {
    if (t[j] === q[i]) i++;
  }
  return i === q.length;
}

function createGuestCard(guest) {
  const wrap = document.createElement('div');
  wrap.className = 'guest-result';
  const fullName = [guest.prenom, guest.nom].filter(Boolean).join(' ');
  wrap.innerHTML = `
    <h3>${fullName}</h3>
    <div class="table-info">
      <div class="table-color" style="background:${getTableColor(guest.table)}"></div>
      <div style="margin-left:8px;"><strong>${guest.table}</strong></div>
    </div>
  `;
  return wrap;
}

function getTableColor(tableName) {
  const map = {
    'Table 1 - Coral': '#ff8066',
    'Table 2 - Blush': '#ffd6e0',
    'Table 3 - Amber': '#ffb86b',
    'Table 4 - Terracotta': '#e07a5f',
    'Table 5 - Champagne': '#f7e7d7',
    'Table 6 - Gold': '#ffd166',
    'Table 7 - Fuchsia': '#f14c8a'
  };
  return map[tableName] || '#e5d5c8';
}

function searchTable(query) {
  const resultBox = document.getElementById('result');
  if (!resultBox) return 0;
  resultBox.innerHTML = '';
  if (!query || !query.trim()) {
    resultBox.innerHTML = '<p style="text-align:center;color:#999;padding:18px;">Entrez votre nom pour trouver votre place...</p>';
    return 0;
  }
  const matches = guests.filter(g => {
    const full = `${g.prenom} ${g.nom}`;
    return fuzzyMatch(query, g.prenom) || fuzzyMatch(query, g.nom) || fuzzyMatch(query, full);
  });
  if (!matches.length) {
    resultBox.innerHTML = '<p style="text-align:center;color:#e07a5f;padding:18px;">❌ Aucun résultat trouvé</p>';
    return 0;
  }
  matches.forEach(m => resultBox.appendChild(createGuestCard(m)));
  return matches.length;
}

function setupSearch() {
  const input = document.getElementById('searchGuest');
  const status = document.getElementById('searchStatus');
  if (!input) return;
  input.addEventListener('input', (e) => {
    const v = e.target.value;
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      const count = searchTable(v);
      if (status) {
        if (!v || !v.trim()) status.textContent = '';
        else if (count === 0) status.textContent = 'Aucun résultat trouvé';
        else status.textContent = `Recherche terminée — ${count} résultat(s)`;
        setTimeout(() => { if (status) status.textContent = ''; }, 3500);
      }
    }, 500);
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(() => console.log('SW registered')).catch(err => console.warn('SW failed', err));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadGuests();
  setupCarousel();
  setupSearch();
  // ensure nav buttons work if markup slightly different
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = (btn.textContent || '').toLowerCase();
      if (t.includes('ma place')) showSection('find-place');
      else if (t.includes('saveurs')) showSection('flavors');
      else if (t.includes('info')) showSection('info');
    });
  });
});
