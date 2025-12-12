import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings, Home, BookOpen, Briefcase, Package, Newspaper, Phone, Star, Award, Users, Target } from 'lucide-react';

// Components
import FormationsSection from './components/FormationsSection';
import ServicesEtProduitsSection from './components/ServicesEtProduitsSection';
import ActualitesRessourcesSection from './components/ActualitesRessourcesSection';
import AdminPanelSimple from './components/AdminPanelSimple';

// Custom CSS for additional animations and effects
import './App.css';

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/formations', label: 'Formations', icon: BookOpen },
    { path: '/services-produits', label: 'Services & Produits', icon: Briefcase },
    { path: '/actualites', label: 'Actualités & Ressources', icon: Newspaper },
    { path: '/contact', label: 'Contact', icon: Phone }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/logo.png" alt="Evolystis" className="w-12 h-12" />
            <div className="text-primary-900">
              <div className="text-xl font-bold group-hover:text-primary-600 transition-colors">Evolystis</div>
              <div className="text-sm text-gray-600">Innovation & Formation</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-300 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Admin Panel Link */}
            <Link
              to="/admin"
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 group"
            >
              <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium">Admin</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm rounded-lg mt-2 p-4 border border-gray-200 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-gray-100"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 bg-primary-600 hover:bg-primary-700 text-white px-3 py-3 rounded-lg transition-colors duration-300 mt-2"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Admin</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

// Home Page Component
const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Award,
      title: "Expertise Reconnue",
      description: "Plus de 15 ans d'expérience dans la transformation digitale"
    },
    {
      icon: Users,
      title: "Approche Humaine",
      description: "Formation personnalisée avec un suivi individuel"
    },
    {
      icon: Target,
      title: "Résultats Mesurables",
      description: "ROI démontré et KPIs de performance跟踪"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Favoriser l'Innovation par
              <span className="text-primary-600">
                {' '}l'Éducation Professionnelle
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Accompagnons votre transformation digitale avec des formations pratiques, 
              des conseils experts et des solutions innovantes adaptées à votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/formations"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Découvrir nos Formations
              </Link>
              <Link
                to="/contact"
                className="bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Parlons de votre Projet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Pourquoi Choisir Evolystis ?
            </h2>
            <p className="text-gray-600 text-lg">
              Notre approche unique combine expertise technique et pédagogique
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-8 border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="bg-primary-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-6">
            Prêt à Transformer Votre Entreprise ?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Rejoignez plus de 500 entreprises qui nous font confiance pour leur transformation digitale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/formations"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Explorer nos Formations
            </Link>
            <Link
              to="/services-produits"
              className="bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              Voir nos Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Message envoyé avec succès ! Nous vous recontacterons bientôt.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-primary-900 mb-6">Contactez-nous</h1>
            <p className="text-gray-600 text-lg">
              Parlons de votre projet de transformation digitale
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
              <h2 className="text-2xl font-semibold text-primary-900 mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Entreprise</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Décrivez votre projet ou vos besoins..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Informations de contact</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 font-medium">Adresse</p>
                    <p className="text-gray-900">123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Téléphone</p>
                    <p className="text-gray-900">+33 1 45 67 89 00</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Email</p>
                    <p className="text-gray-900">contact@evolystis.fr</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Horaires</p>
                    <p className="text-gray-900">Lundi - Vendredi : 9h00 - 18h00</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Besoin d'aide immédiate ?</h3>
                <p className="text-gray-600 mb-6">
                  Notre équipe est disponible pour répondre à vos questions et vous accompagner dans votre projet.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+33145678900"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg text-center font-semibold transition-colors duration-300"
                  >
                    Appeler maintenant
                  </a>
                  <a
                    href="mailto:contact@evolystis.fr"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg text-center font-semibold transition-colors duration-300 border border-gray-300"
                  >
                    Écrire un email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-900 text-lg font-bold">E</span>
              </div>
              <span className="text-white text-xl font-bold">Evolystis</span>
            </div>
            <p className="text-gray-300 mb-4">
              Favoriser l'Innovation par l'Éducation Professionnelle
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Formations</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/formations" className="hover:text-accent-400 transition-colors">Transformation Digitale</Link></li>
              <li><Link to="/formations" className="hover:text-accent-400 transition-colors">Marketing Digital</Link></li>
              <li><Link to="/formations" className="hover:text-accent-400 transition-colors">Cybersécurité</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/services-produits" className="hover:text-accent-400 transition-colors">Conseil en Stratégie</Link></li>
              <li><Link to="/services-produits" className="hover:text-accent-400 transition-colors">Transformation Digitale</Link></li>
              <li><Link to="/services-produits" className="hover:text-accent-400 transition-colors">Sécurisation IT</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>+33 1 45 67 89 00</li>
              <li>contact@evolystis.fr</li>
              <li>123 Avenue des Champs-Élysées<br />75008 Paris</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Evolystis. Tous droits réservés. | 
            <a href="#" className="hover:text-accent-400 transition-colors ml-1">Mentions légales</a> | 
            <a href="#" className="hover:text-accent-400 transition-colors ml-1">Politique de confidentialité</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/formations" element={<FormationsSection />} />
            <Route path="/services-produits" element={<ServicesEtProduitsSection />} />
            <Route path="/actualites" element={<ActualitesRessourcesSection />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPanelSimple />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;