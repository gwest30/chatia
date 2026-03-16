'use client';

import { useState, useEffect } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status: string;
  contactName: string;
  calendarId: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/ghl/calendars')
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); return; }
        setEvents(d.events || []);
      })
      .catch(() => setError('Failed to load calendar'))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (status: string) => {
    if (status === 'confirmed') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (status === 'cancelled') return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  };

  const groupByDay = () => {
    const groups: Record<string, CalendarEvent[]> = {};
    events.forEach(e => {
      const day = new Date(e.startTime).toDateString();
      if (!groups[day]) groups[day] = [];
      groups[day].push(e);
    });
    return groups;
  };

  const grouped = groupByDay();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Calendar</h1>
        <p className="text-gray-400 text-sm mt-0.5">Upcoming appointments and scheduled events (next 7 days)</p>
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
          Loading calendar...
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-gray-500">
          <div className="text-4xl mb-3">📅</div>
          <div className="font-semibold text-white mb-1">No upcoming events</div>
          <div className="text-sm">Calendar events from GHL will appear here</div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([day, dayEvents]) => (
            <div key={day}>
              <div className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                {new Date(day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
              <div className="space-y-3">
                {dayEvents.map(event => (
                  <div key={event.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                    <div className="text-center w-14 shrink-0">
                      <div className="text-lg font-black text-white">
                        {new Date(event.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).split(' ')[0]}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(event.startTime).toLocaleTimeString('en-US', { hour12: true }).split(' ')[1]}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{event.title}</div>
                      {event.contactName && <div className="text-xs text-gray-400 mt-0.5">{event.contactName}</div>}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg border capitalize ${statusColor(event.status)}`}>
                      {event.status || 'scheduled'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
