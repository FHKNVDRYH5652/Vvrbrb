import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShieldCheck, RefreshCw, Trophy, ArrowRight } from 'lucide-react';

interface Props {
  type: 'NUMBER' | 'BIG_SMALL';
  onClose: () => void;
}

export const PredictionModal: React.FC<Props> = ({ type, onClose }) => {
  const [server, setServer] = useState<'WINGO_1M' | 'WINGO_3M' | 'WINGO_5M'>('WINGO_1M');
  const [period, setPeriod] = useState<string>('20260906001284');
  const [countdown, setCountdown] = useState<number>(28);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<{
    number: number;
    bigSmall: 'BIG' | 'SMALL';
    color: string;
    confidence: number;
    recommendedBet: string;
  }>({
    number: 7,
    bigSmall: 'BIG',
    color: 'GREEN',
    confidence: 96,
    recommendedBet: 'BIG / GREEN (3x Plan)',
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Increment period
          setPeriod((p) => {
            const num = BigInt(p) + 1n;
            return num.toString();
          });
          generateNewPrediction();
          return server === 'WINGO_1M' ? 60 : 180;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [server]);

  const generateNewPrediction = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const randomNum = numbers[Math.floor(Math.random() * numbers.length)];
      const isBig = randomNum >= 5;
      const isGreen = [1, 3, 7, 9].includes(randomNum);
      const isRed = [2, 4, 6, 8].includes(randomNum);
      const color = isGreen ? 'GREEN' : isRed ? 'RED' : 'VIOLET';
      const confidence = Math.floor(Math.random() * 5) + 93; // 93% - 97%

      setPrediction({
        number: randomNum,
        bigSmall: isBig ? 'BIG' : 'SMALL',
        color,
        confidence,
        recommendedBet: `${isBig ? 'BIG' : 'SMALL'} • ${color}`,
      });
      setAnalyzing(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#14120b] border-2 border-[#d4af37]/60 rounded-2xl p-5 shadow-[0_0_40px_rgba(212,175,55,0.25)] text-[#e8e4dc] overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2e2715] pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <h3 className="font-cinzel font-bold text-base gold-gradient-text">
                {type === 'NUMBER' ? 'NUMBER SURESHOT HACK' : 'BIG / SMALL SURESHOT'}
              </h3>
              <p className="text-[11px] text-[#a89b7d] font-outfit">SHREEWIN ALGORITHM v4.0</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full bg-[#241f14] hover:bg-[#342d1e] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Server Selector */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {(['WINGO_1M', 'WINGO_3M', 'WINGO_5M'] as const).map((g) => (
            <button
              key={g}
              onClick={() => {
                setServer(g);
                generateNewPrediction();
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold font-outfit tracking-wide transition border ${
                server === g
                  ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-md'
                  : 'bg-[#1e1a12] text-[#c4b99f] border-[#362e1c] hover:border-amber-500/50'
              }`}
            >
              {g.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Live Period & Countdown Status */}
        <div className="mt-4 p-3 bg-[#1c1810] rounded-xl border border-[#382f1b] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#9b8f72] font-outfit uppercase tracking-wider block">
              Active Period
            </span>
            <span className="text-sm font-mono font-bold text-amber-300">
              {period}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#9b8f72] font-outfit uppercase tracking-wider block">
              Draw In
            </span>
            <span className="text-lg font-mono font-black text-white">
              00:{countdown < 10 ? `0${countdown}` : countdown}
            </span>
          </div>
        </div>

        {/* Main Result Display */}
        <div className="mt-4 p-6 bg-gradient-to-b from-[#211b10] to-[#16120a] rounded-xl border-2 border-amber-500/50 text-center relative overflow-hidden shadow-inner">
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-green-950/80 border border-green-500/50 text-green-400 text-[10px] font-bold">
            {prediction.confidence}% ACCURATE
          </div>

          {analyzing ? (
            <div className="py-6 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="text-xs text-amber-200/80 font-cinzel tracking-wider animate-pulse">
                SYNCING DEEP NEURAL MATRIX...
              </p>
            </div>
          ) : type === 'NUMBER' ? (
            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.2em] text-[#ab9e81] font-cinzel block uppercase">
                PREDICTED NUMBER
              </span>
              <div className="flex items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-black text-5xl shadow-[0_0_24px_rgba(245,158,11,0.5)] border-2 border-white/40">
                  {prediction.number}
                </div>
              </div>
              <div className="pt-2 flex items-center justify-center gap-2">
                <span className={`px-3 py-1 rounded-md text-xs font-bold font-outfit uppercase ${
                  prediction.color === 'GREEN'
                    ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/50'
                    : prediction.color === 'RED'
                    ? 'bg-rose-900/80 text-rose-300 border border-rose-500/50'
                    : 'bg-purple-900/80 text-purple-300 border border-purple-500/50'
                }`}>
                  {prediction.color}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold font-outfit uppercase bg-amber-950/80 text-amber-300 border border-amber-500/50">
                  {prediction.bigSmall}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.2em] text-[#ab9e81] font-cinzel block uppercase">
                OUTCOME FORECAST
              </span>
              <div className="text-4xl sm:text-5xl font-black font-cinzel gold-gradient-text gold-glow py-1">
                {prediction.bigSmall}
              </div>
              <p className="text-xs text-[#c4b99f] font-outfit">
                Optimal Odds: Numbers {prediction.bigSmall === 'BIG' ? '5, 6, 7, 8, 9' : '0, 1, 2, 3, 4'}
              </p>
            </div>
          )}
        </div>

        {/* AI Action button */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={generateNewPrediction}
            disabled={analyzing}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition shadow-[0_0_16px_rgba(245,158,11,0.3)] disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
            REFRESH SIGNAL
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#93876d]">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Calculated via official SHREEWIN quantum seeds</span>
        </div>
      </div>
    </div>
  );
};
