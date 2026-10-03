/**
 * Discrete Site Metrics & Telemetry Engine
 * Collects navigation, platform context, and session telemetry
 */

interface VisitorGeo {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  isp?: string;
}

/**
 * Classifies traffic source from referrer and URL parameters
 */
export function classifyTrafficSource(): { channel: string; referrer: string } {
  const ref = document.referrer ? document.referrer.trim() : '';
  const searchParams = new URLSearchParams(window.location.search);
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');
  const refParam = searchParams.get('ref') || searchParams.get('via') || searchParams.get('source');

  let campaignTag = '';
  if (utmSource || utmMedium || utmCampaign || refParam) {
    campaignTag = ` [Tag: ${[utmSource, utmMedium, utmCampaign, refParam].filter(Boolean).join(' / ')}]`;
  }

  if (!ref) {
    if (campaignTag) return { channel: `🎯 Direct Campaign${campaignTag}`, referrer: 'Direct link with parameters' };
    return { channel: '🔗 Direct Entry / Bookmark / Untracked', referrer: 'None (Direct navigation)' };
  }

  let hostname = '';
  try {
    hostname = new URL(ref).hostname.toLowerCase();
  } catch {
    hostname = ref.toLowerCase();
  }

  // 1. AI Chatbots & LLM Search Platforms
  if (hostname.includes('chatgpt.com') || hostname.includes('openai.com')) {
    return { channel: `🤖 ChatGPT (OpenAI)${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('claude.ai') || hostname.includes('anthropic.com')) {
    return { channel: `🧠 Claude AI (Anthropic)${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('perplexity.ai')) {
    return { channel: `🔍 Perplexity AI${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('gemini.google.com') || hostname.includes('bard.google.com')) {
    return { channel: `✨ Google Gemini${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('copilot.microsoft.com') || hostname.includes('bing.com/chat')) {
    return { channel: `💻 Microsoft Copilot${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('deepseek.com')) {
    return { channel: `⚡ DeepSeek AI${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('mistral.ai')) {
    return { channel: `🌪️ Mistral AI (Le Chat)${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('grok.com') || hostname.includes('x.ai')) {
    return { channel: `🚀 Grok AI (xAI)${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('poe.com')) {
    return { channel: `🔮 Poe AI${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('phind.com')) {
    return { channel: `🔎 Phind AI Search${campaignTag}`, referrer: ref };
  }

  // 2. Social & Professional Networks
  if (hostname.includes('linkedin.com') || hostname.includes('lnkd.in')) {
    return { channel: `💼 LinkedIn (Recruiter / Post / Profile)${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('x.com') || hostname.includes('twitter.com') || hostname.includes('t.co')) {
    return { channel: `🐦 X / Twitter${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('github.com')) {
    return { channel: `🐙 GitHub${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('instagram.com')) {
    return { channel: `📸 Instagram${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('reddit.com')) {
    return { channel: `🤖 Reddit${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
    return { channel: `📺 YouTube${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('whatsapp.com') || hostname.includes('wa.me')) {
    return { channel: `💬 WhatsApp${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('telegram.org') || hostname.includes('t.me')) {
    return { channel: `✈️ Telegram${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('facebook.com') || hostname.includes('fb.me')) {
    return { channel: `👥 Facebook${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('threads.net')) {
    return { channel: `🧵 Threads${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('discord.com')) {
    return { channel: `🎮 Discord${campaignTag}`, referrer: ref };
  }

  // 3. Job Boards & Recruiter Portals
  if (hostname.includes('wellfound.com') || hostname.includes('angel.co')) {
    return { channel: `🦄 Wellfound (AngelList)${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('naukri.com')) {
    return { channel: `💼 Naukri.com${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('indeed.com')) {
    return { channel: `📋 Indeed${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('internshala.com')) {
    return { channel: `🎓 Internshala${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('glassdoor.com')) {
    return { channel: `🏢 Glassdoor${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('greenhouse.io') || hostname.includes('lever.co') || hostname.includes('myworkdayjobs.com')) {
    return { channel: `👔 ATS / Recruiter Portal${campaignTag}`, referrer: ref };
  }

  // 4. Search Engines
  if (hostname.includes('google.')) {
    return { channel: `🔍 Google Search${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('bing.com')) {
    return { channel: `🔎 Bing Search${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('duckduckgo.com')) {
    return { channel: `🦆 DuckDuckGo${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('yahoo.com')) {
    return { channel: `🟣 Yahoo Search${campaignTag}`, referrer: ref };
  }
  if (hostname.includes('search.brave.com')) {
    return { channel: `🦁 Brave Search${campaignTag}`, referrer: ref };
  }

  // General External Referrer
  return { channel: `🌐 External (${hostname})${campaignTag}`, referrer: ref };
}

/**
 * Identifies device type, OS, and browser
 */
export function getClientEnvironment() {
  const ua = navigator.userAgent;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Device Type
  let deviceType = '💻 Laptop / PC (Desktop)';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = '📱 Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    deviceType = '📱 Mobile (Smartphone)';
  } else if (width <= 640) {
    deviceType = '📱 Mobile (Viewport)';
  } else if (width <= 1024 && isTouch) {
    deviceType = '📱 Tablet (Touch)';
  }

  // OS Detection
  let os = 'Unknown OS';
  if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
  else if (/Windows NT 6.3/i.test(ua)) os = 'Windows 8.1';
  else if (/Windows NT 6.1/i.test(ua)) os = 'Windows 7';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/CrOS/i.test(ua)) os = 'ChromeOS';

  // In-App Browser Detection
  let browser = 'Unknown Browser';
  if (/LinkedInApp/i.test(ua)) {
    browser = '💼 LinkedIn In-App Browser';
  } else if (/Instagram/i.test(ua)) {
    browser = '📸 Instagram In-App Browser';
  } else if (/Twitter|TwitterAndroid/i.test(ua)) {
    browser = '🐦 Twitter In-App Browser';
  } else if (/FBAN|FBAV/i.test(ua)) {
    browser = '👥 Facebook In-App Browser';
  } else if (/WhatsApp/i.test(ua)) {
    browser = '💬 WhatsApp In-App Browser';
  } else if (/Edg\//i.test(ua)) {
    browser = 'Microsoft Edge';
  } else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) {
    browser = 'Google Chrome';
  } else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) {
    browser = 'Apple Safari';
  } else if (/Firefox\//i.test(ua)) {
    browser = 'Mozilla Firefox';
  } else if (/OPR\//i.test(ua)) {
    browser = 'Opera';
  } else if (/SamsungBrowser/i.test(ua)) {
    browser = 'Samsung Internet';
  }

  const screenRes = `${window.screen.width}×${window.screen.height}`;
  const viewport = `${width}×${height}`;
  const dpr = window.devicePixelRatio || 1;
  const language = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';

  return { deviceType, os, browser, screenRes, viewport, dpr, language };
}

/**
 * Formats timestamps in IST and Local visitor time
 */
export function getTimestamps() {
  const now = new Date();

  // Indian Standard Time (UTC+5:30)
  const timeIst = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
    hour12: true,
  }).format(now) + ' IST';

  // Visitor Local Time
  let timeLocal = '';
  let timezone = '';
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    timeLocal = new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'medium',
      hour12: true,
    }).format(now) + ` (${timezone})`;
  } catch {
    timeLocal = timeIst;
    timezone = 'Asia/Kolkata';
  }

  return { timeIst, timeLocal, timezone };
}

/**
 * Fast client-side Geo/ISP lookup with strict timeout
 */
async function fetchFastGeo(): Promise<VisitorGeo> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 900);

  try {
    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return {};
    const data = await res.json();
    if (!data.success) return {};
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      countryCode: data.country_code,
      isp: data.connection?.isp || data.connection?.org || 'Broadband Provider',
    };
  } catch {
    clearTimeout(timeout);
    return {};
  }
}

/**
 * Dispatches payload securely to the serverless telemetry endpoint
 * with a local development fallback via local .env.local variables
 */
async function dispatchTelemetry(payload: Record<string, unknown>) {
  try {
    const res = await fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    if (res.ok) return;
  } catch {
    // Fall through to local development fallback
  }

  // Local development fallback (when /api/telemetry is not running on localhost:5173)
  const localBot = (import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN;
  const localChat = (import.meta as any).env?.VITE_TELEGRAM_CHAT_ID;
  if (localBot && localChat) {
    try {
      const { timeIst, timeLocal } = getTimestamps();
      let text = '';

      if (payload.type === 'action') {
        text = `⚡ <b>PORTFOLIO ACTION EVENT</b>\n━━━━━━━━━━━━━━━━━━━━━━\n🎯 <b>Action:</b> ${payload.actionName || 'User Action'}\n🧭 <b>Page:</b> <code>${payload.landingPath || '/'}</code>\n📱 <b>Device:</b> ${payload.deviceType} (${payload.os})\n🌐 <b>Visitor:</b> ${payload.city || 'Local'}, ${payload.country || 'India'} (${payload.isp || 'Provider'})\n⏰ <b>IST:</b> <code>${timeIst}</code>\n━━━━━━━━━━━━━━━━━━━━━━`;
      } else if (payload.type === 'navigation') {
        text = `🧭 <b>PORTFOLIO URL PATH NAVIGATION</b>\n━━━━━━━━━━━━━━━━━━━━━━\n📄 <b>Navigated URL Path:</b> <code>${payload.landingPath}</code>\n🏷️ <b>Section / Page:</b> ${payload.title}\n🌐 <b>Full URL:</b> <code>${payload.currentUrl || payload.landingPath}</code>\n📱 <b>Device:</b> ${payload.deviceType} (${payload.os})\n⏰ <b>IST:</b> <code>${timeIst}</code>\n━━━━━━━━━━━━━━━━━━━━━━`;
      } else {
        text = `🚀 <b>NEW PORTFOLIO VISITOR ALERT</b>\n━━━━━━━━━━━━━━━━━━━━━━\n📍 <b>TRAFFIC SOURCE &amp; CHANNEL</b>\n• <b>Channel:</b> ${payload.channel}\n• <b>Referrer:</b> <code>${payload.referrer}</code>\n• <b>Landing Path:</b> <code>${payload.landingPath}</code>\n• <b>Page Title:</b> ${payload.title}\n\n🧭 <b>NAVIGATION</b>\n• <b>URL:</b> <code>${payload.currentUrl}</code>\n\n📱 <b>DEVICE &amp; PLATFORM</b>\n• <b>Device:</b> ${payload.deviceType}\n• <b>OS:</b> ${payload.os}\n• <b>Browser:</b> ${payload.browser}\n• <b>Screen:</b> ${payload.screen} (Viewport: ${payload.viewport})\n\n🌐 <b>NETWORK &amp; LOCATION</b>\n• <b>Location:</b> ${payload.city || 'Global'}, ${payload.country || 'India'}\n• <b>ISP:</b> ${payload.isp || 'Broadband'}\n• <b>IP:</b> <code>${payload.clientIp || 'Local Dev'}</code>\n\n⏰ <b>TIME LOG</b>\n• <b>IST:</b> <code>${timeIst}</code>\n• <b>Local:</b> <code>${timeLocal}</code>\n━━━━━━━━━━━━━━━━━━━━━━`;
      }

      await fetch(`https://api.telegram.org/bot${localBot}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: localChat,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
        keepalive: true,
      });
    } catch {
      // Silent fail
    }
  }
}

/**
 * Initializes and records initial visitor landing
 */
export function recordVisitorArrival(path: string = window.location.pathname) {
  try {
    const sessionKey = '__sb_initial_sent';
    if (sessionStorage.getItem(sessionKey)) {
      return; // Already recorded this session
    }
    sessionStorage.setItem(sessionKey, '1');

    // Run asynchronously in idle callback to avoid any UI block
    const schedule = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(cb, 100));

    schedule(async () => {
      const { channel, referrer } = classifyTrafficSource();
      const env = getClientEnvironment();
      const time = getTimestamps();
      const geo = await fetchFastGeo();

      const payload = {
        type: 'visitor',
        channel,
        referrer,
        landingPath: path,
        currentUrl: window.location.href,
        title: document.title || 'Suraj Bhan Pratap Singh | Full-Stack Developer + AI',
        deviceType: env.deviceType,
        os: env.os,
        browser: env.browser,
        screen: env.screenRes,
        viewport: env.viewport,
        dpr: env.dpr,
        language: env.language,
        clientIp: geo.ip || '',
        city: geo.city || '',
        region: geo.region || '',
        country: geo.country || '',
        countryCode: geo.countryCode || '',
        isp: geo.isp || '',
        clientTimezone: time.timezone,
        timeIst: time.timeIst,
        timeLocal: time.timeLocal,
      };

      await dispatchTelemetry(payload);
    });
  } catch {
    // Silent fail
  }
}

/**
 * Records a high-value user interaction (e.g. resume download, social link click)
 */
export function recordAction(actionName: string, metadata?: Record<string, unknown>) {
  try {
    const schedule = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(cb, 50));

    schedule(async () => {
      const env = getClientEnvironment();
      const time = getTimestamps();

      const payload = {
        type: 'action',
        actionName,
        actionMetadata: metadata || null,
        landingPath: window.location.pathname + window.location.hash,
        deviceType: env.deviceType,
        os: env.os,
        browser: env.browser,
        timeIst: time.timeIst,
        timeLocal: time.timeLocal,
      };

      await dispatchTelemetry(payload);
    });
  } catch {
    // Silent fail
  }
}

/**
 * Records navigation to any URL path or page in the portfolio
 */
export function recordPathNavigation(path: string, title?: string) {
  try {
    const schedule = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(cb, 50));

    schedule(async () => {
      const env = getClientEnvironment();
      const time = getTimestamps();

      const payload = {
        type: 'navigation',
        landingPath: path,
        currentUrl: window.location.href,
        title: title || document.title || path,
        deviceType: env.deviceType,
        os: env.os,
        browser: env.browser,
        timeIst: time.timeIst,
        timeLocal: time.timeLocal,
      };

      await dispatchTelemetry(payload);
    });
  } catch {
    // Silent fail
  }
}
