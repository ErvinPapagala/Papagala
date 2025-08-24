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
          <p className="hero-subtitle">kujdes i lartë dhe trajnime profesionale. Gjeni mikun tuaj të përhershëm që do t'ju sjellë gëzim për vite me radhë.</p>
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🏆</span>
              <span>Përvojë e gjatë</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">❤️</span>
              <span>Familje të lumtura</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span>Cilësi e garantuar</span>
            </div>
          </div>
          <div className="badges">
            <span className="badge premium">✅ Shëndet i verifikuar</span>
            <span className="badge premium">🎓 Trajnime falas</span>
            <span className="badge premium">📞 Mbështetje profesionale</span>
          </div>
          <div style={{ height: 16 }} />
          <div className="cta-group">
            <a className="cta pulse" href="#lista">
              <span>🦜</span>
              Shfleto Papagajt Tanë
            </a>
            <Link className="cta secondary" href="/trajnime">
              <span>🎓</span>
              Trajnime Profesionale
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">🎯</div>
              <div className="stat-label">Kënaqësi e lartë</div>
            </div>
            <div className="stat">
              <div className="stat-number">🦜</div>
              <div className="stat-label">Shumë lloje</div>
            </div>
            <div className="stat">
              <div className="stat-number">💎</div>
              <div className="stat-label">Cilësi premium</div>
            </div>
          </div>
        </div>
        <div className="hero-media">
          <div className="media-overlay">
            <div className="floating-badge">🔥 Më të shitura</div>
          </div>
          <Image src="https://images.unsplash.com/photo-1560151206-1d32a2a4d862?auto=format&fit=crop&w=1600&q=80" alt="Papagaj tropikal shumëngjyrësh" width={1200} height={900} priority quality={92} />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h1>Pse të na besoni për papagajt tuaj tropikalë</h1>
          <div className="section-accent">Ekspertë në kujdesin dhe trajnimin e papagajve</div>
        </div>
        <p className="section-sub">Ne kujdesemi për mirëqenien dhe përshtatjen e çdo shpendi. Asnjë presion, vetëm këshilla dhe mbështetje të vazhdueshme.</p>
        
        <div className="testimonials-section">
          <div className="testimonial-item">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Papagalli ynë është shumë i lumtur dhe i shëndetshëm. Shërbimi ishte i shkëlqyer!"</p>
            <div className="testimonial-author">- Klient nga Shkodra</div>
          </div>
          <div className="testimonial-item">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Trajnimi që morëm na ndihmoi shumë. Papagalli u përshtat shpejt në shtëpi."</p>
            <div className="testimonial-author">- Klient nga Tirana</div>
          </div>
          <div className="testimonial-item">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Cilësi e lartë dhe këshilla të shkëlqyera. Shumë të kënaqur me blerjen."</p>
            <div className="testimonial-author">- Klient nga Durrësi</div>
          </div>
        </div>

        <div className="divider" />
        <div className="feature-grid enhanced">
          <div className="feature premium">
            <div className="feature-icon">🏥</div>
            <h3 className="card-title">Kontroll veterinar i plotë</h3>
            <p>Çdo papagaj kalon nëpër kontroll të detajuar veterinar. Certifikata shëndetësore dhe histori e plotë mjekësore.</p>
            <div className="feature-highlight">✓ Vaksinuar dhe i shëndetshëm</div>
          </div>
          <div className="feature premium">
            <div className="feature-icon">🎯</div>
            <h3 className="card-title">Konsultim i specializuar</h3>
            <p>Këshillim profesional për kujdesin dhe mirëmbajtjen. Shërbime të personalizuara sipas nevojave tuaja.</p>
            <div className="feature-highlight">✓ Ekspertizë e lartë</div>
          </div>
          <div className="feature premium">
            <div className="feature-icon">🎓</div>
            <h3 className="card-title">Trajnime profesionale</h3>
            <p>Seanca individuale për sjellje, komunikim dhe socializim. Mësoni të kuptoni papagajin tuaj.</p>
            <div className="feature-highlight">✓ Rezultate të shkëlqyera</div>
          </div>
          <div className="feature premium">
            <div className="feature-icon">🏠</div>
            <h3 className="card-title">Këshilla për ambientimin</h3>
            <p>Udhëzime të detajuara për krijimin e mjedisit ideal për papagajin tuaj në shtëpi.</p>
            <div className="feature-highlight">✓ Adaptim i suksesshëm</div>
          </div>
          <div className="feature premium">
            <div className="feature-icon">💎</div>
            <h3 className="card-title">Cilësi e verifikuar</h3>
            <p>Çdo papagaj kontrollohet me kujdes për shëndet dhe temperament para se të ofrohet për shitje.</p>
            <div className="feature-highlight">✓ Standarde të larta</div>
          </div>
          <div className="feature premium">
            <div className="feature-icon">🌟</div>
            <h3 className="card-title">Papagaj të rrallë</h3>
            <p>Lloje ekskluzive dhe të rralla që nuk i gjeni kudo. Importuar drejtpërdrejt nga fermat më të mira.</p>
            <div className="feature-highlight">✓ Koleksion unik</div>
          </div>
        </div>
      </section>

      <section id="lista" className="section">
        <div className="section-head">
          <h1>Papagajt tanë tropikalë në ofertë</h1>
          <div className="section-accent">Zgjidhni mikun tuaj të ri nga koleksioni ynë ekskluziv</div>
        </div>
        <div className="offer-banner">
          <div className="offer-content">
            <span className="offer-badge">🔥 OFERTË E KUFIZUAR</span>
            <h3>Trajnim bazë i përfshirë me çdo blerje!</h3>
            <p>Mësime themelore për kujdesin dhe komunikimin</p>
          </div>
        </div>
        <ParrotGrid />
        <div className="cta-section">
          <div className="card premium-card">
            <h3>Nuk gjeni atë që kërkoni?</h3>
            <p>Na tregoni çfarë papagaji dëshironi dhe ne do ta gjejmë për ju. Shërbim i personalizuar pa pagesë shtesë.</p>
            <Link href="/kontakt" className="cta">Kërkoni papagajin tuaj ideal</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="contact-section">
          <div className="contact-card premium-card">
            <div className="contact-header">
              <h2>Gati për të gjetur papagajin tuaj të përsosur?</h2>
              <p>Ekipi ynë i ekspertëve është gati t'ju ndihmojë të zgjidhni papagajin ideal për familjen tuaj.</p>
            </div>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">{CONTACT_EMAIL}</div>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">📱</div>
                <div>
                  <div className="contact-label">Telefon/WhatsApp</div>
                  <div className="contact-value">{CONTACT_PHONE}</div>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">⏰</div>
                <div>
                  <div className="contact-label">Orari</div>
                  <div className="contact-value">8:00 - 24:00, çdo ditë</div>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <Link href="/kontakt" className="cta pulse">
                <span>💬</span>
                Kontakto Tani - Përgjigje në 5 minuta
              </Link>
              <div className="contact-guarantee">
                <span>🛡️</span>
                Konsultim profesional dhe pa detyrim
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

