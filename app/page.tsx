import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME } from '@/lib/constants';
import ParrotGrid from '@/components/ParrotGrid';

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="hero-card">
          <div className="pill">🦜 {SITE_NAME}</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1 }}>
            Papagaj <span className="gradient-text">Tropikalë</span> të Zgjedhur me Kujdes
          </h1>
          <p className="hero-subtitle">Gjeni mikun tuaj të përhershëm që do t'ju sjellë gëzim për vite me radhë.</p>

          <div className="trust-badges">
            <div className="trust-badge">
              <span className="trust-icon">🏥</span>
              <span>Kontrolluar nga veterinerë</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">🎓</span>
              <span>Trajnime profesionale</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">⭐</span>
              <span>4.9/5 vlerësim</span>
            </div>
          </div>

          <div className="cta-group">
            <a className="cta" href="#lista">
              <span>🦜</span>
              Shfleto Papagajt
            </a>
            <div className="hero-contact">
              <span className="contact-label">Pyetje? Na kontaktoni:</span>
              <a href={`tel:${CONTACT_PHONE}`} className="contact-quick">{CONTACT_PHONE}</a>
            </div>
          </div>
        </div>
        <div className="hero-media">
          <div className="hero-image-grid">
            <div className="main-hero-image">
              <Image
                src="https://images.unsplash.com/photo-1560151206-1d32a2a4d862?w=800&h=600&auto=format&fit=crop&crop=center&q=100"
                alt="Papagaj tropikal shumëngjyrësh"
                width={800}
                height={600}
                priority
                quality={100}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="hero-image-small">
              <Image
                src="https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=300&auto=format&fit=crop&crop=center&q=100"
                alt="Papagaj i bukur"
                width={400}
                height={300}
                quality={100}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="hero-image-small">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&auto=format&fit=crop&crop=center&q=100"
                alt="Papagaj colorit"
                width={400}
                height={300}
                quality={100}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Pse të na zgjidhni</h2>
          <p className="section-sub">Ekspertizë dhe kujdes profesional për çdo papagaj</p>
        </div>
        <div className="simple-features">
          <div className="simple-feature">
            <div className="simple-icon">🏥</div>
            <div>
              <h3>Kontroll veterinar</h3>
              <p>Shëndet i verifikuar nga veterinerë të specializuar</p>
            </div>
          </div>
          <div className="simple-feature">
            <div className="simple-icon">🎓</div>
            <div>
              <h3>Trajnime profesionale</h3>
              <p>Mbështetje për sjellje dhe komunikim me papagajt</p>
            </div>
          </div>
          <div className="simple-feature">
            <div className="simple-icon">💎</div>
            <div>
              <h3>Cilësi e lartë</h3>
              <p>Papagaj të zgjedhur me kujdes nga fermat më të mira</p>
            </div>
          </div>
        </div>
      </section>

      <section id="lista" className="section">
        <div className="section-head">
          <h1>Papagajt tanë tropikalë</h1>
        </div>
        <ParrotGrid />

        <div className="help-section">
          <div className="help-card">
            <h3>Nuk gjeni atë që kërkoni?</h3>
            <p>Na kontaktoni dhe do t'ju ndihmojmë të gjeni papagajin ideal për ju.</p>
            <Link href="/kontakt" className="cta secondary">Na kontaktoni</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="testimonial-section">
          <div className="testimonial-simple">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Papagalli ynë është shumë i lumtur! Shërbimi ishte i shkëlqyer dhe na ndihmuan shumë me trajnimin."</p>
            <div className="testimonial-author">- Familja nga Tirana </div>
          </div>
        </div>

        <div className="contact-section-simple">
          <div className="contact-card-simple">
            <h2>Pyetje ose dëshironi më shumë informacion?</h2>
            <div className="contact-info-simple">
              <div className="contact-item-simple">
                <span>📱</span>
                <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a>
              </div>
              <div className="contact-item-simple">
                <span>📧</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
            </div>
            <p className="contact-note">Jemi të disponueshëm 8:00 - 24:00, çdo ditë</p>
          </div>
        </div>
      </section>
    </div>
  );
}