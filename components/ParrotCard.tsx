import Link from 'next/link';
import Image from 'next/image';
import { Parrot } from '@/lib/types';

export default function ParrotCard({ parrot }: { parrot: Parrot }) {
  const isAvailable = parrot.availability === 'available';
  
  return (
    <div className={`parrot-card-modern ${!isAvailable ? 'sold-out' : ''}`}>
      <div className="parrot-image-modern">
        <div className="image-background">
          <Image 
            src={parrot.cover_image_url || 'https://images.unsplash.com/photo-1528837167897-07f99a75c13e?w=500&h=400&auto=format&fit=crop&crop=center&q=100'} 
            alt={`${parrot.name} background`}
            fill
            quality={60}
            style={{ objectFit: 'cover', filter: 'blur(20px) brightness(0.3)', transform: 'scale(1.1)' }}
          />
        </div>
        <div className="image-foreground">
          <Image 
            src={parrot.cover_image_url || 'https://images.unsplash.com/photo-1528837167897-07f99a75c13e?w=500&h=400&auto=format&fit=crop&crop=center&q=100'} 
            alt={parrot.name} 
            width={500}
            height={400}
            quality={100}
            style={{ objectFit: 'contain', width: '100%', height: '100%', position: 'relative', zIndex: 2 }} 
          />
        </div>
        <div className="status-badge">
          {isAvailable ? (
            <span className="available">Në dispozicion</span>
          ) : (
            <span className="sold">Shitur</span>
          )}
        </div>
      </div>
      
      <div className="parrot-info-modern">
        <div className="parrot-header-modern">
          <h3 className="parrot-name-modern">{parrot.name}</h3>
          <div className="parrot-species-modern">{parrot.species}</div>
        </div>
        
        <div className="parrot-details-modern">
          <span className="age-tag">{parrot.age_months} muaj</span>
          <span className="price-tag">€{parrot.price_eur}</span>
        </div>
        
        {(parrot.can_talk || parrot.is_hand_fed || parrot.training_level) && (
          <div className="parrot-features-modern">
            {parrot.can_talk && <span className="feature-icon" title="Mund të flasë">🗣️</span>}
            {parrot.is_hand_fed && <span className="feature-icon" title="Ushqyer me dorë">🤲</span>}
            {parrot.training_level === 'advanced' && <span className="feature-icon" title="Trajnim i avancuar">🎓</span>}
            {parrot.training_level === 'intermediate' && <span className="feature-icon" title="I socializuar">👥</span>}
            {parrot.training_level === 'basic' && <span className="feature-icon" title="Trajnim bazë">📚</span>}
          </div>
        )}
        
        <div className="parrot-action-modern">
          {isAvailable ? (
            <Link className="view-btn" href={`/parrot/${parrot.id}`}>
              Shiko detajet
            </Link>
          ) : (
            <div className="sold-btn">Shitur</div>
          )}
        </div>
      </div>
    </div>
  );
}

