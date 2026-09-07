import React from 'react';
import { X, ChevronDown, MoreVertical, RefreshCw, MessageSquare } from 'lucide-react';
import { ViewState } from '../types';

interface Props {
  currentView: ViewState;
  onSwitchView: (view: ViewState) => void;
  onReplaySplash: () => void;
  botUsername?: string;
}

export const TelegramHeader: React.FC<Props> = ({
  currentView,
  onSwitchView,
  onReplaySplash,
  botUsername = 'Shreewinpredict_Bot',
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#12110c]/95 backdrop-blur border-b border-[#2a2618] px-3.5 py-2.5 flex items-center justify-between text-[#e4decb]">
      {/* Left: Close action */}
      <button
        id="tma-close-btn"
        onClick={() => onSwitchView(currentView === 'BOT_CHAT' ? 'MAIN' : 'BOT_CHAT')}
        title={currentView === 'BOT_CHAT' ? 'Return to App' : 'View Telegram Bot Chat'}
        className="p-1.5 rounded-full text-[#b3aa93] hover:text-[#f3efe6] hover:bg-[#252217] transition active:scale-95 flex items-center gap-1.5"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Center: Title & down chevron matching Telegram Mini App bar */}
      <div 
        onClick={onReplaySplash}
        className="flex items-center gap-1.5 cursor-pointer max-w-[210px] sm:max-w-xs group"
        title="Tap to replay splash loader"
      >
        <span className="font-semibold text-sm sm:text-base tracking-wide text-[#efece4] truncate font-outfit">
          SHREEWIN PREDICTION...
        </span>
        <ChevronDown className="w-4 h-4 text-[#a39a82] group-hover:text-amber-400 transition" />
      </div>

      {/* Right: Quick actions & 3-dots */}
      <div className="flex items-center gap-1">
        <button
          id="replay-splash-icon-btn"
          onClick={onReplaySplash}
          title="Replay Loading Screen"
          className="p-1.5 rounded-full text-[#a39a82] hover:text-amber-300 hover:bg-[#252217] transition active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <a
          href={`https://t.me/${botUsername}`}
          target="_blank"
          rel="noreferrer"
          title="Open Telegram Bot"
          className="p-1.5 rounded-full text-[#a39a82] hover:text-amber-300 hover:bg-[#252217] transition active:scale-95"
        >
          <MoreVertical className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};
