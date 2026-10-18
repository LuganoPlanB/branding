const status = document.querySelector('#status');
let statusTimer;
function announce(message) {
  clearTimeout(statusTimer);
  status.textContent = message;
  statusTimer = setTimeout(() => { status.textContent = ''; }, 6000);
}
async function copy(text) {
  try { await navigator.clipboard.writeText(text); announce('Copied to clipboard.'); }
  catch { announce('Clipboard unavailable. Select the displayed value or download the file.'); }
}
document.querySelectorAll('[data-copy]').forEach(button => {
  button.setAttribute('aria-label', `Copy ${button.dataset.copy}`);
  button.addEventListener('click', () => copy(button.dataset.copy));
});
const toggle = document.querySelector('#theme-toggle');
function showTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  toggle.setAttribute('aria-pressed', String(dark));
  document.querySelector('meta[name="theme-color"]').content = dark ? '#171717' : '#fffefa';
}
toggle.hidden = false;
showTheme();
toggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('planb-brand-theme', theme); } catch { /* Session-only choice. */ }
  showTheme();
});
document.querySelector('.logo-controls').hidden = false;
document.querySelectorAll('[data-variant]').forEach(button => button.addEventListener('click', () => {
  const variant = button.dataset.variant;
  document.querySelectorAll('[data-variant]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-logo]').forEach(img => {
    const path = `assets/logos/lugano_planb_2026_logo_${img.dataset.logo}_${variant}.svg`;
    img.src = path;
    img.alt = `Lugano's Plan B ${img.dataset.logo} ${variant} logo`;
    img.closest('.logo-stage').classList.toggle('black-variant', variant === 'black');
    document.querySelector(`[data-download="${img.dataset.logo}"]`).href = path;
  });
}));
const briefButton = document.querySelector('#copy-brief');
briefButton.hidden = false;
briefButton.addEventListener('click', () => copy(document.querySelector('#brief-text').textContent));

// Load the self-hosted player only when someone requests the preview.
const previewButton = document.querySelector('#roots-animation-toggle');
const previewPlayer = document.querySelector('#roots-animation-player');
const previewPoster = document.querySelector('#roots-animation-poster');
const previewStatus = document.querySelector('#roots-animation-status');
let rootsAnimation;
let previewComplete = false;
let lottieScriptPromise;
function loadLottiePlayer() {
  if (window.lottie) return Promise.resolve(window.lottie);
  if (!lottieScriptPromise) {
    lottieScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timer = setTimeout(() => fail(), 12000);
      function fail() {
        clearTimeout(timer);
        script.remove();
        lottieScriptPromise = undefined;
        reject(new Error('Player unavailable'));
      }
      script.src = 'assets/vendor/lottie-web/lottie_svg.min.js';
      script.onload = () => { clearTimeout(timer); window.lottie ? resolve(window.lottie) : fail(); };
      script.onerror = fail;
      document.head.append(script);
    });
  }
  return lottieScriptPromise;
}
function pauseRootsPreview() {
  if (!rootsAnimation || rootsAnimation.isPaused) return;
  rootsAnimation.pause();
  previewButton.textContent = 'Resume animation';
  previewStatus.textContent = 'Animation paused.';
}
previewButton.hidden = false;
previewButton.addEventListener('click', async () => {
  if (rootsAnimation) {
    if (!rootsAnimation.isPaused) { pauseRootsPreview(); return; }
    if (previewComplete) rootsAnimation.goToAndPlay(0, true);
    else rootsAnimation.play();
    previewComplete = false;
    previewButton.textContent = 'Pause animation';
    previewStatus.textContent = 'Playing once · 7.5 seconds.';
    return;
  }
  previewButton.disabled = true;
  previewButton.textContent = 'Loading animation…';
  previewStatus.textContent = 'Loading the preview.';
  try {
    const [lottie, data] = await Promise.all([
      loadLottiePlayer(),
      fetch('assets/projects/bitcoin-roots/bitcoin-roots.lottie.json', { signal: AbortSignal.timeout(12000) })
        .then(response => { if (!response.ok) throw new Error('Animation unavailable'); return response.json(); })
    ]);
    rootsAnimation = lottie.loadAnimation({container: previewPlayer, renderer: 'svg', loop: false, autoplay: false, animationData: data});
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Preview timeout')), 12000);
      rootsAnimation.addEventListener('DOMLoaded', () => { clearTimeout(timer); resolve(); });
      rootsAnimation.addEventListener('data_failed', () => { clearTimeout(timer); reject(new Error('Preview unavailable')); });
      rootsAnimation.addEventListener('error', () => { clearTimeout(timer); reject(new Error('Preview unavailable')); });
    });
    rootsAnimation.addEventListener('complete', () => {
      previewComplete = true;
      previewButton.textContent = 'Replay animation';
      previewStatus.textContent = 'Animation finished.';
    });
    previewPlayer.hidden = false;
    previewPoster.hidden = true;
    rootsAnimation.resize();
    if (document.hidden) {
      previewButton.textContent = 'Play animation';
      previewStatus.textContent = 'Ready to play.';
    } else {
      rootsAnimation.play();
      previewButton.textContent = 'Pause animation';
      previewStatus.textContent = 'Playing once · 7.5 seconds.';
    }
  } catch {
    rootsAnimation?.destroy();
    rootsAnimation = undefined;
    previewPlayer.hidden = true;
    previewPoster.hidden = false;
    previewButton.textContent = 'Retry preview';
    previewStatus.textContent = 'Preview unavailable. You can still download the animation below.';
  } finally { previewButton.disabled = false; }
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseRootsPreview(); });
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => { if (event.matches) pauseRootsPreview(); });
