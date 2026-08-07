'use client';

import React, { useState } from 'react';
import { X, Star, Send, CheckCircle2 } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmit?: (review: { name: string; city: string; rating: number; comment: string; date: string }) => void;
}

export default function ReviewModal({ isOpen, onClose, onReviewSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const newReview = {
      name: name.trim(),
      city: city.trim() || 'Pakistan',
      rating,
      comment: comment.trim(),
      date: formattedDate,
    };

    if (onReviewSubmit) {
      onReviewSubmit(newReview);
    }

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setCity('');
    setComment('');
    setRating(5);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative border border-emerald-100/90 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={handleResetAndClose}
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-emerald-950 p-1.5 rounded-full hover:bg-emerald-50 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mb-3 animate-bounce" />
            <h3 className="text-xl font-bold text-emerald-950 mb-1">
              JazakAllah Khair!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xs mb-5 leading-relaxed">
              Aap ka mubarak review kamyabi se vasool ho gaya hai. Aap ke qimti mashware ka buhat shukriya.
            </p>
            <button 
              onClick={handleResetAndClose}
              className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Band Karein
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div className="text-center pr-6 pl-6">
              <span className="text-2xl">✍️</span>
              <h3 className="text-lg sm:text-xl font-bold text-emerald-950 mt-1">
                Apna Review Likhein
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dar ul Rehmat ke baare mein apni qimti rai share karein
              </p>
            </div>

            {/* Star Rating selection */}
            <div className="flex flex-col items-center justify-center pt-1 pb-1 bg-emerald-50/60 rounded-xl border border-emerald-100/80 p-2.5">
              <span className="text-xs font-semibold text-emerald-900 mb-1.5">
                Aap Ka Rating
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star 
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          active ? 'fill-amber-400 text-amber-400 drop-shadow-xs' : 'text-slate-300'
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input: Naam */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Aap Ka Naam <span className="text-rose-500">*</span>
              </label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Apna naam yahan likhein" 
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
              />
            </div>

            {/* Input: Shehar / Mulk */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shehar / Mulk (City / Country)
              </label>
              <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Maslan: Lahore, Pakistan" 
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
              />
            </div>

            {/* Input: Review Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Aap Ka Review <span className="text-rose-500">*</span>
              </label>
              <textarea 
                required 
                rows={3} 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Apni rai ya tajurba yahan likhein..." 
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button 
                type="button" 
                onClick={handleResetAndClose} 
                className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Khatam Karein
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Review Submit Karein</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
