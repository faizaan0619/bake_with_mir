'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${form.name} — Bake With Mir`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:sfaizaan79@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-br from-rich-chocolate to-dark-brown py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
            Get In Touch
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream mt-2 mb-4">
            Contact Us 💌
          </h1>
          <p className="text-cream/70 max-w-lg mx-auto">
            Have a question or want to place a custom order? We&#39;d love to hear from you!
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-lg shadow-warm-gold/10 p-6 sm:p-10">
              <h2 className="font-heading text-2xl font-bold text-rich-chocolate mb-6">
                Send Us a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 animate-scale-in">
                  ✅ Message sent successfully! We&#39;ll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-rich-chocolate mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-rich-chocolate mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-rich-chocolate mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-beige bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all resize-none"
                    placeholder="Tell us what you need..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-warm-gold to-accent text-white rounded-xl text-lg font-semibold shadow-lg shadow-warm-gold/30 hover:shadow-warm-gold/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  Send Message ✉️
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919149774989"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-500 rounded-2xl p-6 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">💬</span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      Chat on WhatsApp
                    </h3>
                    <p className="text-green-100 text-sm">
                      Quick responses • Order updates • Custom requests
                    </p>
                  </div>
                </div>
              </a>

              {/* Phone */}
              <div className="bg-white rounded-2xl p-6 shadow-md shadow-warm-gold/10">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">📞</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-rich-chocolate">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919149774989"
                      className="text-warm-gold text-lg font-semibold hover:text-soft-brown transition-colors"
                    >
                      +91 9149774989
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 shadow-md shadow-warm-gold/10">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📍</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-rich-chocolate mb-1">
                      Visit Us
                    </h3>
                    <p className="text-dark-brown/70">
                      Nusso Bandipora<br />
                      Opposite New Bus Stand<br />
                      193502, Jammu &amp; Kashmir
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-md shadow-warm-gold/10">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🕐</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-rich-chocolate mb-2">
                      Opening Hours
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-dark-brown/70">Mon - Sat</span>
                        <span className="font-medium text-rich-chocolate">8AM - 9PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-dark-brown/70">Sunday</span>
                        <span className="font-medium text-rich-chocolate">9AM - 8PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Preview */}
              <div className="rounded-2xl overflow-hidden shadow-md shadow-warm-gold/10 h-[200px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13186.86725!2d74.6497!3d34.4177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1812a1f0b4e5f%3A0x83e5bb40b0e1e88!2sBandipora%2C%20Jammu%20and%20Kashmir%20193502!5e0!3m2!1sen!2sin!4v1709900000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bake With Mir Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
