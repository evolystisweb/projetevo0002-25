import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Configuration globale pour le développement
if (import.meta.env.DEV) {
  console.log('🚀 Evolystis - Application en mode développement');
  console.log('📱 Interface optimisée pour la transformation digitale');
  console.log('🔧 Version:', import.meta.env.MODE);
}

// Configuration des performances
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Configuration des métriques de performance
if (import.meta.env.DEV) {
  // Monitoring des performances en développement
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log(`⚡ Page load: ${entry.duration.toFixed(2)}ms`);
      }
    }
  });
  
  observer.observe({ entryTypes: ['navigation'] });
}

// Gestion globale des erreurs
window.addEventListener('error', (event) => {
  console.error('🚨 Erreur globale:', event.error);
  // En production, envoyer à un service de monitoring
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Promesse rejetée:', event.reason);
  // En production, envoyer à un service de monitoring
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);