/**
 * Icon Library & Tag Injection Engine
 * Rohit Mandal — Portfolio
 */

const ICONS = {
  // Languages
  kotlin: '<path d="m3 3 18 18M3 21 21 3"/>',
  dart: '<path d="M12 2 2 12l10 10 10-10z"/>',
  javascript: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 16v-6M15 16v-3a2 2 0 0 0-4 0"/>',
  python: '<circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 15h.01"/>',

  // Mobile & Architecture
  'jetpack compose': '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 19h4"/>',
  mvvm: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  'android jetpack': '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 19h4"/>',
  kmp: '<path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/>',
  'android sdk': '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 19h4"/>',
  flutter: '<path d="M12 2 2 12l10 10 10-10z"/>',
  retrofit: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  hilt: '<path d="M12 2v8M8 10h8l-1 10H9z"/>',
  'clean architecture': '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="11"/>',

  // Web & Backend
  'react.js': '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  'node.js': '<path d="M12 2 3 7v10l9 5 9-5V7z"/>',
  'rest apis': '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  'html5 / css3': '<path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/>',
  'tailwind css': '<path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C16.62 7.15 15.49 6 12 6z"/><path d="M7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35-.98-1-2.11-2.15-4.6-2.15z"/>',
  'material ui': '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  websockets: '<path d="M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0"/><circle cx="12" cy="12" r="1"/>',
  flask: '<path d="M9 2h6M10 2v6l-6 12a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-12V2"/>',
  'alpha vantage': '<path d="M3 17l6-6 4 4 8-8"/>',
  syncfusion: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',

  // Databases
  mysql: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
  postgresql: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
  mongodb: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
  firebase: '<path d="m5 18 4-16 3 9 2-3 5 10z"/>',
  sqlite: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
  room: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',

  // Machine Learning
  tensorflow: '<path d="M12 2v20M6 6l12 4M6 14l12 4M2 10l4-2v8l-4-2z"/>',
  keras: '<path d="M4 4h6v16H4zM14 4h6v7h-6zM14 13h6v7h-6z"/>',
  resnet50: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h8M6 8v8M18 8v8M8 18h8"/>',
  gradio: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  nltk: '<path d="M4 4h16v16H4zM8 8h8v8H8z"/>',
  'scikit-learn': '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>',

  // Developer Tools
  'git / github': '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M6 8.5v7M8.5 6H16a2 2 0 0 1 2 2v7.5"/>',
  'android studio': '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 19h4"/>',
  postman: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2z"/>',
  docker: '<rect x="2" y="10" width="4" height="4"/><rect x="7" y="10" width="4" height="4"/><rect x="12" y="10" width="4" height="4"/><rect x="7" y="5" width="4" height="4"/><path d="M2 14c0 4 4 7 10 7s9-3 10-9c-2 1-4 1-5-1-1 2-3 2-4 1-2 2-6 2-11 2z"/>',
  jira: '<path d="M12 2 3 11l9 9 9-9z"/>',
  'vs code': '<path d="m17 3 4 3v12l-4 3-9-7 9-7Z"/><path d="m3 8 6-2 8 6-8 6-6-2v-2l4-2-4-2z"/>',
};

const DEFAULT_ICON = '<circle cx="12" cy="12" r="9"/>';

export function getIconSvg(name) {
  const key = name.trim().toLowerCase();
  const inner = ICONS[key] || DEFAULT_ICON;
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

export function injectTagIcons() {
  document.querySelectorAll('.stack-tag, .skill-tag').forEach((el) => {
    if (el.dataset.iconed) return;
    const text = el.textContent.trim();
    el.innerHTML = getIconSvg(text) + '<span>' + text + '</span>';
    el.dataset.iconed = 'true';
  });
}
