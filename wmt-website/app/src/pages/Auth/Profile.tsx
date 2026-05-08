import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user, refreshMe, logout } = useAuth();

  useEffect(() => {
    void refreshMe();
  }, [refreshMe]);

  if (!user) {
    return <div className="pt-28 text-center text-text-secondary">Loading profile...</div>;
  }

  return (
    <div className="min-h-[100dvh] pt-28 px-6">
      <div className="max-w-2xl mx-auto glass-card p-6 md:p-8">
        <h1 className="text-2xl font-bold text-white mb-4">My Profile</h1>

        <div className="space-y-2 text-text-secondary">
          <p><span className="text-white">Username:</span> {user.username}</p>
          <p><span className="text-white">Email:</span> {user.email}</p>
          <p><span className="text-white">Role:</span> {user.role}</p>
          <p><span className="text-white">Bio:</span> {user.bio || '-'}</p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="mt-6 rounded-lg px-4 py-2 font-semibold"
          style={{ background: '#ffd700', color: '#1a1400' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
