'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  getProducts,
  getProductById,
  saveOrder,
  generateWhatsAppLink,
  Product,
} from '@/lib/data';

function OrderForm() {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get('product');

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    productId: '',
    quantity: 1,
    customMessage: '',
    deliveryDate: '',
    specialInstructions: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const allProducts = getProducts().filter((p) => p.stock !== 'out');
    setProducts(allProducts);
    if (preselectedId) {
      const product = getProductById(preselectedId);
      if (product && product.stock !== 'out') {
        setForm((f) => ({ ...f, productId: preselectedId }));
      }
    }
  }, [preselectedId]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(form.phone.trim()))
      errs.phone = 'Enter a valid 10-digit phone number';
    if (!form.productId) errs.productId = 'Please select a product';
    if (form.quantity < 1) errs.quantity = 'Minimum quantity is 1';
    if (!form.deliveryDate) errs.deliveryDate = 'Please select a date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const product = getProductById(form.productId);
    if (!product) return;

    const order = {
      name: form.name,
      phone: form.phone,
      productId: form.productId,
      productName: product.name,
      quantity: form.quantity,
      customMessage: form.customMessage,
      deliveryDate: form.deliveryDate,
      specialInstructions: form.specialInstructions,
    };

    saveOrder(order);

    const whatsappUrl = generateWhatsAppLink(order);
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
  };

  const selectedProduct = form.productId
    ? getProductById(form.productId)
    : null;

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 rounded-3xl bg-white shadow-lg max-w-md mx-4 animate-scale-in">
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="font-heading text-2xl font-bold text-rich-chocolate mb-3">
            Order Placed!
          </h2>
          <p className="text-dark-brown/60 mb-6">
            Your order has been sent via WhatsApp. We&apos;ll confirm it shortly!
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: '',
                phone: '',
                productId: '',
                quantity: 1,
                customMessage: '',
                deliveryDate: '',
                specialInstructions: '',
              });
            }}
            className="px-6 py-3 bg-gradient-to-r from-warm-gold to-accent text-white rounded-full font-semibold hover:scale-105 transition-all duration-300"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="order-name"
            className="block text-sm font-semibold text-rich-chocolate mb-2"
          >
            Your Name *
          </label>
          <input
            id="order-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.name ? 'border-red-400' : 'border-beige'
            } bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="order-phone"
            className="block text-sm font-semibold text-rich-chocolate mb-2"
          >
            Phone Number *
          </label>
          <input
            id="order-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.phone ? 'border-red-400' : 'border-beige'
            } bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all`}
            placeholder="10-digit phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Product Selection */}
        <div>
          <label
            htmlFor="order-product"
            className="block text-sm font-semibold text-rich-chocolate mb-2"
          >
            Select Product *
          </label>
          <select
            id="order-product"
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.productId ? 'border-red-400' : 'border-beige'
            } bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all`}
          >
            <option value="">Choose a product...</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — ₹{p.price}
                {p.stock === 'low' ? ' (Low Stock)' : ''}
              </option>
            ))}
          </select>
          {errors.productId && (
            <p className="text-red-500 text-xs mt-1">{errors.productId}</p>
          )}
          {selectedProduct && (
            <p className="text-sm text-warm-gold mt-2">
              Selected: {selectedProduct.name} — ₹{selectedProduct.price}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="order-quantity"
            className="block text-sm font-semibold text-rich-chocolate mb-2"
          >
            Quantity *
          </label>
          <input
            id="order-quantity"
            type="number"
            min="1"
            max="50"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: parseInt(e.target.value) || 1 })
            }
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.quantity ? 'border-red-400' : 'border-beige'
            } bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
          )}
          {selectedProduct && (
            <p className="text-sm text-dark-brown/60 mt-1">
              Total: ₹{selectedProduct.price * form.quantity}
            </p>
          )}
        </div>

        {/* Custom Message */}
        <div>
          <label
            htmlFor="order-message"
            className="block text-sm font-semibold text-rich-chocolate mb-2"
          >
            Custom Message for Cake
          </label>
          <input
            id="order-message"
            type="text"
            value={form.customMessage}
            onChange={(e) =>
              setForm({ ...form, customMessage: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all"
            placeholder='e.g., "Happy Birthday Aisha!"'
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label
            htmlFor="order-date"
            className="block text-sm font-semibold text-rich-chocolate mb-2"
          >
            Delivery/Pickup Date *
          </label>
          <input
            id="order-date"
            type="date"
            value={form.deliveryDate}
            onChange={(e) =>
              setForm({ ...form, deliveryDate: e.target.value })
            }
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.deliveryDate ? 'border-red-400' : 'border-beige'
            } bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all`}
          />
          {errors.deliveryDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.deliveryDate}
            </p>
          )}
        </div>

        {/* Special Instructions */}
        <div>
          <label
            htmlFor="order-instructions"
            className="block text-sm font-semibold text-rich-chocolate mb-2"
          >
            Special Instructions
          </label>
          <textarea
            id="order-instructions"
            rows={3}
            value={form.specialInstructions}
            onChange={(e) =>
              setForm({ ...form, specialInstructions: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all resize-none"
            placeholder="Any dietary requirements, design preferences, allergies..."
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-gradient-to-r from-warm-gold to-accent text-white rounded-xl text-lg font-semibold shadow-lg shadow-warm-gold/30 hover:shadow-warm-gold/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Send Order via WhatsApp 💬
          </button>
        </div>

        <p className="text-xs text-dark-brown/40 text-center">
          Your order will be sent via WhatsApp for confirmation. We&apos;ll get back
          to you shortly!
        </p>
      </form>
    </div>
  );
}

export default function OrderPage() {
  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-br from-rich-chocolate to-dark-brown py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
            Place Your Order
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream mt-2 mb-4">
            Order Booking 🎂
          </h1>
          <p className="text-cream/70 max-w-lg mx-auto">
            Fill in the details below and we&apos;ll confirm your order via WhatsApp
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg shadow-warm-gold/10 p-6 sm:p-10">
            <Suspense
              fallback={
                <div className="text-center py-10">
                  <span className="text-4xl animate-spin inline-block">🍰</span>
                  <p className="text-dark-brown/60 mt-4">Loading order form...</p>
                </div>
              }
            >
              <OrderForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
