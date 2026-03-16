'use client';

import { useState, useEffect, useCallback } from 'react';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tags: string[];
  dateAdded: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newContact, setNewContact] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/ghl/contacts?query=${encodeURIComponent(query)}`);
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || 'Failed to load contacts');
        return;
      }
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const t = setTimeout(fetchContacts, 400);
    return () => clearTimeout(t);
  }, [fetchContacts]);

  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/ghl/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact),
    });
    setSaving(false);
    setShowAdd(false);
    setNewContact({ firstName: '', lastName: '', email: '', phone: '' });
    fetchContacts();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Contacts</h1>
          <p className="text-gray-400 text-sm mt-0.5">All contacts from your GoHighLevel account</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-sm font-bold text-white relative z-10 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Contact
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search contacts by name, email, or phone..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all"
        />
      </div>

      {error && (
        <div className="glass-card rounded-xl p-4 border-red-500/30 bg-red-500/5 text-red-400 text-sm">
          {error === 'GHL not connected' ? (
            <span>GoHighLevel is not connected. <a href="/dashboard/settings" className="underline">Connect it in Settings →</a></span>
          ) : error}
        </div>
      )}

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <svg className="w-6 h-6 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading contacts...
          </div>
        ) : contacts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-4xl mb-3">👥</div>
            <div className="font-semibold text-white mb-1">No contacts found</div>
            <div className="text-sm">{query ? 'Try a different search term' : 'Add your first contact to get started'}</div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contacts.map(c => (
                <tr key={c.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {(c.firstName?.[0] || c.email?.[0] || '?').toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {[c.firstName, c.lastName].filter(Boolean).join(' ') || '—'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{c.email || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{c.phone || '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(c.tags || []).slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {c.dateAdded ? new Date(c.dateAdded).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="glass rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-bold text-white mb-4">Add New Contact</h3>
            <form onSubmit={addContact} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input value={newContact.firstName} onChange={e => setNewContact({ ...newContact, firstName: e.target.value })} placeholder="First Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all" />
                <input value={newContact.lastName} onChange={e => setNewContact({ ...newContact, lastName: e.target.value })} placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all" />
              </div>
              <input type="email" value={newContact.email} onChange={e => setNewContact({ ...newContact, email: e.target.value })} placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all" />
              <input value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl glass text-sm text-gray-400 hover:text-white transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5 rounded-xl text-sm font-bold text-white relative z-10 disabled:opacity-50">{saving ? 'Saving...' : 'Add Contact'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
