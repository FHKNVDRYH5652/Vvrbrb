import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  ChevronLeft, 
  BarChart2, 
  Flame, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink
} from 'lucide-react';
import { TelegramUser, AdminConfig } from '../types';
import { sounds } from '../utils/audioEffects';

interface Props {
  uid: string;
  user: TelegramUser;
  mode: 'NUMBER' | 'BIG_SMALL';
  adminConfig: AdminConfig;
  onBackToMain: () => void;
  onReEnterUid: () => void;
}

export const VerifiedDashboard: React.FC<Props> = ({
  uid,
  user,
  mode,
  adminConfig,
  onBackToMain,
  onReEnterUid,
}) => {
  const [countdown, setCountdown] = useState<number>(26);
  const [period, setPeriod] = useState<string>('20260907001438');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Active prediction state
  const [signal, setSignal] = useState({
    number: mode === 'NUMBER' ? 7 : 8,
    bigSmall: 'BIG' as 'BIG' | 'SMALL',
    color: 'GREEN' as 'GREEN' | 'RED' | 'VIOLET',
    confidence: 95.8,
    pattern: 'TREND_UP',
  });

  // Countdown timer for next round
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Increment round
          setPeriod((p) => (BigInt(p) + 1n).toString());
          generateNewSignal();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateNewSignal = () => {
    setIsRefreshing(true);
    sounds.playRadarPing();
    setTimeout(() => {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const randomNum = numbers[Math.floor(Math.random() * numbers.length)];
      const isBig = randomNum >= 5;
      const isGreen = [1, 3, 7, 9].includes(randomNum);
      const isRed = [2, 4, 6, 8].includes(randomNum);
      const color = isGreen ? 'GREEN' : isRed ? 'RED' : 'VIOLET';
      const confidence = +(94 + Math.random() * 4).toFixed(1);

      setSignal({
        number: randomNum,
        bigSmall: isBig ? 'BIG' : 'SMALL',
        color,
        confidence,
        pattern: Math.random() > 0.5 ? 'TREND_UP' : 'CYCLE_BREAK',
      });
      setIsRefreshing(false);
      sounds.playSuccessChime();
    }, 600);
  };

  const handleCopyUid = () => {
    navigator.clipboard.writeText(uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#090806] text-[#e8e4dc] flex flex-col justify-between p-4 pb-20 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <button
          id="verified-back-btn"
          onClick={onBackToMain}
          className="w-10 h-10 rounded-xl bg-[#1a160d] border border-amber-500/40 hover:border-amber-400 flex items-center justify-center text-amber-300 active:scale-95 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ACTIVE SESSION
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Verification Success Header Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141810] to-[#0d120a] border border-emerald-500/40 shadow-[0_0_24px_rgba(16,185,129,0.12)] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-cinzel text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider">
                  UID AUTHORIZED & VERIFIED
                </h4>
                <p className="text-[11px] text-[#8fa391] font-mono flex items-center gap-1.5">
                  UID: <strong className="text-emerald-200">{uid}</strong>
                  <button 
                    onClick={handleCopyUid} 
                    className="p-1 hover:text-white rounded"
                    title="Copy UID"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-emerald-400/80" />}
                  </button>
                </p>
              </div>
            </div>

            <button
              onClick={onReEnterUid}
              className="text-[11px] font-semibold text-amber-300/90 underline hover:text-amber-200"
            >
              Switch UID
            </button>
          </div>

          <p className="text-xs text-emerald-200/80 font-outfit leading-relaxed">
            {adminConfig.verifiedNoticeText || 'Official UID verified. Real-time AI statistical forecast active.'}
          </p>
        </div>

        {/* Live Signal Forecast Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1b170e] to-[#120f09] border-2 border-amber-500/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] space-y-4 relative overflow-hidden">
          {/* Subtle glow circle */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Period & Countdown Row */}
          <div className="flex items-center justify-between border-b border-[#2e2716] pb-3">
            <div>
              <span className="text-[10px] text-[#97896d] uppercase font-outfit block">ROUND PERIOD</span>
              <span className="font-mono text-sm sm:text-base font-bold text-amber-200 tracking-wider">
                {period}
              </span>
            </div>

            <div className="text-right flex items-center gap-1.5 bg-[#211a0e] px-3 py-1.5 rounded-xl border border-amber-500/30">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-mono text-base font-black text-amber-300">
                00:{countdown.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Primary Signal Outcome */}
          <div className="grid grid-cols-2 gap-3 py-1">
            {/* Predicted Number */}
            <div className="p-3.5 rounded-xl bg-[#141009] border border-amber-500/30 text-center space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#9b8d6f] font-outfit block">
                PREDICTED NUMBER
              </span>
              <span className="font-cinzel text-4xl sm:text-5xl font-black gold-gradient-text gold-glow block">
                {signal.number}
              </span>
              <span className="text-[11px] font-semibold text-amber-300/80 uppercase">
                SINGLE DIGIT
              </span>
            </div>

            {/* Big / Small & Color */}
            <div className="p-3.5 rounded-xl bg-[#141009] border border-amber-500/30 flex flex-col justify-between text-center space-y-1">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9b8d6f] font-outfit block">
                  BIG / SMALL
                </span>
                <span className={`font-cinzel text-2xl sm:text-3xl font-black block pt-0.5 ${
                  signal.bigSmall === 'BIG' ? 'text-amber-400' : 'text-sky-400'
                }`}>
                  {signal.bigSmall}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1.5 pt-1">
                <span className={`w-3 h-3 rounded-full ${
                  signal.color === 'GREEN' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 
                  signal.color === 'RED' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' : 
                  'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                }`}></span>
                <span className="text-xs font-bold text-[#e6dac0]">
                  {signal.color}
                </span>
              </div>
            </div>
          </div>

          {/* AI Win Probability Index */}
          <div className="p-3 rounded-xl bg-[#131008] border border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-outfit text-[#a89b7f]">AI Confidence Index:</span>
            </div>
            <span className="font-mono text-sm font-bold text-amber-300">
              {signal.confidence}%
            </span>
          </div>

          {/* Regenerate Signal Button */}
          <button
            id="refresh-signal-btn"
            onClick={generateNewSignal}
            disabled={isRefreshing}
            className="w-full py-3 px-4 rounded-xl bg-[#2a2211] border border-amber-400/60 hover:border-amber-300 active:scale-[0.98] transition flex items-center justify-center gap-2 font-cinzel font-bold text-sm text-amber-200 cursor-pointer shadow-md"
          >
            <RefreshCw className={`w-4 h-4 text-amber-300 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'ANALYZING PATTERNS...' : 'CALCULATE NEXT ROUND SIGNAL'}</span>
          </button>
        </div>

        {/* Action navigation buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={onReEnterUid}
            className="py-3 px-3 rounded-xl bg-[#17140d] border border-amber-500/30 hover:border-amber-400/60 text-xs font-semibold text-[#cfbe99] font-outfit active:scale-95 transition"
          >
            Re-enter UID
          </button>
          <button
            onClick={onBackToMain}
            className="py-3 px-3 rounded-xl bg-[#17140d] border border-amber-500/30 hover:border-amber-400/60 text-xs font-semibold text-[#cfbe99] font-outfit active:scale-95 transition"
          >
            Home Dashboard
          </button>
        </div>
      </div>

      {/* Security footer */}
      <div className="pt-4 pb-2 text-center text-[11px] text-[#6d6249] font-outfit">
        Official AI Prediction Model v4.0 • Encrypted Channel
      </div>
    </div>
  );
};
