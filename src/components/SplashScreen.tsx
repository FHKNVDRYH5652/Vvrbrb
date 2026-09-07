import React, { useEffect, useState } from 'react';
import { TelegramUser } from '../types';

interface Props {
  user: TelegramUser;
  onComplete: () => void;
  durationSeconds?: number;
}

export const SplashScreen: React.FC<Props> = ({
  user,
  onComplete,
  durationSeconds = 3.5,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalIntervals = 50;
    const intervalTime = (durationSeconds * 1000) / totalIntervals;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 350);
          return 100;
        }
        const increment = Math.floor(Math.random() * 3) + 2;
        const next = Math.min(100, prev + increment);
        if (next === 100) {
          setTimeout(onComplete, 350);
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [durationSeconds, onComplete]);

  // Display user details with intelligent fallbacks matching Screenshot 2
  const displayName = user.first_name || '︻╦╤─ #GUTS ─╤╦︻';
  const usernameHandle = user.username ? `@${user.username}` : '@GUTS01015';
  const photoUrl = user.photo_url || '/guts_avatar.jpg';

  return (
    <div className="relative min-h-[calc(100vh-100px)] flex flex-col items-center justify-between px-4 pt-6 pb-20 overflow-hidden select-none dark-luxury-bg">
      {/* Subtle faint Aztec / Yaar Win background watermark and ambient gold glows */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15 overflow-hidden">
        <div className="w-[340px] h-[340px] rounded-full border border-amber-500/20 flex items-center justify-center">
          <div className="w-[260px] h-[260px] rounded-full border border-dashed border-amber-500/30 flex items-center justify-center">
            <span className="text-4xl font-cinzel text-amber-500/30 tracking-widest uppercase">
              YAAR WIN
            </span>
          </div>
        </div>
      </div>

      {/* Top Section: PREMIUM BOT badge and stylized Gold Titles */}
      <div className="w-full flex flex-col items-center text-center z-10 space-y-2 mt-2">
        {/* PREMIUM BOT Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-500/40 bg-[#1e190e]/70 backdrop-blur shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]"></span>
          <span className="text-[11px] font-bold tracking-[0.2em] text-amber-300/90 font-outfit uppercase">
            PREMIUM BOT
          </span>
        </div>

        {/* Brand Main Title with Wings */}
        <div className="pt-2 flex flex-col items-center">
          <div className="flex items-center justify-center gap-1.5">
            {/* Left Decorative Wing Graphic */}
            <svg className="w-6 h-6 text-amber-300/80 -scale-x-100 transform -rotate-12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 3.73 2.05 6.98 5.09 8.67l.91-1.57C5.46 17.65 4 15 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 3-1.46 5.65-4 7.1l.91 1.57C19.95 18.98 22 15.73 22 12c0-5.52-4.48-10-10-10z" />
            </svg>

            <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-wider gold-gradient-text gold-glow uppercase">
              SHREEWIN
            </h1>

            {/* Right Decorative Wing Graphic */}
            <svg className="w-6 h-6 text-amber-300/80 transform rotate-12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 3.73 2.05 6.98 5.09 8.67l.91-1.57C5.46 17.65 4 15 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 3-1.46 5.65-4 7.1l.91 1.57C19.95 18.98 22 15.73 22 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-black tracking-widest gold-gradient-text gold-glow uppercase -mt-1">
            SURESHOT
          </h2>

          <p className="font-cinzel italic text-xs tracking-[0.25em] text-[#d6c7a1] pt-1">
            INDIA'S ELITE COLOUR PREDICTION
          </p>
        </div>
      </div>

      {/* Middle Section: User Profile Photo with Dotted Gold Rings and Username */}
      <div className="w-full flex flex-col items-center justify-center my-auto z-10 py-6">
        {/* Profile Picture with Double Ring (Outer Dotted Gold, Inner Solid Gold) */}
        <div className="relative group">
          {/* Ambient golden aura */}
          <div className="absolute -inset-2 rounded-full bg-amber-500/20 blur-lg animate-pulse"></div>

          {/* Outer Dotted Gold Ring */}
          <div className="relative p-1.5 rounded-full border-2 border-dashed border-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.35)]">
            {/* Inner Solid Gold Ring */}
            <div className="p-1 rounded-full border-2 border-[#f7c844] bg-[#16130b]">
              <img
                id="user-dp-preview"
                src={photoUrl}
                alt="Profile Avatar"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-inner bg-[#1f1b13]"
                onError={(e) => {
                  // Fallback to generated Guts image if user photo URL fails to load
                  (e.target as HTMLImageElement).src = '/guts_avatar.jpg';
                }}
              />
            </div>
          </div>
        </div>

        {/* User Name matching exact format from image 2 */}
        <div className="mt-5 text-center space-y-1">
          <h3 
            id="user-display-name"
            className="font-rajdhani font-bold text-lg sm:text-xl text-white tracking-wider flex items-center justify-center gap-1.5"
          >
            {displayName}
          </h3>
          <p 
            id="user-handle-name"
            className="text-xs sm:text-sm text-[#b8ab8d] font-rajdhani font-semibold tracking-wider"
          >
            {usernameHandle}
          </p>
        </div>
      </div>

      {/* Bottom Section: INITIALIZING SYSTEM Progress Bar matching Screenshot 2 */}
      <div className="w-full max-w-xs sm:max-w-sm z-10 space-y-2 mb-4">
        <div className="flex items-center justify-between text-[11px] tracking-[0.2em] text-[#b8ab8d] font-outfit uppercase">
          <span>INITIALIZING SYSTEM</span>
          <span className="font-bold text-amber-300">{progress}%</span>
        </div>

        {/* Golden Loading Progress Bar */}
        <div className="w-full h-1.5 bg-[#252014] rounded-full overflow-hidden border border-[#443820]">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] via-[#f7d057] to-[#ffd700] rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_#f59e0b]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onComplete}
            className="text-[10px] tracking-wider text-amber-400/60 hover:text-amber-300 underline uppercase"
          >
            Skip loading &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
