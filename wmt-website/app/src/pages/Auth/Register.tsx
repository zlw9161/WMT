import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register({ username: username.trim(), email: email.trim(), password });
      navigate('/profile');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Register failed';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] pt-28 px-6">
      <div className="max-w-md mx-auto glass-card p-6 md:p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Register</h1>
        <p className="text-text-secondary mb-6">Create your account for WMT Community.</p>

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
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full rounded-lg px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] text-white"
            type="password"
            placeholder="Password (>=8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg py-2 font-semibold"
            style={{ background: '#ff0080', color: '#ffffff' }}
          >
            {submitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-text-secondary mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-neon-cyan no-underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
