'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

interface TasbeehModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DHIKR_LIST = [
  { ur: "SubhanAllah", key: "subhanAllah" },
  { ur: "Alhamdulillah", key: "alhamdulillah" },
  { ur: "Allahu Akbar", key: "allahuAkbar" },
  { ur: "La ilaha illallah", key: "lailaha" },
  { ur: "Astaghfirullah", key: "astaghfirullah" }
];

const CIRC = 2 * Math.PI * 116; // ~728.85

export default function TasbeehModal({ isOpen, onClose }: TasbeehModalProps) {
  const TODAY_KEY = new Date().toISOString().slice(0, 10);

  const [dhikrIndex, setDhikrIndex] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = localStorage.getItem('tasbeh-state');
      if (saved) return JSON.parse(saved).dhikrIndex || 0;
    } catch (e) {
      console.error(e);
    }
    return 0;
  });

  const [count, setCount] = useState(0);

  const [target, setTarget] = useState(() => {
    if (typeof window === 'undefined') return 33;
    try {
      const saved = localStorage.getItem('tasbeh-state');
      if (saved) return JSON.parse(saved).target || 33;
    } catch (e) {
      console.error(e);
    }
    return 33;
  });

  const [lifetime, setLifetime] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = localStorage.getItem('tasbeh-state');
      if (saved) return JSON.parse(saved).lifetime || 0;
    } catch (e) {
      console.error(e);
    }
    return 0;
  });

  const [today, setToday] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = localStorage.getItem('tasbeh-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.dateKey === TODAY_KEY) return parsed.today || 0;
      }
    } catch (e) {
      console.error(e);
    }
    return 0;
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Session timer interval
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Save state helper
  const saveState = useCallback((newLifetime: number, newToday: number, newTarget: number, newDhikrIndex: number) => {
    try {
      localStorage.setItem('tasbeh-state', JSON.stringify({
        lifetime: newLifetime,
        today: newToday,
        target: newTarget,
        dhikrIndex: newDhikrIndex,
        dateKey: TODAY_KEY
      }));
    } catch (e) {
      console.error(e);
    }
  }, [TODAY_KEY]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMsg(null);
    }, 1600);
  };

  const vibrate = (pattern: number | number[] = 12) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // ignore if not supported
      }
    }
  };

  const increment = useCallback(() => {
    setCount((prevCount) => {
      const nextCount = prevCount + 1;
      const nextLifetime = lifetime + 1;
      const nextToday = today + 1;

      setLifetime(nextLifetime);
      setToday(nextToday);
      vibrate(12);

      if (nextCount >= target) {
        showToast('MashaAllah - target complete');
        vibrate([15, 60, 15]);
        const nextDhikr = (dhikrIndex + 1) % DHIKR_LIST.length;
        setDhikrIndex(nextDhikr);
        saveState(nextLifetime, nextToday, target, nextDhikr);
        return 0;
      } else {
        saveState(nextLifetime, nextToday, target, dhikrIndex);
        return nextCount;
      }
    });
  }, [dhikrIndex, lifetime, saveState, target, today]);

  // Keyboard shortcut for spacebar / enter when modal open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        // prevent page scroll
        e.preventDefault();
        increment();
      } else if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, target, dhikrIndex, lifetime, today, onClose, increment]);

  if (!isOpen) return null;

  const formatTimer = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  };

  const strokeDashoffset = CIRC * (1 - Math.min(count / target, 1));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Container card matching exact requested styles */}
      <div 
        className="relative w-full max-w-[420px] max-h-[92vh] overflow-y-auto rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 text-[#2B2118] shadow-2xl border border-[#C9A227]/20 scrollbar-none"
        style={{
          background: 'linear-gradient(180deg, #FFFDF7 0%, #FAF4E6 100%)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.8) inset, 0 20px 50px -20px rgba(12,74,62,0.35), 0 0 0 1px rgba(201,162,39,0.15)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 text-[#6B5B45] hover:text-[#0C4A3E] hover:bg-[#F2E7CB] rounded-full transition-colors cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Stats & Reset Row at Top */}
        <div className="flex items-center justify-between pt-1 pb-3 pr-6 sm:pr-8 mb-3 border-b border-dashed border-[#E4D9B8]">
          <div className="text-center">
            <div className="text-[10px] sm:text-[11px] text-[#6B5B45] tracking-wide">Lifetime Count</div>
            <div className="font-serif text-base sm:text-xl font-bold text-[#0C4A3E]">{lifetime}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] sm:text-[11px] text-[#6B5B45] tracking-wide">Today&apos;s Count</div>
            <div className="font-serif text-base sm:text-xl font-bold text-[#0C4A3E]">{today}</div>
          </div>
          <button
            onClick={() => {
              setCount(0);
              saveState(lifetime, today, target, dhikrIndex);
              showToast('Count reset');
            }}
            className="bg-transparent border border-[#E4D9B8] text-[#6B5B45] hover:bg-[#FBEAEA] hover:border-[#E2B4B4] hover:text-[#A34444] text-[11px] sm:text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            Reset Count
          </button>
        </div>

        {/* Timer Row */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="font-serif font-bold text-lg sm:text-xl tracking-widest text-[#14615A] bg-[#F2E7CB] border border-[#E4D9B8] px-3.5 py-1 rounded-xl min-w-[90px] text-center shadow-xs">
            {formatTimer(secondsElapsed)}
          </div>
          <button
            onClick={() => {
              setSecondsElapsed(0);
              showToast('Timer reset');
            }}
            className="bg-transparent border border-[#E4D9B8] text-[#6B5B45] hover:bg-[#FBEAEA] hover:border-[#E2B4B4] hover:text-[#A34444] text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            Reset Time
          </button>
        </div>

        {/* Counter Ring & Tap Circle */}
        <div className="relative w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] mx-auto mb-3">
          {/* Rotating Medallion SVG Background */}
          <svg 
            className="absolute -inset-[24px] sm:-inset-[28px] w-[258px] h-[258px] sm:w-[306px] sm:h-[306px] animate-[spin_60s_linear_infinite] opacity-55 pointer-events-none" 
            viewBox="0 0 320 320" 
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="medGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A227" />
                <stop offset="100%" stopColor="#E4C766" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#medGrad)" strokeWidth="1.4" opacity="0.9">
              <polygon points="160,20 190,90 260,60 230,130 300,160 230,190 260,260 190,230 160,300 130,230 60,260 90,190 20,160 90,130 60,60 130,90" />
              <circle cx="160" cy="160" r="118" />
            </g>
          </svg>

          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 260 260">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A227" />
                <stop offset="100%" stopColor="#E4C766" />
              </linearGradient>
            </defs>
            <circle className="fill-none stroke-[#E4D9B8]" strokeWidth="10" cx="130" cy="130" r="116" />
            <circle
              className="fill-none stroke-[url(#goldGrad)] transition-[stroke-dashoffset] duration-350 ease-out"
              strokeWidth="10"
              strokeLinecap="round"
              cx="130"
              cy="130"
              r="116"
              strokeDasharray={CIRC}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Center Tap Button */}
          <button
            onClick={increment}
            className="absolute inset-[20px] sm:inset-[24px] rounded-full flex flex-col items-center justify-center cursor-pointer select-none transition-transform active:scale-96 focus:outline-none"
            style={{
              background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.1), transparent 60%), linear-gradient(160deg, #0C4A3E 0%, #073531 100%)',
              boxShadow: 'inset 0 2px 12px rgba(255,255,255,0.15), 0 12px 30px -10px rgba(7,53,49,0.6)'
            }}
            aria-label="Tap to count"
          >
            <span className="font-serif font-bold text-4xl sm:text-6xl text-[#E4C766] leading-none drop-shadow-md">
              {count}
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-[#D9CBA0] mt-1 sm:mt-1.5 tracking-wide">
              Target: {target}
            </span>
          </button>
        </div>





        {/* Toast */}
        {toastMsg && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#073531] text-[#E4C766] font-sans font-medium text-xs px-4 py-1.5 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none z-20">
            {toastMsg}
          </div>
        )}
      </div>
    </div>
  );
}
