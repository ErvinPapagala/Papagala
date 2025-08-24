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
  
  // Check if we're on Netlify
  const isNetlify = typeof window !== 'undefined' && window.location.hostname.includes('netlify');

  const reset = () => { setForm({ availability: 'available', image_urls: [] }); setEditingId(null); };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setSaving(true);
    
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/ErvinAdmin/parrots/${editingId}` : '/api/ErvinAdmin/parrots';
      
      const res = await fetch(url, { 
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(form) 
      });
      
      if (res.ok) { 
        const result = await res.json();
        reset(); 
        mutate(); 
        
        if (result._note) {
          alert('Demo Mode: Papagalli u simulua por nuk u ruajt. ' + result._note);
        } else {
          alert('Papagalli u ruajt me sukses!');
        }
      } else {
        const errorData = await res.json();
        console.error('Save error:', errorData);
        alert(`Gabim në ruajtje: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Gabim në lidhje me serverin');
    } finally {
      setSaving(false);
    }
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
    if (p) setForm({ ...p, image_urls: p.image_urls || [], video_urls: p.video_urls || [] });
  }, [editingId, data]);

  const imagesText = useMemo(() => (form.image_urls || []).join('\n'), [form.image_urls]);
  const videosText = useMemo(() => (form.video_urls || []).join('\n'), [form.video_urls]);

  return (
    <div className="section">
      <h1>Menaxho Papagajt</h1>
      
      {isNetlify && (
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)', 
          border: '1px solid rgba(255, 193, 7, 0.3)', 
          borderRadius: '12px', 
          padding: '16px', 
          marginBottom: '24px',
          color: 'rgb(133, 77, 14)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <strong>Demo Mode - Netlify Deployment</strong>
          </div>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5 }}>
            Kjo është një demonstrim. Në Netlify, nuk mund të ruajmë foto ose papagaj të rinj sepse është një platformë statike. 
            Për funksionalitet të plotë, përdorni zhvillimin lokal ose një shërbim me bazë të dhënash.
          </p>
        </div>
      )}
      
      <div className="row">
        <div className="card" style={{ flex: 1 }}>
          <h3 className="card-title">{editingId ? 'Përditëso Papagall' : 'Shto Papagall'}</h3>
          <form className="form" onSubmit={onSubmit}>
            
            {/* Essential Information Only */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px', color: 'var(--primary)', fontSize: '1.1rem' }}>📋 Informacione Bazë</h4>
              
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text)' }}>
                Emri i papagajit *
              </label>
              <input className="input" placeholder="p.sh. Charlie, Bella, Max" value={form.name || ''} onChange={(e) => formInput('name', e.target.value)} required />
              
              <label style={{ display: 'block', marginBottom: '8px', marginTop: '12px', fontWeight: '600', color: 'var(--text)' }}>
                Lloji/Specia *
              </label>
              <input className="input" placeholder="p.sh. African Grey, Macaw, Cockatiel, Amazon" value={form.species || ''} onChange={(e) => formInput('species', e.target.value)} required />
              
              <div className="row" style={{ marginTop: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text)' }}>
                    🎂 Mosha (në muaj) *
                  </label>
                  <input className="input" type="number" min={0} max={300} placeholder="p.sh. 6, 12, 24" value={form.age_months || ''} onChange={(e) => formInput('age_months', Number(e.target.value))} required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text)' }}>
                    💰 Çmimi (€) *
                  </label>
                  <input className="input" type="number" min={0} placeholder="p.sh. 500, 1200, 2500" value={form.price_eur || ''} onChange={(e) => formInput('price_eur', Number(e.target.value))} required />
                </div>
              </div>
              
              <label style={{ display: 'block', marginBottom: '8px', marginTop: '12px', fontWeight: '600', color: 'var(--text)' }}>
                Disponueshmëria *
              </label>
              <select className="select" value={form.availability} onChange={(e) => formInput('availability', e.target.value)}>
                <option value="available">✅ Në dispozicion për shitje</option>
                <option value="sold">❌ Shitur</option>
              </select>
            </div>
            {/* Cover Image Upload */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px', color: 'var(--primary)', fontSize: '1.1rem' }}>📸 Fotoja Kryesore (Faqja e Parë)</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', margin: '0 0 12px' }}>
                <strong>Kjo foto shfaqet në kartën e papagajit në faqen kryesore</strong> dhe si foto e parë në detaje. Rekomandohet: 800x600px, maksimumi 5MB
              </p>
              
              <div className="row">
                <input className="input" placeholder="Ose vendos URL të fotos" value={form.cover_image_url || ''} onChange={(e) => formInput('cover_image_url', e.target.value)} />
                <label className="btn" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {uploading ? 'Duke ngarkuar...' : '📤 Ngarko foto'}
                  <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" style={{ display: 'none' }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      
                      // Validate file size (5MB max)
                      if (file.size > 5 * 1024 * 1024) {
                        alert('Fotoja duhet të jetë më e vogël se 5MB');
                        return;
                      }
                      
                      // Validate image dimensions and compress if needed
                      const img = new Image();
                      img.onload = async () => {
                        try {
                          setUploading(true);
                          
                          // Create canvas for compression
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d')!;
                          
                          // Calculate optimal size (max 1200px width, maintain aspect ratio)
                          const maxWidth = 1200;
                          const maxHeight = 900;
                          let { width, height } = img;
                          
                          if (width > maxWidth) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                          }
                          if (height > maxHeight) {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                          }
                          
                          canvas.width = width;
                          canvas.height = height;
                          
                          // Draw and compress
                          ctx.drawImage(img, 0, 0, width, height);
                          
                          canvas.toBlob(async (blob) => {
                            if (!blob) throw new Error('Failed to compress image');
                            
                            const fd = new FormData();
                            fd.append('file', blob, file.name);
                            
                            const r = await fetch('/api/ErvinAdmin/upload', { 
                              method: 'POST', 
                              body: fd 
                            });
                            
                            if (!r.ok) {
                              const errorData = await r.json();
                              throw new Error(errorData.error || 'Upload failed');
                            }
                            
                            const result = await r.json();
                            formInput('cover_image_url', result.url);
                            
                            if (result._note) {
                              alert('Demo Mode: Foto placeholder u vendos. ' + result._note);
                            } else {
                              alert('Fotoja u ngarkua dhe optimizua me sukses!');
                            }
                          }, 'image/jpeg', 0.85); // 85% quality for good balance
                          
                        } catch (error: any) {
                          console.error('Upload error:', error);
                          alert('Dështoi ngarkimi: ' + (error.message || 'Unknown error'));
                        } finally { 
                          setUploading(false); 
                          if (e.currentTarget) e.currentTarget.value = ''; 
                        }
                      };
                      img.src = URL.createObjectURL(file);
                    }} />
                </label>
              </div>
              
              {form.cover_image_url && (
                <div style={{ marginTop: '12px' }}>
                  <div className="thumb" style={{ maxWidth: '300px' }}>
                    <img src={form.cover_image_url} alt="Fotoja kryesore" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                  </div>
                </div>
              )}
            </div>
            {/* Gallery Upload */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px', color: 'var(--accent)', fontSize: '1.1rem' }}>🖼️ Galeria e Fotove (Vetëm në Detaje)</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', margin: '0 0 12px' }}>
                Foto shtesë që shfaqen <strong>vetëm në faqen e detajeve</strong> pas fotos kryesore. Rekomandohet: 800x600px, maksimumi 5MB
              </p>
              
              <textarea className="textarea" placeholder="Vendos URL-të e fotove (një për rresht)&#10;https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg" value={imagesText} onChange={(e) => formInput('image_urls', e.target.value.split('\n').map((x) => x.trim()).filter(Boolean))} />
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                <label className="btn" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {uploading ? 'Duke ngarkuar...' : '📸 Shto foto'}
                  <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" multiple style={{ display: 'none' }}
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;
                    
                    // Validate file sizes
                    for (const file of files) {
                      if (file.size > 5 * 1024 * 1024) {
                        alert(`Fotoja "${file.name}" është shumë e madhe. Maksimumi është 5MB.`);
                        return;
                      }
                    }
                    
                    try {
                      setUploading(true);
                      const urls: string[] = [];
                      let successCount = 0;
                      
                      for (const f of files) {
                        try {
                          // Compress each image
                          const img = new Image();
                          await new Promise((resolve, reject) => {
                            img.onload = resolve;
                            img.onerror = reject;
                            img.src = URL.createObjectURL(f);
                          });
                          
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d')!;
                          
                          // Calculate optimal size
                          const maxWidth = 1000;
                          const maxHeight = 750;
                          let { width, height } = img;
                          
                          if (width > maxWidth) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                          }
                          if (height > maxHeight) {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                          }
                          
                          canvas.width = width;
                          canvas.height = height;
                          ctx.drawImage(img, 0, 0, width, height);
                          
                          const blob = await new Promise<Blob>((resolve) => {
                            canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.85);
                          });
                          
                          const fd = new FormData();
                          fd.append('file', blob, f.name);
                          
                          const r = await fetch('/api/ErvinAdmin/upload', { 
                            method: 'POST', 
                            body: fd 
                          });
                          
                          if (!r.ok) {
                            const errorData = await r.json();
                            console.error(`Failed to upload ${f.name}:`, errorData.error);
                            continue;
                          }
                          
                          const result = await r.json();
                          urls.push(result.url);
                          successCount++;
                        } catch (error) {
                          console.error(`Error uploading ${f.name}:`, error);
                        }
                      }
                      
                      if (urls.length > 0) {
                        formInput('image_urls', [...(form.image_urls || []), ...urls]);
                        if (isNetlify) {
                          alert(`${successCount} foto placeholder u vendosën (Demo Mode)`);
                        } else {
                          alert(`${successCount} foto u ngarkuan dhe optimizuan me sukses!`);
                        }
                      } else {
                        alert('Asnjë foto nuk u ngarkua. Provoni përsëri.');
                      }
                    } catch (error) {
                      console.error('Gallery upload error:', error);
                      alert('Dështoi ngarkimi i galerisë');
                    } finally { 
                      setUploading(false); 
                      if (e.currentTarget) e.currentTarget.value = ''; 
                    }
                  }} />
                </label>
                

              </div>
              
              {Array.isArray(form.image_urls) && form.image_urls.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, marginTop: '12px' }}>
                  {form.image_urls.map((u: string, i: number) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <div className="thumb-sm">
                        <img src={u} alt={`Foto ${i + 1}`} />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          const newUrls = form.image_urls.filter((_: any, idx: number) => idx !== i);
                          formInput('image_urls', newUrls);
                        }}
                        style={{ 
                          position: 'absolute', 
                          top: '4px', 
                          right: '4px', 
                          background: 'rgba(220, 38, 38, 0.9)', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '50%', 
                          width: '20px', 
                          height: '20px', 
                          fontSize: '12px', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>


            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px', color: 'var(--text)', fontSize: '1.1rem' }}>📝 Përshkrimi i Detajuar</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', margin: '0 0 12px' }}>
                Përshkruaj karakteristikat, sjelljen, dhe çdo informacion tjetër të rëndësishëm për papagajin
              </p>
              <textarea 
                className="textarea" 
                placeholder="p.sh. Papagaj shumë miqësor dhe inteligjent. I pëlqen të luajë dhe të mësojë fjalë të reja. Është i socializuar mirë me njerëzit dhe kafshët e tjera..." 
                value={form.description || ''} 
                onChange={(e) => formInput('description', e.target.value)}
                rows={4}
              />
            </div>

            {/* Form Actions */}
            <div className="flex" style={{ gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
              <button className="btn primary" disabled={saving || uploading} style={{ flex: 1 }}>
                {saving ? '💾 Duke ruajtur...' : (editingId ? '✏️ Ruaj ndryshimet' : '➕ Shto papagajin')}
              </button>
              {editingId && (
                <button type="button" className="btn" onClick={reset} style={{ flex: '0 0 auto' }}>
                  ❌ Anulo
                </button>
              )}
            </div>
            
            {uploading && (
              <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(var(--primary-raw), 0.1)', borderRadius: '8px', textAlign: 'center', color: 'rgb(var(--primary-raw))' }}>
                📤 Duke ngarkuar foto... Ju lutemi prisni.
              </div>
            )}
          </form>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h3 className="card-title">Lista aktuale</h3>
          {isLoading && <div>Duke ngarkuar...</div>}
          {error && <div className="alert">Gabim në marrje</div>}
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Emri</th>
                  <th>Lloji</th>
                  <th>Mosha</th>
                  <th>€</th>
                  <th>Status</th>
                  <th>Veprime</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((p: any) => (
                  <tr key={p.id}>
                    <td>
                      {p.cover_image_url ? (
                        <img 
                          src={p.cover_image_url} 
                          alt={p.name}
                          style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ) : (
                        <div style={{ width: '50px', height: '40px', background: 'var(--card-hover)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                          🦜
                        </div>
                      )}
                    </td>
                    <td style={{ fontWeight: '600' }}>{p.name}</td>
                    <td>{p.species}</td>
                    <td>{p.age_months} muaj</td>
                    <td style={{ fontWeight: '700', color: 'rgb(var(--accent-raw))' }}>€{p.price_eur}</td>
                    <td>
                      {p.availability === 'available' && <span style={{ color: 'rgb(var(--success-raw))' }}>✅ Në dispozicion</span>}
                      {p.availability === 'sold' && <span style={{ color: 'rgb(var(--alert-raw))' }}>❌ Shitur</span>}
                    </td>
                    <td className="flex" style={{ gap: '8px' }}>
                      <button className="btn" onClick={() => setEditingId(p.id)} title="Ndrysho">
                        ✏️
                      </button>
                      <button className="btn danger" onClick={() => onDelete(p.id)} title="Fshi">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

