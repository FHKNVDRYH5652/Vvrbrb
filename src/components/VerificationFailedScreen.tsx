import React, { useEffect } from 'react';
import { ChevronLeft, AlertTriangle, Info, RefreshCw, ExternalLink } from 'lucide-react';
import { AdminConfig } from '../types';
import { sounds } from '../utils/audioEffects';

interface Props {
  uid: string;
  adminConfig: AdminConfig;
  onReEnterUid: () => void;
  onGoHome: () => void;
}

export const VerificationFailedScreen: React.FC<Props> = ({
  uid,
  adminConfig,
  onReEnterUid,
  onGoHome,
}) => {
  useEffect(() => {
    sounds.playErrorSound();
  }, []);

  const handleRegisterClick = () => {
    sounds.playSubmitChime();
    const url = adminConfig.redButtonUrl || 'https://www.shreewin88.com/#/register?invitationCode=34272264275';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#080705] text-[#e8e4dc] flex flex-col justify-between p-4 pb-12 select-none animate-fadeIn relative overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Row matching the user screenshot */}
      <div className="relative z-10 flex items-center justify-between pt-1 pb-4">
        <button
          id="failed-back-btn"
          onClick={onReEnterUid}
          className="w-10 h-10 rounded-xl bg-[#17140e] border border-amber-500/30 hover:border-amber-400/60 flex items-center justify-center text-amber-300 active:scale-95 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Top Status Pill: VERIFICATION FAILED */}
        <div className="px-3.5 py-1 rounded-full bg-[#1b1010] border border-red-500/40 text-[11px] font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider shadow-[0_0_12px_rgba(239,68,68,0.15)]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          VERIFICATION FAILED
        </div>

        <div className="w-10"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 space-y-4 max-w-md mx-auto w-full">
        {/* Big Red Card matching the screenshot */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#240e0e] via-[#1c0c0c] to-[#120808] border border-red-500/40 shadow-[0_0_35px_rgba(239,68,68,0.22)] flex flex-col items-center text-center space-y-4 relative overflow-hidden">
          {/* Subtle red badge backdrop */}
          <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-red-500/60 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            <AlertTriangle className="w-8 h-8 text-red-400 stroke-[2.2]" />
          </div>

          {/* ACCESS DENIED Badge */}
          <div className="px-3 py-1 rounded-md bg-[#2d1212] border border-red-500/30 text-[10px] sm:text-[11px] font-mono tracking-widest text-red-300 uppercase">
            ACCESS DENIED
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="font-cinzel text-xl sm:text-2xl font-black text-red-100 tracking-wider">
              VERIFICATION FAILED
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#baa890] pt-0.5">
              UID: <span className="font-bold text-amber-200">{uid || '64646'}</span>
            </p>
          </div>
        </div>

        {/* Informational Warning Pill 1 */}
        <div className="p-3.5 rounded-xl bg-[#14100c] border border-amber-500/25 flex items-center gap-3 text-xs">
          <div className="w-6 h-6 rounded-full bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Info className="w-3.5 h-3.5" />
          </div>
          <p className="text-[#cfc3ad] leading-relaxed">
            <strong className="text-amber-300 font-semibold">BOT ACTIVATION REQUIRED</strong> — UID record not found in authorization database.
          </p>
        </div>

        {/* Informational Warning Pill 2 */}
        <div className="p-3.5 rounded-xl bg-[#14100c] border border-amber-500/25 flex items-start gap-3 text-xs">
          <div className="w-6 h-6 rounded-full bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <p className="text-[#b5a68d] leading-relaxed">
            Only UIDs registered through the <strong className="text-amber-200 font-semibold">OFFICIAL REGISTRATION LINK</strong> are accepted by this system.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* REGISTER OFFICIAL Gold Button */}
          <button
            id="register-official-failed-btn"
            onClick={handleRegisterClick}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f1d268] to-[#aa8010] text-[#1a1406] font-cinzel font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>REGISTER OFFICIAL</span>
            <ExternalLink className="w-4 h-4 text-[#1a1406]" />
          </button>

          {/* RE-ENTER UID & HOME Dual Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="re-enter-uid-btn"
              onClick={onReEnterUid}
              className="py-3 px-3 rounded-xl bg-[#16130d] border border-amber-500/35 hover:border-amber-400/60 text-[#dfd4be] font-cinzel font-bold text-xs uppercase tracking-wider active:scale-95 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
              <span>RE-ENTER UID</span>
            </button>

            <button
              id="go-home-btn"
              onClick={onGoHome}
              className="py-3 px-3 rounded-xl bg-[#16130d] border border-amber-500/35 hover:border-amber-400/60 text-[#dfd4be] font-cinzel font-bold text-xs uppercase tracking-wider active:scale-95 transition cursor-pointer flex items-center justify-center"
            >
              <span>HOME</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Secure Disclaimer */}
      <div className="relative z-10 pt-6 text-center text-[11px] text-[#6d624a] font-mono">
        SECURE UID VERIFICATION GATEWAY • CODE 403-NOT-FOUND
      </div>
    </div>
  );
};
