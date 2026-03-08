'use client';

import Image from 'next/image';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  onOrder?: (product: Product) => void;
}

export default function ProductCard({ product, onOrder }: ProductCardProps) {
  const stockColors = {
    available: 'bg-green-100 text-green-700 border-green-200',
    low: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    out: 'bg-red-100 text-red-700 border-red-200',
  };

  const stockLabels = {
    available: '✅ Available',
    low: '⚠️ Low Stock',
    out: '❌ Out of Stock',
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md shadow-warm-gold/10 overflow-hidden hover:shadow-xl hover:shadow-warm-gold/20 hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-beige">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${stockColors[product.stock]}`}
          >
            {stockLabels[product.stock]}
          </span>
        </div>
        {product.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-warm-gold text-white shadow-md">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-heading text-lg font-semibold text-rich-chocolate mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-dark-brown/60 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-soft-brown">
            ₹{product.price}
          </span>
          {product.stock !== 'out' && onOrder && (
            <button
              onClick={() => onOrder(product)}
              className="px-4 py-2 bg-gradient-to-r from-warm-gold to-accent text-white rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-warm-gold/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Order Now
            </button>
          )}
          {product.stock === 'out' && (
            <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-full text-sm font-semibold cursor-not-allowed">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
