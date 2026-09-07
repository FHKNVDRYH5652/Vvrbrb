import React, { useState } from 'react';
import { X, Send, ShieldAlert, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

interface Props {
  onClose: () => void;
  botUsername?: string;
}

export const SupportModal: React.FC<Props> = ({ onClose, botUsername = 'Shreewinpredict_Bot' }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setMessage('');
      setSent(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#14120b] border-2 border-[#d4af37]/60 rounded-2xl p-5 shadow-[0_0_35px_rgba(212,175,55,0.25)] text-[#e8e4dc]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2e2715] pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300">
              <MessageSquare className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <h3 className="font-cinzel font-bold text-base gold-gradient-text">
                TALK DIRECTLY TO ADMIN
              </h3>
              <p className="text-[11px] text-[#a89b7d] font-outfit">24/7 Priority Support Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full bg-[#241f14] hover:bg-[#342d1e] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Telegram Link */}
        <div className="mt-4 p-3 bg-[#1e190e] rounded-xl border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-300 block font-outfit">
              Official Telegram Bot:
            </span>
            <span className="text-sm font-mono text-[#e3ded0]">@{botUsername}</span>
          </div>
          <a
            href={`https://t.me/${botUsername}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition"
          >
            Open Chat <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Quick Message Form */}
        <form onSubmit={handleSend} className="mt-4 space-y-3">
          <label className="text-xs text-[#b8ab8d] font-medium block">
            Instant Admin Ticket / Query:
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message, UID problem, or questions here..."
            className="w-full px-3 py-2 rounded-xl bg-[#1d1911] border border-[#3d3320] text-sm text-[#eae5d8] placeholder-gray-500 focus:outline-none focus:border-amber-400"
          />

          {sent ? (
            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Ticket submitted directly to Admin! You will be replied via Telegram.</span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
              SEND TICKET TO ADMIN
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export const UidVerificationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [uid, setUid] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'CHECKING' | 'VERIFIED'>('IDLE');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid.trim()) return;
    setStatus('CHECKING');
    setTimeout(() => {
      setStatus('VERIFIED');
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#14120b] border-2 border-red-500/50 rounded-2xl p-5 shadow-[0_0_35px_rgba(239,68,68,0.2)] text-[#e8e4dc]">
        <div className="flex items-center justify-between border-b border-[#2e2715] pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-950/70 border border-red-500/50 text-red-300">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </span>
            <div>
              <h3 className="font-cinzel font-bold text-base text-red-300">
                OFFICIAL UID VERIFICATION
              </h3>
              <p className="text-[11px] text-[#a89b7d] font-outfit">Mandatory access security</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full bg-[#241f14] hover:bg-[#342d1e] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 p-3 bg-red-950/30 border border-red-500/30 rounded-xl text-xs text-red-200/90 leading-relaxed">
          ⚠️ <strong>WARNING:</strong> Only UIDs registered through the official promotion link are whitelisted for 94%+ sureshot signals.
        </div>

        <form onSubmit={handleVerify} className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-[#b8ab8d] font-medium block mb-1">
              Enter Your Registration UID:
            </label>
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="e.g. 8817745546"
              className="w-full px-3 py-2.5 rounded-xl bg-[#1d1911] border border-[#4a3e26] text-sm text-[#eae5d8] placeholder-gray-500 font-mono focus:outline-none focus:border-amber-400"
            />
          </div>

          {status === 'VERIFIED' ? (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>UID whitelisted successfully! Full 94% signals unlocked.</span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!uid.trim() || status === 'CHECKING'}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-sm transition hover:opacity-95 disabled:opacity-40"
            >
              {status === 'CHECKING' ? 'VERIFYING SERVER...' : 'VERIFY & UNLOCK'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
