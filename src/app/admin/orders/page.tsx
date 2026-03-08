'use client';

import { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus, Order } from '@/lib/data';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  useEffect(() => {
    setOrders(getOrders().reverse()); // newest first
  }, []);

  const refresh = () => setOrders(getOrders().reverse());

  const handleStatusChange = (id: string, status: Order['status']) => {
    updateOrderStatus(id, status);
    refresh();
  };

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-bold text-rich-chocolate">
          Orders ({orders.length})
        </h1>
        <div className="flex gap-2">
          {(['all', 'pending', 'confirmed', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === f
                  ? 'bg-warm-gold text-white'
                  : 'bg-gray-100 text-dark-brown hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <span className="text-5xl mb-4 block">📋</span>
          <h3 className="font-heading text-lg font-semibold text-rich-chocolate mb-2">
            No orders yet
          </h3>
          <p className="text-dark-brown/60 text-sm">
            Orders placed by customers will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-semibold text-rich-chocolate">
                    #{order.id.slice(-6)} — {order.productName}
                  </h3>
                  <p className="text-xs text-dark-brown/50">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-dark-brown/70 mb-4">
                <p>👤 {order.name}</p>
                <p>📞 {order.phone}</p>
                <p>📦 Qty: {order.quantity}</p>
                <p>📅 {order.deliveryDate}</p>
                {order.customMessage && <p>💬 {order.customMessage}</p>}
                {order.specialInstructions && (
                  <p className="sm:col-span-2">📝 {order.specialInstructions}</p>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t border-gray-100">
                {order.status !== 'pending' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'pending')}
                    className="px-3 py-1.5 text-xs rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
                  >
                    Mark Pending
                  </button>
                )}
                {order.status !== 'confirmed' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'confirmed')}
                    className="px-3 py-1.5 text-xs rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    Confirm
                  </button>
                )}
                {order.status !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'completed')}
                    className="px-3 py-1.5 text-xs rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
