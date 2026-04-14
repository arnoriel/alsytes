import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SubdomainApp from './SubdomainApp';
import './index.css';

// ── Dark mode sync ─────────────────────────────────────────────
function applyTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', prefersDark);
}
applyTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

// ── Subdomain detection ─────────────────────────────────────────
const BASE_DOMAIN = 'alsytes.dev';

function getSubdomain(): string | null {
  const hostname = window.location.hostname;

  // Skip di localhost / environment development
  if (hostname === 'localhost' || hostname.startsWith('127.') || hostname.startsWith('192.168.')) {
    return null;
  }

  // Kalau exact match domain utama (alsytes.dev atau www.alsytes.dev) → render App biasa
  if (hostname === BASE_DOMAIN || hostname === `www.${BASE_DOMAIN}`) {
    return null;
  }

  // Kalau subdomain dari alsytes.dev → extract nama-nya
  if (hostname.endsWith(`.${BASE_DOMAIN}`)) {
    const sub = hostname.slice(0, hostname.length - BASE_DOMAIN.length - 1);
    // Abaikan subdomain sistem (www, app, api, dll)
    if (['www', 'app', 'api', 'staging'].includes(sub)) return null;
    return sub;
  }

  return null;
}

const subdomain = getSubdomain();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {subdomain ? <SubdomainApp pageName={subdomain} /> : <App />}
  </React.StrictMode>
);