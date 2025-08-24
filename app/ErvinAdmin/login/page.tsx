"use client";
import { useState } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/ErvinAdmin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    setLoading(false);
    if (res.ok) {
      const next = new URLSearchParams(window.location.search).get('next') || '/ErvinAdmin';
      window.location.href = next;
    } else {
      const data = await res.json();
      setError(data?.error || 'Gabim i panjohur');
    }
  };

  return (
    <div className="section" style={{ display: 'grid', minHeight: 'calc(100vh - 200px)', placeItems: 'center' }}>
      <div className="card" style={{ width: 'min(440px, 92vw)', background: 'linear-gradient(135deg, rgba(99,102,241,0.03) 0%, transparent 60%), var(--card)' }}>
        <h1 style={{ marginTop: 0, fontSize: '1.8rem' }}>Hyrje Admin 🔐</h1>
        <form className="form" onSubmit={onSubmit}>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Fjalëkalimi i adminit" required />
          {error && <div className="alert">{error}</div>}
          <button className="btn primary" disabled={loading}>
            {loading ? 'Duke u identifikuar...' : 'Hyr'}
          </button>
        </form>
      </div>
    </div>
  );
}

