// Discrete Telemetry and Observability Endpoint for Portfolio Metrics
// Handles event intake, Geo/ISP enrichment, and real-time dispatch

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendTelegramAlert(htmlMessage: string) {
  if (!BOT_TOKEN || !CHAT_ID) {
    return { ok: false, error: 'Telemetry credentials not configured' };
  }
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: htmlMessage,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  return response.json();
}

export default async function handler(req: any, res: any) {
  // CORS & method check
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // use as is
      }
    }

    const {
      type = 'visitor',
      channel = 'Direct / Untracked',
      referrer = 'None',
      landingPath = '/',
      currentUrl = '',
      title = 'Portfolio',
      deviceType = 'Desktop',
      os = 'Unknown OS',
      browser = 'Unknown Browser',
      screen = 'Unknown',
      viewport = 'Unknown',
      dpr = '1.0',
      language = 'en',
      clientIp = '',
      city: clientCity = '',
      region: clientRegion = '',
      country: clientCountry = '',
      countryCode: clientCountryCode = '',
      isp: clientIsp = '',
      clientTimezone = '',
      timeIst = '',
      timeLocal = '',
      actionName = '',
      actionMetadata = null,
    } = body || {};

    // Enrich with Vercel Edge Headers if available
    const headerIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.headers['x-real-ip'];
    const finalIp = clientIp || headerIp || 'Unknown';
    const vercelCity = req.headers['x-vercel-ip-city'] as string;
    const vercelRegion = req.headers['x-vercel-ip-country-region'] as string;
    const vercelCountry = req.headers['x-vercel-ip-country'] as string;
    const vercelTz = req.headers['x-vercel-ip-timezone'] as string;

    const finalCity = clientCity || vercelCity || 'Unknown City';
    const finalRegion = clientRegion || vercelRegion || '';
    const finalCountry = clientCountry || vercelCountry || 'Unknown Country';
    const finalCountryCode = clientCountryCode || vercelCountry || '';
    const finalIsp = clientIsp || 'Broadband / Cellular Provider';
    const finalTimezone = clientTimezone || vercelTz || 'UTC';

    const flagEmoji = finalCountryCode && finalCountryCode.length === 2
      ? String.fromCodePoint(...[...finalCountryCode.toUpperCase()].map(c => 0x1f1a5 + c.charCodeAt(0)))
      : '🌍';

    let message = '';

    if (type === 'action') {
      message = `⚡ <b>PORTFOLIO ACTION EVENT</b>
━━━━━━━━━━━━━━━━━━━━━━
🎯 <b>Action:</b> ${escapeHtml(actionName || 'User Interaction')}
🧭 <b>From Page:</b> <code>${escapeHtml(landingPath)}</code>
📱 <b>Device:</b> ${escapeHtml(deviceType)} (${escapeHtml(os)})
🌐 <b>Visitor:</b> ${flagEmoji} ${escapeHtml(finalCity)}, ${escapeHtml(finalCountry)} (${escapeHtml(finalIsp)})
⏰ <b>IST:</b> <code>${escapeHtml(timeIst)}</code>
${actionMetadata ? `<pre>${escapeHtml(JSON.stringify(actionMetadata, null, 2))}</pre>` : ''}
━━━━━━━━━━━━━━━━━━━━━━`;
    } else if (type === 'navigation') {
      message = `🧭 <b>PORTFOLIO URL PATH NAVIGATION</b>
━━━━━━━━━━━━━━━━━━━━━━
📄 <b>Navigated URL Path:</b> <code>${escapeHtml(landingPath)}</code>
🏷️ <b>Section / Page:</b> ${escapeHtml(title)}
🌐 <b>Full URL:</b> <code>${escapeHtml(currentUrl || landingPath)}</code>
📱 <b>Device:</b> ${escapeHtml(deviceType)} (${escapeHtml(os)})
🌐 <b>Visitor:</b> ${flagEmoji} ${escapeHtml(finalCity)}, ${escapeHtml(finalCountry)} (${escapeHtml(finalIsp)})
⏰ <b>IST:</b> <code>${escapeHtml(timeIst)}</code>
━━━━━━━━━━━━━━━━━━━━━━`;
    } else {
      // Default: Initial Visitor Session Alert
      message = `🚀 <b>NEW PORTFOLIO VISITOR ALERT</b>
━━━━━━━━━━━━━━━━━━━━━━
📍 <b>TRAFFIC SOURCE &amp; CHANNEL</b>
• <b>Channel:</b> ${escapeHtml(channel)}
• <b>Referrer:</b> <code>${escapeHtml(referrer)}</code>
• <b>Landing Path:</b> <code>${escapeHtml(landingPath)}</code>
• <b>Page Title:</b> ${escapeHtml(title)}

🧭 <b>PORTFOLIO NAVIGATION</b>
• <b>Current URL:</b> <code>${escapeHtml(currentUrl || landingPath)}</code>
• <b>Route:</b> <code>${escapeHtml(landingPath)}</code>

📱 <b>DEVICE &amp; PLATFORM</b>
• <b>Device:</b> ${escapeHtml(deviceType)}
• <b>OS:</b> ${escapeHtml(os)}
• <b>Browser:</b> ${escapeHtml(browser)}
• <b>Screen:</b> ${escapeHtml(screen)} (Viewport: ${escapeHtml(viewport)}, DPR: ${escapeHtml(String(dpr))})
• <b>Language:</b> ${escapeHtml(language)}

🌐 <b>NETWORK &amp; LOCATION</b>
• <b>Location:</b> ${flagEmoji} ${escapeHtml(finalCity)}${finalRegion ? `, ${escapeHtml(finalRegion)}` : ''}, ${escapeHtml(finalCountry)}
• <b>Provider / ISP:</b> ${escapeHtml(finalIsp)}
• <b>IP Address:</b> <code>${escapeHtml(finalIp)}</code>
• <b>Timezone:</b> ${escapeHtml(finalTimezone)}

⏰ <b>TIME LOG</b>
• <b>IST:</b> <code>${escapeHtml(timeIst)}</code>
• <b>Local:</b> <code>${escapeHtml(timeLocal)}</code>
━━━━━━━━━━━━━━━━━━━━━━`;
    }

    await sendTelegramAlert(message);
    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('Telemetry dispatch error:', error);
    return res.status(200).json({ ok: false, error: error?.message || 'Dispatch error' });
  }
}
