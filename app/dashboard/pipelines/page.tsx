'use client';

import { useState, useEffect } from 'react';

interface Stage { id: string; name: string; }
interface Pipeline { id: string; name: string; stages: Stage[]; }
interface Opportunity {
  id: string;
  name: string;
  monetaryValue: number;
  status: string;
  stageId: string;
  contact: { name: string; email: string };
}

export default function PipelinesPage() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/ghl/pipelines')
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); return; }
        const pipes: Pipeline[] = d.pipelines || [];
        setPipelines(pipes);
        if (pipes.length > 0) setSelectedPipeline(pipes[0]);
      })
      .catch(() => setError('Failed to load pipelines'))
      .finally(() => setLoading(false));
  }, []);

  const stageColor = (i: number) => {
    const colors = ['from-purple-500 to-blue-600', 'from-blue-500 to-cyan-500', 'from-cyan-500 to-green-500', 'from-green-500 to-emerald-600', 'from-yellow-400 to-orange-500', 'from-orange-400 to-red-500'];
    return colors[i % colors.length];
  };

  const oppsByStage = (stageId: string) => opportunities.filter(o => o.stageId === stageId);
  const fmtMoney = (v: number) => v ? `$${v.toLocaleString()}` : '$0';

  return (
    <div className="max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Pipelines</h1>
          <p className="text-gray-400 text-sm mt-0.5">Track opportunities through your sales process</p>
        </div>
        {pipelines.length > 1 && (
          <select
            value={selectedPipeline?.id}
            onChange={e => setSelectedPipeline(pipelines.find(p => p.id === e.target.value) || null)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
            style={{ colorScheme: 'dark' }}
          >
            {pipelines.map(p => <option key={p.id} value={p.id} className="bg-gray-900">{p.name}</option>)}
          </select>
        )}
      </div>

      {error && (
        <div className="glass-card rounded-xl p-4 border-red-500/30 bg-red-500/5 text-red-400 text-sm">
          {error === 'GHL not connected' ? <span>GoHighLevel is not connected. <a href="/dashboard/settings" className="underline">Connect it in Settings →</a></span> : error}
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-gray-500">
          <svg className="w-6 h-6 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading pipelines...
        </div>
      ) : selectedPipeline ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {selectedPipeline.stages.map((stage, i) => (
              <div key={stage.id} className="w-72 shrink-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stageColor(i)}`} />
                  <span className="text-sm font-semibold text-white">{stage.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">{oppsByStage(stage.id).length}</span>
                </div>
                <div className="space-y-2 min-h-[120px]">
                  {oppsByStage(stage.id).length === 0 ? (
                    <div className="glass rounded-xl p-4 text-center text-xs text-gray-600 border border-dashed border-white/10">
                      No opportunities
                    </div>
                  ) : (
                    oppsByStage(stage.id).map(opp => (
                      <div key={opp.id} className="glass-card rounded-xl p-4">
                        <div className="font-medium text-white text-sm mb-1">{opp.name}</div>
                        <div className="text-xs text-gray-400">{opp.contact?.name || 'Unknown'}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold text-green-400">{fmtMoney(opp.monetaryValue)}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            opp.status === 'won' ? 'bg-green-500/20 text-green-400' :
                            opp.status === 'lost' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>{opp.status || 'open'}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center text-gray-500">
          <div className="text-4xl mb-3">📊</div>
          <div className="font-semibold text-white mb-1">No pipelines found</div>
          <div className="text-sm">Create pipelines in GoHighLevel to see them here</div>
        </div>
      )}
    </div>
  );
}
