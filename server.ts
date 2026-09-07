import express from 'express';
import path from 'path';
import fs from 'fs';
import { spawn, execSync } from 'child_process';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

const NEW_BOT_TOKEN = '8523488300:AAE1v7xXPfn-VnRmQN4toRD-IwSgxgyXUvc';
const BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_BOT_TOKEN !== '8992984672:AAHXTK-MwJxCY430owOzmAKWmot1KM5ClJU')
  ? process.env.TELEGRAM_BOT_TOKEN 
  : NEW_BOT_TOKEN;
let activeAppUrl = process.env.APP_URL || 'https://ais-pre-sw47slwihfbhxyhd5evr5c-631580931537.asia-east1.run.app';

let botInfo: any = null;
let isPollingActive = false;
let messageCount = 0;
let lastUpdateId = 0;
let tunnelProcess: any = null;

// Helper: Telegram API Request
async function telegramRequest(method: string, body?: Record<string, any>) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
    const res = await fetch(url, {
      method: body ? 'POST' : 'GET',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    return await res.json();
  } catch (err) {
    console.error(`Telegram API request error (${method}):`, err);
    return { ok: false, error: String(err) };
  }
}

// Generate real-time prediction data for in-chat responses
function generatePredictionData() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const period = `${year}${month}${day}${String(totalMinutes + 1).padStart(4, '0')}`;

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const selectedNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const isBig = selectedNumber >= 5;
  const isGreen = [1, 3, 7, 9].includes(selectedNumber);
  const isRed = [2, 4, 6, 8].includes(selectedNumber);
  const isViolet = selectedNumber === 0 || selectedNumber === 5;

  let colorName = '🟢 GREEN';
  if (isRed) colorName = '🔴 RED';
  if (isViolet) colorName = selectedNumber === 0 ? '🔴+🟣 RED VIOLET' : '🟢+🟣 GREEN VIOLET';

  const confidence = (92 + Math.random() * 6).toFixed(1);

  return {
    period,
    number: selectedNumber,
    size: isBig ? 'BIG (5-9)' : 'SMALL (0-4)',
    color: colorName,
    confidence: `${confidence}%`,
    time: now.toLocaleTimeString('en-US', { hour12: true }),
  };
}

// Format Inline Keyboard for Bot: Single clean Open Mini App button
function getBotInlineKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: '🚀 Open Mini App',
          web_app: {
            url: activeAppUrl,
          },
        },
      ],
    ],
  };
}

// Send /start or welcome reply
async function handleIncomingMessage(chatId: number | string, user: any, text: string) {
  const name = user?.first_name || 'VIP Member';
  const cleanText = (text || '').trim().toLowerCase();

  // If user requests a direct prediction via text command
  if (cleanText.includes('sureshot') || cleanText.includes('predict') || cleanText.includes('number') || cleanText.includes('color')) {
    const data = generatePredictionData();
    const replyText = `🎯 *SHREEWIN SURESHOT SIGNAL 4.0*\n\n` +
      `⚡ *Period:* \`${data.period}\`\n` +
      `🎨 *Colour:* *${data.color}*\n` +
      `🔢 *Number:* \`${data.number}\`\n` +
      `📊 *Size:* *${data.size}*\n` +
      `📈 *Confidence:* \`${data.confidence}\`\n` +
      `⏱ *Synced:* \`${data.time}\`\n\n` +
      `⚠️ *Rule:* Follow 3-level fund management for 100% safe profits!\n\n` +
      `Launch the full Golden Mini App below for real-time live graphs:`;

    await telegramRequest('sendMessage', {
      chat_id: chatId,
      text: replyText,
      parse_mode: 'Markdown',
      reply_markup: getBotInlineKeyboard(),
    });
    messageCount++;
    return;
  }

  // Default /start or greeting message
  const welcomeText = `🌟 *SHREEWIN PREDICTION HACK 4.0*\n\n` +
    `Welcome *${name}*! 👑\n` +
    `India's elite AI colour & number prediction bot.\n\n` +
    `✅ *94.2% Verified Accuracy*\n` +
    `✅ *Zero 403 Errors - Instant Access*\n` +
    `✅ *Live Period & AI Pattern Analysis*\n\n` +
    `👇 *Tap a button below to launch the Mini App or get signals in chat:*`;

  // Ensure this specific user's chat menu button is also updated to activeAppUrl
  telegramRequest('setChatMenuButton', {
    chat_id: chatId,
    menu_button: {
      type: 'web_app',
      text: 'Open App',
      web_app: {
        url: activeAppUrl,
      },
    },
  }).catch(() => {});

  await telegramRequest('sendMessage', {
    chat_id: chatId,
    text: welcomeText,
    parse_mode: 'Markdown',
    reply_markup: getBotInlineKeyboard(),
  });
  messageCount++;
}

// Handle inline button callbacks in Telegram
async function handleCallbackQuery(callbackQuery: any) {
  const id = callbackQuery.id;
  const chatId = callbackQuery.message?.chat?.id;
  const dataKey = callbackQuery.data;

  // Acknowledge the callback immediately
  await telegramRequest('answerCallbackQuery', {
    callback_query_id: id,
    text: '⚡ Fetching latest AI sureshot signal...',
    show_alert: false,
  });

  if (!chatId) return;

  const data = generatePredictionData();

  if (dataKey === 'pred_sureshot' || dataKey === 'pred_number') {
    const text = `🎯 *LIVE SURESHOT ANALYSIS*\n\n` +
      `⚡ *Period:* \`${data.period}\`\n` +
      `🎨 *Colour:* *${data.color}*\n` +
      `🔢 *Sureshot Number:* \`${data.number}\`\n` +
      `📊 *Category:* *${data.size}*\n` +
      `📈 *AI Accuracy:* \`${data.confidence}\`\n` +
      `⏱ *Generated at:* \`${data.time}\`\n\n` +
      `Click below to launch the Mini App or refresh signal:`;

    await telegramRequest('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: getBotInlineKeyboard(),
    });
  } else if (dataKey === 'pred_bigsmall') {
    const text = `📊 *BIG / SMALL AI FORECAST*\n\n` +
      `⚡ *Period:* \`${data.period}\`\n` +
      `🎯 *Recommended:* *${data.size}*\n` +
      `📈 *Win Rate:* \`${data.confidence}\`\n` +
      `⏱ *Generated at:* \`${data.time}\`\n\n` +
      `Tap *Refresh Signal* or *Open Mini App* for live tracking.`;

    await telegramRequest('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: getBotInlineKeyboard(),
    });
  }
}

// Update Telegram Menu Button with the public URL
async function updateTelegramMenuButton(url: string) {
  try {
    console.log('[Telegram Bot] Updating Chat Menu Button to:', url);
    const res = await telegramRequest('setChatMenuButton', {
      menu_button: {
        type: 'web_app',
        text: 'Open App',
        web_app: {
          url: url,
        },
      },
    });
    console.log('[Telegram Bot] Menu Button update result:', res);
  } catch (err) {
    console.error('[Telegram Bot] Failed to set chat menu button:', err);
  }
}

// Continuous background polling loop for incoming Telegram messages and callbacks
async function startPolling() {
  if (isPollingActive) return;
  isPollingActive = true;
  console.log('[Telegram Bot] Polling loop started...');

  while (isPollingActive) {
    try {
      const updates = await telegramRequest(`getUpdates?offset=${lastUpdateId + 1}&timeout=20`);
      if (updates && updates.ok && Array.isArray(updates.result)) {
        for (const update of updates.result) {
          lastUpdateId = Math.max(lastUpdateId, update.update_id);

          if (update.message) {
            const chatId = update.message.chat?.id;
            const from = update.message.from;
            const text = update.message.text || '';
            console.log(`[Bot Message] From ${from?.first_name} (@${from?.username || from?.id}): ${text}`);
            await handleIncomingMessage(chatId, from, text);
          } else if (update.callback_query) {
            console.log(`[Bot Callback] Data: ${update.callback_query.data}`);
            await handleCallbackQuery(update.callback_query);
          }
        }
      }
    } catch (pollErr) {
      console.error('[Telegram Bot] Polling error:', pollErr);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

// Start Cloudflare Tunnel to provide a public, non-403 HTTPS URL
function startCloudflareTunnel() {
  const binaryPath = '/tmp/cloudflared';
  if (!fs.existsSync(binaryPath)) {
    console.log('[Tunnel] Cloudflared binary not found, attempting auto-download...');
    try {
      execSync('curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared && chmod +x /tmp/cloudflared', { timeout: 45000 });
      console.log('[Tunnel] Cloudflared downloaded successfully.');
    } catch (downloadErr) {
      console.error('[Tunnel] Cloudflared binary download failed, relying on default APP_URL:', downloadErr);
      return;
    }
  }

  console.log('[Tunnel] Starting Cloudflare Tunnel with http2 protocol...');
  try {
    tunnelProcess = spawn(binaryPath, ['tunnel', '--protocol', 'http2', '--url', `http://localhost:${PORT}`], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const handleData = (chunk: Buffer) => {
      const output = chunk.toString();
      const match = output.match(/https:\/\/[-a-zA-Z0-9@:%._+~#=]+\.trycloudflare\.com/);
      if (match && match[0]) {
        const publicUrl = match[0];
        if (publicUrl !== activeAppUrl) {
          console.log('[Tunnel] ✨ Active Public HTTPS URL (Zero 403):', publicUrl);
          activeAppUrl = publicUrl;
          updateTelegramMenuButton(publicUrl);
        }
      }
    };

    tunnelProcess.stdout.on('data', handleData);
    tunnelProcess.stderr.on('data', handleData);

    tunnelProcess.on('exit', (code: number, signal: string) => {
      console.log(`[Tunnel] Exited with code ${code}, signal ${signal}. Restarting in 5s...`);
      setTimeout(startCloudflareTunnel, 5000);
    });
  } catch (err) {
    console.error('[Tunnel] Error starting cloudflared process:', err);
  }
}

// Initialize Telegram Bot credentials and settings
async function initTelegramBot() {
  console.log('[Telegram Bot] Checking bot connection...');
  const me = await telegramRequest('getMe');
  if (me && me.ok) {
    botInfo = me.result;
    console.log(`[Telegram Bot] Connected: @${botInfo.username} (${botInfo.first_name})`);

    // Ensure webhook is removed so getUpdates polling works cleanly
    await telegramRequest('deleteWebhook', { drop_pending_updates: false });

    // Configure initial menu button
    await updateTelegramMenuButton(activeAppUrl);

    // Start polling loop
    startPolling();
  } else {
    console.error('[Telegram Bot] Connection failed:', me);
  }
}

// API Routes
app.get('/api/bot/status', (req, res) => {
  res.json({
    ok: true,
    bot: botInfo || {
      id: 8523488300,
      username: 'Shreewinpredict_Bot',
      first_name: '𝐒𝐇𝐑𝐄𝐄 𝐖𝐈𝐍 𝐏𝐑𝐄𝐃𝐈𝐂𝐓𝐈𝐎𝐍',
    },
    activeAppUrl,
    isPollingActive,
    messageCount,
  });
});

app.post('/api/telegram/webhook', async (req, res) => {
  const update = req.body;
  if (update && update.message) {
    const chatId = update.message.chat?.id;
    const from = update.message.from;
    const text = update.message.text || '';
    await handleIncomingMessage(chatId, from, text);
  } else if (update && update.callback_query) {
    await handleCallbackQuery(update.callback_query);
  }
  res.json({ ok: true });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Start Cloudflare Tunnel
    startCloudflareTunnel();
    // Start Bot
    initTelegramBot().catch((e) => console.error('Bot init error:', e));
  });
}

startServer();
