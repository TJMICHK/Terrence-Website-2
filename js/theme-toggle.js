/* Theme toggle: toggles dark theme, persists to localStorage, respects prefers-color-scheme */
(function() {
  'use strict';

  function applyTheme(theme) {
    var isDark = (theme === 'dark');
    try {
      // set class on both <html> and <body> so pages where body isn't ready still get styled
      if (isDark) {
        document.documentElement.classList.add('dark-theme');
        if (document.body) document.body.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
        if (document.body) document.body.classList.remove('dark-theme');
      }
      localStorage.setItem('theme', theme);
    } catch(e) {
      // ignore storage errors but still toggle DOM classes
      if (isDark) {
        document.documentElement.classList.add('dark-theme');
        if (document.body) document.body.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
        if (document.body) document.body.classList.remove('dark-theme');
      }
    }
    updateIcon();
  }

  function updateIcon() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var icon = btn.querySelector('i');
    if (!icon) return;
    if (document.body.classList.contains('dark-theme')) {
      icon.classList.remove('fa-moon-o');
      icon.classList.add('fa-sun-o');
    } else {
      icon.classList.remove('fa-sun-o');
      icon.classList.add('fa-moon-o');
    }
  }

  function init() {
    var btn = document.getElementById('theme-toggle');

    // Load stored preference
    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch(e) { stored = null; }

    if (stored) applyTheme(stored);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
    else applyTheme('light');

    if (btn) {
      btn.addEventListener('click', function() {
        var isDark = document.documentElement.classList.contains('dark-theme') || (document.body && document.body.classList.contains('dark-theme'));
        applyTheme(isDark ? 'light' : 'dark');
      });
    }
  }

  // Initialize when DOM is ready (script is included at end of body but be safe)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
