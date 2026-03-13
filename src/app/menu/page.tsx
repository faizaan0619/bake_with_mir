'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, Product } from '@/lib/data';

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-br from-rich-chocolate to-dark-brown py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
            Our Offerings
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream mt-2 mb-4">
            Our Menu 🍰
          </h1>
          <p className="text-cream/70 max-w-lg mx-auto">
            Discover our freshly baked delights — from custom cakes to artisan bread
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-brown/40">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-beige focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all duration-300 text-sm"
                id="product-search"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-warm-gold text-white shadow-md shadow-warm-gold/30'
                    : 'bg-white text-dark-brown border border-beige hover:border-warm-gold hover:text-warm-gold'
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOrder={() => router.push(`/order?product=${product.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🧁</span>
              <h3 className="font-heading text-xl font-semibold text-rich-chocolate mb-2">
                No products found
              </h3>
              <p className="text-dark-brown/60 text-sm">
                Try a different search or category
              </p>
            </div>
          )}

          {/* Results count */}
          <div className="text-center mt-8">
            <p className="text-sm text-dark-brown/50">
              Showing {filtered.length} of {products.length} products
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
