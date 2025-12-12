/*
  # Création du schéma de base de données pour le CMS Admin Evolystis

  ## Tables créées
  
  ### 1. pages_content
  - Contenu dynamique de toutes les pages du site
  - Sections configurables avec titre, description, contenu
  - Support des images et médias
  
  ### 2. formations
  - Catalogue des formations disponibles
  - Programme détaillé, objectifs, prix, durée
  - Gestion des inscriptions et disponibilités
  
  ### 3. services
  - Services et produits de l'entreprise
  - Détails, tarifs, livrables
  - Catégorisation flexible
  
  ### 4. actualites
  - Articles de blog et actualités
  - Gestion des tags et catégories
  - Support des images et médias
  
  ### 5. ressources
  - Documents téléchargeables
  - Vidéos et webinaires
  - Guides et checklists
  
  ### 6. contact_requests
  - Demandes reçues via le formulaire de contact
  - Statut de traitement
  - Historique des échanges
  
  ### 7. site_settings
  - Configuration globale du site
  - Couleurs, fonts, charte graphique
  - Informations de contact
  
  ### 8. media_library
  - Bibliothèque d'images et médias
  - Upload local et URLs externes
  - Métadonnées et organisation
  
  ## Sécurité
  - RLS activé sur toutes les tables
  - Politiques restrictives pour admin uniquement
  - Protection des données sensibles
*/

-- Extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: pages_content
CREATE TABLE IF NOT EXISTS pages_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name text NOT NULL,
  section_key text NOT NULL,
  title text,
  subtitle text,
  description text,
  content jsonb DEFAULT '{}'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_name, section_key)
);

ALTER TABLE pages_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage pages content"
  ON pages_content FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'evolystisweb@gmail.com')
  WITH CHECK (auth.jwt()->>'email' = 'evolystisweb@gmail.com');

CREATE POLICY "Public can view active pages content"
  ON pages_content FOR SELECT
  TO public
  USING (is_active = true);

-- Table: formations
CREATE TABLE IF NOT EXISTS formations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  duration text,
  price text,
  level text,
  category text,
  date date,
  location text,
  modalities jsonb DEFAULT '[]'::jsonb,
  objectives jsonb DEFAULT '[]'::jsonb,
  program jsonb DEFAULT '[]'::jsonb,
  instructor text,
  available boolean DEFAULT true,
  max_participants integer,
  image_url text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE formations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage formations"
  ON formations FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'evolystisweb@gmail.com')
  WITH CHECK (auth.jwt()->>'email' = 'evolystisweb@gmail.com');

CREATE POLICY "Public can view available formations"
  ON formations FOR SELECT
  TO public
  USING (available = true);

-- Table: services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  duration text,
  price text,
  category text,
  deliverables jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  timeline text,
  included text,
  image_url text,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage services"
  ON services FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'evolystisweb@gmail.com')
  WITH CHECK (auth.jwt()->>'email' = 'evolystisweb@gmail.com');

CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  TO public
  USING (is_active = true);

-- Table: actualites
CREATE TABLE IF NOT EXISTS actualites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content text,
  category text,
  type text,
  date date DEFAULT CURRENT_DATE,
  read_time text,
  author text,
  image_url text,
  tags jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE actualites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage actualites"
  ON actualites FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'evolystisweb@gmail.com')
  WITH CHECK (auth.jwt()->>'email' = 'evolystisweb@gmail.com');

CREATE POLICY "Public can view published actualites"
  ON actualites FOR SELECT
  TO public
  USING (is_published = true);

-- Table: ressources
CREATE TABLE IF NOT EXISTS ressources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text,
  type text,
  date date DEFAULT CURRENT_DATE,
  read_time text,
  author text,
  download_url text,
  video_url text,
  file_size text,
  format text,
  tags jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ressources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage ressources"
  ON ressources FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'evolystisweb@gmail.com')
  WITH CHECK (auth.jwt()->>'email' = 'evolystisweb@gmail.com');

CREATE POLICY "Public can view active ressources"
  ON ressources FOR SELECT
  TO public
  USING (is_active = true);

-- Table: contact_requests
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  status text DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage contact requests"
  ON contact_requests FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'evolystisweb@gmail.com')
  WITH CHECK (auth.jwt()->>'email' = 'evolystisweb@gmail.com');

CREATE POLICY "Public can insert contact requests"
  ON contact_requests FOR INSERT
  TO public
  WITH CHECK (true);

-- Table: site_settings
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  category text DEFAULT 'general',
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'evolystisweb@gmail.com')
  WITH CHECK (auth.jwt()->>'email' = 'evolystisweb@gmail.com');

CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  TO public
  USING (true);

-- Table: media_library
CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  type text NOT NULL,
  size integer,
  alt_text text,
  category text DEFAULT 'general',
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage media library"
  ON media_library FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'evolystisweb@gmail.com')
  WITH CHECK (auth.jwt()->>'email' = 'evolystisweb@gmail.com');

CREATE POLICY "Public can view media library"
  ON media_library FOR SELECT
  TO public
  USING (true);

-- Insertion des paramètres par défaut
INSERT INTO site_settings (key, value, category, description) VALUES
  ('company_info', '{"name": "Evolystis", "slogan": "Favoriser l''Innovation par l''Éducation Professionnelle", "phone": "+33 1 45 67 89 00", "email": "contact@evolystis.fr", "address": "123 Avenue des Champs-Élysées, 75008 Paris", "hours": "Lundi - Vendredi : 9h00 - 18h00"}'::jsonb, 'general', 'Informations de l''entreprise'),
  ('theme_colors', '{"primary": "#1e3a8a", "secondary": "#3b82f6", "accent": "#f59e0b", "background": "#f9fafb", "text": "#111827"}'::jsonb, 'design', 'Couleurs du thème'),
  ('typography', '{"heading_font": "Inter", "body_font": "Inter", "font_sizes": {"h1": "3rem", "h2": "2.25rem", "h3": "1.875rem", "body": "1rem"}}'::jsonb, 'design', 'Paramètres de typographie'),
  ('social_media', '{"linkedin": "https://linkedin.com/company/evolystis", "facebook": "https://facebook.com/evolystis", "twitter": "https://twitter.com/evolystis"}'::jsonb, 'general', 'Réseaux sociaux')
ON CONFLICT (key) DO NOTHING;

-- Indexes pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_pages_content_page ON pages_content(page_name);
CREATE INDEX IF NOT EXISTS idx_formations_category ON formations(category);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_actualites_published ON actualites(is_published, date DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_library_type ON media_library(type);
