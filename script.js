/* ASDNA Horde — interações locais, sem frameworks ou analytics. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toggle = $('#mobile-toggle');
  const menu = $('#nav-links');
  const closeMenu = () => {
    menu?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) { toggle.textContent = '☰'; toggle.setAttribute('aria-label', 'Abrir menu'); }
  };
  toggle?.addEventListener('click', () => {
    const opened = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.textContent = opened ? '×' : '☰';
    toggle.setAttribute('aria-label', opened ? 'Fechar menu' : 'Abrir menu');
  });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => { if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu(); });
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  // Pesquisa e filtros só são ativados em comandos.html.
  const input = $('#command-search');
  const chips = $$('.filter-chip');
  const groups = $$('.command-group');
  const rows = $$('.command-row');
  const count = $('#command-count');
  const noResults = $('#no-results');
  const norm = value => String(value).toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let selectedCategory = 'all';
  const refresh = () => {
    if (!input) return;
    const query = norm(input.value.trim());
    let found = 0;
    for (const group of groups) {
      let inGroup = 0;
      for (const row of $$('.command-row', group)) {
        const matchCategory = selectedCategory === 'all' || row.dataset.category === selectedCategory;
        const matchText = !query || norm(row.textContent).includes(query);
        const visible = matchCategory && matchText;
        row.hidden = !visible;
        if (visible) { inGroup++; found++; }
      }
      group.hidden = inGroup === 0;
    }
    if (count) count.textContent = `${found} ${found === 1 ? 'comando encontrado' : 'comandos encontrados'} · v11`;
    if (noResults) noResults.hidden = found !== 0;
  };
  if (input) {
    const initialQuery = new URLSearchParams(window.location.search).get('q');
    if (initialQuery) input.value = initialQuery;
    input.addEventListener('input', refresh);
    document.addEventListener('keydown', e => {
      if (e.key === '/' && !e.altKey && !e.metaKey && !e.ctrlKey && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault(); input.focus();
      }
      if (e.key === 'Escape' && document.activeElement === input) { input.value = ''; refresh(); input.blur(); }
    });
    chips.forEach(chip => chip.addEventListener('click', () => {
      selectedCategory = chip.dataset.filter || 'all';
      chips.forEach(c => {
        const active = c === chip;
        c.classList.toggle('active', active);
        c.setAttribute('aria-pressed', String(active));
      });
      refresh();
    }));
    $('#clear-filter')?.addEventListener('click', () => {
      input.value = ''; selectedCategory = 'all';
      chips.forEach(c => { const active = c.dataset.filter === 'all'; c.classList.toggle('active', active); c.setAttribute('aria-pressed', String(active)); });
      refresh(); input.focus();
    });
    refresh();
  }

  // Cópia com fallback para páginas locais file:// sem HTTPS.
  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* fallback */ }
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.appendChild(textarea);
    textarea.focus(); textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove(); return ok;
  }
  const toast = $('#toast');
  let toastTimer;
  const notify = message => {
    if (!toast) return;
    toast.textContent = message; toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
  };
  document.addEventListener('click', async e => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const value = btn.getAttribute('data-copy');
    try { notify(await copyToClipboard(value) ? '✓ Copiado para a área de transferência' : 'Não foi possível copiar automaticamente'); }
    catch (_) { notify('Não foi possível copiar automaticamente'); }
  });
})();
