import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const ws = await prisma.workspace.findUnique({ where: { userId: session!.user.id } });

  const ghlConnected = !!ws?.ghlAccessToken;
  const vapiConnected = !!ws?.vapiApiKey;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-black text-white">
          Welcome back, <span className="gradient-text">{session!.user.name.split(' ')[0]}</span>
        </h1>
        <p className="text-gray-400 mt-1">Here&apos;s your AI automation hub.</p>
      </div>

      {/* Connection status */}
      {(!ghlConnected || !vapiConnected) && (
        <div className="glass-card rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Complete your setup</h3>
              <p className="text-gray-400 text-sm mb-3">Connect your integrations to unlock the full portal.</p>
              <div className="flex flex-wrap gap-3">
                {!ghlConnected && (
                  <Link href="/dashboard/settings" className="px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-semibold hover:bg-orange-500/30 transition-all">
                    Connect GoHighLevel
                  </Link>
                )}
                {!vapiConnected && (
                  <Link href="/dashboard/settings" className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-semibold hover:bg-purple-500/30 transition-all">
                    Connect VAPI
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'GoHighLevel', value: ghlConnected ? ws?.ghlLocationName || 'Connected' : 'Not connected', status: ghlConnected, icon: '🏆', href: '/dashboard/contacts' },
          { label: 'VAPI Knowledge', value: vapiConnected ? 'Connected' : 'Not connected', status: vapiConnected, icon: '🎙️', href: '/dashboard/knowledge' },
          { label: 'Contacts', value: ghlConnected ? 'View all' : '—', status: ghlConnected, icon: '👥', href: '/dashboard/contacts' },
          { label: 'Pipelines', value: ghlConnected ? 'View all' : '—', status: ghlConnected, icon: '📊', href: '/dashboard/pipelines' },
        ].map(card => (
          <Link key={card.label} href={card.href} className="glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all">
            <div className="text-2xl mb-3">{card.icon}</div>
            <div className="text-xs text-gray-500 mb-1">{card.label}</div>
            <div className={`text-sm font-semibold ${card.status ? 'text-white' : 'text-gray-600'}`}>{card.value}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-1.5 h-1.5 rounded-full ${card.status ? 'bg-green-400' : 'bg-gray-600'}`} />
              <span className={`text-xs ${card.status ? 'text-green-400' : 'text-gray-600'}`}>
                {card.status ? 'Active' : 'Setup required'}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick nav */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Access</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: '/dashboard/contacts', title: 'Contacts', desc: 'View and manage all GHL contacts', color: 'from-blue-500 to-cyan-500', icon: '👥' },
            { href: '/dashboard/pipelines', title: 'Pipelines', desc: 'Track opportunities through your sales pipeline', color: 'from-orange-400 to-red-500', icon: '📊' },
            { href: '/dashboard/conversations', title: 'Conversations', desc: 'All GHL messages and communication history', color: 'from-green-500 to-emerald-600', icon: '💬' },
            { href: '/dashboard/calendar', title: 'Calendar', desc: 'Upcoming appointments and scheduled calls', color: 'from-purple-500 to-pink-500', icon: '📅' },
            { href: '/dashboard/knowledge', title: 'Knowledge Base', desc: 'Manage VAPI knowledge files and AI training data', color: 'from-violet-500 to-purple-700', icon: '📚' },
            { href: '/dashboard/settings', title: 'Settings', desc: 'Manage integrations and account preferences', color: 'from-gray-500 to-gray-700', icon: '⚙️' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="glass-card rounded-2xl p-5 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl shrink-0`}>
                {item.icon}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{item.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
