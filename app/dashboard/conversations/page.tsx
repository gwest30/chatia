'use client';

import { useState, useEffect } from 'react';

interface Conversation {
  id: string;
  contactName: string;
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
  type: string;
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/ghl/conversations')
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); return; }
        setConversations(d.conversations || []);
      })
      .catch(() => setError('Failed to load conversations'))
      .finally(() => setLoading(false));
  }, []);

  const typeIcon = (type: string) => {
    if (type === 'SMS') return '💬';
    if (type === 'Email') return '📧';
    if (type === 'Call') return '📞';
    return '💬';
  };

  const timeAgo = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Conversations</h1>
        <p className="text-gray-400 text-sm mt-0.5">All messages from your GoHighLevel account</p>
      </div>

      {error && (
        <div className="glass-card rounded-xl p-4 border-red-500/30 bg-red-500/5 text-red-400 text-sm">
          {error === 'GHL not connected' ? <span>GoHighLevel is not connected. <a href="/dashboard/settings" className="underline">Connect it in Settings →</a></span> : error}
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <svg className="w-6 h-6 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading conversations...
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-4xl mb-3">💬</div>
            <div className="font-semibold text-white mb-1">No conversations yet</div>
            <div className="text-sm">Conversations from GHL will appear here</div>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {conversations.map(conv => (
              <div key={conv.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {conv.contactName?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-white text-sm">{conv.contactName || 'Unknown'}</span>
                    <span className="text-xs text-gray-500">{timeAgo(conv.lastMessageDate)}</span>
                  </div>
                  <div className="text-xs text-gray-400 truncate">{conv.lastMessage || 'No messages'}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-base">{typeIcon(conv.type)}</span>
                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
