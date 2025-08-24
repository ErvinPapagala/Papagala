"use client";
import useSWR from 'swr';
import ParrotCard from '@/components/ParrotCard';
import { Parrot } from '@/lib/types';

const fetcher = async (url: string) => {
  const r = await fetch(url);
  if (!r.ok) {
    const msg = await r.text().catch(() => '');
    throw new Error(msg || 'Request failed');
  }
  return r.json();
};

export default function ParrotGrid() {
  const { data, error, isLoading } = useSWR<Parrot[]>('/api/parrots', fetcher);

  if (isLoading) return (
    <div className="grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card">
          <div className="skeleton" style={{ width: '100%', aspectRatio: '4/3', borderRadius: 12 }} />
          <div className="skeleton-line" style={{ width: '60%', marginTop: 12 }} />
          <div className="skeleton-line" style={{ width: '80%' }} />
          <div className="skeleton-line" style={{ width: '40%' }} />
        </div>
      ))}
    </div>
  );
  if (error) return <div className="alert">Nuk arritëm të marrim të dhënat. Kontrollo konfigurimin e Supabase.</div>;
  if (!data || !Array.isArray(data) || data.length === 0) return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 28 }}>🦜</div>
      <div style={{ height: 8 }} />
      <div>Ende nuk ka papagaj të listuar. Na kontaktoni për porosi të personalizuar.</div>
    </div>
  );

  return (
    <div className="grid">
      {data.map((p) => (
        <ParrotCard key={p.id} parrot={p} />
      ))}
    </div>
  );
}

