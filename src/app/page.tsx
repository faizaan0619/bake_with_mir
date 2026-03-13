'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/data';

const HIGHLIGHTS = [
  {
    icon: '🌾',
    title: 'Fresh Ingredients',
    desc: 'We use only the finest, freshest ingredients in every recipe.',
  },
  {
    icon: '🎂',
    title: 'Custom Cakes',
    desc: 'Design your dream cake for any occasion — weddings, birthdays & more.',
  },
  {
    icon: '⏰',
    title: 'Same Day Pickup',
    desc: 'Order before noon and pick up your treats the same day!',
  },
  {
    icon: '❤️',
    title: 'Made With Love',
    desc: 'Every item is handcrafted with passion and attention to detail.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Aisha Bano',
    text: 'The best birthday cake I ever ordered! Beautiful design and amazing taste. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Mohammad Iqbal',
    text: 'Fresh bread every morning. The sourdough is incredible. Bake With Mir is our family\'s go-to bakery.',
    rating: 5,
  },
  {
    name: 'Sameena Akhter',
    text: 'Ordered a custom wedding cake and it was absolutely stunning. Thank you for making our day special!',
    rating: 5,
  },
];

const GALLERY_IMAGES = [
  '/images/birthday-cake.png',
  '/images/chocolate-pastry.png',
  '/images/cupcakes.png',
  '/images/cookies.png',
  '/images/bread.png',
  '/images/custom-cake.png',
];

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((products: Product[]) => {
        setFeatured(products.filter(p => p.featured).slice(0, 6));
      })
      .catch(() => {});
    setIsVisible(true);
  }, []);

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banner.png"
            alt="Bake With Mir Bakery"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rich-chocolate/70 via-rich-chocolate/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-rich-chocolate/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            className={`max-w-2xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-warm-gold/20 backdrop-blur-sm rounded-full text-warm-gold text-sm font-medium mb-6 border border-warm-gold/30">
              🍰 A Delightful Choice
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Bake With Mir
            </h1>
            <p className="font-heading text-xl sm:text-2xl text-warm-gold italic mb-6">
              Bake With Love
            </p>
            <p className="text-cream/90 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
              Fresh cakes, pastries, cookies & artisan bread — handcrafted daily
              with the finest ingredients in Nusso Bandipora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/order"
                className="px-8 py-4 bg-gradient-to-r from-warm-gold to-accent text-white rounded-full text-lg font-semibold shadow-lg shadow-warm-gold/30 hover:shadow-warm-gold/50 hover:scale-105 active:scale-95 transition-all duration-300 text-center"
              >
                Order Your Cake 🎂
              </Link>
              <Link
                href="/menu"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full text-lg font-semibold hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 text-center"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-chocolate mt-2">
              Baked to Perfection
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-cream border border-beige hover:shadow-lg hover:shadow-warm-gold/10 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{h.icon}</span>
                <h3 className="font-heading text-lg font-semibold text-rich-chocolate mb-2">
                  {h.title}
                </h3>
                <p className="text-sm text-dark-brown/60">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
              Our Specials
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-chocolate mt-2">
              Featured Products
            </h2>
            <p className="text-dark-brown/60 mt-3 max-w-lg mx-auto">
              Handpicked favorites that our customers love the most
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrder={() => (window.location.href = `/order?product=${product.id}`)}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rich-chocolate text-cream rounded-full text-lg font-semibold hover:bg-dark-brown hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-rich-chocolate/20"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
              What People Say
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-chocolate mt-2">
              Customer Love ❤️
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-cream border border-beige hover:shadow-lg hover:shadow-warm-gold/10 transition-all duration-300"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-dark-brown/70 text-sm italic mb-4 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="font-heading font-semibold text-rich-chocolate">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-warm-gold font-semibold hover:text-soft-brown transition-colors"
            >
              Write a Review ⭐ →
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
              Our Creations
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-chocolate mt-2">
              Fresh From Our Oven 📸
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Bakery creation ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-rich-chocolate/0 group-hover:bg-rich-chocolate/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 text-2xl transition-opacity duration-300">
                    ❤️
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-warm-gold font-semibold hover:text-soft-brown transition-colors"
            >
              See Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rich-chocolate to-dark-brown" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/bakery-interior.png"
            alt="Bakery"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-cream mb-4">
            Ready to Order?
          </h2>
          <p className="text-cream/80 text-lg mb-8">
            Whether it&apos;s a birthday, wedding, or just a sweet craving — we&apos;ve got
            you covered. Place your order now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="px-8 py-4 bg-gradient-to-r from-warm-gold to-accent text-white rounded-full text-lg font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Order Your Cake 🎂
            </Link>
            <a
              href="https://wa.me/919149774989"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-green-600 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              WhatsApp Us 💬
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
