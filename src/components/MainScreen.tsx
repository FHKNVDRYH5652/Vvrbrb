import React, { useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Target, 
  BarChart3, 
  MessageSquare, 
  ChevronRight, 
  AlertTriangle, 
  ShieldCheck,
  Zap,
  User as UserIcon
} from 'lucide-react';
import { TelegramUser } from '../types';
import { PredictionModal } from './PredictionModal';
import { SupportModal, UidVerificationModal } from './SupportModal';

interface Props {
  user: TelegramUser;
  botUsername?: string;
  onOpenKeypad: (mode: 'NUMBER' | 'BIG_SMALL') => void;
  onOpenAdmin: () => void;
}

export const MainScreen: React.FC<Props> = ({ 
  user, 
  botUsername = 'Shreewinpredict_Bot',
  onOpenKeypad,
  onOpenAdmin,
}) => {
  const [activeModal, setActiveModal] = useState<'NONE' | 'NUMBER' | 'BIG_SMALL' | 'SUPPORT' | 'UID'>('NONE');

  // Dynamic user data matching Telegram or fallback
  const displayName = user.first_name || '︻╦╤─ #GUTS ─╤╦︻';

  return (
    <div className="min-h-screen pb-24 dark-luxury-bg text-[#e8e4dc] select-none">
      <div className="max-w-md mx-auto px-4 pt-3 space-y-4">
        
        {/* Top Header Row matching Image 3 */}
        <div className="flex items-center justify-between pt-1">
          {/* Left: Hexagonal Crown Badge & SHREEWIN Branding */}
          <div className="flex items-center gap-2.5">
            {/* Hexagon/Polygon Crown Container */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#2d2514] to-[#17130a] border border-amber-500/60 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-amber-400 text-xs">╰</span>
                <span className="font-cinzel text-base font-extrabold tracking-wider gold-gradient-text gold-glow uppercase">
                  SHREEWIN
                </span>
                <span className="text-amber-400 text-xs">╯</span>
              </div>
              <span className="text-[10px] tracking-[0.2em] text-[#bdae90] font-outfit uppercase -mt-0.5">
                SURESHOT • PREMIUM
              </span>
            </div>
          </div>

          {/* Right: LIVE status pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/40 bg-[#1e190e]/80 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]"></span>
            <span className="text-[11px] font-bold tracking-widest text-amber-300 font-outfit uppercase">
              LIVE
            </span>
          </div>
        </div>

        {/* Welcome Row with glowing custom Telegram username */}
        <div className="pt-2 space-y-1">
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] text-[#9c8e71] font-outfit uppercase block">
            WELCOME BACK
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="font-cinzel text-xl sm:text-2xl font-black gold-gradient-text gold-glow tracking-wide flex items-center gap-2">
              <span>HEY</span>
              <span className="truncate max-w-[240px] sm:max-w-[280px]">
                {displayName}
              </span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs border border-amber-500/40">
                <UserIcon className="w-3.5 h-3.5" />
              </span>
            </h2>
          </div>
        </div>

        {/* Glowing Marquee / Ticker Row */}
        <div className="py-1 px-2 rounded-lg bg-[#18140c]/90 border border-amber-500/20 overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-semibold text-amber-300/90 font-outfit tracking-wider">
            <div className="flex items-center gap-2">
              <span className="tracking-[0.2em] uppercase text-[#e5d4ab]">
                P L A Y   A N D   W I N   •   SHREEWIN
              </span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
              <span>94% WIN RATE • 12.4K+ MEMBERS</span>
            </div>
          </div>
        </div>

        {/* AI Prediction Bot Hero Card matching Image 3 */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1b170e] to-[#120f09] border border-amber-500/40 shadow-[0_0_20px_rgba(212,175,55,0.12)] space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-400 shrink-0">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 text-xs">╰</span>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-amber-300 tracking-wide uppercase">
                  SHREEWIN PREDICTION BOT
                </h3>
                <span className="text-amber-400 text-xs">╯</span>
              </div>
              <p className="text-xs text-[#a99c7f] leading-relaxed font-outfit">
                Elite AI-powered predictions with <span className="text-amber-300 font-semibold">94% accuracy</span>. Official UID verification required for access.
              </p>
            </div>
          </div>

          {/* Red Warning Banner matching Image 3 */}
          <button
            id="uid-warning-badge"
            type="button"
            onClick={() => setActiveModal('UID')}
            className="w-full text-left p-2.5 rounded-xl bg-[#2a1010]/80 border border-rose-500/40 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-rose-300 hover:bg-[#341414] transition"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-outfit uppercase tracking-wide truncate">
              ONLY UIDS FROM OFFICIAL REGISTRATION LINK ARE ACCEPTED
            </span>
          </button>
        </div>

        {/* 3 Stats Columns matching Image 3 */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Stat 1: 94% ACCURACY */}
          <div className="p-3 rounded-xl bg-[#18140c] border border-amber-500/30 text-center space-y-0.5 shadow-sm">
            <span className="font-cinzel text-xl sm:text-2xl font-black gold-gradient-text gold-glow block">
              94%
            </span>
            <span className="text-[10px] tracking-wider text-[#9b8d6f] font-outfit font-semibold uppercase block">
              ACCURACY
            </span>
          </div>

          {/* Stat 2: 12.4K MEMBERS */}
          <div className="p-3 rounded-xl bg-[#18140c] border border-amber-500/30 text-center space-y-0.5 shadow-sm">
            <span className="font-cinzel text-xl sm:text-2xl font-black gold-gradient-text gold-glow block">
              12.4K
            </span>
            <span className="text-[10px] tracking-wider text-[#9b8d6f] font-outfit font-semibold uppercase block">
              MEMBERS
            </span>
          </div>

          {/* Stat 3: 38✓ TODAY */}
          <div className="p-3 rounded-xl bg-[#18140c] border border-amber-500/30 text-center space-y-0.5 shadow-sm">
            <span className="font-cinzel text-xl sm:text-2xl font-black gold-gradient-text gold-glow block flex items-center justify-center gap-0.5">
              38<span className="text-emerald-400 font-bold text-lg">✓</span>
            </span>
            <span className="text-[10px] tracking-wider text-[#9b8d6f] font-outfit font-semibold uppercase block">
              TODAY
            </span>
          </div>
        </div>

        {/* Action Cards matching Image 3 */}
        <div className="space-y-3 pt-1">
          {/* Card 1: GET NUMBER SURESHOT */}
          <div
            id="btn-number-sureshot"
            onClick={() => onOpenKeypad('NUMBER')}
            className="group p-3.5 rounded-2xl bg-gradient-to-r from-[#1b170e] to-[#14110a] border border-amber-500/40 hover:border-amber-400/80 transition-all duration-200 cursor-pointer shadow-md flex items-center justify-between active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#282112] border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
                <Target className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-left">
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#f5ebd2] tracking-wide group-hover:text-amber-300 transition">
                  GET NUMBER SURESHOT
                </h4>
                <p className="text-xs text-[#a39474] font-outfit">
                  Pinpoint single-digit predictions
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#262013] border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:translate-x-0.5 transition">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: GET BIG / SMALL SURESHOT */}
          <div
            id="btn-big-small-sureshot"
            onClick={() => onOpenKeypad('BIG_SMALL')}
            className="group p-3.5 rounded-2xl bg-gradient-to-r from-[#20140d] to-[#140e09] border border-amber-600/40 hover:border-amber-500/80 transition-all duration-200 cursor-pointer shadow-md flex items-center justify-between active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#321d12] border border-amber-600/50 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
                <BarChart3 className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#f5ebd2] tracking-wide group-hover:text-amber-300 transition">
                  GET BIG / SMALL SURESHOT
                </h4>
                <p className="text-xs text-[#a39474] font-outfit">
                  Best big-small outcome forecast
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#2a1b12] border border-amber-600/40 flex items-center justify-center text-amber-300 group-hover:translate-x-0.5 transition">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: CONTACT SUPPORT */}
          <div
            id="btn-contact-support"
            onClick={() => setActiveModal('SUPPORT')}
            className="group p-3.5 rounded-2xl bg-gradient-to-r from-[#1b170e] to-[#14110a] border border-amber-500/35 hover:border-amber-400/80 transition-all duration-200 cursor-pointer shadow-md flex items-center justify-between active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#282112] border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
                <MessageSquare className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-left">
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#f5ebd2] tracking-wide group-hover:text-amber-300 transition">
                  CONTACT SUPPORT
                </h4>
                <p className="text-xs text-[#a39474] font-outfit">
                  Talk directly to admin
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#262013] border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:translate-x-0.5 transition">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Footer Security Badge matching Image 3 */}
        <div className="pt-2 pb-6 flex items-center justify-center gap-1.5 text-[11px] text-[#93866b] font-outfit">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span className="tracking-wide uppercase">
            ONLY OFFICIAL LINK REGISTERED UIDS ARE ACCEPTED
          </span>
        </div>

      </div>

      {/* Interactive Modals */}
      {activeModal === 'NUMBER' && (
        <PredictionModal type="NUMBER" onClose={() => setActiveModal('NONE')} />
      )}
      {activeModal === 'BIG_SMALL' && (
        <PredictionModal type="BIG_SMALL" onClose={() => setActiveModal('NONE')} />
      )}
      {activeModal === 'SUPPORT' && (
        <SupportModal onClose={() => setActiveModal('NONE')} botUsername={botUsername} />
      )}
      {activeModal === 'UID' && (
        <UidVerificationModal onClose={() => setActiveModal('NONE')} />
      )}
    </div>
  );
};
