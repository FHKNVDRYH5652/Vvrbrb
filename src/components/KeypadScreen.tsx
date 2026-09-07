import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ExternalLink, 
  AlertTriangle, 
  Zap, 
  ShieldCheck, 
  Delete, 
  Check, 
  User, 
  FileText
} from 'lucide-react';
import { TelegramUser, AdminConfig } from '../types';
import { sounds } from '../utils/audioEffects';

interface Props {
  user: TelegramUser;
  mode: 'NUMBER' | 'BIG_SMALL';
  adminConfig: AdminConfig;
  onBack: () => void;
  onSubmitUid: (uid: string) => void;
}

export const KeypadScreen: React.FC<Props> = ({
  user,
  mode,
  adminConfig,
  onBack,
  onSubmitUid,
}) => {
  const [uid, setUid] = useState<string>('');
  const [errorHint, setErrorHint] = useState<string | null>(null);

  const handleDigitPress = (digit: string) => {
    if (uid.length >= 12) return;
    sounds.playKeypadClick();
    setErrorHint(null);
    setUid((prev) => prev + digit);
  };

  const handleDelete = () => {
    sounds.playDeleteClick();
    setErrorHint(null);
    setUid((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    sounds.playDeleteClick();
    setUid('');
    setErrorHint(null);
  };

  const handleSubmit = () => {
    if (!uid || uid.trim().length === 0) {
      setErrorHint('Please enter your numeric UID');
      sounds.playDeleteClick();
      return;
    }
    sounds.playSubmitChime();
    onSubmitUid(uid.trim());
  };

  const handleOpenRegister = () => {
    if (adminConfig.redButtonUrl) {
      window.open(adminConfig.redButtonUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#090806] text-[#e8e4dc] flex flex-col justify-between p-4 pb-20 select-none animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <button
          id="keypad-back-btn"
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-[#1a160d] border border-amber-500/40 hover:border-amber-400 flex items-center justify-center text-amber-300 active:scale-95 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="px-3.5 py-1.5 rounded-full bg-[#18140c] border border-amber-500/40 text-[11px] sm:text-xs font-semibold text-amber-300/90 flex items-center gap-1.5 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          {mode === 'NUMBER' ? '• NUMBER SURESHOT' : '• BIG / SMALL FORECAST'}
        </div>
      </div>

      {/* Main Instructions & Action Card */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#18140c] to-[#0f0d08] border border-amber-500/30 shadow-[0_0_24px_rgba(212,175,55,0.08)] space-y-3.5">
          {/* User Welcome Row */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-xs font-bold text-amber-300/80 font-cinzel">HEY</span>
              <h3 className="font-cinzel text-xs sm:text-sm font-bold text-[#f5ebd2] truncate">
                {user.first_name || '︻╦╤─ #GUTS ─╤╦︻'}
              </h3>
              <User className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
            </div>
          </div>

          {/* 3 Step Instructions (Admin Configurable) */}
          <div className="space-y-1.5 text-xs text-[#a99c7f] font-outfit pl-1">
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span>{adminConfig.instructionStep1 || 'Register via official link below'}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span>{adminConfig.instructionStep2 || 'Complete registration process'}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <span>{adminConfig.instructionStep3 || 'Enter your UID using keypad'}</span>
            </div>
          </div>

          {/* High-Impact Glossy Red Action Button */}
          <button
            id="register-official-red-btn"
            onClick={handleOpenRegister}
            className="w-full relative py-3.5 px-4 rounded-xl font-cinzel font-bold text-sm sm:text-base text-white tracking-wider flex items-center justify-center gap-2 overflow-hidden shadow-[0_4px_20px_rgba(220,38,38,0.45)] active:scale-[0.98] transition cursor-pointer"
            style={{
              background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
              border: '1px solid rgba(254, 202, 202, 0.4)',
            }}
          >
            {/* Gloss shine reflection line */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none"></div>
            <ExternalLink className="w-4 h-4 text-white relative z-10" />
            <span className="relative z-10 drop-shadow-sm">
              {adminConfig.redButtonText || 'REGISTER ON OFFICIAL SITE'}
            </span>
          </button>

          {/* Warning / Notice Banner */}
          {adminConfig.alertBannerText && (
            <div className="p-2.5 rounded-xl bg-[#230d0d] border border-rose-500/40 flex items-center gap-2 text-[11px] font-medium text-rose-300/90 font-outfit">
              <Zap className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="leading-snug">
                {adminConfig.alertBannerText}
              </span>
            </div>
          )}
        </div>

        {/* UID Display Field */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-outfit font-semibold uppercase tracking-wider text-[#9f9172] px-1">
            <span>YOUR UID</span>
            {errorHint && (
              <span className="text-rose-400 text-xs font-normal normal-case animate-shake">
                {errorHint}
              </span>
            )}
          </div>

          <div 
            onClick={handleClear}
            className="p-3 rounded-xl bg-[#12100a] border border-amber-500/30 flex items-center justify-between shadow-inner cursor-pointer"
            title="Click to clear"
          >
            {/* Dots representation or digits */}
            <div className="flex items-center gap-1.5 font-mono text-base tracking-widest text-amber-300">
              {uid.length === 0 ? (
                <span className="text-[#5f543e] tracking-widest text-lg">. . . . . . . .</span>
              ) : (
                uid.split('').map((char, index) => (
                  <span key={index} className="inline-block text-amber-300 font-bold">
                    {char}
                  </span>
                ))
              )}
            </div>

            <span className="text-xs font-mono font-bold text-[#8d8065]">
              {uid.length}
            </span>
          </div>
        </div>

        {/* Custom Numeric Keypad (1-9, ⌫, 0, ✓) */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              id={`keypad-digit-${digit}`}
              onClick={() => handleDigitPress(digit)}
              className="h-13 sm:h-14 rounded-xl bg-[#15120a] border border-amber-500/25 hover:border-amber-400/60 active:bg-[#221c0f] active:scale-[0.97] transition flex items-center justify-center font-cinzel text-xl sm:text-2xl font-bold text-[#f5ebd2] shadow-sm cursor-pointer"
            >
              {digit}
            </button>
          ))}

          {/* Backspace Button: Crimson / Dark Red */}
          <button
            id="keypad-backspace"
            onClick={handleDelete}
            className="h-13 sm:h-14 rounded-xl bg-[#321212] border border-rose-600/50 hover:border-rose-500 active:bg-[#451818] active:scale-[0.97] transition flex items-center justify-center text-rose-300 shadow-sm cursor-pointer"
            title="Delete last digit"
          >
            <Delete className="w-6 h-6 text-rose-300" />
          </button>

          {/* Zero Digit */}
          <button
            id="keypad-digit-0"
            onClick={() => handleDigitPress('0')}
            className="h-13 sm:h-14 rounded-xl bg-[#15120a] border border-amber-500/25 hover:border-amber-400/60 active:bg-[#221c0f] active:scale-[0.97] transition flex items-center justify-center font-cinzel text-xl sm:text-2xl font-bold text-[#f5ebd2] shadow-sm cursor-pointer"
          >
            0
          </button>

          {/* Submit / Confirm Button: Olive / Gold */}
          <button
            id="keypad-submit"
            onClick={handleSubmit}
            className="h-13 sm:h-14 rounded-xl bg-[#4d3f18] border border-amber-400/70 hover:border-amber-300 active:bg-[#5e4e1e] active:scale-[0.97] transition flex items-center justify-center text-amber-200 shadow-md cursor-pointer"
            title="Submit and verify"
          >
            <Check className="w-7 h-7 text-amber-300 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Footer Security Notice */}
      <div className="pt-3 pb-2 flex items-center justify-center gap-1.5 text-[11px] text-[#7d7156] font-outfit uppercase tracking-wider">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400/70" />
        <span>SECURE KEYPAD — NO CLIPBOARD ACCESS</span>
      </div>
    </div>
  );
};
