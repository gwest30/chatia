'use client';

import { signOut } from 'next-auth/react';

interface Props {
  user: { name: string; email: string; role: string };
}

export default function DashboardHeader({ user }: Props) {
  return (
    <header className="h-16 glass border-b border-white/10 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2">
        {user.role === 'ADMIN' && (
          <span className="text-xs font-bold px-2 py-1 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
            ADMIN
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-semibold text-white">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className="p-2 rounded-xl glass hover:bg-white/10 transition-all text-gray-400 hover:text-white"
          title="Sign out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
}
