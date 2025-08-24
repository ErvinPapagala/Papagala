import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants';

async function getTrainings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/trainings`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function TrainingsPage() {
  const trainings = await getTrainings();

  return (
    <div className="section">
      <div className="section-head"><h1>Trajnime për papagaj</h1></div>
      <p className="section-sub">Shërbime profesionale trajnimi për papagajt e pronarëve. Punojmë me ju dhe shpendin tuaj për sjellje të shëndetshme.</p>
      <div className="divider" />
      <div className="grid">
        {trainings.map((t: any) => (
          <div key={t.id} className="card">
            <h3 className="card-title">{t.title}</h3>
            <p>{t.description}</p>
            <div className="price">€{t.price_eur}</div>
          </div>
        ))}
        {trainings.length === 0 && (
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>🎓</div>
            <div style={{ height: 8 }} />
            <div>Aktualisht nuk ka plane të listuara. Na kontaktoni për një ofertë të personalizuar.</div>
          </div>
        )}
      </div>
      <div style={{ height: 16 }} />
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h2>Gati për të nisur trajnimin?</h2>
          <p className="muted">Email: {CONTACT_EMAIL} • Tel: {CONTACT_PHONE}</p>
        </div>
        <a className="cta" href={`mailto:${CONTACT_EMAIL}?subject=Interes për trajnime`}>Kontakto Tani</a>
      </div>
    </div>
  );
}

