import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuration des chemins
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@assets': resolve(__dirname, './src/assets'),
      '@utils': resolve(__dirname, './src/utils'),
      '@styles': resolve(__dirname, './src/styles'),
      '@data': resolve(__dirname, './data'),
    },
  },
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    proxy: {
      // Proxy pour les API
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  // Configuration de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        // Configuration des chunks pour optimiser le chargement
        manualChunks: {
          // Séparer React et ses dépendances
          'react-vendor': ['react', 'react-dom'],
          // Séparer React Router
          'router': ['react-router-dom'],
          // Séparer les icônes
          'icons': ['lucide-react'],
        },
      },
    },
    // Configuration des assets
    assetsInclude: ['**/*.md', '**/*.txt'],
  },
  
  // Configuration de preview
  preview: {
    port: 4173,
    host: true,
    open: true,
  },
  
  // Configuration CSS
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      // Configuration pour les préprocesseurs CSS si besoin
    },
  },
  
  // Configuration des optimizeDeps
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
    ],
    // Exclure certains packages du pre-bundling si nécessaire
    exclude: [],
  },
  
  // Configuration des define pour les variables d'environnement
  define: {
    // Variables globales personnalisées
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
  },
  
  // Configuration ESLint (si nécessaire)
  esbuild: {
    // Configuration pour ESBuild
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  
  // Configuration des workers
  worker: {
    format: 'es',
  },
  
  // Configuration pour les tests
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
  
  // Configuration des options expérimentales
  experimentalOptions: {
    // Options expérimentales de Vite
  },
  
  // Configuration de performance
  experimentalRenderBuiltins: true,
  
  // Configuration pour le monitoring des performances
  profiler: process.env.VITE_PROFILER === 'true',
  
  // Configuration des logs
  logLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  
  // Configuration des options de cache
  cacheDir: 'node_modules/.vite',
  
  // Configuration des options de sécurité
  security: {
    // Configuration de sécurité pour la production
    csp: process.env.NODE_ENV === 'production' ? {
      'default-src': ['self'],
      'script-src': ['self', 'unsafe-inline'],
      'style-src': ['self', 'unsafe-inline'],
      'img-src': ['self', 'data:', 'https:'],
      'font-src': ['self', 'data:'],
      'connect-src': ['self', 'https:'],
    } : false,
  },
})