import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE_NAME} – Papagaj të shëndetshëm dhe të trajnuar`,
  description: 'Shitje papagajsh të verifikuar me kujdes, trajnime profesionale dhe mbështetje e sinqertë. Kontakto për ofertat e fundit.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="site-header">
          <div className="container nav">
            <Link href="/" className="brand">
              <span className="brand-icon">🦜</span>
              {SITE_NAME}
            </Link>
            <nav className="nav-links">
              <Link href="/" className="nav-link">
                <span>🏠</span>
                Kryefaqja
              </Link>
              <Link href="/trajnime" className="nav-link">
                <span>🎓</span>
                Trajnime
              </Link>
              <Link href="/kontakt" className="nav-link">
                <span>📞</span>
                Kontakt
              </Link>
            </nav>
            <div className="header-cta">
              <a href="tel:+355694545405" className="header-phone">
                <span>📱</span>
                Telefon
              </a>
            </div>
          </div>
        </header>
        <main className="container">
          {children}
        </main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-section">
                <h4>🦜 {SITE_NAME}</h4>
                <p>Papagaj tropikalë të zgjedhur me kujdes për familjen tuaj. Cilësi premium dhe shërbim i shkëlqyer.</p>
                <div className="footer-social">
                  <a href="https://www.tiktok.com/@YOUR_TIKTOK_USERNAME" className="social-link">🎵 TikTok</a>
                  <a href="https://wa.me/355694545405" className="social-link">💬 WhatsApp</a>
                </div>
              </div>
              <div className="footer-section">
                <h4>Shërbimet</h4>
                <ul className="footer-links">
                  <li><Link href="/#lista">Papagaj në shitje</Link></li>
                  <li><Link href="/trajnime">Trajnime profesionale</Link></li>
                  <li><Link href="/kontakt">Konsultim falas</Link></li>
                  <li><a href="#">Kujdes veterinar</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Kontakti</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <span>📧</span>
                    <a href="mailto:epapagala_al@outlook.com">epapagala_al@outlook.com</a>
                  </div>
                  <div className="contact-item">
                    <span>📱</span>
                    <a href="tel:+355694545405">+355 69 454 5405</a>
                  </div>
                  <div className="contact-item">
                    <span>⏰</span>
                    <span>8:00 - 24:00, çdo ditë</span>
                  </div>
                </div>
              </div>
              <div className="footer-section">
                <h4>Përparësitë</h4>
                <ul className="footer-features">
                  <li>✅ Shëndet i verifikuar</li>
                  <li>🎓 Trajnim i përfshirë</li>
                  <li>📞 Mbështetje profesionale</li>
                  <li>🔒 Cilësi e lartë</li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} {SITE_NAME}. Të gjitha të drejtat e rezervuara.</p>
              <p className="muted">Kujdesi për kafshët është përparësi. Shesim vetëm papagaj të shëndetshëm dhe me dokumentacion të plotë.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

