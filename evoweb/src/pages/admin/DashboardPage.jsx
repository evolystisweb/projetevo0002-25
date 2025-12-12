import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Briefcase,
  Newspaper,
  MessageSquare,
  Settings,
  Image as ImageIcon,
  LogOut,
  Users,
  TrendingUp,
  Bell
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    formations: 0,
    services: 0,
    actualites: 0,
    contactRequests: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    loadStats();
  }, [user, navigate]);

  const loadStats = async () => {
    try {
      const [formations, services, actualites, contacts] = await Promise.all([
        supabase.from('formations').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('actualites').select('id', { count: 'exact', head: true }),
        supabase.from('contact_requests').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        formations: formations.count || 0,
        services: services.count || 0,
        actualites: actualites.count || 0,
        contactRequests: contacts.count || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: FileText, label: 'Pages & Contenu', path: '/admin/pages', color: 'blue' },
    { icon: GraduationCap, label: 'Formations', path: '/admin/formations', color: 'green' },
    { icon: Briefcase, label: 'Services & Produits', path: '/admin/services', color: 'purple' },
    { icon: Newspaper, label: 'Actualités', path: '/admin/actualites', color: 'orange' },
    { icon: MessageSquare, label: 'Demandes Contact', path: '/admin/contacts', color: 'red', badge: stats.contactRequests },
    { icon: ImageIcon, label: 'Bibliothèque Médias', path: '/admin/media', color: 'pink' },
    { icon: Settings, label: 'Paramètres Site', path: '/admin/settings', color: 'gray' }
  ];

  const statCards = [
    { label: 'Formations', value: stats.formations, icon: GraduationCap, color: 'bg-green-500' },
    { label: 'Services', value: stats.services, icon: Briefcase, color: 'bg-purple-500' },
    { label: 'Actualités', value: stats.actualites, icon: Newspaper, color: 'bg-orange-500' },
    { label: 'Messages', value: stats.contactRequests, icon: MessageSquare, color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Administration Evolystis</h1>
                <p className="text-sm text-gray-500">Gestion du contenu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500">Super Administrateur</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h2>
          <p className="text-gray-600">Aperçu de votre site et gestion du contenu</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group relative"
              >
                {item.badge > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </div>
                )}
                <div className={`inline-flex p-4 bg-${item.color}-100 rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-sm text-gray-600">
                  Gérer et modifier le contenu de cette section
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
