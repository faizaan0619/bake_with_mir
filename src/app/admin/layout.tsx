'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Products', icon: '🎂' },
  { href: '/admin/orders', label: 'Orders', icon: '📋' },
  { href: '/admin/gallery', label: 'Gallery', icon: '📸' },
  { href: '/admin/stock', label: 'Stock', icon: '📦' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if already authed in session
    if (typeof window !== 'undefined') {
      const authed = sessionStorage.getItem('bwm_admin');
      if (authed === 'true') setIsAuthed(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (data.valid) {
        setIsAuthed(true);
        setError('');
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('bwm_admin', 'true');
        }
      } else {
        setError('Invalid PIN. Please try again.');
      }
    } catch {
      setError('Verification failed. Please try again.');
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-cream">
        <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 max-w-md w-full mx-4 animate-scale-in">
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">🔐</span>
            <h1 className="font-heading text-2xl font-bold text-rich-chocolate">
              Admin Login
            </h1>
            <p className="text-dark-brown/60 text-sm mt-2">
              Enter your PIN to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter admin PIN"
              className="w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all text-center text-2xl tracking-widest"
              maxLength={6}
              id="admin-pin"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-warm-gold to-accent text-white rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              Login
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-rich-chocolate text-cream px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1"
          >
            <span className="text-xl">☰</span>
          </button>
          <h1 className="font-heading text-lg font-bold">
            🍰 Bake With Mir — Admin
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-cream/70 hover:text-cream transition-colors"
          >
            View Site →
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem('bwm_admin');
              setIsAuthed(false);
            }}
            className="text-sm text-cream/70 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg lg:shadow-none border-r border-gray-100 transition-transform duration-300 pt-16 lg:pt-0`}
        >
          <nav className="p-4 space-y-1">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-warm-gold/10 text-warm-gold'
                    : 'text-dark-brown/70 hover:bg-gray-50 hover:text-dark-brown'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-56px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
