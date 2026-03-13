'use client';

import { useEffect, useState } from 'react';
import { Product, Order } from '@/lib/data';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    availableProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/orders').then(r => r.json()),
    ]).then(([products, orders]: [Product[], Order[]]) => {
      setStats({
        totalProducts: products.length,
        availableProducts: products.filter((p) => p.stock === 'available').length,
        lowStockProducts: products.filter((p) => p.stock === 'low').length,
        outOfStockProducts: products.filter((p) => p.stock === 'out').length,
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status === 'pending').length,
      });
    }).catch(() => {});
  }, []);

  const STAT_CARDS = [
    { label: 'Total Products', value: stats.totalProducts, icon: '🎂', color: 'bg-blue-50 text-blue-700' },
    { label: 'Available', value: stats.availableProducts, icon: '✅', color: 'bg-green-50 text-green-700' },
    { label: 'Low Stock', value: stats.lowStockProducts, icon: '⚠️', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Out of Stock', value: stats.outOfStockProducts, icon: '❌', color: 'bg-red-50 text-red-700' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '📋', color: 'bg-purple-50 text-purple-700' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: '⏳', color: 'bg-orange-50 text-orange-700' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="font-heading text-2xl font-bold text-rich-chocolate mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STAT_CARDS.map((card, i) => (
          <div key={i} className={`${card.color} rounded-2xl p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{card.icon}</span>
              <span className="text-3xl font-bold">{card.value}</span>
            </div>
            <p className="text-sm font-medium opacity-70">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-rich-chocolate mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="/admin/products"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-warm-gold hover:bg-warm-gold/5 transition-all"
          >
            <span className="text-2xl">➕</span>
            <span className="text-sm font-medium text-dark-brown">Add Product</span>
          </a>
          <a
            href="/admin/orders"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-warm-gold hover:bg-warm-gold/5 transition-all"
          >
            <span className="text-2xl">📋</span>
            <span className="text-sm font-medium text-dark-brown">View Orders</span>
          </a>
          <a
            href="/admin/stock"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-warm-gold hover:bg-warm-gold/5 transition-all"
          >
            <span className="text-2xl">📦</span>
            <span className="text-sm font-medium text-dark-brown">Update Stock</span>
          </a>
        </div>
      </div>
    </div>
  );
}
