import React from 'react';
import { X, ChevronUp } from 'lucide-react';

interface Props {
  onAction?: () => void;
}

export const TelegramBottomBar: React.FC<Props> = ({ onAction }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center pointer-events-auto">
      {/* Bottom Floating Bar styled exactly like Telegram Android Mini App footer */}
      <div 
        onClick={onAction}
        className="w-full max-w-md mx-auto px-4 py-3 bg-[#19222d] text-[#ffffff] flex items-center justify-between shadow-2xl rounded-t-2xl border-t border-[#293645] cursor-pointer hover:bg-[#202b3a] transition-all"
      >
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            title="Close Bar" 
            className="p-0.5 rounded text-gray-400 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              if (onAction) onAction();
            }}
          >
            <X className="w-4 h-4" />
          </button>
          <span className="font-semibold text-[13px] tracking-wide text-gray-100 font-outfit uppercase">
            SHREEWIN PREDICTION HACK 4.0
          </span>
        </div>
        <ChevronUp className="w-4 h-4 text-gray-400" />
      </div>

      {/* Android navigation bar black space simulator */}
      <div className="w-full bg-black h-4 flex items-center justify-center">
        <div className="w-32 h-1 bg-[#444] rounded-full"></div>
      </div>
    </div>
  );
};
