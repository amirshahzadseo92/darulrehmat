'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Send, CheckCircle2, MessageSquare, Phone, Upload, RotateCcw, ShieldCheck, Star, ChevronDown, ChevronUp, User, MapPin, MoreVertical, ThumbsUp, Share2, BookOpen, Heart } from 'lucide-react';
import TasbeehModal from '@/components/TasbeehModal';
import ReviewModal from '@/components/ReviewModal';
import logoSquare from '@/src/assets/images/logo_square.jpg';

export default function Home() {
  const [showServices, setShowServices] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showTasbeehModal, setShowTasbeehModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedReactions, setSelectedReactions] = useState<Record<number, string>>({});
  const [activePickerIndex, setActivePickerIndex] = useState<number | null>(null);

  const EMOJI_REACTIONS = ['👍', '❤️', '🤲', '🌸', '😊'];

  const selectReaction = (index: number, emoji: string) => {
    setSelectedReactions(prev => {
      if (prev[index] === emoji) {
        const next = { ...prev };
        delete next[index];
        return next;
      }
      return { ...prev, [index]: emoji };
    });
    setActivePickerIndex(null);
  };

  const toggleReactionPicker = (index: number) => {
    if (activePickerIndex === index) {
      setActivePickerIndex(null);
    } else {
      setActivePickerIndex(index);
    }
  };

  const [reviews, setReviews] = useState<Array<{ name: string; city: string; rating: number; comment: string; date: string; likes: number }>>([
    {
      name: "Muhammad Usman",
      city: "Lahore",
      rating: 5,
      comment: "Alhamdulillah! Hafiz Sahab ki rohani rehnumai aur wazaif se hamare ghar ke masail hal hue. Bohat shukriya.",
      date: "12 Jul 2026",
      likes: 14
    },
    {
      name: "Sobia Khan",
      city: "Karachi",
      rating: 5,
      comment: "Karobari bandish aur pareshani ke liye jo wazaif bataye the Allah ke fazal se buhat afaqah hua.",
      date: "28 Jun 2026",
      likes: 9
    }
  ]);

  const [logoSrc, setLogoSrc] = useState<string>(logoSquare?.src || '/logo_square.jpg');
  const [profileSrc, setProfileSrc] = useState<string>('/hafiz_amir_shahzad.png');

  useEffect(() => {
    const savedLogo = localStorage.getItem('app_logo_custom');
    const savedProfile = localStorage.getItem('app_profile_custom');
    const savedReviews = localStorage.getItem('app_user_reviews');
    if (savedLogo) {
      setTimeout(() => setLogoSrc(savedLogo), 0);
    }
    if (savedProfile) {
      setTimeout(() => setProfileSrc(savedProfile), 0);
    }
    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTimeout(() => setReviews(parsed), 0);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAddReview = (newReview: { name: string; city: string; rating: number; comment: string; date: string }) => {
    setReviews(prev => {
      const updated = [{ ...newReview, likes: 1 }, ...prev];
      try {
        localStorage.setItem('app_user_reviews', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setLogoSrc(result);
          localStorage.setItem('app_logo_custom', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    setLogoSrc('/logo.jpg');
    localStorage.removeItem('app_logo_custom');
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setProfileSrc(result);
          localStorage.setItem('app_profile_custom', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetProfile = () => {
    setProfileSrc('/hafiz_amir_shahzad.png');
    localStorage.removeItem('app_profile_custom');
  };

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    city: '',
    country: '',
    whatsapp: '',
    email: '',
    subject: '',
    problem: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const openForm = (subjectTitle?: string | React.SyntheticEvent) => {
    if (typeof subjectTitle === 'string') {
      setFormData(prev => ({ ...prev, subject: subjectTitle }));
    }
    setShowForm(true);
    setShowServices(false);
    setSubmitted(false);
  };

  const services = [
    { icon: "🕌", title: "Rohani Mashwara" },
    { icon: "📖", title: "Qur'ani Wazaif" },
    { icon: "🤲", title: "Dua-e-Khas" },
    { icon: "🌙", title: "Istikhara" },
    { icon: "🛡️", title: "Jaadu Aur Sifli Aamaal Ka Shar'i Ilaj" },
    { icon: "👁️", title: "Nazar-e-Bad Aur Hasad Ka Shar'i Ilaj" },
    { icon: "💼", title: "Rizq Ki Bandish Aur Karobari Tangi" },
    { icon: "💍", title: "Pasand Ki Shadi, Rishton Ki Bandish Aur Nikah Ke Masail" },
    { icon: "👶", title: "Aulad Ki Bandish Aur Masail" },
    { icon: "❤️", title: "Sehat Ki Bandish Aur Rohani Amraz" },
    { icon: "🏡", title: "Gharailu Masail Aur Na-Chaqi" },
    { icon: "😔", title: "Zehni Bechaini Aur Sukoon-e-Qalb" },
    { icon: "📚", title: "Imtihan Mein Na-Kami Aur Kamyabi" },
    { icon: "✈️", title: "Safar Aur Aham Faislon Ki Rehnumai" },
    { icon: "💔", title: "Najaiz Taluqat Se Nijat Ke Liye Shar'i Rehnumai" }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col relative overflow-x-hidden">
      <header className="w-full bg-white border-b border-emerald-600 shadow-xs px-4 sm:px-6 py-2 flex items-center justify-center sm:justify-start gap-4 sm:gap-8 relative z-20">
        <div className="flex items-center gap-2 sm:gap-3 text-left mx-auto sm:mx-0">
          <div 
            onClick={() => setShowLogoModal(true)}
            className="relative flex items-center justify-center cursor-pointer group w-14 h-14 sm:w-[60px] sm:h-[60px] transition-transform duration-300 hover:scale-105"
            title="Click to view full logo"
          >
            {/* Stationary Logo Image - slightly smaller to leave distance from rotating ring */}
            <Image 
              src={logoSrc} 
              alt="Dar ul Rehmat Logo" 
              width={120}
              height={120}
              unoptimized
              className="w-[88%] h-[88%] object-cover rounded-full" 
            />
            {/* Rotating Black Ring Overlay */}
            <svg 
              className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] pointer-events-none z-10" 
              viewBox="0 0 100 100"
            >
              <circle 
                cx="50" 
                cy="50" 
                r="48" 
                fill="none" 
                stroke="#000000" 
                strokeWidth="2.5" 
                strokeDasharray="6 4" 
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 
              className="text-lg sm:text-xl font-bold font-[family-name:var(--font-playfair)] tracking-wide text-emerald-950 leading-tight" 
              id="header-title"
            >
              Dar ul Rehmat
            </h1>
            <span className="text-xs sm:text-sm font-semibold text-emerald-800 tracking-wide" id="header-subtitle">
              Global Rohani Markaz
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links inside Header */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-xs text-slate-700 font-medium ml-auto sm:ml-0">
          <span className="flex items-center gap-1 cursor-pointer hover:text-emerald-800 text-emerald-900 font-semibold px-2.5 py-1 bg-emerald-50 rounded-md border border-emerald-100/80" id="desktop-durood-pak">
            <span>✨</span>
            <span>Durood e Pak</span>
          </span>
          <button 
            onClick={() => { setShowServices(!showServices); setShowForm(false); }} 
            className={`flex items-center gap-1 cursor-pointer px-2.5 py-1 rounded-md transition-colors ${showServices ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'hover:bg-slate-100 text-slate-700'}`}
            id="desktop-khidmaat-btn"
          >
            <span>🕌</span>
            <span>Khidmaat</span>
          </button>
          <button 
            onClick={() => setShowTasbeehModal(true)}
            className="flex items-center gap-1 cursor-pointer hover:text-emerald-800 transition-colors"
            id="desktop-tasbeeh-btn"
          >
            <span>📿</span>
            <span>Tasbeeh</span>
          </button>
          <span className="flex items-center gap-1 cursor-pointer hover:text-emerald-800"><span>📖</span><span>Wazaif</span></span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-emerald-800"><span>📝</span><span>Blog</span></span>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="sm:hidden w-full bg-slate-100/80 border-b border-slate-200 px-4 py-1 text-xs text-slate-700 font-medium flex items-center justify-between overflow-x-auto gap-2" id="khidmaat-bar">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 shrink-0 text-emerald-900 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/80" id="mobile-durood-pak">
            <span>✨</span>
            <span>Durood e Pak</span>
          </span>
          <button 
            onClick={() => { setShowServices(!showServices); setShowForm(false); }} 
            className={`flex items-center gap-1 shrink-0 cursor-pointer px-2 py-0.5 rounded transition-colors ${showServices ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'hover:bg-slate-200/70 text-slate-700'}`}
            id="khidmaat-btn"
          >
            <span>🕌</span>
            <span>Khidmaat</span>
          </button>
          <button 
            onClick={() => setShowTasbeehModal(true)}
            className="flex items-center gap-1 shrink-0 cursor-pointer hover:text-emerald-800 transition-colors"
            id="mobile-tasbeeh-btn"
          >
            <span>📿</span>
            <span>Tasbeeh</span>
          </button>
          <span className="flex items-center gap-1 shrink-0"><span>📖</span><span>Wazaif</span></span>
          <span className="flex items-center gap-1 shrink-0"><span>📝</span><span>Blog</span></span>
        </div>
      </div>

      <main className="flex-1 bg-slate-50/50 pt-2 sm:pt-3 pb-6 px-4 sm:px-6 relative z-10" id="main-content">
        <section className="max-w-4xl mx-auto w-full">
          
          {/* Free Mashwara Form Section in Roman Urdu */}
          {showForm ? (
            <div className="bg-white rounded-2xl border border-emerald-200/80 shadow-md p-5 sm:p-8 relative animate-in fade-in duration-200" id="free-mashwara-form-card">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-xl font-bold text-emerald-950">
                      Free Rohani Mashwara Form
                    </h2>
                    <p className="text-xs text-slate-500">
                      Qur&apos;an-o-Sunnah ki roshni mein rohani mashwara hasil karne ke liye yeh form pur karein.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowForm(false)} 
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Form Band Karein"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center justify-center bg-emerald-50/60 rounded-xl border border-emerald-200/60 p-6">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-3 animate-bounce" />
                  <h3 className="text-xl font-bold text-emerald-950 mb-1">
                    JazakAllah Khair!
                  </h3>
                  <p className="text-sm text-slate-700 max-w-md mb-4">
                    Aap ka mashwara form kamyabi se submit ho gaya hai. Hafiz Amir Shahzad Saifi sahab aap ke maslay ka mutala karke jald WhatsApp ya Email per rabta farmayenge.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setShowForm(false); }} 
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Wapas Main Page Per Jayein
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm text-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Aap Ka Naam <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="Apna poora naam yahan likhein" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
                      />
                    </div>

                    {/* Walid ka Name */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Walid Ka Naam <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="fatherName" 
                        required 
                        value={formData.fatherName} 
                        onChange={handleInputChange} 
                        placeholder="Apne walid ka naam likhein" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
                      />
                    </div>

                    {/* Walida ka Name */}
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Walida Ka Naam <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="motherName" 
                        required 
                        value={formData.motherName} 
                        onChange={handleInputChange} 
                        placeholder="Apni walida ka naam likhein" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Shehar (City) <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="city" 
                        required 
                        value={formData.city} 
                        onChange={handleInputChange} 
                        placeholder="Apna shehar likhein" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Mulk (Country) <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="country" 
                        required 
                        value={formData.country} 
                        onChange={handleInputChange} 
                        placeholder="Apna mulk likhein" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="tel" 
                        name="whatsapp" 
                        required 
                        value={formData.whatsapp} 
                        onChange={handleInputChange} 
                        placeholder="Apna WhatsApp number (+92 300 0000000)" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
                      />
                    </div>

                    {/* Gmail / Email */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Gmail / Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="Apna email address likhein (example@gmail.com)" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
                      />
                    </div>

                    {/* WhatsApp Channel Banner Card right above Subject */}
                    <div className="sm:col-span-2 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 rounded-xl p-3.5 sm:p-4 text-slate-800 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-emerald-950 font-bold text-xs sm:text-sm mb-1">
                        <span>📲</span>
                        <span className="capitalize">Follow WhatsApp Channel</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        Follow the 🌹 𝐃𝐚𝐫-𝐮𝐥-𝐑𝐞𝐡𝐦𝐚𝐭 🌹 channel on WhatsApp:
                      </p>
                      <a 
                        href="https://whatsapp.com/channel/0029VanDIfk4dTnKEB1Shb30" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 mt-2 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-2xs hover:shadow-xs transition-all break-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span>https://whatsapp.com/channel/0029VanDIfk4dTnKEB1Shb30</span>
                      </a>
                    </div>

                    {/* Subject Box */}
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Unwan (Subject) <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="subject" 
                        required 
                        value={formData.subject} 
                        onChange={handleInputChange} 
                        placeholder="Maslay ka unwan (jaise: Karobari Tangi, Rohani Ilaj, Wazaif)" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30"
                      />
                    </div>

                    {/* Apna Masla Box */}
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Apna Masla (Tafseel Se Likhein) <span className="text-rose-500">*</span>
                      </label>
                      <textarea 
                        name="problem" 
                        required 
                        rows={4} 
                        value={formData.problem} 
                        onChange={handleInputChange} 
                        placeholder="Yahan apna masla tafseel se likhein ya paste karein..." 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600 bg-slate-50/30 resize-y"
                      />
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => setShowForm(false)} 
                      className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                      Khatam Karein
                    </button>
                    <button 
                      type="submit" 
                      className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Form Submit Karein</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : showServices ? (
            /* Light Green Compact Services Card */
            <div className="mb-3 sm:mb-4 bg-emerald-50/90 border border-emerald-200/80 rounded-xl shadow-xs p-3 sm:p-4 relative animate-in fade-in duration-200" id="services-card">
              <div className="flex items-center justify-between border-b border-emerald-200/60 pb-1.5 mb-2.5">
                <h3 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                  <span>🕌</span>
                  <span>Hamari Khidmaat</span>
                </h3>
                <button 
                  onClick={() => setShowServices(false)} 
                  className="text-emerald-700 hover:text-emerald-950 p-1 rounded-full hover:bg-emerald-100/70 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {services.map((service, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => openForm(service.title)}
                    className="bg-gradient-to-b from-emerald-50/80 via-emerald-50/40 to-teal-50/30 hover:from-emerald-100 hover:via-emerald-50/80 hover:to-teal-100/60 border border-emerald-200/80 hover:border-emerald-300/90 rounded-xl px-4 py-5 sm:px-5 sm:py-6 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all relative overflow-hidden cursor-pointer group"
                  >
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/90 border border-emerald-200/70 flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      {service.icon}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-emerald-950 leading-snug pr-20 group-hover:text-emerald-900">
                      {service.title}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openForm(service.title);
                      }}
                      className="absolute bottom-1.5 right-2 sm:bottom-2 sm:right-2.5 text-[10px] sm:text-xs font-semibold text-emerald-800 bg-emerald-100/90 hover:bg-emerald-800 hover:text-white border border-emerald-200/80 px-2.5 py-1 rounded-md shadow-2xs transition-colors cursor-pointer"
                    >
                      Free Mashwara
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-b from-emerald-50/80 via-emerald-50/40 to-teal-50/30 rounded-2xl border border-emerald-200/60 shadow-xs p-5 sm:p-8 text-center flex flex-col items-center justify-center relative overflow-hidden w-full" id="hero-card">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight leading-tight font-[family-name:var(--font-playfair)] w-full" id="hero-title">
                  <span className="block">Har Mushkil Ka Hal,</span>
                  <span className="block mt-0.5">Qur&apos;an o Sunnah Ki Roshni Mein</span>
                </h2>
                <p className="mt-2 sm:mt-2.5 text-sm sm:text-lg text-slate-700 max-w-2xl leading-relaxed sm:leading-relaxed font-normal text-balance mx-auto" id="hero-description">
                  Dar ul Rehmat mein hum Qur&apos;ani aayat aur Sunnat-e-Nabwi (ﷺ) ki roshni mein aapki zindagi ke rohani masail, pareshaniyon aur bimariyon ka shar&apos;i ilaj karte hain. Umeed ki ek nayi kiran ke sath, shifa ki taraf apna pehla qadam aaj hi uthaiye.
                </p>
                <button 
                  onClick={openForm} 
                  className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer" 
                  id="card-free-mashwara-btn"
                >
                  <span>📞</span>
                  <span>Free Mashwara</span>
                </button>
              </div>

              {/* Profile Card */}
              <div className="mt-3 sm:mt-4 bg-white rounded-2xl border border-emerald-100/80 shadow-xs p-6 sm:p-8 text-center flex flex-col items-center justify-center w-full" id="profile-card">
                <div className="w-28 h-28 sm:w-36 sm:h-36 relative flex items-center justify-center mb-4 group">
                  {/* Profile Picture */}
                  <div className="w-full h-full rounded-full bg-white shadow-md relative z-0 flex items-center justify-center">
                    <Image 
                      src={profileSrc} 
                      alt="Hafiz Amir Shahzad Saifi" 
                      width={300}
                      height={300}
                      unoptimized
                      className="w-[88%] h-[88%] object-cover object-center rounded-full transition-transform duration-300 group-hover:scale-105" 
                    />
                    {/* Rotating Black Ring Overlay */}
                    <svg 
                      className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] pointer-events-none z-10" 
                      viewBox="0 0 100 100"
                    >
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="48" 
                        fill="none" 
                        stroke="#000000" 
                        strokeWidth="2.5" 
                        strokeDasharray="6 4" 
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950 tracking-tight" id="profile-name">
                  Hafiz Amir Shahzad Saifi
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-700/90 mt-0.5 tracking-wide uppercase" id="profile-title">
                  Founder &amp; Rohani Mushir
                </p>
                <p className="mt-3 text-xs sm:text-base text-slate-600 max-w-2xl leading-relaxed font-normal text-balance mx-auto" id="profile-bio">
                  Alhamdulillah, mujhe deeni aur rohani rehnumai ke maidan mein 11 saal se zyada ka tajurba hasil hai. Is arsay ke dauran main Qur&apos;an-o-Sunnah ki roshni mein aur shar&apos;i usoolon ke mutabiq deeni aur rohani rehnumai faraham karta aa raha hoon. Har shakhs ki baat ko tawajjoh, ikhlaas aur mukammal raazdari ke sath sunta hoon aur Allah Ta&apos;ala se us ke liye behtareen rehnumai, asani aur khair ki dua karta hoon. Mera maqsad logon ko Allah Ta&apos;ala ki taraf ruju, du&apos;a, sabr aur sahih deeni rehnumai ki taraf rehnumai dena hai. Mera yaqeen hai ke asal shifa, rehmat aur kamyabi sirf Allah Ta&apos;ala ke ikhtiyar mein hai.
                </p>
              </div>

              {/* Apna Review Likhein Button */}
              <div className="mt-3 sm:mt-4 text-center w-full">
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm sm:text-base font-semibold text-emerald-900 bg-white hover:bg-emerald-50 border border-emerald-200/90 rounded-xl shadow-xs transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  id="apna-review-btn"
                >
                  <span>✍️</span>
                  <span>Apna Review Likhein</span>
                </button>
              </div>

              {/* Submitted Reviews Display below button */}
              {reviews.length > 0 && (
                <div className="mt-5 w-full text-left max-w-2xl mx-auto" id="user-reviews-list">
                  <div className="space-y-3">
                    {(showAllReviews ? reviews : reviews.slice(0, 2)).map((rev, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white border border-emerald-100/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all relative flex flex-col gap-3"
                      >
                        {/* Header */}
                        <div className="flex items-start gap-3">
                          {/* Avatar Circle with First Initial */}
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#164e39] text-white font-extrabold text-base sm:text-lg flex items-center justify-center shrink-0 shadow-2xs uppercase mt-0.5">
                            {rev.name ? rev.name.trim().charAt(0) : 'A'}
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Line 1: Name on left, Stars on top right corner */}
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                                {rev.name}
                              </h4>

                              {/* Rating Stars (Right Corner) */}
                              <div className="flex items-center gap-0.5 shrink-0 ml-auto">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star 
                                    key={s} 
                                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Line 2 (nechy): City / Country & Date */}
                            <div className="flex items-center justify-between gap-2 mt-1">
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                <span>{rev.city || 'Pakistan'}</span>
                              </div>
                              <span className="text-[11px] text-emerald-800/80 font-medium">
                                {rev.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Comment Body */}
                        <p className="text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed pl-1 my-1">
                          &ldquo;{rev.comment}&rdquo;
                        </p>



                        {/* Bottom Action Bar */}
                        <div className="relative flex items-center justify-start pt-2 mt-1 border-t border-slate-100">
                          {/* Floating Emoji Selector Bar */}
                          {activePickerIndex === idx && (
                            <div className="absolute -top-10 left-0 bg-white/95 backdrop-blur-md shadow-md border border-emerald-100 rounded-full px-2 py-1 flex items-center gap-1.5 z-20 animate-in fade-in zoom-in duration-150">
                              {EMOJI_REACTIONS.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => selectReaction(idx, emoji)}
                                  className={`text-base sm:text-lg hover:scale-130 transition-transform p-1 rounded-full cursor-pointer hover:bg-emerald-50 leading-none ${
                                    selectedReactions[idx] === emoji ? 'bg-emerald-100/80 scale-110' : ''
                                  }`}
                                  title={`Select ${emoji}`}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}

                          <button 
                            onClick={() => toggleReactionPicker(idx)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer group ${
                              selectedReactions[idx] 
                                ? 'bg-emerald-50 border border-emerald-100/90 text-emerald-900 font-bold' 
                                : 'hover:bg-slate-100 text-slate-600 bg-slate-50/80 border border-slate-100'
                            }`}
                            title="React to review"
                            id={`like-btn-${idx}`}
                          >
                            {selectedReactions[idx] ? (
                              <span className="text-sm leading-none animate-in zoom-in duration-150">
                                {selectedReactions[idx]}
                              </span>
                            ) : (
                              <ThumbsUp 
                                className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" 
                              />
                            )}
                            <span className="text-xs font-medium text-slate-700">
                              {(rev.likes || 3) + (selectedReactions[idx] ? 1 : 0)}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* All Reviews Toggle Button */}
                  {reviews.length > 2 && (
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-lg transition-all cursor-pointer shadow-2xs"
                        id="all-reviews-btn"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{showAllReviews ? "Show Less" : `All Reviews (${reviews.length})`}</span>
                        {showAllReviews ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-emerald-100/90 py-6 px-4 mt-6 text-center text-xs text-slate-600 relative z-10" id="site-footer">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-1.5">
          <p className="font-bold text-emerald-950 text-sm sm:text-base">
            Dar ul Rehmat - Global Rohani Markaz
          </p>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1 inline-flex items-center justify-center gap-1">
            <button 
              onClick={() => setShowAdminPanel(true)} 
              className="hover:text-emerald-700 hover:scale-110 cursor-pointer transition-all font-semibold focus:outline-none text-slate-500 hover:bg-emerald-50 px-1 rounded"
              title="Admin Panel"
              id="footer-admin-btn"
            >
              ©
            </button>
            <span>{new Date().getFullYear()} Dar ul Rehmat. Tamam Huqooq Mahfooz Hain.</span>
          </p>
        </div>
      </footer>

      {/* Logo Lightbox Modal for HD viewing */}
      {showLogoModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowLogoModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl relative border border-emerald-100 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowLogoModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold text-emerald-950 mb-1">Dar ul Rehmat - Global Rohani Markaz</h3>
            <p className="text-xs text-slate-500 mb-4">Official Logo (Tap image or close to exit)</p>
            <div className="w-full max-h-[70vh] rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center p-2">
              <Image 
                src={logoSrc} 
                alt="Dar ul Rehmat Global Rohani Markaz Logo" 
                width={500}
                height={500}
                unoptimized
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel Modal for Logo & Profile Management */}
      {showAdminPanel && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowAdminPanel(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative border border-emerald-200 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                    Admin Panel - Logo Manager
                  </h3>
                  <p className="text-xs text-slate-500">
                    Website ka Logo yahan se upload ya tabdeel karein.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="text-slate-400 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Logo Section */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-emerald-950 flex items-center justify-between">
                <span>Dar ul Rehmat Logo</span>
                <span className="text-[11px] font-normal text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Live Preview
                </span>
              </h4>

              {/* Rotating ring logo preview */}
              <div className="flex items-center justify-center py-2">
                <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                  {/* Stationary Logo Image - slightly smaller to leave distance from rotating ring */}
                  <Image 
                    src={logoSrc} 
                    alt="Logo Preview" 
                    width={100}
                    height={100}
                    unoptimized
                    className="w-[88%] h-[88%] object-cover rounded-full" 
                  />
                  {/* Rotating Black Ring Overlay */}
                  <svg 
                    className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] pointer-events-none z-10" 
                    viewBox="0 0 100 100"
                  >
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="48" 
                      fill="none" 
                      stroke="#000000" 
                      strokeWidth="2.5" 
                      strokeDasharray="6 4" 
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <label className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>Upload Naya Logo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoUpload} 
                    className="hidden" 
                  />
                </label>
                <button 
                  onClick={handleResetLogo}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>

            {/* Profile Photo Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Hafiz Amir Shahzad Profile Image</span>
                <span className="text-[11px] font-normal text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded-full">
                  Live Preview
                </span>
              </h4>

              <div className="flex items-center justify-center py-2">
                <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                  <Image 
                    src={profileSrc} 
                    alt="Profile Preview" 
                    width={100}
                    height={100}
                    unoptimized
                    className="w-[88%] h-[88%] object-cover rounded-full" 
                  />
                  {/* Rotating Black Ring Overlay */}
                  <svg 
                    className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] pointer-events-none z-10" 
                    viewBox="0 0 100 100"
                  >
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="48" 
                      fill="none" 
                      stroke="#000000" 
                      strokeWidth="2.5" 
                      strokeDasharray="6 4" 
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <label className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>Upload Nayi Profile Image</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleProfileUpload} 
                    className="hidden" 
                  />
                </label>
                <button 
                  onClick={handleResetProfile}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => setShowAdminPanel(false)}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer mt-1"
            >
              Save &amp; Close Admin Panel
            </button>
          </div>
        </div>
      )}

      {/* Tasbeeh Counter Modal */}
      <TasbeehModal 
        isOpen={showTasbeehModal} 
        onClose={() => setShowTasbeehModal(false)} 
      />

      {/* Review Modal */}
      <ReviewModal 
        isOpen={showReviewModal} 
        onClose={() => setShowReviewModal(false)} 
        onReviewSubmit={handleAddReview}
      />
    </div>
  );
}
