import React, { useState, useEffect } from 'react';
import { Mail, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setContacts(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await supabase
      .from('contact_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    loadContacts();
    if (selectedContact?.id === id) {
      setSelectedContact({ ...selectedContact, status });
    }
  };

  const updateNotes = async (id, notes) => {
    await supabase
      .from('contact_requests')
      .update({ notes, updated_at: new Date().toISOString() })
      .eq('id', id);
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Nouveau' },
      in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En cours' },
      resolved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Résolu' },
      closed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Fermé' }
    };

    const config = statusConfig[status] || statusConfig.new;
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Demandes de Contact</h1>
          <p className="text-gray-600 mt-2">Gérer et répondre aux demandes reçues</p>
        </div>

        <div className="mb-6 flex space-x-4">
          {['all', 'new', 'in_progress', 'resolved', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'Tous' : status === 'new' ? 'Nouveaux' : status === 'in_progress' ? 'En cours' : status === 'resolved' ? 'Résolus' : 'Fermés'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Messages reçus</h2>
              <div className="space-y-4">
                {loading ? (
                  <p className="text-center text-gray-500 py-8">Chargement...</p>
                ) : filteredContacts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Aucune demande trouvée</p>
                ) : (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedContact?.id === contact.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                          {contact.company && (
                            <p className="text-sm text-gray-500">{contact.company}</p>
                          )}
                        </div>
                        {getStatusBadge(contact.status)}
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mb-2">{contact.message}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            {selectedContact ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Détails de la demande</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <p className="text-gray-900">{selectedContact.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <a href={`mailto:${selectedContact.email}`} className="text-primary-600 hover:underline">
                      {selectedContact.email}
                    </a>
                  </div>

                  {selectedContact.company && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                      <p className="text-gray-900">{selectedContact.company}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <p className="text-gray-900">
                      {new Date(selectedContact.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="new">Nouveau</option>
                    <option value="in_progress">En cours</option>
                    <option value="resolved">Résolu</option>
                    <option value="closed">Fermé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes internes</label>
                  <textarea
                    value={selectedContact.notes || ''}
                    onChange={(e) => {
                      setSelectedContact({ ...selectedContact, notes: e.target.value });
                    }}
                    onBlur={(e) => updateNotes(selectedContact.id, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Ajouter des notes..."
                  />
                </div>

                <div className="mt-6">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Répondre par email</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Mail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Sélectionnez une demande pour voir les détails</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsManager;
