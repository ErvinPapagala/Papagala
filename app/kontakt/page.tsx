import { CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME } from '@/lib/constants';

export default function ContactPage() {
  return (
    <div className="section">
      <div className="section-head"><h1>Kontakt</h1></div>
      <p className="section-sub">Jemi këtu për çdo pyetje ose këshillë që ju nevojitet.</p>
      <div className="divider" />
      <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <p>
          Për çdo pyetje rreth {SITE_NAME}, papagajve në ofertë, trajnimeve apo këshillave të kujdesit,
          na kontaktoni me kënaqësi.
        </p>
        <div className="kv"><span className="k">Email:</span><a className="cta secondary" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
        <div className="kv"><span className="k">Telefon:</span><a className="cta secondary" href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a></div>
      </div>
    </div>
  );
}

