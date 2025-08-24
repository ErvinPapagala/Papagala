"use client";
import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';

const fetcher = async (url: string) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Request failed');
  return r.json();
};

export default function AdminParrotsPage() {
  const { data, error, isLoading, mutate } = useSWR('/api/parrots', fetcher);
  const [form, setForm] = useState<any>({ availability: 'available', image_urls: [] });
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const reset = () => { setForm({ availability: 'available', image_urls: [] }); setEditingId(null); };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/ErvinAdmin/parrots/${editingId}` : '/api/ErvinAdmin/parrots';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { reset(); mutate(); }
    else alert('Gabim në ruajtje');
  };

  const onDelete = async (id: string) => {
    if (!confirm('Të fshihet ky papagall?')) return;
    const res = await fetch(`/api/ErvinAdmin/parrots/${id}`, { method: 'DELETE' });
    if (res.ok) mutate(); else alert('Gabim në fshirje');
  };

  const formInput = (key: string, val: any) => setForm((f: any) => ({ ...f, [key]: val }));

  useEffect(() => {
    if (!editingId) return;
    const p = data?.find((x: any) => x.id === editingId);
    if (p) setForm({ ...p, image_urls: p.image_urls || [] });
  }, [editingId, data]);

  const imagesText = useMemo(() => (form.image_urls || []).join('\n'), [form.image_urls]);

  return (
    <div className="section">
      <h1>Menaxho Papagajt</h1>
      <div className="row">
        <div className="card" style={{ flex: 1 }}>
          <h3 className="card-title">{editingId ? 'Përditëso Papagall' : 'Shto Papagall'}</h3>
          <form className="form" onSubmit={onSubmit}>
            <input className="input" placeholder="Emri" value={form.name || ''} onChange={(e) => formInput('name', e.target.value)} required />
            <input className="input" placeholder="Lloji (p.sh. African Grey)" value={form.species || ''} onChange={(e) => formInput('species', e.target.value)} required />
            <div className="row">
              <input className="input" type="number" min={0} placeholder="Mosha (muaj)" value={form.age_months || 0} onChange={(e) => formInput('age_months', Number(e.target.value))} required />
              <input className="input" type="number" min={0} placeholder="Çmimi €" value={form.price_eur || 0} onChange={(e) => formInput('price_eur', Number(e.target.value))} required />
            </div>
            <div className="row">
              {/* Heqim cmimet e trajnimit nga papagalli, trajnimi është shërbim i ndarë */}
              <input className="input" type="number" min={0} placeholder="(Opsionale) Vlera fjalë përshkrimi" value={form.training_basic_eur || ''} onChange={(e) => formInput('training_basic_eur', e.target.value ? Number(e.target.value) : null)} style={{ display: 'none' }} />
              <input className="input" type="number" min={0} placeholder="(Opsionale) Vlera fjalë përshkrimi" value={form.training_advanced_eur || ''} onChange={(e) => formInput('training_advanced_eur', e.target.value ? Number(e.target.value) : null)} style={{ display: 'none' }} />
            </div>
            <select className="select" value={form.availability} onChange={(e) => formInput('availability', e.target.value)}>
              <option value="available">Në dispozicion</option>
              <option value="sold">Shitur</option>
            </select>
            {/* Cover image upload */}
            <div className="row">
              <input className="input" placeholder="URL i fotos kryesore" value={form.cover_image_url || ''} onChange={(e) => formInput('cover_image_url', e.target.value)} />
              <label className="btn" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Ngarko foto
                <input type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setUploading(true);
                      const fd = new FormData(); fd.append('file', file);
                      const r = await fetch('/api/ErvinAdmin/upload', { method: 'POST', body: fd });
                      if (!r.ok) throw new Error('Upload failed');
                      const { url } = await r.json();
                      formInput('cover_image_url', url);
                    } catch {
                      alert('Dështoi ngarkimi');
                    } finally { setUploading(false); e.currentTarget.value = ''; }
                  }} />
              </label>
            </div>
            {form.cover_image_url && (
              <div className="thumb"><img src={form.cover_image_url} alt="Cover" /></div>
            )}
            {/* Gallery upload */}
            <textarea className="textarea" placeholder="URL-të e galerisë (një për rresht)" value={imagesText} onChange={(e) => formInput('image_urls', e.target.value.split('\n').map((x) => x.trim()).filter(Boolean))} />
            <label className="btn" style={{ cursor: 'pointer', width: 'fit-content' }}>
              Shto imazhe në galeri
              <input type="file" accept="image/*" multiple style={{ display: 'none' }}
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length === 0) return;
                  try {
                    setUploading(true);
                    const urls: string[] = [];
                    for (const f of files) {
                      const fd = new FormData(); fd.append('file', f);
                      const r = await fetch('/api/ErvinAdmin/upload', { method: 'POST', body: fd });
                      if (!r.ok) throw new Error('Upload failed');
                      const { url } = await r.json();
                      urls.push(url);
                    }
                    formInput('image_urls', [...(form.image_urls || []), ...urls]);
                  } catch {
                    alert('Dështoi ngarkimi');
                  } finally { setUploading(false); e.currentTarget.value = ''; }
                }} />
            </label>
            {Array.isArray(form.image_urls) && form.image_urls.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {form.image_urls.map((u: string, i: number) => (
                  <div key={i} className="thumb-sm">
                    <img src={u} alt={`img-${i}`} />
                  </div>
                ))}
              </div>
            )}
            <textarea className="textarea" placeholder="Përshkrimi i plotë" value={form.description || ''} onChange={(e) => formInput('description', e.target.value)} />
            <div className="flex">
              <button className="btn primary" disabled={saving}>{saving ? 'Duke ruajtur...' : (editingId ? 'Ruaj ndryshimet' : 'Shto')}</button>
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
                <th>Emri</th><th>Lloji</th><th>€</th><th>Status</th><th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((p: any) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.species}</td>
                  <td>{p.price_eur}</td>
                  <td>{p.availability === 'available' ? '✅' : '❌'}</td>
                  <td className="flex">
                    <button className="btn" onClick={() => setEditingId(p.id)}>Ndrysho</button>
                    <button className="btn danger" onClick={() => onDelete(p.id)}>Fshi</button>
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

