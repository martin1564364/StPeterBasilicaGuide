'use strict';

/* === STATE === */
const state = {
  stops: [],
  current: 0,
  drawerOpen: false,
};
const STOPS_DATA_VERSION = '2026-04-20-2';

/* === DOM REFS === */
const $ = (id) => document.getElementById(id);
const splash    = $('splash');
const app       = $('app');
const btnStart  = $('btn-start');
const btnMenu   = $('btn-menu');
const btnCloseDrawer = $('btn-close-drawer');
const btnHome   = $('btn-home');
const drawer    = $('drawer');
const drawerOverlay = $('drawer-overlay');
const stopList  = $('stop-list');
const stopCounter = $('stop-counter');
const stopSubtitle = $('stop-subtitle');
const stopTitle = $('stop-title');
const stopDesc  = $('stop-description');
const stopImgEl = $('stop-img');
const imgWebp   = $('img-webp');
const stopView  = $('stop-view');
const audioEl   = $('audio-el');
const btnPlay   = $('btn-play');
const iconPlay  = $('icon-play');
const iconPause = $('icon-pause');
const seekbar   = $('seekbar');
const timeCurrent = $('time-current');
const timeTotal = $('time-total');
const playerHint = document.querySelector('.player__hint');
const btnPrev   = $('btn-prev');
const btnNext   = $('btn-next');
const progressDots = $('progress-dots');
const offlineNotice = $('offline-notice');

/* === INIT === */
async function init() {
  registerServiceWorker();
  monitorOffline();

  try {
    const res = await fetch(`data/stops.json?v=${STOPS_DATA_VERSION}`, { cache: 'no-store' });
    state.stops = await res.json();
  } catch (e) {
    console.error('Nie można załadować danych przystanków:', e);
    return;
  }

  buildDrawerList();
  buildProgressDots();

  btnStart.addEventListener('click', startGuide);
  btnHome.addEventListener('click', goHome);
  btnMenu.addEventListener('click', toggleDrawer);
  btnCloseDrawer.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  btnPrev.addEventListener('click', prevStop);
  btnNext.addEventListener('click', nextStop);

  btnPlay.addEventListener('click', togglePlay);
  seekbar.addEventListener('input', onSeek);
  audioEl.addEventListener('timeupdate', onTimeUpdate);
  audioEl.addEventListener('loadedmetadata', onMetadataLoaded);
  audioEl.addEventListener('ended', onAudioEnded);
  audioEl.addEventListener('error', onAudioError);

  document.addEventListener('keydown', onKeyDown);
}

/* === SPLASH / HOME === */
function startGuide() {
  splash.classList.add('hidden');
  splash.setAttribute('aria-hidden', 'true');
  app.classList.remove('hidden');
  app.setAttribute('aria-hidden', 'false');
  renderStop(0);
}

function goHome() {
  stopAudio();
  app.classList.add('hidden');
  app.setAttribute('aria-hidden', 'true');
  splash.classList.remove('hidden');
  splash.setAttribute('aria-hidden', 'false');
}

/* === STOP RENDERING === */
function renderStop(index) {
  const stop = state.stops[index];
  if (!stop) return;

  state.current = index;

  stopView.classList.add('fade-out');

  setTimeout(() => {
    stopCounter.textContent = `${index + 1} / ${state.stops.length}`;
    stopSubtitle.textContent = stop.subtitle || '';
    stopTitle.textContent = stop.title;
    stopDesc.textContent = stop.description;

    imgWebp.srcset = stop.image;
    stopImgEl.src = stop.imageFallback;
    stopImgEl.alt = stop.imageAlt || stop.title;
    stopImgEl.classList.add('loading');
    stopImgEl.onload = () => stopImgEl.classList.remove('loading');

    stopAudio();
    audioEl.src = stop.audio;
    audioEl.load();
    timeCurrent.textContent = '0:00';
    timeTotal.textContent = stop.duration || '2:00';
    seekbar.value = 0;
    seekbar.setAttribute('aria-valuenow', 0);
    playerHint.classList.remove('hidden');

    updateNavButtons();
    updateDrawerActive();
    updateProgressDots();

    stopView.scrollTop = 0;
    stopView.classList.remove('fade-out');
    stopView.classList.add('fade-in');
    setTimeout(() => stopView.classList.remove('fade-in'), 300);
  }, 200);
}

/* === NAVIGATION === */
function goToStop(index) {
  if (index < 0 || index >= state.stops.length) return;
  renderStop(index);
  closeDrawer();
}

function nextStop() {
  goToStop(state.current + 1);
}

function prevStop() {
  goToStop(state.current - 1);
}

function updateNavButtons() {
  btnPrev.disabled = state.current === 0;
  btnNext.disabled = state.current === state.stops.length - 1;
}

/* === DRAWER === */
function buildDrawerList() {
  state.stops.forEach((stop, i) => {
    const li = document.createElement('li');
    li.className = 'stop-list__item';
    li.setAttribute('role', 'listitem');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-label', `Przystanek ${i + 1}: ${stop.title}`);
    li.innerHTML = `
      <span class="stop-list__num">${i + 1}</span>
      <span class="stop-list__name">${stop.title}</span>
    `;
    li.addEventListener('click', () => goToStop(i));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToStop(i); }
    });
    stopList.appendChild(li);
  });
}

function updateDrawerActive() {
  document.querySelectorAll('.stop-list__item').forEach((el, i) => {
    el.classList.toggle('is-active', i === state.current);
  });
}

function toggleDrawer() {
  state.drawerOpen ? closeDrawer() : openDrawer();
}

function openDrawer() {
  state.drawerOpen = true;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  drawerOverlay.classList.remove('hidden');
  btnMenu.setAttribute('aria-expanded', 'true');

  const activeItem = stopList.querySelectorAll('.stop-list__item')[state.current];
  if (activeItem) activeItem.scrollIntoView({ block: 'nearest' });
}

function closeDrawer() {
  state.drawerOpen = false;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  drawerOverlay.classList.add('hidden');
  btnMenu.setAttribute('aria-expanded', 'false');
}

/* === PROGRESS DOTS === */
function buildProgressDots() {
  state.stops.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    dot.setAttribute('aria-hidden', 'true');
    progressDots.appendChild(dot);
  });
}

function updateProgressDots() {
  document.querySelectorAll('.progress-dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === state.current);
  });
}

/* === AUDIO PLAYER === */
function togglePlay() {
  if (audioEl.paused) {
    audioEl.play().then(() => {
      setPlayState(true);
      playerHint.classList.add('hidden');
    }).catch(() => {
      /* autoplay blocked — user will retry */
    });
  } else {
    audioEl.pause();
    setPlayState(false);
  }
}

function stopAudio() {
  if (!audioEl.paused) audioEl.pause();
  audioEl.currentTime = 0;
  setPlayState(false);
}

function setPlayState(playing) {
  btnPlay.setAttribute('aria-pressed', playing ? 'true' : 'false');
  btnPlay.setAttribute('aria-label', playing ? 'Pauza' : 'Odtwórz nagranie');
  iconPlay.classList.toggle('hidden', playing);
  iconPause.classList.toggle('hidden', !playing);
}

function onTimeUpdate() {
  if (!audioEl.duration) return;
  const pct = (audioEl.currentTime / audioEl.duration) * 100;
  seekbar.value = pct;
  seekbar.setAttribute('aria-valuenow', Math.round(pct));
  timeCurrent.textContent = formatTime(audioEl.currentTime);
}

function onMetadataLoaded() {
  timeTotal.textContent = formatTime(audioEl.duration);
  seekbar.max = 100;
}

function onSeek() {
  if (!audioEl.duration) return;
  audioEl.currentTime = (seekbar.value / 100) * audioEl.duration;
}

function onAudioEnded() {
  setPlayState(false);
  seekbar.value = 0;
  timeCurrent.textContent = '0:00';
}

function onAudioError() {
  playerHint.classList.remove('hidden');
  playerHint.textContent = 'Nagranie niedostępne';
  setPlayState(false);
}

function formatTime(seconds) {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* === KEYBOARD NAVIGATION === */
function onKeyDown(e) {
  if (app.classList.contains('hidden')) return;
  if (e.target.tagName === 'INPUT') return;

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      nextStop();
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      prevStop();
      break;
    case ' ':
      if (e.target === document.body || e.target === stopView) {
        e.preventDefault();
        togglePlay();
      }
      break;
    case 'Escape':
      if (state.drawerOpen) closeDrawer();
      break;
  }
}

/* === SERVICE WORKER === */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('service-worker.js').then((reg) => {
    reg.update();
  }).catch((e) => {
    console.warn('Service Worker rejestracja nieudana:', e);
  });
}

/* === OFFLINE DETECTION === */
function monitorOffline() {
  function update() {
    offlineNotice.classList.toggle('hidden', navigator.onLine);
  }
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}

/* === START === */
document.addEventListener('DOMContentLoaded', init);
