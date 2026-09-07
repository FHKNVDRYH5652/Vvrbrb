import { useState, useEffect } from 'react';
import { TelegramUser, ViewState, AdminConfig } from './types';
import { TelegramHeader } from './components/TelegramHeader';
import { SplashScreen } from './components/SplashScreen';
import { MainScreen } from './components/MainScreen';
import { TelegramBotChatView } from './components/TelegramBotChatView';
import { TelegramBottomBar } from './components/TelegramBottomBar';
import { KeypadScreen } from './components/KeypadScreen';
import { VerifyingScreen } from './components/VerifyingScreen';
import { VerifiedDashboard } from './components/VerifiedDashboard';
import { VerificationFailedScreen } from './components/VerificationFailedScreen';
import { AdminPanelModal } from './components/AdminPanelModal';
import { getAdminConfig } from './utils/adminConfig';

export default function App() {
  // Default user matches Screenshot 2 and 3
  const [user, setUser] = useState<TelegramUser>({
    id: 8817745546,
    first_name: '︻╦╤─ #GUTS ─╤╦︻',
    username: 'GUTS01015',
    photo_url: '/guts_avatar.jpg',
    language_code: 'en',
    is_premium: true,
  });

  // Check if running directly inside real Telegram WebApp or browser preview
  const [isInsideTelegram, setIsInsideTelegram] = useState(false);

  // View state: SPLASH -> MAIN -> KEYPAD -> VERIFYING -> VERIFIED, or BOT_CHAT
  const [currentView, setCurrentView] = useState<ViewState>('SPLASH');
  const [keypadMode, setKeypadMode] = useState<'NUMBER' | 'BIG_SMALL'>('NUMBER');
  const [enteredUid, setEnteredUid] = useState<string>('64646');
  const [botUsername, setBotUsername] = useState<string>('Shreewinpredict_Bot');

  // Admin configuration state
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(getAdminConfig());
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);

  useEffect(() => {
    // Fetch live bot username from server API
    fetch('/api/bot/status')
      .then((res) => res.json())
      .then((data) => {
        if (data?.bot?.username) {
          setBotUsername(data.bot.username);
        }
      })
      .catch((err) => console.log('Bot status fetch:', err));
    // Attempt Telegram WebApp SDK sync
    const tg = typeof window !== 'undefined' ? (window as any).Telegram?.WebApp : null;

    if (tg) {
      try {
        tg.ready();
        tg.expand();

        const tgUser = tg.initDataUnsafe?.user;
        if (tgUser) {
          setIsInsideTelegram(true);
          const fullName = [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ');
          setUser({
            id: tgUser.id || 8817745546,
            first_name: fullName || '︻╦╤─ #GUTS ─╤╦︻',
            username: tgUser.username || 'GUTS01015',
            photo_url: tgUser.photo_url || '/guts_avatar.jpg',
            language_code: tgUser.language_code || 'en',
            is_premium: Boolean(tgUser.is_premium),
          });
        }
      } catch (err) {
        console.warn('Telegram WebApp initialization fallback:', err);
      }
    }
  }, []);

  // Handler to replay the 3-4 second splash sequence
  const handleReplaySplash = () => {
    setCurrentView('SPLASH');
  };

  // Handler when 3-4 second splash completes
  const handleSplashComplete = () => {
    setCurrentView('MAIN');
  };

  // Open Keypad with requested mode
  const handleOpenKeypad = (mode: 'NUMBER' | 'BIG_SMALL') => {
    setKeypadMode(mode);
    setCurrentView('KEYPAD');
  };

  // Submit UID and trigger 3-second verifying animation
  const handleSubmitUid = (uid: string) => {
    setEnteredUid(uid);
    setCurrentView('VERIFYING');
  };

  // Verification 3-second animation complete -> routes to Verification Failed screen
  const handleVerificationComplete = () => {
    setCurrentView('VERIFICATION_FAILED');
  };

  return (
    <div className="min-h-screen bg-[#0c0b08] flex flex-col justify-start relative font-sans">
      {/* Telegram Mini App Top Navigation Bar */}
      <TelegramHeader
        currentView={currentView}
        onSwitchView={setCurrentView}
        onReplaySplash={handleReplaySplash}
        botUsername={botUsername}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto">
        {currentView === 'SPLASH' && (
          <SplashScreen
            user={user}
            onComplete={handleSplashComplete}
            durationSeconds={3.5}
          />
        )}

        {currentView === 'MAIN' && (
          <MainScreen
            user={user}
            botUsername={botUsername}
            onOpenKeypad={handleOpenKeypad}
            onOpenAdmin={() => setShowAdminModal(true)}
          />
        )}

        {currentView === 'KEYPAD' && (
          <KeypadScreen
            user={user}
            mode={keypadMode}
            adminConfig={adminConfig}
            onBack={() => setCurrentView('MAIN')}
            onSubmitUid={handleSubmitUid}
          />
        )}

        {currentView === 'VERIFYING' && (
          <VerifyingScreen
            uid={enteredUid}
            onComplete={handleVerificationComplete}
          />
        )}

        {currentView === 'VERIFICATION_FAILED' && (
          <VerificationFailedScreen
            uid={enteredUid}
            adminConfig={adminConfig}
            onReEnterUid={() => setCurrentView('KEYPAD')}
            onGoHome={() => setCurrentView('MAIN')}
          />
        )}

        {currentView === 'VERIFIED' && (
          <VerifiedDashboard
            uid={enteredUid}
            user={user}
            mode={keypadMode}
            adminConfig={adminConfig}
            onBackToMain={() => setCurrentView('MAIN')}
            onReEnterUid={() => setCurrentView('KEYPAD')}
          />
        )}

        {currentView === 'BOT_CHAT' && (
          <TelegramBotChatView
            onOpenApp={() => setCurrentView('SPLASH')}
            botUsername={botUsername}
            user={user}
            onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
            onOpenAdmin={() => setShowAdminModal(true)}
          />
        )}
      </main>

      {/* Admin Panel Modal (/admin) */}
      {showAdminModal && (
        <AdminPanelModal
          currentConfig={adminConfig}
          onClose={() => setShowAdminModal(false)}
          onSave={(newConfig) => setAdminConfig(newConfig)}
        />
      )}

      {/* Telegram Bottom Navigation Sheet Handle Bar */}
      {currentView !== 'BOT_CHAT' && (
        <TelegramBottomBar
          onAction={() => {
            // Clicking bottom bar can toggle between bot chat and main view
            setCurrentView((prev) => (prev === 'MAIN' ? 'BOT_CHAT' : 'MAIN'));
          }}
        />
      )}
    </div>
  );
}
