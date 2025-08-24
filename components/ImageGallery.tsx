'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  parrotName: string;
  isAvailable: boolean;
}

export default function ImageGallery({ images, parrotName, isAvailable }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (imageUrl: string, index: number) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <>
      <div className="parrot-gallery">
        <div className="main-image" onClick={() => openLightbox(images[0], 0)}>
          <Image 
            src={images[0]} 
            alt={parrotName} 
            fill 
            priority 
            quality={100} 
            sizes="(max-width: 900px) 100vw, 60vw" 
            style={{ objectFit: 'contain', background: '#f8fafc', cursor: 'pointer' }} 
          />
          <div className="image-overlay">
            <span className="zoom-icon">🔍</span>
          </div>
          {!isAvailable && (
            <div className="sold-overlay">
              <div className="sold-badge-large">SHITUR</div>
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="thumbnail-grid">
            {images.slice(1, 5).map((src: string, i: number) => (
              <div 
                key={i} 
                className="thumbnail" 
                onClick={() => openLightbox(src, i + 1)}
              >
                <Image 
                  src={src} 
                  alt={`${parrotName} ${i + 2}`} 
                  fill 
                  quality={100} 
                  sizes="150px" 
                  style={{ objectFit: 'contain', background: '#f8fafc', cursor: 'pointer' }} 
                />
                <div className="thumbnail-overlay">
                  <span className="zoom-icon-small">🔍</span>
                </div>
              </div>
            ))}
            {images.length > 5 && (
              <div className="thumbnail more-photos" onClick={() => openLightbox(images[5], 5)}>
                <span>+{images.length - 5}</span>
                <span>më shumë</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            
            {images.length > 1 && (
              <>
                <button className="lightbox-prev" onClick={prevImage}>
                  ‹
                </button>
                <button className="lightbox-next" onClick={nextImage}>
                  ›
                </button>
              </>
            )}
            
            <div className="lightbox-image">
              <Image 
                src={selectedImage} 
                alt={`${parrotName} - Foto e madhe`}
                fill
                quality={100}
                sizes="100vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            
            {images.length > 1 && (
              <div className="lightbox-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}