# EvoWeb - Site Web PHP/MySQL

## Installation

1. **Base de données**
   ```bash
   mysql -u root -p < database.sql
   ```
   Ou importez `database.sql` via phpMyAdmin

2. **Configuration**
   Modifiez `api/config.php` avec vos identifiants MySQL

3. **Frontend**
   ```bash
   cd evoweb
   npm install
   npm run build
   ```

4. **Déploiement**
   - Copiez le dossier `api/` à la racine de votre serveur
   - Copiez le contenu de `evoweb/dist/` à la racine
   - Configurez votre serveur pour pointer vers `index.html`

## Compte admin par défaut
- Email: `admin@evoweb.com`
- Mot de passe: `password`

## Structure
```
/api/          - Backend PHP
/evoweb/       - Frontend React
database.sql   - Structure MySQL
```
