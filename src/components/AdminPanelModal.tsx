import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Save, 
  RotateCcw, 
  Check, 
  Link, 
  Type, 
  ListOrdered, 
  AlertTriangle, 
  Shield 
} from 'lucide-react';
import { AdminConfig } from '../types';
import { DEFAULT_ADMIN_CONFIG, saveAdminConfig } from '../utils/adminConfig';
import { sounds } from '../utils/audioEffects';

interface Props {
  currentConfig: AdminConfig;
  onClose: () => void;
  onSave: (newConfig: AdminConfig) => void;
}

export const AdminPanelModal: React.FC<Props> = ({
  currentConfig,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<AdminConfig>({ ...currentConfig });
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleChange = (field: keyof AdminConfig, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    const updated = saveAdminConfig(formData);
    sounds.playSubmitChime();
    setSavedSuccess(true);
    onSave(updated);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleResetDefaults = () => {
    sounds.playDeleteClick();
    setFormData({ ...DEFAULT_ADMIN_CONFIG });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-[#12100a] border-2 border-amber-500/60 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.25)] text-[#e8e4dc] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2e2716] bg-[#1a160d]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-300">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold gold-gradient-text tracking-wide uppercase">
                ADMIN CONTROL PANEL
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#9a8d70] font-outfit">
                Live Configuration & UI Customization (/admin)
              </p>
            </div>
          </div>

          <button
            id="admin-modal-close"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-[#252014] hover:bg-[#342c1b] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 space-y-4 overflow-y-auto no-scrollbar flex-1 text-xs font-outfit">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 flex items-center gap-2 font-bold animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Settings saved and applied successfully!</span>
            </div>
          )}

          {/* Section 1: Red Button Customization */}
          <div className="p-3.5 rounded-xl bg-[#18140c] border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-semibold uppercase tracking-wider text-[11px]">
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span>Red Action Button (Keypad Page)</span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#9e9072] block">
                Red Button Text (Jo button ke upar likha hoga):
              </label>
              <input
                type="text"
                value={formData.redButtonText}
                onChange={(e) => handleChange('redButtonText', e.target.value)}
                placeholder="REGISTER ON OFFICIAL SITE (or leave blank)"
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c08] border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#9e9072] block">
                Red Button Target Link (URL):
              </label>
              <input
                type="url"
                value={formData.redButtonUrl}
                onChange={(e) => handleChange('redButtonUrl', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c08] border border-amber-500/30 text-amber-100 font-mono text-[11px] focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Section 2: Instructions List */}
          <div className="p-3.5 rounded-xl bg-[#18140c] border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-semibold uppercase tracking-wider text-[11px]">
              <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
              <span>Step Instructions (Keypad Page)</span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#9e9072] block">Step 1 Instruction:</label>
              <input
                type="text"
                value={formData.instructionStep1}
                onChange={(e) => handleChange('instructionStep1', e.target.value)}
                placeholder="Register via official link below"
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c08] border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#9e9072] block">Step 2 Instruction:</label>
              <input
                type="text"
                value={formData.instructionStep2}
                onChange={(e) => handleChange('instructionStep2', e.target.value)}
                placeholder="Complete registration process"
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c08] border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#9e9072] block">Step 3 Instruction:</label>
              <input
                type="text"
                value={formData.instructionStep3}
                onChange={(e) => handleChange('instructionStep3', e.target.value)}
                placeholder="Enter your UID using keypad"
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c08] border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Section 3: Alert Banner Text */}
          <div className="p-3.5 rounded-xl bg-[#18140c] border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-semibold uppercase tracking-wider text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Notice Banner Text (Under Red Button)</span>
            </div>

            <div className="space-y-1">
              <textarea
                rows={2}
                value={formData.alertBannerText}
                onChange={(e) => handleChange('alertBannerText', e.target.value)}
                placeholder="Notice / disclaimer text..."
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c08] border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Section 4: Verified Status Notice */}
          <div className="p-3.5 rounded-xl bg-[#18140c] border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-semibold uppercase tracking-wider text-[11px]">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Notice Message</span>
            </div>

            <div className="space-y-1">
              <input
                type="text"
                value={formData.verifiedNoticeText}
                onChange={(e) => handleChange('verifiedNoticeText', e.target.value)}
                placeholder="Official UID verified. Real-time AI statistical forecast active."
                className="w-full px-3 py-2 rounded-lg bg-[#0e0c08] border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-[#2e2716] bg-[#1a160d] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2.5 rounded-xl bg-[#252014] hover:bg-[#322a1a] text-[#a99c7f] hover:text-white flex items-center gap-1.5 transition text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            id="admin-save-btn"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
