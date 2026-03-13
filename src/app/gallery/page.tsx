'use client';

import { useState, useEffect } from 'react';
import { GalleryItem } from '@/lib/data';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then((data: GalleryItem[]) => setGalleryItems(data))
      .catch(() => {});
  }, []);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const nextImage = () =>
    setLightbox((prev) =>
      prev !== null ? (prev + 1) % galleryItems.length : null
    );
  const prevImage = () =>
    setLightbox((prev) =>
      prev !== null
        ? (prev - 1 + galleryItems.length) % galleryItems.length
        : null
    );

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-br from-rich-chocolate to-dark-brown py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
            Our Creations
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream mt-2 mb-4">
            Gallery 📸
          </h1>
          <p className="text-cream/70 max-w-lg mx-auto">
            A glimpse into our world of baked perfection
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryItems.map((item, i) => (
              <div
                key={item.id}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md shadow-warm-gold/10 hover:shadow-xl hover:shadow-warm-gold/20 transition-all duration-300"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rich-chocolate/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-cream text-sm font-medium">
                      {item.caption}
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm">
                    🔍
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && galleryItems[lightbox] && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/20 transition-colors z-10"
            aria-label="Close lightbox"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/20 transition-colors z-10"
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/20 transition-colors z-10"
            aria-label="Next image"
          >
            ›
          </button>

          <div
            className="relative w-[90vw] h-[70vh] max-w-4xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].caption}
              className="w-full h-full object-contain"
            />
          </div>

          <p className="absolute bottom-8 left-0 right-0 text-center text-cream text-sm font-medium">
            {galleryItems[lightbox].caption}
          </p>
        </div>
      )}
    </div>
  );
}
