'use client';

import { useState, useEffect } from 'react';
import { getGalleryItems, addGalleryItem, deleteGalleryItem, GalleryItem } from '@/lib/data';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string>('');

  useEffect(() => {
    setItems(getGalleryItems());
  }, []);

  const refresh = () => setItems(getGalleryItems());

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageData(base64);
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageData || !caption.trim()) return;
    addGalleryItem({ src: imageData, caption });
    setCaption('');
    setPreview(null);
    setImageData('');
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove this image from the gallery?')) {
      deleteGalleryItem(id);
      refresh();
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-rich-chocolate">
          Gallery ({items.length})
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-warm-gold to-accent text-white rounded-xl text-sm font-semibold hover:scale-105 active:scale-95 transition-all"
        >
          + Add Image
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 animate-scale-in">
          <h2 className="font-heading text-lg font-semibold text-rich-chocolate mb-4">
            Add New Image
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageUpload}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-warm-gold outline-none text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-warm-gold/10 file:text-warm-gold hover:file:bg-warm-gold/20 file:cursor-pointer"
              />
              {preview && (
                <div className="mt-2 relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">
                Caption
              </label>
              <input
                type="text"
                required
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-warm-gold outline-none text-sm"
                placeholder="Describe this image..."
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-warm-gold text-white rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
              >
                Add to Gallery
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setPreview(null); setImageData(''); setCaption(''); }}
                className="px-6 py-2 bg-gray-100 text-dark-brown rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group rounded-2xl overflow-hidden shadow-sm bg-white"
          >
            <div className="aspect-square">
              <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="text-xs text-dark-brown/70 truncate">{item.caption}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              title="Remove image"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
