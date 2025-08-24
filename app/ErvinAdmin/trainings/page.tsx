"use client";
import useSWR from 'swr';
import { useState, useEffect } from 'react';
const fetcher = async (url: string) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Request failed');
  return r.json();
};

export default function AdminTrainingsPage() {
  const { data, error, isLoading, mutate } = useSWR('/api/trainings', fetcher);
  const [form, setForm] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const reset = () => { setForm({}); setEditingId(null); };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const res = await fetch(editingId ? `/api/ErvinAdmin/trainings/${editingId}` : '/api/ErvinAdmin/trainings', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { reset(); mutate(); } else alert('Gabim në ruajtje');
  };

  const onDelete = async (id: string) => {
    if (!confirm('Të fshihet ky plan trajnimi?')) return;
    const res = await fetch(`/api/ErvinAdmin/trainings/${id}`, { method: 'DELETE' });
    if (res.ok) mutate(); else alert('Gabim në fshirje');
  };

  useEffect(() => {
    if (!editingId) return;
    const t = data?.find((x: any) => x.id === editingId);
    if (t) setForm(t);
  }, [editingId, data]);

  return (
    <div className="section">
      <h1>Menaxho Trajnimet</h1>
      <div className="row">
        <div className="card" style={{ flex: 1 }}>
          <h3 className="card-title">{editingId ? 'Përditëso Plan' : 'Shto Plan'}</h3>
          <form className="form" onSubmit={onSubmit}>
            <input className="input" placeholder="Titulli" value={form.title || ''} onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))} required />
            <textarea className="textarea" placeholder="Përshkrim" value={form.description || ''} onChange={(e) => setForm((f: any) => ({ ...f, description: e.target.value }))} />
            <input className="input" type="number" min={0} placeholder="Çmimi €" value={form.price_eur || 0} onChange={(e) => setForm((f: any) => ({ ...f, price_eur: Number(e.target.value) }))} required />
            <div className="flex">
              <button className="btn primary">{editingId ? 'Ruaj ndryshimet' : 'Shto'}</button>
              {editingId && <button type="button" className="btn" onClick={reset}>Anulo</button>}
            </div>
          </form>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h3 className="card-title">Lista aktuale</h3>
          {isLoading && <div>Duke ngarkuar...</div>}
          {error && <div className="alert">Gabim në marrje</div>}
          <table className="table">
            <thead>
              <tr>
                <th>Titulli</th><th>€</th><th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((t: any) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{t.price_eur}</td>
                  <td className="flex">
                    <button className="btn" onClick={() => setEditingId(t.id)}>Ndrysho</button>
                    <button className="btn danger" onClick={() => onDelete(t.id)}>Fshi</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

