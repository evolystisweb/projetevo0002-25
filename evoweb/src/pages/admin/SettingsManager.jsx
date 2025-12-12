import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const SettingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    company_info: {
      name: '',
      slogan: '',
      phone: '',
      email: '',
      address: '',
      hours: ''
    },
    theme_colors: {
      primary: '',
      secondary: '',
      accent: '',
      background: '',
      text: ''
    },
    typography: {
      heading_font: '',
      body_font: '',
      font_sizes: {
        h1: '',
        h2: '',
        h3: '',
        body: ''
      }
    },
    social_media: {
      linkedin: '',
      facebook: '',
      twitter: ''
    }
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (!error && data) {
      const settingsObj = {};
      data.forEach(setting => {
        settingsObj[setting.key] = setting.value;
      });
      setSettings({ ...settings, ...settingsObj });
    }
    setLoading(false);
  };

  const saveSettings = async () => {
    setSaving(true);

    for (const [key, value] of Object.entries(settings)) {
      await supabase
        .from('site_settings')
        .upsert({
          key,
          value,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'key'
        });
    }

    setSaving(false);
    alert('Paramètres enregistrés avec succès !');
  };

  const updateSetting = (category, field, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [field]: value
      }
    });
  };

  const updateNestedSetting = (category, subcategory, field, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [subcategory]: {
          ...settings[category][subcategory],
          [field]: value
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement des paramètres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Paramètres du Site</h1>
            <p className="text-gray-600 mt-2">Configuration globale et personnalisation</p>
          </div>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Informations de l'entreprise</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
                <input
                  type="text"
                  value={settings.company_info?.name || ''}
                  onChange={(e) => updateSetting('company_info', 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slogan</label>
                <input
                  type="text"
                  value={settings.company_info?.slogan || ''}
                  onChange={(e) => updateSetting('company_info', 'slogan', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="text"
                  value={settings.company_info?.phone || ''}
                  onChange={(e) => updateSetting('company_info', 'phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.company_info?.email || ''}
                  onChange={(e) => updateSetting('company_info', 'email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                <input
                  type="text"
                  value={settings.company_info?.address || ''}
                  onChange={(e) => updateSetting('company_info', 'address', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Horaires</label>
                <input
                  type="text"
                  value={settings.company_info?.hours || ''}
                  onChange={(e) => updateSetting('company_info', 'hours', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Lundi - Vendredi : 9h00 - 18h00"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Couleurs du thème</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur primaire</label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={settings.theme_colors?.primary || '#1e3a8a'}
                    onChange={(e) => updateSetting('theme_colors', 'primary', e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme_colors?.primary || ''}
                    onChange={(e) => updateSetting('theme_colors', 'primary', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur secondaire</label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={settings.theme_colors?.secondary || '#3b82f6'}
                    onChange={(e) => updateSetting('theme_colors', 'secondary', e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme_colors?.secondary || ''}
                    onChange={(e) => updateSetting('theme_colors', 'secondary', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur accent</label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={settings.theme_colors?.accent || '#f59e0b'}
                    onChange={(e) => updateSetting('theme_colors', 'accent', e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.theme_colors?.accent || ''}
                    onChange={(e) => updateSetting('theme_colors', 'accent', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Réseaux sociaux</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={settings.social_media?.linkedin || ''}
                  onChange={(e) => updateSetting('social_media', 'linkedin', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="https://linkedin.com/company/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input
                  type="url"
                  value={settings.social_media?.facebook || ''}
                  onChange={(e) => updateSetting('social_media', 'facebook', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                <input
                  type="url"
                  value={settings.social_media?.twitter || ''}
                  onChange={(e) => updateSetting('social_media', 'twitter', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Typographie</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Police des titres</label>
                <input
                  type="text"
                  value={settings.typography?.heading_font || ''}
                  onChange={(e) => updateSetting('typography', 'heading_font', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Inter, Arial, sans-serif"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Police du corps de texte</label>
                <input
                  type="text"
                  value={settings.typography?.body_font || ''}
                  onChange={(e) => updateSetting('typography', 'body_font', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Inter, Arial, sans-serif"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer tous les paramètres'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
