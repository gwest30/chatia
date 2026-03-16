'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface WorkspaceData {
  name: string;
  ghlConnected: boolean;
  ghlLocationName: string | null;
  ghlLocationId: string | null;
  vapiConnected: boolean;
}

function SettingsContent() {
  const params = useSearchParams();
  const [ws, setWs] = useState<WorkspaceData | null>(null);
  const [vapiKey, setVapiKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    if (params.get('ghl_connected')) setBanner({ type: 'success', msg: 'GoHighLevel connected successfully!' });
    if (params.get('ghl_error')) setBanner({ type: 'error', msg: 'Failed to connect GoHighLevel. Please try again.' });
    fetch('/api/workspace').then(r => r.json()).then(setWs);
  }, [params]);

  const saveVapi = async () => {
    setSaving(true);
    const res = await fetch('/api/workspace', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vapiApiKey: vapiKey }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setVapiKey('');
      fetch('/api/workspace').then(r => r.json()).then(setWs);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const disconnectGHL = async () => {
    if (!confirm('Disconnect GoHighLevel? You will need to reconnect to access GHL data.')) return;
    await fetch('/api/workspace', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ghlDisconnect: true }),
    });
    fetch('/api/workspace').then(r => r.json()).then(setWs);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your integrations and account</p>
      </div>

      {banner && (
        <div className={`glass-card rounded-xl p-4 text-sm border ${banner.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
          {banner.msg}
        </div>
      )}

      {/* GHL Integration */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-2xl">🏆</div>
          <div>
            <h2 className="font-bold text-white text-lg">GoHighLevel</h2>
            <p className="text-gray-400 text-sm">Connect your GHL sub-account for full CRM access</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${ws?.ghlConnected ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
              {ws?.ghlConnected ? '● Connected' : '○ Not connected'}
            </span>
          </div>
        </div>

        {ws?.ghlConnected ? (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">{ws.ghlLocationName || 'Connected Location'}</div>
                <div className="text-xs text-gray-500 mt-0.5">Location ID: {ws.ghlLocationId}</div>
              </div>
              <span className="text-green-400 text-xs">✓ Active</span>
            </div>
            <div className="flex gap-3">
              <a href="/api/ghl/oauth" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold text-white relative z-10 inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reconnect
              </a>
              <button onClick={disconnectGHL} className="px-5 py-2.5 rounded-xl text-sm text-red-400 glass hover:bg-red-500/10 transition-all">
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Click below to authorize Chatia.ai to access your GoHighLevel sub-account. You&apos;ll be redirected to GHL to choose your location.
            </p>
            <a href="/api/ghl/oauth" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold text-white relative z-10 inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Connect GoHighLevel
            </a>
          </div>
        )}
      </div>

      {/* VAPI Integration */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-2xl">🎙️</div>
          <div>
            <h2 className="font-bold text-white text-lg">VAPI</h2>
            <p className="text-gray-400 text-sm">Connect VAPI to manage your AI Knowledge Base</p>
          </div>
          <div className="ml-auto">
            <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${ws?.vapiConnected ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
              {ws?.vapiConnected ? '● Connected' : '○ Not connected'}
            </span>
          </div>
        </div>

        {ws?.vapiConnected && (
          <div className="bg-white/5 rounded-xl p-4 mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">API Key configured</div>
              <div className="text-xs text-gray-500 mt-0.5">Your VAPI API key is securely stored</div>
            </div>
            <span className="text-green-400 text-xs">✓ Active</span>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">{ws?.vapiConnected ? 'Update VAPI API Key' : 'VAPI API Key'}</label>
            <input
              type="password"
              value={vapiKey}
              onChange={e => setVapiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 transition-all"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Find your API key at <span className="text-purple-400">dashboard.vapi.ai → API Keys</span>
            </p>
          </div>
          <button
            onClick={saveVapi}
            disabled={!vapiKey || saving}
            className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold text-white relative z-10 disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : saved ? '✓ Saved!' : 'Save API Key'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
