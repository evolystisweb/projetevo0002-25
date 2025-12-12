import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, ArrowRight, Search, Filter, BookOpen, FileText, Video, Download } from 'lucide-react';
import contentData from '../../data/content.json';

const ActualitesRessourcesSection = ({ language = 'fr' }) => {
  const [activeTab, setActiveTab] = useState('actualites');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const currentItems = activeTab === 'actualites' ? contentData.actualites : contentData.ressources;
    const filtered = currentItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [activeTab, searchTerm]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'guide':
        return <BookOpen className="w-5 h-5" />;
      case 'download':
        return <Download className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Traductions
  const t = {
    fr: {
      title: 'Actualités & Ressources',
      subtitle: 'Découvrez nos dernières actualités, guides pratiques et ressources pour optimiser votre transformation digitale',
      search: 'Rechercher des actualités ou ressources...',
      news: 'Actualités',
      resources: 'Ressources',
      subscribe: 'S\'abonner',
      emailPlaceholder: 'Votre adresse email',
      noResults: 'Aucun {type} trouvé',
      tryDifferent: 'Essayez de modifier vos critères de recherche',
      newsletterTitle: 'Restez informé de nos dernières actualités',
      newsletterSubtitle: 'Recevez directement dans votre boîte mail nos conseils, analyses et nouvelles ressources',
      readMore: 'Lire plus'
    },
    en: {
      title: 'News & Resources',
      subtitle: 'Discover our latest news, practical guides and resources to optimize your digital transformation',
      search: 'Search for news or resources...',
      news: 'News',
      resources: 'Resources',
      subscribe: 'Subscribe',
      emailPlaceholder: 'Your email address',
      noResults: 'No {type} found',
      tryDifferent: 'Try modifying your search criteria',
      newsletterTitle: 'Stay informed of our latest news',
      newsletterSubtitle: 'Receive our advice, analysis and new resources directly in your mailbox',
      readMore: 'Read more'
    }
  }[language] || {};

  return (
    <section className="py-20 bg-gray-50" id="actualites">
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
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.search}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Navigation par onglets */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('actualites')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 'actualites'
                    ? 'bg-white text-primary-600 shadow-md'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t.news}
                </div>
              </button>
              <button
                onClick={() => setActiveTab('ressources')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 'ressources'
                    ? 'bg-white text-primary-600 shadow-md'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {t.resources}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Grille de contenu */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Image */}
                {item.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        {getTypeIcon(item.type)}
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Contenu */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      {item.author}
                    </div>

                    <button className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors group">
                      <span className="text-sm font-medium">{t.readMore}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-500 text-lg mb-4">
                {t.noResults.replace('{type}', activeTab === 'actualites' ? 'article d\'actualité' : 'ressource')}
              </div>
              <p className="text-gray-400">
                {t.tryDifferent}
              </p>
            </div>
          )}
        </div>

        {/* Inscription newsletter */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {t.newsletterTitle}
          </h3>
          <p className="text-primary-200 mb-6 max-w-2xl mx-auto">
            {t.newsletterSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors">
              {t.subscribe}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActualitesRessourcesSection;