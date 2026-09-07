export interface TelegramUser {
  id: number | string;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
  is_premium?: boolean;
}

export type ViewState = 'SPLASH' | 'MAIN' | 'BOT_CHAT' | 'KEYPAD' | 'VERIFYING' | 'VERIFIED' | 'VERIFICATION_FAILED';

export interface AdminConfig {
  redButtonText: string;
  redButtonUrl: string;
  instructionStep1: string;
  instructionStep2: string;
  instructionStep3: string;
  alertBannerText: string;
  verifiedNoticeText: string;
  failedNoticeText?: string;
  contactSupportUsername: string;
}

export interface GamePrediction {
  gameType: 'WINGO_1M' | 'WINGO_3M' | 'WINGO_5M' | 'WINGO_10M' | 'K3' | '5D';
  gameName: string;
  period: string;
  number: number;
  bigSmall: 'BIG' | 'SMALL';
  color: 'GREEN' | 'RED' | 'VIOLET' | 'RED_VIOLET' | 'GREEN_VIOLET';
  accuracy: number;
  countdown: number; // in seconds
}

export interface BotStatusResponse {
  ok: boolean;
  botId: number;
  botName: string;
  username: string;
  active: boolean;
  webAppUrl: string;
  startedCount: number;
}
