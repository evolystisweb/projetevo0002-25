import React, { useState } from 'react';
import { 
  Settings, 
  Laptop, 
  Factory, 
  CheckCircle, 
  ArrowRight,
  Star,
  Play,
  Download,
  Globe,
  Users,
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';
import contentData from '../../data/content.json';

const ServicesEtProduitsSection = ({ language = 'fr' }) => {
  const [activeTab, setActiveTab] = useState('services');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Traductions
  const t = {
    fr: {
      servicesTitle: 'Nos Services',
      servicesSubtitle: 'Nous fournissons des services de conseil et d\'implémentation experts pour aider les organisations à optimiser leurs opérations, améliorer leurs capacités technologiques et stimuler l\'innovation.',
      productsTitle: 'Nos Produits Digitaux',
      productsSubtitle: 'Découvrez notre gamme de solutions technologiques innovantes conçues pour digitaliser et optimiser vos processus métier.',
      learnMore: 'En savoir plus',
      demo: 'Démo en ligne',
      discover: 'Découvrir',
      closeModal: 'Fermer',
      services: 'Services',
      products: 'Produits',
      customSolutions: 'Besoin de Solutions Personnalisées ?',
      customDescription: 'Notre équipe d\'experts peut fournir des services de conseil et d\'implémentation sur mesure pour répondre à vos défis commerciaux spécifiques et besoins technologiques.',
      getInTouch: 'Contactez-nous',
      featured: 'Recommandé',
      popular: 'Populaire',
      new: 'Nouveau',
      pricingFrom: 'À partir de'
    },
    en: {
      servicesTitle: 'Our Services',
      servicesSubtitle: 'We provide expert consulting and implementation services to help organizations optimize their operations, enhance their technological capabilities, and drive innovation.',
      productsTitle: 'Our Digital Products',
      productsSubtitle: 'Discover our range of innovative technological solutions designed to digitize and optimize your business processes.',
      learnMore: 'Learn More',
      demo: 'Online Demo',
      discover: 'Discover',
      closeModal: 'Close',
      services: 'Services',
      products: 'Products',
      customSolutions: 'Need Customized Solutions?',
      customDescription: 'Our team of experts can provide tailored consulting and implementation services to address your specific business challenges and technology needs.',
      getInTouch: 'Get in Touch',
      featured: 'Recommended',
      popular: 'Popular',
      new: 'New',
      pricingFrom: 'Starting from'
    }
  }[language] || {};

  const tabs = [
    { id: 'services', label: t.services, icon: '🛠️' },
    { id: 'products', label: t.products, icon: '💡' }
  ];

  const getServiceIcon = (categorie) => {
    switch(categorie) {
      case 'management': return <Users size={32} />;
      case 'it': return <Laptop size={32} />;
      case 'industrie': return <Factory size={32} />;
      default: return <Settings size={32} />;
    }
  };

  const getServiceColor = (categorie) => {
    switch(categorie) {
      case 'management': return 'from-blue-500 to-blue-600';
      case 'it': return 'from-teal-500 to-teal-600';
      case 'industrie': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getProductBadge = (badge) => {
    const badges = {
      'Populaire': 'bg-green-500',
      'IA Avancée': 'bg-purple-500',
      'Industrie 4.0': 'bg-blue-500',
      'Recommandé': 'bg-accent-500'
    };
    return badges[badge] || 'bg-gray-500';
  };

  const ServiceModal = ({ service, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{service.titre}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          {/* Description détaillée */}
          <div className="mb-8">
            <p className="text-lg text-gray-600 leading-relaxed">{service.detailedDescription}</p>
          </div>
          
          {/* Prestations */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Prestations</h3>
              <ul className="space-y-3">
                {service.prestations.map((prestation, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <span className="text-gray-700">{prestation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Bénéfices</h3>
              <ul className="space-y-3">
                {service.benefices.map((benefice, index) => (
                  <li key={index} className="flex items-center">
                    <TrendingUp className="text-primary-500 mr-3" size={20} />
                    <span className="text-gray-700">{benefice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Informations pratiques */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Durée du projet</h4>
                <p className="text-gray-600">{service.duration}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Catégorie</h4>
                <p className="text-gray-600 capitalize">{service.category}</p>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold flex items-center gap-2">
              <Target size={20} />
              Demander un devis
            </button>
            <button className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold flex items-center gap-2">
              <Download size={20} />
              Télécharger la fiche
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
            {product.badge && (
              <span className={`${getProductBadge(product.badge)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {product.badge}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          {/* Prix et description */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.detailedDescription}</p>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4">Fonctionnalités principales</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {product.fonctionnalites.map((fonction, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={20} />
                    <span className="text-gray-700">{fonction}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-800 mb-2">
                {product.prix}€<span className="text-lg text-gray-600">/{product.prixMode}</span>
              </div>
              <div className="text-sm text-gray-600 mb-6">{t.pricingFrom}</div>
              
              <div className="space-y-3">
                {product.demo && (
                  <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Play size={20} />
                    {t.demo}
                  </button>
                )}
                <button className="w-full border border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                  Essai gratuit
                </button>
              </div>
            </div>
          </div>
          
          {/* Spécifications */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Spécifications techniques</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Plateformes</h4>
                <p className="text-gray-600 text-sm">{product.specifications.plateformes}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Stockage/Traitement</h4>
                <p className="text-gray-600 text-sm">{product.specifications.stockage || product.specifications.traitement}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Support</h4>
                <p className="text-gray-600 text-sm">{product.specifications.support}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Intégrations</h4>
                <p className="text-gray-600 text-sm">{product.specifications.integrations}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            {t.servicesTitle} & {t.productsTitle}
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              {t.servicesSubtitle}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.productsSubtitle}
            </p>
          </div>
        </div>

        {/* Onglets */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-xl p-1 flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-md'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'services' && (
          <div className="space-y-16">
            {/* Services */}
            <div className="grid md:grid-cols-3 gap-8">
              {contentData.services.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className={`h-32 bg-gradient-to-r ${getServiceColor(service.category)} flex items-center justify-center`}>
                    <div className="text-white">
                      {getServiceIcon(service.category)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="mr-2" size={16} />
                      Durée: {service.duration}
                    </div>
                    
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      {t.learnMore}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-16">
            {/* Produits */}
            <div className="grid md:grid-cols-3 gap-8">
              {contentData.produits.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center relative">
                    <span className="text-6xl">💡</span>
                    {product.badge && (
                      <span className={`absolute top-4 right-4 ${getProductBadge(product.badge)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary-800">
                        {product.price}€<span className="text-sm text-gray-600">/{product.prixMode}</span>
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2"
                      >
                        {t.discover}
                        <ArrowRight size={16} />
                      </button>
                      {product.demo && (
                        <button className="px-4 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                          <Play size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-primary-800 to-primary-900 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">{t.customSolutions}</h3>
          <p className="text-primary-200 mb-6 max-w-3xl mx-auto leading-relaxed">
            {t.customDescription}
          </p>
          <button className="bg-accent-500 text-white px-8 py-3 rounded-lg hover:bg-accent-600 transition-colors font-semibold flex items-center gap-2 mx-auto">
            <Globe size={20} />
            {t.getInTouch}
          </button>
        </div>
      </div>

      {/* Modals */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
};

export default ServicesEtProduitsSection;