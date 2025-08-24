import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants';
import ImageGallery from '@/components/ImageGallery';

async function getParrot(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/parrots/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ParrotDetailPage({ params }: { params: { id: string } }) {
  const parrot = await getParrot(params.id);
  if (!parrot) return notFound();

  // Always start with cover image, then add gallery images
  const coverImage = parrot.cover_image_url || 'https://images.unsplash.com/photo-1528837167897-07f99a75c13e?w=800&h=600&auto=format&fit=crop&crop=center&q=100';
  const galleryImages: string[] = Array.isArray(parrot.image_urls) ? parrot.image_urls : [];
  const allImages = [coverImage, ...galleryImages];


  const isAvailable = parrot.availability === 'available';

  return (
    <div className="section">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Kryefaqja</Link>
        <span>›</span>
        <Link href="/#lista">Papagajt</Link>
        <span>›</span>
        <span>{parrot.name}</span>
      </div>

      <div className="parrot-detail-container">
        {/* Image Gallery */}
        <ImageGallery 
          images={allImages} 
          parrotName={parrot.name} 
          isAvailable={isAvailable} 
        />



        {/* Parrot Info */}
        <div className="parrot-info">
          <div className="parrot-header">
            <h1>{parrot.name}</h1>
            <div className="parrot-species-badge">{parrot.species}</div>
          </div>

          <div className="status-section">
            <div className={`availability-status ${isAvailable ? 'available' : 'sold'}`}>
              {isAvailable ? (
                <>
                  <span className="status-icon">✅</span>
                  <span>Në dispozicion tani</span>
                </>
              ) : (
                <>
                  <span className="status-icon">❌</span>
                  <span>Shitur</span>
                </>
              )}
            </div>
          </div>

          <div className="price-section">
            <div className="main-price">€{parrot.price_eur}</div>
            <div className="price-benefits">
              <div className="benefit">✅ Trajnim bazë i përfshirë</div>
              <div className="benefit">✅ Kontroll veterinar</div>
              <div className="benefit">✅ Dokumentacion i plotë</div>
              <div className="benefit">✅ Këshilla për kujdesin</div>
            </div>
          </div>

          <div className="parrot-specs">
            <h3>Detajet</h3>
            <div className="spec-grid">
              <div className="spec-item">
                <span className="spec-icon">🎂</span>
                <div>
                  <div className="spec-label">Mosha</div>
                  <div className="spec-value">{parrot.age_months} muaj</div>
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">🏥</span>
                <div>
                  <div className="spec-label">Shëndeti</div>
                  <div className="spec-value">I kontrolluar</div>
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">🎓</span>
                <div>
                  <div className="spec-label">Trajnimi</div>
                  <div className="spec-value">I socializuar</div>
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">📋</span>
                <div>
                  <div className="spec-label">Dokumentet</div>
                  <div className="spec-value">Të plota</div>
                </div>
              </div>
            </div>
          </div>

          {parrot.description && (
            <div className="description-section">
              <h3>Përshkrimi</h3>
              <p>{parrot.description}</p>
            </div>
          )}

          {isAvailable && (
            <div className="action-section">
              <div className="primary-actions">
                <a 
                  className="cta-large" 
                  href={`mailto:${CONTACT_EMAIL}?subject=Interes për ${encodeURIComponent(parrot.name)}&body=Përshëndetje, jam i/e interesuar për ${encodeURIComponent(parrot.name)}.`}
                >
                  <span>📧</span>
                  Kontakto për blerje
                </a>
                <a 
                  className="cta-large secondary" 
                  href={`https://wa.me/${CONTACT_PHONE.replace(/[^0-9]/g, '')}?text=Përshëndetje, jam i/e interesuar për ${encodeURIComponent(parrot.name)}.`}
                >
                  <span>💬</span>
                  WhatsApp
                </a>
              </div>
              <div className="secondary-actions">
                <a className="btn-outline" href={`tel:${CONTACT_PHONE}`}>
                  <span>📞</span>
                  Telefon: {CONTACT_PHONE}
                </a>
                <Link className="btn-outline" href="/trajnime">
                  <span>🎓</span>
                  Shiko trajnimet
                </Link>
              </div>
            </div>
          )}

          {!isAvailable && (
            <div className="sold-section">
              <div className="sold-message">
                <h3>Ky papagaj është shitur</h3>
                <p>Por kemi shumë të tjerë të ngjashëm! Na kontaktoni për alternativa.</p>
                <Link href="/#lista" className="btn-outline">
                  <span>🦜</span>
                  Shiko papagaj të tjerë
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

