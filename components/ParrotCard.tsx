import Link from 'next/link';
import Image from 'next/image';
import { Parrot } from '@/lib/types';

export default function ParrotCard({ parrot }: { parrot: Parrot }) {
  const isAvailable = parrot.availability === 'available';
  
  return (
    <div className={`card parrot-card ${!isAvailable ? 'sold-out' : ''}`}>
      <div className="parrot-image-container">
        <Image 
          src={parrot.cover_image_url || 'https://images.unsplash.com/photo-1528837167897-07f99a75c13e?auto=format&fit=crop&w=1600&q=80'} 
          alt={parrot.name} 
          fill 
          quality={92} 
          sizes="(max-width: 620px) 100vw, (max-width: 920px) 50vw, 366px" 
          style={{ objectFit: 'cover' }} 
        />
        <div className="parrot-overlay">
          {!isAvailable && (
            <div className="sold-badge">SHITUR</div>
          )}
          {isAvailable && (
            <div className="available-badge">✅ Në dispozicion</div>
          )}
        </div>
        {isAvailable && (
          <div className="quick-actions">
            <button className="quick-btn" title="Shto në të preferuarat">❤️</button>
            <button className="quick-btn" title="Shiko më shumë foto">📷</button>
          </div>
        )}
      </div>
      
      <div className="parrot-content">
        <div className="parrot-header">
          <h3 className="parrot-name">{parrot.name}</h3>
          <div className="parrot-species">{parrot.species}</div>
        </div>
        
        <div className="parrot-details">
          <div className="detail-item">
            <span className="detail-icon">🎂</span>
            <span className="detail-text">{parrot.age_months} muaj</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💎</span>
            <span className="detail-text">Cilësi premium</span>
          </div>
        </div>
        
        <div className="parrot-price-section">
          <div className="price-main">€{parrot.price_eur}</div>
          <div className="price-note">+ Trajnim FALAS</div>
        </div>
        
        <div className="parrot-features">
          <span className="feature-tag">🏥 Kontrolluar</span>
          <span className="feature-tag">🎓 Trajnuar</span>
          <span className="feature-tag">📞 Mbështetje</span>
        </div>
        
        <div className="parrot-actions">
          <Link 
            className={`btn-primary ${!isAvailable ? 'disabled' : ''}`} 
            href={isAvailable ? `/parrot/${parrot.id}` : '#'}
          >
            {isAvailable ? (
              <>
                <span>👀</span>
                Shiko detajet
              </>
            ) : (
              <>
                <span>❌</span>
                Shitur
              </>
            )}
          </Link>
          {isAvailable && (
            <Link className="btn-secondary" href={`/kontakt?parrot=${parrot.name}`}>
              <span>💬</span>
              Kontakto
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

