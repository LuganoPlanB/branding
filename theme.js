try {
  if (localStorage.getItem('planb-brand-theme') === 'dark') document.documentElement.dataset.theme = 'dark';
} catch { /* Storage is optional; the reference remains usable. */ }
