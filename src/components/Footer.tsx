import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-rich-chocolate text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍰</span>
              <div>
                <h3 className="font-heading text-xl font-bold text-cream">
                  Bake With Mir
                </h3>
                <p className="text-xs text-warm-gold italic">Bake With Love</p>
              </div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              Freshly baked goods made with love and the finest ingredients.
              Custom cakes for all your special occasions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-warm-gold">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Our Menu' },
                { href: '/order', label: 'Place Order' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/reviews', label: 'Reviews' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-warm-gold text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-warm-gold">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <span className="text-base mt-0.5">📍</span>
                <span>
                  Nusso Bandipora, Opposite New Bus Stand, 193502
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">📞</span>
                <a href="tel:+919149774989" className="hover:text-warm-gold transition-colors">
                  +91 9149774989
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">💬</span>
                <a
                  href="https://wa.me/919149774989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-warm-gold transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-warm-gold">
              Opening Hours
            </h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li className="flex justify-between">
                <span>Monday - Saturday</span>
                <span className="text-cream">8AM - 9PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-cream">9AM - 8PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/50 text-sm">
            © {new Date().getFullYear()} Bake With Mir. All rights reserved.
          </p>
          <p className="text-cream/50 text-sm">
            Made with ❤️ in Bandipora
          </p>
        </div>

        {/* Developer Credit */}
        <div className="mt-4 pt-4 border-t border-cream/5 text-center">
          <p className="text-cream/30 text-xs">
            Designed & Developed by{' '}
            <a
              href="https://www.instagram.com/faizaanfr"
              className="text-warm-gold/60 hover:text-warm-gold transition-colors"
            >
              Faizaan Mushtaq
            </a>
            {' '}—{' '}
            <a
              href="mailto:hii.faizaan@gmail.com"
              className="text-cream/40 hover:text-warm-gold transition-colors"
            >
              hii.faizaan@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
