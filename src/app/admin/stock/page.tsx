'use client';

import { useState, useEffect } from 'react';
import { getProducts, updateStock, CATEGORIES, Product } from '@/lib/data';

export default function AdminStockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const refresh = () => setProducts(getProducts());

  const handleStockChange = (id: string, stock: Product['stock']) => {
    updateStock(id, stock);
    refresh();
  };

  const filtered =
    filterCategory === 'all'
      ? products
      : products.filter((p) => p.category === filterCategory);

  const stockOptions: { value: Product['stock']; label: string; color: string }[] = [
    { value: 'available', label: '✅ Available', color: 'bg-green-500' },
    { value: 'low', label: '⚠️ Low Stock', color: 'bg-yellow-500' },
    { value: 'out', label: '❌ Out of Stock', color: 'bg-red-500' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="font-heading text-2xl font-bold text-rich-chocolate mb-2">
        Live Stock Management
      </h1>
      <p className="text-dark-brown/60 text-sm mb-6">
        Update product availability in real time. Changes are reflected immediately on the website.
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterCategory === cat.id
                ? 'bg-warm-gold text-white'
                : 'bg-white text-dark-brown border border-gray-200 hover:border-warm-gold'
            }`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Stock Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-beige overflow-hidden flex-shrink-0">
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-rich-chocolate text-sm truncate">
                  {product.name}
                </p>
                <p className="text-xs text-dark-brown/50">₹{product.price}</p>
              </div>
            </div>

            <div className="flex gap-1.5">
              {stockOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleStockChange(product.id, opt.value)}
                  className={`flex-1 px-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                    product.stock === opt.value
                      ? `${opt.color} text-white shadow-md`
                      : 'bg-gray-100 text-dark-brown/70 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
