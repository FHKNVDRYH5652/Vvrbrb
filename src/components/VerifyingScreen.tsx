import React, { useEffect, useState } from 'react';
import { Check, Loader2, X } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

interface Props {
  uid: string;
  onComplete: () => void;
}

export const VerifyingScreen: React.FC<Props> = ({ uid, onComplete }) => {
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    // Step 1: Connecting to server (0 - 0.9s)
    sounds.playRadarPing();
    const t1 = setTimeout(() => {
      setStep(2);
      sounds.playRadarPing();
    }, 900);

    // Step 2: Validating UID & device (0.9s - 1.9s)
    const t2 = setTimeout(() => {
      setStep(3);
      sounds.playRadarPing();
    }, 1900);

    // Step 3: Checking authorization (1.9s - 2.8s) -> Not verified / Failed
    const t3 = setTimeout(() => {
      setStep(4); // Fails
      sounds.playErrorSound();
    }, 2800);

    // Finish after 3.2s
    const tEnd = setTimeout(() => {
      onComplete();
    }, 3300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#0a0805] text-[#e8e4dc] flex flex-col items-center justify-center p-5 select-none relative overflow-hidden animate-fadeIn">
      {/* Background ambient gold pulse */}
      <div className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-sm flex flex-col items-center space-y-7 relative z-10">
        {/* Animated Concentric Radar Graphic matching Screenshot 2 */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-amber-500/30 animate-ping opacity-30"></div>
          
          {/* Outer dashed spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/50 animate-spin" style={{ animationDuration: '8s' }}></div>
          
          {/* Middle solid ring */}
          <div className="absolute inset-3 rounded-full border border-amber-500/40"></div>
          
          {/* Middle dashed counter-spinning ring */}
          <div className="absolute inset-5 rounded-full border border-dashed border-amber-300/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '6s' }}></div>

          {/* Inner ring */}
          <div className="absolute inset-8 rounded-full border border-amber-400/60 bg-amber-950/20"></div>

          {/* Center glowing golden core */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.9)] animate-pulse"></div>
        </div>

        {/* Heading text */}
        <div className="text-center space-y-1">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-black gold-gradient-text gold-glow tracking-wider">
            VERIFYING UID
          </h2>
          <p className="text-xs tracking-widest text-[#a8997a] font-outfit uppercase">
            PLEASE WAIT · SECURE CONNECTION
          </p>
          <p className="text-[11px] font-mono text-amber-300/80 pt-1">
            UID: <span className="font-bold text-amber-200">{uid}</span>
          </p>
        </div>

        {/* 3 Step Progress Checklist matching Screenshot 2 */}
        <div className="w-full space-y-3 pt-2">
          {/* Step 1: Connecting to server... */}
          <div className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
            step > 1 
              ? 'bg-[#14120a]/90 border-emerald-500/40 text-emerald-300' 
              : 'bg-[#18140c] border-amber-500/40 text-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
          }`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              step > 1 
                ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-400' 
                : 'bg-amber-950/60 border border-amber-500/50 text-amber-300'
            }`}>
              {step > 1 ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
              )}
            </div>
            <span className="text-xs font-outfit font-medium">
              Connecting to server...
            </span>
          </div>

          {/* Step 2: Validating UID & device */}
          <div className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
            step > 2 
              ? 'bg-[#14120a]/90 border-emerald-500/40 text-emerald-300' 
              : step === 2 
                ? 'bg-[#18140c] border-amber-500/50 text-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'bg-[#100e08]/60 border-amber-500/15 text-[#6c614b]'
          }`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              step > 2 
                ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-400' 
                : step === 2 
                  ? 'bg-amber-950/80 border border-amber-500/60 text-amber-300'
                  : 'bg-[#14110b] border border-amber-500/20 text-[#6c614b]'
            }`}>
              {step > 2 ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : step === 2 ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <span className="text-xs font-bold font-mono">2</span>
              )}
            </div>
            <span className="text-xs font-outfit font-medium">
              Validating UID & device
            </span>
          </div>

          {/* Step 3: Checking authorization... */}
          <div className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
            step >= 4 
              ? 'bg-[#1a1010]/90 border-red-500/40 text-red-300' 
              : step === 3 
                ? 'bg-[#18140c] border-amber-500/50 text-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'bg-[#100e08]/60 border-amber-500/15 text-[#6c614b]'
          }`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              step >= 4 
                ? 'bg-red-950/60 border border-red-500/50 text-red-400' 
                : step === 3 
                  ? 'bg-amber-950/80 border border-amber-500/60 text-amber-300'
                  : 'bg-[#14110b] border border-amber-500/20 text-[#6c614b]'
            }`}>
              {step >= 4 ? (
                <X className="w-4 h-4 stroke-[3]" />
              ) : step === 3 ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <span className="text-xs font-bold font-mono">3</span>
              )}
            </div>
            <span className="text-xs font-outfit font-medium">
              {step >= 4 ? 'Authorization rejected' : 'Checking authorization...'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
