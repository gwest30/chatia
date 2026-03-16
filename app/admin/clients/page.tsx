'use client';

import { useState, useEffect } from 'react';

interface Client {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  workspace: {
    name: string;
    ghlConnected: boolean;
    ghlLocationName: string | null;
    vapiConnected: boolean;
  } | null;
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', ghlLocationId: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchClients = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/clients');
    const data = await res.json();
    setClients(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchClients(); }, []);

  const addClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch('/api/admin/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error); return; }
    setShowAdd(false);
    setForm({ name: '', email: '', password: '', ghlLocationId: '' });
    fetchClients();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Clients</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage client accounts and their integrations</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-sm font-bold text-white relative z-10 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Client
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <svg className="w-6 h-6 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading clients...
          </div>
        ) : clients.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-4xl mb-3">👥</div>
            <div className="font-semibold text-white mb-1">No clients yet</div>
            <div className="text-sm">Add your first client to get started</div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">GoHighLevel</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">VAPI</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.map(c => (
                <tr key={c.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {c.workspace?.ghlConnected ? (
                      <div>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">● Connected</span>
                        {c.workspace.ghlLocationName && <div className="text-xs text-gray-500 mt-1">{c.workspace.ghlLocationName}</div>}
                      </div>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-500 border border-gray-500/20">○ Not set up</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {c.workspace?.vapiConnected ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">● Connected</span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-500 border border-gray-500/20">○ Not set up</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Client Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="glass rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-bold text-white mb-4">Add New Client</h3>
            <form onSubmit={addClient} className="space-y-3">
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all" />
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all" />
              <input required type="password" minLength={8} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Temporary Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all" />
              <input value={form.ghlLocationId} onChange={e => setForm({ ...form, ghlLocationId: e.target.value })} placeholder="GHL Location ID (optional)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all" />
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl glass text-sm text-gray-400 hover:text-white transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5 rounded-xl text-sm font-bold text-white relative z-10 disabled:opacity-50">{saving ? 'Creating...' : 'Create Client'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
