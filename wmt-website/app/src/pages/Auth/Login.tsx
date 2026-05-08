import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate('/profile');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] pt-28 px-6">
      <div className="max-w-md mx-auto glass-card p-6 md:p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Login</h1>
        <p className="text-text-secondary mb-6">Sign in to access community features.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="w-full rounded-lg px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] text-white"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full rounded-lg px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] text-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg py-2 font-semibold"
            style={{ background: '#00ffff', color: '#001018' }}
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-sm text-text-secondary mt-4">
          No account?{' '}
          <Link to="/register" className="text-neon-cyan no-underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
