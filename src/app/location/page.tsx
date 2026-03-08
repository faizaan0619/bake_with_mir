'use client';

export default function LocationPage() {
  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-br from-rich-chocolate to-dark-brown py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
            Find Us
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream mt-2 mb-4">
            Our Location 📍
          </h1>
          <p className="text-cream/70 max-w-lg mx-auto">
            Visit us at Nusso Bandipora — we&#39;re right opposite the New Bus Stand!
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-lg shadow-warm-gold/10 h-[400px] lg:h-[500px]">
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

            {/* Info */}
            <div className="space-y-6">
              {/* Address Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md shadow-warm-gold/10">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📍</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-rich-chocolate mb-1">
                      Address
                    </h3>
                    <p className="text-dark-brown/70">
                      Nusso Bandipora<br />
                      Opposite New Bus Stand<br />
                      Pin Code: 193502<br />
                      Jammu &amp; Kashmir, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=34.4177,74.6497&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-4 bg-gradient-to-r from-warm-gold to-accent text-white rounded-2xl text-lg font-semibold shadow-lg shadow-warm-gold/30 hover:shadow-warm-gold/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                🗺️ Get Directions
              </a>

              {/* Opening Hours Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md shadow-warm-gold/10">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🕐</span>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-rich-chocolate mb-3">
                      Opening Hours
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 border-b border-beige">
                        <span className="text-dark-brown/70">Monday - Saturday</span>
                        <span className="font-semibold text-rich-chocolate bg-cream px-3 py-1 rounded-full text-sm">
                          8:00 AM - 9:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-dark-brown/70">Sunday</span>
                        <span className="font-semibold text-rich-chocolate bg-cream px-3 py-1 rounded-full text-sm">
                          9:00 AM - 8:00 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md shadow-warm-gold/10">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📞</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-rich-chocolate mb-1">
                      Contact
                    </h3>
                    <a
                      href="tel:+919149774989"
                      className="text-warm-gold font-semibold text-lg hover:text-soft-brown transition-colors"
                    >
                      +91 9149774989
                    </a>
                    <div className="mt-3">
                      <a
                        href="https://wa.me/919149774989"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
                      >
                        💬 WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
