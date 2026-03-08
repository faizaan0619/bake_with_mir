'use client';

import { useState, useEffect } from 'react';
import { getReviews, saveReview, getAverageRating, Review } from '@/lib/data';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ average: 0, count: 0 });
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setReviews(getReviews().reverse());
    setStats(getAverageRating());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;

    saveReview({
      name: form.name,
      rating: form.rating,
      comment: form.comment,
    });

    setForm({ name: '', rating: 5, comment: '' });
    setSubmitted(true);
    refreshData();
    setTimeout(() => setSubmitted(false), 3000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-gradient-to-br from-rich-chocolate to-dark-brown py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-warm-gold text-sm font-semibold tracking-widest uppercase">
            Your Feedback Matters
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream mt-2 mb-4">
            Customer Reviews ⭐
          </h1>
          <p className="text-cream/70 max-w-lg mx-auto">
            Share your experience and help others discover our bakery
          </p>

          {/* Average Rating */}
          {stats.count > 0 && (
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <span className="text-4xl font-bold text-cream">{stats.average}</span>
              <div>
                <div className="flex gap-0.5">{renderStars(Math.round(stats.average))}</div>
                <p className="text-cream/70 text-xs mt-0.5">
                  Based on {stats.count} review{stats.count !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 md:py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Write Review Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg shadow-warm-gold/10 p-6 sm:p-8 sticky top-24">
                <h2 className="font-heading text-xl font-bold text-rich-chocolate mb-5">
                  Write a Review ✍️
                </h2>

                {submitted && (
                  <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm animate-scale-in">
                    ✅ Thank you for your review!
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="review-name" className="block text-sm font-semibold text-rich-chocolate mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-beige bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all text-sm"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-rich-chocolate mb-1.5">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-3xl transition-transform hover:scale-125 active:scale-95"
                        >
                          <span
                            className={
                              star <= (hoverRating || form.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }
                          >
                            ★
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="review-comment" className="block text-sm font-semibold text-rich-chocolate mb-1.5">
                      Your Review
                    </label>
                    <textarea
                      id="review-comment"
                      rows={4}
                      required
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-beige bg-white focus:border-warm-gold focus:ring-2 focus:ring-warm-gold/20 outline-none transition-all text-sm resize-none"
                      placeholder="Tell us about your experience..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-warm-gold to-accent text-white rounded-xl text-sm font-semibold shadow-lg shadow-warm-gold/30 hover:shadow-warm-gold/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  >
                    Submit Review ⭐
                  </button>
                </form>
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="font-heading text-xl font-bold text-rich-chocolate mb-2">
                What Our Customers Say
              </h2>

              {reviews.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                  <span className="text-5xl mb-4 block">🌟</span>
                  <h3 className="font-heading text-lg font-semibold text-rich-chocolate mb-2">
                    No reviews yet
                  </h3>
                  <p className="text-dark-brown/60 text-sm">
                    Be the first to share your experience!
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-warm-gold/20 flex items-center justify-center text-sm font-bold text-warm-gold">
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-rich-chocolate text-sm">
                              {review.name}
                            </p>
                            <p className="text-xs text-dark-brown/40">
                              {timeAgo(review.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-dark-brown/70 text-sm leading-relaxed mt-3">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
