import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminPage() {
  const [totalClients, ghlConnected, vapiConnected] = await Promise.all([
    prisma.user.count({ where: { role: 'CLIENT' } }),
    prisma.workspace.count({ where: { ghlAccessToken: { not: null } } }),
    prisma.workspace.count({ where: { vapiApiKey: { not: null } } }),
  ]);

  const recentClients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    include: { workspace: { select: { ghlLocationName: true, ghlAccessToken: true, vapiApiKey: true } } },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Admin Overview</h1>
        <p className="text-gray-400 text-sm mt-0.5">Platform-wide status across all clients</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Clients', value: totalClients, color: 'from-purple-500 to-blue-600', icon: '👥' },
          { label: 'GHL Connected', value: ghlConnected, color: 'from-orange-400 to-red-500', icon: '🏆' },
          { label: 'VAPI Connected', value: vapiConnected, color: 'from-violet-500 to-purple-700', icon: '🎙️' },
          { label: 'Fully Active', value: Math.min(ghlConnected, vapiConnected), color: 'from-green-500 to-emerald-600', icon: '✅' },
        ].map(stat => (
          <div key={stat.label} className="glass-card rounded-2xl p-5">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Clients</h2>
          <Link href="/admin/clients" className="text-sm text-purple-400 hover:text-purple-300">View all →</Link>
        </div>
        <div className="glass-card rounded-2xl overflow-hidden">
          {recentClients.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-3xl mb-2">👥</div>
              <div>No clients yet. <Link href="/admin/clients" className="text-purple-400 underline">Add your first client →</Link></div>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">GHL</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">VAPI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentClients.map(c => (
                  <tr key={c.id}>
                    <td className="px-6 py-3">
                      <div className="text-sm font-medium text-white">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.email}</div>
                    </td>
                    <td className="px-6 py-3">
                      {c.workspace?.ghlAccessToken ? (
                        <span className="text-xs text-green-400">● {c.workspace.ghlLocationName || 'Connected'}</span>
                      ) : <span className="text-xs text-gray-600">○ Not connected</span>}
                    </td>
                    <td className="px-6 py-3">
                      {c.workspace?.vapiApiKey ? (
                        <span className="text-xs text-green-400">● Connected</span>
                      ) : <span className="text-xs text-gray-600">○ Not connected</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
