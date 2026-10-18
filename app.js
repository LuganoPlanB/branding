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
