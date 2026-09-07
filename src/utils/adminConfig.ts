import { AdminConfig } from '../types';

export const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  redButtonText: 'REGISTER ON OFFICIAL SITE',
  redButtonUrl: 'https://www.shreewin88.com/#/register?invitationCode=34272264275',
  instructionStep1: 'Register via official link below',
  instructionStep2: 'Complete registration process',
  instructionStep3: 'Enter your UID using keypad',
  alertBannerText: 'AGAR OFFICIAL LINK SE ACCOUNT NHI BNAOGE TO AAPKA PANEL ACTIVATE NHI HOGA...',
  verifiedNoticeText: 'UID VERIFIED & ACTIVATED — LIVE SIGNALS UNLOCKED',
  contactSupportUsername: 'ShreewinAdmin',
};

const STORAGE_KEY = 'shreewin_admin_config';

export function getAdminConfig(): AdminConfig {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_ADMIN_CONFIG, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Failed to parse admin config from localStorage:', err);
  }
  return DEFAULT_ADMIN_CONFIG;
}

export function saveAdminConfig(config: Partial<AdminConfig>): AdminConfig {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_CONFIG;
  const current = getAdminConfig();
  const updated = { ...current, ...config };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save admin config to localStorage:', err);
  }
  return updated;
}
