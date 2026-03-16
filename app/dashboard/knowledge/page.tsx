'use client';

import { useState, useEffect } from 'react';

interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  status: string;
}

export default function KnowledgePage() {
  const [bases, setBases] = useState<KnowledgeBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newKb, setNewKb] = useState({ name: '', description: '' });
  const [saving, setSaving] = useState(false);

  const fetchBases = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/vapi/knowledge');
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || 'Failed to load knowledge bases');
        return;
      }
      const data = await res.json();
      setBases(Array.isArray(data) ? data : data.data || []);
    } catch {
      setError('Failed to load knowledge bases');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBases(); }, []);

  const createKb = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/vapi/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKb),
      });
      setShowCreate(false);
      setNewKb({ name: '', description: '' });
      fetchBases();
    } catch {
      setError('Failed to create knowledge base');
    } finally {
      setSaving(false);
    }
  };

  const deleteKb = async (id: string) => {
    if (!confirm('Delete this knowledge base? This cannot be undone.')) return;
    await fetch(`/api/vapi/knowledge/${id}`, { method: 'DELETE' });
    fetchBases();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-black text-white">Knowledge Base</h1>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">VAPI</span>
          </div>
          <p className="text-gray-400 text-sm">Manage the knowledge files that power your AI voice agents</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-sm font-bold text-white relative z-10 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Knowledge Base
        </button>
      </div>

      <div className="glass-card rounded-2xl p-4 bg-blue-500/5 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-300">
            Knowledge bases contain the information your VAPI AI agents use to answer questions and handle calls.
            Upload documents, FAQs, product info, and scripts here. Your agency controls which assistants use each knowledge base.
          </p>
        </div>
      </div>

      {error && (
        <div className="glass-card rounded-xl p-4 border-red-500/30 bg-red-500/5 text-red-400 text-sm">
          {error === 'VAPI not connected' ? <span>VAPI is not connected. <a href="/dashboard/settings" className="underline">Add your VAPI API key in Settings →</a></span> : error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 p-12 text-center text-gray-500">
            <svg className="w-6 h-6 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading knowledge bases...
          </div>
        ) : bases.length === 0 ? (
          <div className="col-span-2 glass-card rounded-2xl p-12 text-center text-gray-500">
            <div className="text-4xl mb-3">📚</div>
            <div className="font-semibold text-white mb-1">No knowledge bases yet</div>
            <div className="text-sm">Create your first knowledge base to train your AI voice agents</div>
          </div>
        ) : (
          bases.map(kb => (
            <div key={kb.id} className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-xl">
                  📚
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    kb.status === 'ready' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>{kb.status || 'active'}</span>
                  <button
                    onClick={() => deleteKb(kb.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">{kb.name}</h3>
              {kb.description && <p className="text-xs text-gray-400 mb-3">{kb.description}</p>}
              <div className="text-xs text-gray-500">
                Created {kb.createdAt ? new Date(kb.createdAt).toLocaleDateString() : '—'}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && setShowCreate(false)}>
          <div className="glass rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-bold text-white mb-4">Create Knowledge Base</h3>
            <form onSubmit={createKb} className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Name *</label>
                <input
                  required
                  value={newKb.name}
                  onChange={e => setNewKb({ ...newKb, name: e.target.value })}
                  placeholder="e.g. Product FAQs, Sales Script"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Description</label>
                <textarea
                  value={newKb.description}
                  onChange={e => setNewKb({ ...newKb, description: e.target.value })}
                  placeholder="What information does this knowledge base contain?"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl glass text-sm text-gray-400 hover:text-white transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5 rounded-xl text-sm font-bold text-white relative z-10 disabled:opacity-50">{saving ? 'Creating...' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
