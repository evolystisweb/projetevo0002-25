import React, { useState } from 'react';
import { Calendar, Clock, Euro, Star, Filter, Search } from 'lucide-react';
import contentData from '../../data/content.json';

const FormationsSection = ({ language = 'fr' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [selectedLevel, setSelectedLevel] = useState('tous');
  const [showFilters, setShowFilters] = useState(false);

  // Traductions
  const t = {
    fr: {
      title: 'Formations Vedettes',
      subtitle: 'Découvrez nos programmes de formation les plus populaires conçus pour améliorer vos compétences et faire progresser votre carrière en management, technologie et industrie.',
      viewDetails: 'Voir les Détails',
      viewAll: 'Voir Toutes les Formations',
      duration: 'Durée',
      price: 'Prix',
      level: 'Niveau',
      startDate: 'Prochaines sessions',
      search: 'Rechercher une formation',
      filter: 'Filtrer',
      allCategories: 'Toutes les catégories',
      allLevels: 'Tous les niveaux'
    },
    en: {
      title: 'Featured Courses',
      subtitle: 'Discover our most popular training programs designed to enhance your skills and advance your career in management, technology, and industry.',
      viewDetails: 'View Details',
      viewAll: 'View All Courses',
      duration: 'Duration',
      price: 'Price',
      level: 'Level',
      startDate: 'Upcoming sessions',
      search: 'Search for a course',
      filter: 'Filter',
      allCategories: 'All categories',
      allLevels: 'All levels'
    }
  }[language] || {};

  // Filtrer les formations
  const filteredFormations = contentData.formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || formation.category === selectedCategory;
    const matchesLevel = selectedLevel === 'tous' || formation.level === selectedLevel;
    const matchesAvailable = formation.available;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesAvailable;
  });

  const featuredFormations = filteredFormations.filter(f => f.featured).slice(0, 3);

  const categories = [
    { value: 'tous', label: t.allCategories },
    { value: 'Transformation Digitale', label: 'Transformation Digitale' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sécurité', label: 'Sécurité' }
  ];

  const niveaux = [
    { value: 'tous', label: t.allLevels },
    { value: 'Débutant', label: 'Débutant' },
    { value: 'Intermédiaire', label: 'Intermédiaire' },
    { value: 'Avancé', label: 'Avancé' },
    { value: 'Expert', label: 'Expert' }
  ];

  const getLevelColor = (niveau) => {
    switch(niveau) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-blue-100 text-blue-800';
      case 'Avancé': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (categorie) => {
    switch(categorie) {
      case 'management': return '👥';
      case 'it': return '💻';
      case 'industrie': return '🏭';
      default: return '📚';
    }
  };

  return (
    <section className="py-20 bg-gray-50" id="formations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            {/* Filtres */}
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {niveaux.map(niveau => (
                  <option key={niveau.value} value={niveau.value}>{niveau.label}</option>
                ))}
              </select>
              
              <span className="text-sm text-gray-500">
                {filteredFormations.length} formation{filteredFormations.length > 1 ? 's' : ''} trouvée{filteredFormations.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Formations vedettes */}
        {featuredFormations.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary-800 mb-8">Formations Recommandées</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredFormations.map((formation) => (
                <div key={formation.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <span className="text-4xl">{getCategoryIcon(formation.categorie)}</span>
                  </div>
                  
                  <div className="p-6">
                    {/* Badge niveau et catégorie */}
                    <div className="flex justify-between items-center mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(formation.niveau)}`}>
                        {formation.niveau}
                      </span>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">
                        {formation.categorie}
                      </span>
                    </div>
                    
                    {/* Titre et description */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {formation.titre}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {formation.description}
                    </p>
                    
                    {/* Informations */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-2" size={16} />
                        {t.duration}: {formation.duree}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Euro className="mr-2" size={16} />
                        {t.price}: {formation.prix}
                      </div>
                      {formation.dates.length > 0 && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-2" size={16} />
                          {t.startDate}: {new Date(formation.dates[0].debut).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                    
                    {/* Boutons d'action */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                        {t.viewDetails}
                      </button>
                      <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                        📋 Programme
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toutes les formations */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-primary-800 mb-8">Toutes les Formations</h3>
          {filteredFormations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFormations.map((formation) => (
                <div key={formation.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-3xl">{getCategoryIcon(formation.categorie)}</span>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(formation.niveau)}`}>
                        {formation.niveau}
                      </span>
                      {formation.featured && (
                        <Star className="text-accent-500" size={16} />
                      )}
                    </div>
                    
                    <h4 className="font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {formation.titre}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {formation.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                      <span>{formation.duree}</span>
                      <span className="font-medium text-primary-600">{formation.prix}</span>
                    </div>
                    
                    <button className="w-full bg-primary-50 text-primary-600 py-2 rounded-lg hover:bg-primary-100 transition-colors font-medium">
                      {t.viewDetails}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune formation trouvée</h3>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary-900 text-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Besoin d'une formation sur mesure ?</h3>
          <p className="text-primary-200 mb-6 max-w-2xl mx-auto">
            Notre équipe d'experts peut concevoir des programmes de formation personnalisés 
            pour répondre aux besoins spécifiques de votre organisation.
          </p>
          <button className="bg-accent-500 text-white px-8 py-3 rounded-lg hover:bg-accent-600 transition-colors font-semibold">
            Demander un devis personnalisé
          </button>
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;