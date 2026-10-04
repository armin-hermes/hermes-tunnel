import { connect } from 'cloudflare:sockets';

const TARGET_UUID = 'f2fa065d1dff468aa7cb3faf1352b8ce';
const RAW_UUID = 'f2fa065d-1dff-468a-a7cb-3faf1352b8ce';
const TROJAN_HASH = 'c0ad1ef0879889c7cd7c90a1e86d3a949ec1560394193ff5445b17d9';
const NAT64_PREFIXES = ['[2602:fc59:b0:64::]', '[2602:fc59:11:64::]', '[2a02:898:146:64::]'];

const HTML_DASHBOARD = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HERMES // TUNNEL GATEWAY — Rightel & Iran Special</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Vazirmatn:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #06080d;
      --card-bg: rgba(13, 17, 26, 0.75);
      --card-border: rgba(255, 255, 255, 0.08);
      --cyan: #38bdf8;
      --magenta: #ec4899;
      --emerald: #10b981;
      --purple: #a855f7;
      --amber: #f59e0b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg);
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.12) 0%, transparent 40%),
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 36px 36px, 36px 36px;
      color: var(--text);
      font-family: 'Vazirmatn', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2.5rem 1.25rem;
    }

    .container {
      width: 100%;
      max-width: 900px;
    }

    /* Header */
    header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 1.1rem;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: var(--emerald);
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--emerald);
      box-shadow: 0 0 12px var(--emerald);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 900;
      line-height: 1.2;
      background: linear-gradient(135deg, #ffffff 40%, var(--cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.75rem;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Main CTA Box */
    .cta-box {
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 20px;
      padding: 2rem;
      backdrop-filter: blur(12px);
      margin-bottom: 2.5rem;
      box-shadow: 0 12px 30px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .cta-title {
      font-size: 1.3rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #fff;
    }

    .sub-input-group {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .sub-input {
      flex: 1;
      min-width: 260px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      padding: 0.85rem 1rem;
      color: var(--cyan);
      font-family: 'Space Grotesk', monospace;
      font-size: 0.95rem;
      direction: ltr;
      outline: none;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.85rem 1.6rem;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      text-decoration: none;
      font-family: 'Vazirmatn', sans-serif;
    }

    .btn-primary {
      background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
      color: #000;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }

    /* Cards Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }

    .node-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 1.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      transition: all 0.2s ease;
    }

    .node-card:hover {
      border-color: rgba(56, 189, 248, 0.4);
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .node-name {
      font-weight: 700;
      font-size: 1.1rem;
    }

    .node-badge {
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      background: rgba(56, 189, 248, 0.1);
      color: var(--cyan);
      border: 1px solid rgba(56, 189, 248, 0.25);
    }

    .node-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .node-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-sm {
      padding: 0.5rem 0.9rem;
      font-size: 0.85rem;
      flex: 1;
    }

    /* Details Panel */
    .details-box {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 1.8rem;
      margin-bottom: 2.5rem;
    }

    .details-title {
      font-size: 1.15rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      color: #fff;
    }

    .info-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }

    .info-table tr {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .info-table tr:last-child {
      border-bottom: none;
    }

    .info-table td {
      padding: 0.75rem 0;
    }

    .info-label {
      color: var(--text-muted);
      width: 35%;
    }

    .info-val {
      color: var(--text);
      font-family: 'Space Grotesk', monospace;
      direction: ltr;
      text-align: left;
    }

    /* QR Modal */
    #qrModal {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      z-index: 999;
      align-items: center;
      justify-content: center;
    }

    .modal-content {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 2rem;
      max-width: 360px;
      width: 90%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }

    #qrCanvas {
      background: #fff;
      padding: 12px;
      border-radius: 12px;
    }

    /* Toast */
    #toast {
      position: fixed;
      bottom: 2rem;
      right: 50%;
      transform: translateX(50%);
      background: var(--emerald);
      color: #000;
      padding: 0.6rem 1.4rem;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 0.9rem;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 1000;
    }

    footer {
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      border-top: 1px solid var(--card-border);
      padding-top: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="status-badge">
        <span class="status-dot"></span>
        پروکسی فعال • بهینه‌سازی‌شده برای رایتل
      </div>
      <h1>HERMES // TUNNEL GATEWAY</h1>
      <p class="subtitle">
        پایگاه اتصال امن و بدون قطعی آرمین بر بستر شبکه جهانی کلودفلر؛ مجهز به پروتکل VLESS، فرگمنت ضد فیلترینگ و آی‌پی‌های تمیز.
      </p>
    </header>

    <!-- Main Subscription CTA -->
    <div class="cta-box">
      <div class="cta-title">
        🔗 لینک اشتراک هوشمند (Subscription URL)
      </div>
      <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
        این لینک رو مستقیماً توی نرم‌افزارهای <strong>v2rayNG، NikaNG، Streisand، Sing-box یا Hiddify</strong> به عنوان سابسکریپشن اضافه کن تا تمام کانفیگ‌های فعال با هم بروزرسانی بشن:
      </p>
      <div class="sub-input-group">
        <input type="text" id="subUrl" class="sub-input" readonly value="">
        <button class="btn btn-primary" onclick="copySub()">کپی لینک اشتراک</button>
      </div>
    </div>

    <!-- Node Presets -->
    <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 1rem; color: #fff;">
      ⚡️ کانفیگ‌های اختصاصی اپراتورها
    </h2>

    <div class="grid">
      <!-- Rightel -->
      <div class="node-card" style="border-top: 3px solid var(--magenta);">
        <div>
          <div class="node-header">
            <span class="node-name">🟣 رایتل (Rightel Turbo)</span>
            <span class="node-badge" style="color: var(--magenta); border-color: rgba(236, 72, 153, 0.4);">پیشنهادی</span>
          </div>
          <p class="node-desc" style="margin-top: 0.6rem;">
            بهینه‌سازی‌شده برای دکل‌های رایتل؛ بدون افت سرعت با تنظیمات فرگمنت پکت‌های TLS.
          </p>
        </div>
        <div class="node-actions">
          <button class="btn btn-primary btn-sm" onclick="copyNode('rightel')">کپی VLESS</button>
          <button class="btn btn-secondary btn-sm" onclick="showQR('rightel')">QR Code</button>
        </div>
      </div>

      <!-- Hamrah Aval -->
      <div class="node-card" style="border-top: 3px solid var(--cyan);">
        <div>
          <div class="node-header">
            <span class="node-name">🔵 همراه‌اول (MCI Fast)</span>
            <span class="node-badge">Clean IP</span>
          </div>
          <p class="node-desc" style="margin-top: 0.6rem;">
            مسیریابی از طریق آی‌پی‌های تمیز Cloudflare Edge بدون پکت‌لاس روی اینترنت همراه اول.
          </p>
        </div>
        <div class="node-actions">
          <button class="btn btn-primary btn-sm" onclick="copyNode('mci')">کپی VLESS</button>
          <button class="btn btn-secondary btn-sm" onclick="showQR('mci')">QR Code</button>
        </div>
      </div>

      <!-- Irancell -->
      <div class="node-card" style="border-top: 3px solid var(--amber);">
        <div>
          <div class="node-header">
            <span class="node-name">🟡 ایرانسل (MTN Direct)</span>
            <span class="node-badge" style="color: var(--amber); border-color: rgba(245, 158, 11, 0.4);">TLS 443</span>
          </div>
          <p class="node-desc" style="margin-top: 0.6rem;">
            اتصال پرسرعت پورت ۴۴۳ بر بستر وب‌سوکت رمزنگاری‌شده، مناسب وب‌گردی و یوتیوب.
          </p>
        </div>
        <div class="node-actions">
          <button class="btn btn-primary btn-sm" onclick="copyNode('mtn')">کپی VLESS</button>
          <button class="btn btn-secondary btn-sm" onclick="showQR('mtn')">QR Code</button>
        </div>
      </div>
    </div>

    <!-- Technical Details -->
    <div class="details-box">
      <div class="details-title">🛠 مشخصات فنی پروتکل (جهت تنظیمات دستی)</div>
      <table class="info-table">
        <tr>
          <td class="info-label">پروتکل (Protocol)</td>
          <td class="info-val">VLESS / Trojan over WebSocket (WS)</td>
        </tr>
        <tr>
          <td class="info-label">پورت امن (Port)</td>
          <td class="info-val">443 (TLS Enabled)</td>
        </tr>
        <tr>
          <td class="info-label">شناسه کاربری (UUID)</td>
          <td class="info-val" id="dispUuid">f2fa065d-1dff-468a-a7cb-3faf1352b8ce</td>
        </tr>
        <tr>
          <td class="info-label">رمز عبور تروجان (Password)</td>
          <td class="info-val">HermesArmin2026</td>
        </tr>
        <tr>
          <td class="info-label">مسیر وب‌سوکت (Path)</td>
          <td class="info-val">/</td>
        </tr>
        <tr>
          <td class="info-label">تنظیمات فرگمنت رایتل (Fragment)</td>
          <td class="info-val">Packets: 1-3 | Length: 10-20 | Interval: 10-20ms</td>
        </tr>
      </table>
    </div>

    <footer>
      طراحی‌شده توسط <strong>Hermes Agent</strong> برای <strong>آرمین</strong> • میزبانی‌شده روی سرورهای <a href="https://cloudflare.com" target="_blank" style="color: var(--cyan); text-decoration: none;">Cloudflare Edge</a>
    </footer>
  </div>

  <!-- QR Modal -->
  <div id="qrModal" onclick="closeQR(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <h3 id="qrTitle" style="font-size: 1.15rem; font-weight: 800;">اسکن کانفیگ</h3>
      <canvas id="qrCanvas"></canvas>
      <p style="font-size: 0.85rem; color: var(--text-muted);">
        دوربین v2rayNG یا Streisand را روبه‌روی بارکد بگیرید
      </p>
      <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="document.getElementById('qrModal').style.display='none'">بستن</button>
    </div>
  </div>

  <div id="toast">کپی شد! ✅</div>

  <!-- Minimal QR Code Generator Library (embedded) -->
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  <script>
    const UUID = 'f2fa065d-1dff-468a-a7cb-3faf1352b8ce';
    const HOST = window.location.hostname || 'hermes-tunnel.pages.dev';

    // Set Sub URL
    const subLink = window.location.origin + '/sub';
    document.getElementById('subUrl').value = subLink;

    const NODES = {
      rightel: \`vless://\${UUID}@cloudflare.com:443?encryption=none&security=tls&sni=\${HOST}&type=ws&host=\${HOST}&path=%2F#%F0%9F%9F%A3%20Hermes-Rightel-Turbo\`,
      mci: \`vless://\${UUID}@speed.cloudflare.com:443?encryption=none&security=tls&sni=\${HOST}&type=ws&host=\${HOST}&path=%2F#%F0%9F%94%B5%20Hermes-MCI-Clean\`,
      mtn: \`vless://\${UUID}@\${HOST}:443?encryption=none&security=tls&sni=\${HOST}&type=ws&host=\${HOST}&path=%2F#%F0%9F%9F%A1%20Hermes-MTN-Direct\`
    };

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg || 'کپی شد! ✅';
      t.style.opacity = '1';
      setTimeout(() => { t.style.opacity = '0'; }, 2000);
    }

    function copySub() {
      navigator.clipboard.writeText(subLink).then(() => {
        showToast('لینک اشتراک کپی شد! ✅');
      });
    }

    function copyNode(key) {
      const link = NODES[key];
      navigator.clipboard.writeText(link).then(() => {
        showToast('کانفیگ VLESS کپی شد! ✅');
      });
    }

    function showQR(key) {
      const link = NODES[key];
      const titles = { rightel: 'کانفیگ رایتل', mci: 'کانفیگ همراه اول', mtn: 'کانفیگ ایرانسل' };
      document.getElementById('qrTitle').innerText = titles[key];
      
      const modal = document.getElementById('qrModal');
      const canvas = document.getElementById('qrCanvas');
      modal.style.display = 'flex';

      if (window.QRCode) {
        QRCode.toCanvas(canvas, link, { width: 220, margin: 1 }, function (error) {
          if (error) console.error(error);
        });
      }
    }

    function closeQR() {
      document.getElementById('qrModal').style.display = 'none';
    }
  </script>
</body>
</html>
`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const upgradeHeader = request.headers.get('Upgrade') || '';

    // 1. If WebSocket request, handle VLESS/Trojan proxy
    if (upgradeHeader.toLowerCase() === 'websocket') {
      return handleWebSocket(request);
    }

    // 2. Subscription endpoint (/sub)
    if (url.pathname === '/sub' || url.pathname === `/${RAW_UUID}/sub`) {
      return handleSubscription(request, url);
    }

    // 3. Serve the Cyberpunk Dashboard
    return new Response(HTML_DASHBOARD, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      }
    });
  }
};

function handleSubscription(request, url) {
  const host = request.headers.get('host') || url.hostname;
  
  const cleanNodes = [
    { name: '⚡ Hermes-Rightel-Auto', addr: host },
    { name: '🇮🇷 Hermes-Rightel-Clean-1', addr: 'cloudflare.com' },
    { name: '🚀 Hermes-Rightel-Clean-2', addr: 'speed.cloudflare.com' },
    { name: '🛡 Hermes-Rightel-Clean-3', addr: '104.16.148.243' },
    { name: '🌐 Hermes-Rightel-Clean-4', addr: '172.67.74.150' },
    { name: '🔥 Hermes-Rightel-Clean-5', addr: '162.159.136.234' }
  ];

  const configs = cleanNodes.map(node => {
    return `vless://${RAW_UUID}@${node.addr}:443?encryption=none&security=tls&sni=${host}&type=ws&host=${host}&path=%2F#${encodeURIComponent(node.name)}`;
  }).join('\n');

  const b64 = btoa(unescape(encodeURIComponent(configs)));

  return new Response(b64, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function decodeEarlyData(header) {
  if (!header) return null;
  try {
    return Uint8Array.from(atob(header.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)).buffer;
  } catch (_) {
    return null;
  }
}

function makeReadableStream(ws, earlyData) {
  return new ReadableStream({
    start(ctrl) {
      if (earlyData) ctrl.enqueue(earlyData);
      ws.addEventListener('message', ({ data: m }) => ctrl.enqueue(m));
      ws.addEventListener('close', () => ctrl.close());
      ws.addEventListener('error', e => ctrl.error(e));
    }
  });
}

async function resolveDns(hostname) {
  try {
    const r = await fetch('https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(hostname) + '&type=A', {
      headers: { accept: 'application/dns-json' }
    });
    const d = await r.json();
    return d.Answer?.find(a => a.type === 1)?.data || null;
  } catch (_) {
    return null;
  }
}

function toIPv6(ipv4, prefix) {
  const hex = ipv4.split('.').map(n => parseInt(n).toString(16).padStart(2, '0'));
  const m = prefix.match(/^\[([0-9A-Fa-f:]+)\]$/);
  return m ? `[${m[1]}${hex[0]}${hex[1]}:${hex[2]}${hex[3]}]` : null;
}

async function openConnection(ref, host, port, initialData) {
  const socket = connect({ hostname: host, port });
  ref.v = socket;
  if (initialData.byteLength > 0) {
    const writer = socket.writable.getWriter();
    await writer.write(initialData);
    writer.releaseLock();
  }
  return socket;
}

function pipeTraffic(socket, ws, header, onFail) {
  let gotData = false;
  let vlessHdr = header;

  socket.readable.pipeTo(new WritableStream({
    async write(chunk) {
      gotData = true;
      if (vlessHdr) {
        const out = new Uint8Array(vlessHdr.byteLength + chunk.byteLength);
        out.set(vlessHdr, 0);
        out.set(chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk), vlessHdr.byteLength);
        ws.send(out.buffer);
        vlessHdr = null;
      } else {
        ws.send(chunk);
      }
    },
    close() {},
    abort() {}
  })).catch(() => {}).finally(() => {
    if (!gotData && onFail) onFail();
    else try { ws.close(); } catch (_) {}
  });
}

async function routeTraffic(ref, ws, host, port, initialData, returnHdr, addrType) {
  const retryFallback = async () => {
    try {
      if (addrType === 'v6') {
        ws.close();
        return;
      }
      const v4 = addrType === 'v4' ? host : await resolveDns(host);
      if (!v4) {
        ws.close();
        return;
      }
      const prefix = NAT64_PREFIXES[Math.floor(Math.random() * NAT64_PREFIXES.length)];
      const v6 = toIPv6(v4, prefix);
      if (!v6) {
        ws.close();
        return;
      }
      await openConnection(ref, v6, port, initialData);
      pipeTraffic(ref.v, ws, returnHdr, null);
    } catch (_) {
      try { ws.close(); } catch (__) {}
    }
  };

  try {
    await openConnection(ref, host, port, initialData);
    pipeTraffic(ref.v, ws, returnHdr, retryFallback);
  } catch (_) {
    await retryFallback();
  }
}

async function handleWebSocket(request) {
  const [client, server] = Object.values(new WebSocketPair());
  server.accept();
  server.binaryType = 'arraybuffer';

  const earlyData = decodeEarlyData(request.headers.get('sec-websocket-protocol') || '');
  let ref = { v: null };

  makeReadableStream(server, earlyData).pipeTo(new WritableStream({
    async write(chunk) {
      if (ref.v) {
        const writer = ref.v.writable.getWriter();
        await writer.write(chunk);
        writer.releaseLock();
        return;
      }

      const d = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : new Uint8Array(await chunk.arrayBuffer());

      // 1. Check VLESS Header (first byte = 0x00)
      if (d.length >= 19 && d[0] === 0) {
        const uid = [...d.slice(1, 17)].map(v => v.toString(16).padStart(2, '0')).join('');
        if (uid !== TARGET_UUID) throw new Error('Unauthorized VLESS');

        const optLen = d[17];
        let idx = 18 + optLen + 1;
        const port = (d[idx] << 8) | d[idx + 1];
        idx += 2;
        const atype = d[idx++];

        let targetHost = '', addrType = '';
        if (atype === 1) {
          targetHost = [...d.slice(idx, idx + 4)].join('.');
          idx += 4;
          addrType = 'v4';
        } else if (atype === 2) {
          const nameLen = d[idx++];
          targetHost = new TextDecoder().decode(d.slice(idx, idx + nameLen));
          idx += nameLen;
          addrType = 'domain';
        } else if (atype === 3) {
          const raw = d.slice(idx, idx + 16);
          targetHost = [...Array(8)].map((_, j) => ((raw[j * 2] << 8) | raw[j * 2 + 1]).toString(16)).join(':');
          idx += 16;
          addrType = 'v6';
        } else {
          throw new Error('Unsupported address type');
        }

        const initPayload = d.slice(idx);
        await routeTraffic(ref, server, targetHost, port, initPayload, new Uint8Array([0, 0]), addrType);
        return;
      }

      // 2. Check Trojan Header (56 hex characters + CRLF)
      if (d.length > 58 && d[56] === 13 && d[57] === 10) {
        const hdr = String.fromCharCode(...d.slice(0, 56)).toLowerCase();
        if (/^[0-9a-f]{56}$/.test(hdr)) {
          if (hdr !== TROJAN_HASH) throw new Error('Unauthorized Trojan');

          let idx = 58;
          idx++;
          const atype = d[idx++];

          let targetHost = '', addrType = '';
          if (atype === 1) {
            targetHost = [...d.slice(idx, idx + 4)].join('.');
            idx += 4;
            addrType = 'v4';
          } else if (atype === 3) {
            const nameLen = d[idx++];
            targetHost = new TextDecoder().decode(d.slice(idx, idx + nameLen));
            idx += nameLen;
            addrType = 'domain';
          } else if (atype === 4) {
            const raw = d.slice(idx, idx + 16);
            targetHost = [...Array(8)].map((_, j) => ((raw[j * 2] << 8) | raw[j * 2 + 1]).toString(16)).join(':');
            idx += 16;
            addrType = 'v6';
          } else {
            throw new Error('Unsupported address type');
          }

          const port = (d[idx] << 8) | d[idx + 1];
          idx += 2;
          if (d[idx] === 13 && d[idx + 1] === 10) idx += 2;

          const initPayload = d.slice(idx);
          await routeTraffic(ref, server, targetHost, port, initPayload, new Uint8Array(0), addrType);
          return;
        }
      }

      throw new Error('Invalid protocol handshake');
    },
    close() {
      try { ref.v?.readable.cancel(); } catch (_) {}
    },
    abort() {
      try { ref.v?.readable.cancel(); } catch (_) {}
    }
  })).catch(() => {});

  return new Response(null, { status: 101, webSocket: client });
}
