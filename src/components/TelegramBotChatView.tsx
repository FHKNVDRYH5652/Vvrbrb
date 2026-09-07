import React, { useState } from 'react';
import { 
  Send, 
  ExternalLink, 
  Users, 
  Share2, 
  Bot, 
  Sparkles, 
  CheckCircle,
  Copy,
  Info
} from 'lucide-react';
import { TelegramUser } from '../types';

interface Props {
  onOpenApp: () => void;
  botUsername?: string;
  user: TelegramUser;
  onUpdateUser: (updated: Partial<TelegramUser>) => void;
  onOpenAdmin: () => void;
}

export const TelegramBotChatView: React.FC<Props> = ({
  onOpenApp,
  botUsername = 'Shreewinpredict_Bot',
  user,
  onUpdateUser,
  onOpenAdmin,
}) => {
  const [copied, setCopied] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [commandInput, setCommandInput] = useState('');

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (cmd === '/admin' || cmd === 'admin') {
      onOpenAdmin();
      setCommandInput('');
    } else if (cmd === '/start' || cmd === 'start') {
      onOpenApp();
      setCommandInput('');
    } else {
      setCommandInput('');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://t.me/${botUsername}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#17212b] text-white flex flex-col items-center justify-start p-4 pb-20 select-none font-sans">
      <div className="w-full max-w-md space-y-4 pt-2">

        {/* Telegram Chat Simulation Header */}
        <div className="p-4 rounded-2xl bg-[#232e3c] border border-[#2e3c4e] shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 block font-mono">Username / Bot</span>
              <span className="text-base font-bold text-white flex items-center gap-1.5">
                @{botUsername}
              </span>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-white font-mono">
                {user.id || '8817745546'}
              </span>
              <span className="text-xs text-gray-400 block">Numeric Id</span>
            </div>
          </div>

          {/* Large Blue "Open App" Button matching Image 1 */}
          <button
            id="tma-launch-open-app"
            type="button"
            onClick={onOpenApp}
            className="w-full py-3.5 px-4 rounded-xl bg-[#2ea6ff] hover:bg-[#2396ee] active:bg-[#1a85d8] text-white font-bold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-white fill-white" />
            Open App
          </button>

          <p className="text-center text-[12px] text-gray-400 leading-normal px-2">
            By launching this mini app, you agree to the{' '}
            <span className="text-[#2ea6ff] hover:underline cursor-pointer">
              Terms of Service for Mini Apps
            </span>
            .
          </p>
        </div>

        {/* Card 1: Affiliate Program matching Image 1 */}
        <div 
          onClick={handleCopyLink}
          className="p-3.5 rounded-2xl bg-[#232e3c] border border-[#2e3c4e] hover:bg-[#283545] transition cursor-pointer flex items-center justify-between shadow-md active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2ea6ff]/15 border border-[#2ea6ff]/30 flex items-center justify-center text-[#2ea6ff]">
              <Share2 className="w-5 h-5 text-[#2ea6ff]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm text-white">Affiliate Program</h4>
                <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-[#31b545] text-white">
                  5%
                </span>
              </div>
              <p className="text-xs text-gray-400 max-w-[240px] truncate">
                Share a link to SHREEWIN PREDICTION HACK 4.0
              </p>
            </div>
          </div>
          <div className="text-gray-400">
            {copied ? (
              <span className="text-xs text-green-400 font-bold">Copied!</span>
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </div>
        </div>

        <p className="text-xs text-gray-400 px-3 -mt-2">
          Share a link to <strong className="text-gray-300 font-semibold">SHREEWIN PREDICTION HACK 4.0</strong> with your friends and earn 5% of their spending there.
        </p>

        {/* Card 2: Add to Group or Channel matching Image 1 */}
        <a
          href={`https://t.me/${botUsername}?startgroup=true`}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 rounded-2xl bg-[#232e3c] border border-[#2e3c4e] hover:bg-[#283545] transition flex items-center justify-between shadow-md block active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6c7883]/20 border border-[#6c7883]/30 flex items-center justify-center text-gray-300">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Add to Group or Channel</h4>
              <p className="text-xs text-gray-400">
                This bot is able to manage a group or channel.
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </a>

        {/* Telegram Bot Live Status Banner */}
        <div className="p-3.5 rounded-2xl bg-[#1d2733] border border-[#2b3a4c] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-green-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Bot Online & Hosted
            </span>
            <span className="text-[11px] font-mono text-gray-400">
              Token Active
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Telegram Bot <strong>@{botUsername}</strong> is hosted on this server. Sending <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">/start</code> on Telegram sends the Open App button automatically.
          </p>

          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            className="text-xs text-[#2ea6ff] hover:underline flex items-center gap-1 pt-1"
          >
            <Info className="w-3.5 h-3.5" />
            {showConfig ? 'Hide Profile Customizer' : 'Test with Custom Name / DP'}
          </button>

          {/* Optional Test Profile Customizer */}
          {showConfig && (
            <div className="pt-2 border-t border-[#2e3d50] space-y-2">
              <label className="text-[11px] text-gray-400 block">
                Display Name (Default matches Image 2):
              </label>
              <input
                type="text"
                value={user.first_name}
                onChange={(e) => onUpdateUser({ first_name: e.target.value })}
                placeholder="︻╦╤─ #GUTS ─╤╦︻"
                className="w-full px-3 py-1.5 text-xs bg-[#121922] rounded-lg border border-[#334458] text-white focus:outline-none focus:border-[#2ea6ff]"
              />

              <label className="text-[11px] text-gray-400 block pt-1">
                Telegram Username:
              </label>
              <input
                type="text"
                value={user.username || ''}
                onChange={(e) => onUpdateUser({ username: e.target.value.replace(/^@/, '') })}
                placeholder="GUTS01015"
                className="w-full px-3 py-1.5 text-xs bg-[#121922] rounded-lg border border-[#334458] text-white focus:outline-none focus:border-[#2ea6ff]"
              />
            </div>
          )}
        </div>

        {/* Telegram Chat Input Bar (supports /start and /admin commands) */}
        <form 
          onSubmit={handleCommandSubmit}
          className="p-2 rounded-2xl bg-[#232e3c] border border-[#2e3c4e] flex items-center gap-2 shadow-lg"
        >
          <div className="flex items-center gap-1 pl-1">
            <button
              type="button"
              onClick={onOpenApp}
              className="px-2.5 py-1 rounded-lg bg-[#2e3c4e] hover:bg-[#394a5f] text-[#2ea6ff] font-mono text-xs font-bold transition"
              title="Start / Open Mini App"
            >
              /start
            </button>
          </div>

          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type /admin or /start..."
            className="flex-1 bg-transparent px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-8 h-8 rounded-xl bg-[#2ea6ff] hover:bg-[#2396ee] text-white flex items-center justify-center transition shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
