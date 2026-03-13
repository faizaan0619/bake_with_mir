'use client';

import { useState, useEffect, useRef } from 'react';
import { CATEGORIES, Product } from '@/lib/data';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: '',
    price: 0,
    category: 'birthday-cakes',
    image: '/images/birthday-cake.png',
    description: '',
    stock: 'available' as Product['stock'],
    featured: false,
  });

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    const res = await fetch('/api/products');
    const data: Product[] = await res.json();
    setProducts(data);
  };

  const resetForm = () => {
    setForm({
      name: '',
      price: 0,
      category: 'birthday-cakes',
      image: '/images/birthday-cake.png',
      description: '',
      stock: 'available',
      featured: false,
    });
    setEditingId(null);
    setShowForm(false);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm({ ...form, image: base64 });
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editingId }),
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    await refresh();
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
      stock: product.stock,
      featured: product.featured,
    });
    setEditingId(product.id);
    setImagePreview(product.image);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      await refresh();
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-rich-chocolate">
          Products ({products.length})
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-warm-gold to-accent text-white rounded-xl text-sm font-semibold hover:scale-105 active:scale-95 transition-all"
        >
          + Add Product
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 animate-scale-in">
          <h2 className="font-heading text-lg font-semibold text-rich-chocolate mb-4">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-warm-gold outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">Price (₹)</label>
              <input
                type="number"
                required
                min="1"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-warm-gold outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-warm-gold outline-none text-sm"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">Product Image</label>
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-warm-gold outline-none text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-warm-gold/10 file:text-warm-gold hover:file:bg-warm-gold/20 file:cursor-pointer"
                />
                {imagePreview && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">Stock</label>
              <select
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value as Product['stock'] })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-warm-gold outline-none text-sm"
              >
                <option value="available">✅ Available</option>
                <option value="low">⚠️ Low Stock</option>
                <option value="out">❌ Out of Stock</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 accent-warm-gold"
              />
              <label htmlFor="featured" className="text-sm font-medium text-dark-brown">Featured product</label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-dark-brown mb-1">Description</label>
              <textarea
                required
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-warm-gold outline-none text-sm resize-none"
              />
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-warm-gold text-white rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
              >
                {editingId ? 'Update' : 'Add'} Product
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-100 text-dark-brown rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-dark-brown">Product</th>
                <th className="px-4 py-3 font-semibold text-dark-brown">Category</th>
                <th className="px-4 py-3 font-semibold text-dark-brown">Price</th>
                <th className="px-4 py-3 font-semibold text-dark-brown">Stock</th>
                <th className="px-4 py-3 font-semibold text-dark-brown">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-beige overflow-hidden flex-shrink-0">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-rich-chocolate">{product.name}</p>
                        {product.featured && (
                          <span className="text-xs text-warm-gold">⭐ Featured</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-dark-brown/70">
                    {CATEGORIES.find((c) => c.id === product.category)?.name || product.category}
                  </td>
                  <td className="px-4 py-3 font-semibold text-rich-chocolate">₹{product.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.stock === 'available'
                          ? 'bg-green-100 text-green-700'
                          : product.stock === 'low'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.stock === 'available'
                        ? '✅ Available'
                        : product.stock === 'low'
                        ? '⚠️ Low'
                        : '❌ Out'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 text-xs rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 text-xs rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
