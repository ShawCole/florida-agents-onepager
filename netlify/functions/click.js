// Netlify Function: notify Shaw on Telegram when the CTA button is clicked.
const TG_BOT = '8622076376:AAFyaf3NMxhwAr15MMYKic6vcvcCIw3vU4w';
const TG_CHAT = '6046524812';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'POST only' };
  }

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch {}

  const ua = event.headers['user-agent'] || 'unknown';
  const ip = event.headers['x-forwarded-for']?.split(',')[0]?.trim()
          || event.headers['x-nf-client-connection-ip']
          || 'unknown';
  const referrer = event.headers['referer'] || 'direct';
  const country = event.headers['x-country'] || event.headers['x-nf-geo'] || '';
  const ts = new Date().toISOString();

  // Truncate UA for readability
  const shortUA = ua.length > 90 ? ua.slice(0, 87) + '…' : ua;

  const text = [
    '🎯 Florida Agents — CTA clicked',
    '',
    `Page: ${body.page || 'florida-agents-arkdata.netlify.app'}`,
    `Button: ${body.button || 'Email noah@arkdata.io'}`,
    `Time: ${ts}`,
    `IP: ${ip}${country ? ' · ' + country : ''}`,
    `Referrer: ${referrer}`,
    `UA: ${shortUA}`,
  ].join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${TG_BOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT, text }),
    });
    if (!res.ok) console.error('Telegram failed:', await res.text());
  } catch (e) {
    console.error('Telegram threw:', e);
  }

  return { statusCode: 204, body: '' };
};
