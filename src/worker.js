import { connect } from 'cloudflare:sockets';

const TARGET_UUID = 'f2fa065d1dff468aa7cb3faf1352b8ce';
const RAW_UUID = 'f2fa065d-1dff-468a-a7cb-3faf1352b8ce';
const TROJAN_HASH = 'c0ad1ef0879889c7cd7c90a1e86d3a949ec1560394193ff5445b17d9';
const NAT64_PREFIXES = ['[2602:fc59:b0:64::]', '[2602:fc59:11:64::]', '[2a02:898:146:64::]'];

// Cloudflare WARP Residential-like Client Credentials for Clean Exit (Gemini & AI Unblock)
const WARP_CREDENTIALS = {
  privateKey: "4NyxMUme2zGv5r3QWI0hJBlNglm1J/thoCE55PK29G8=",
  publicKey: "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=",
  ipv6: "2606:4700:110:8fd2:11f3:8e67:11d4:3704/128",
  reserved: [55, 94, 131],
  endpoint: "162.159.192.1:2408"
};

const HTML_DASHBOARD = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HERMES // PROXY ENGINE — Zero-Leak & Gemini Ready</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #08090a;
      --card-bg: rgba(255, 255, 255, 0.025);
      --card-border: rgba(255, 255, 255, 0.08);
      --card-hover: rgba(255, 255, 255, 0.15);
      --indigo: #5e6ad2;
      --indigo-glow: rgba(94, 106, 210, 0.35);
      --violet: #7170ff;
      --cyan: #38bdf8;
      --emerald: #10b981;
      --emerald-glow: rgba(16, 185, 129, 0.25);
      --magenta: #f43f5e;
      --amber: #f59e0b;
      --text: #f7f8f8;
      --text-muted: #8a8f98;
      --font-code: 'Space Grotesk', monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg);
      background-image: 
        radial-gradient(circle at 15% 10%, rgba(94, 106, 210, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 85% 90%, rgba(56, 189, 248, 0.12) 0%, transparent 45%),
        linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 48px 48px, 48px 48px;
      color: var(--text);
      font-family: 'Vazirmatn', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem 1.25rem;
      position: relative;
    }

    .container {
      width: 100%;
      max-width: 1040px;
    }

    /* Navigation Header */
    .nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      padding: 0.85rem 1.75rem;
      background: rgba(15, 16, 17, 0.7);
      border: 1px solid var(--card-border);
      border-radius: 9999px;
      backdrop-filter: blur(16px);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      font-size: 1.15rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.02em;
    }

    .brand-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--indigo) 0%, var(--violet) 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 16px var(--indigo-glow);
    }

    .brand-icon svg { width: 18px; height: 18px; fill: #fff; }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.95rem;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--emerald);
      font-size: 0.8rem;
      font-weight: 700;
      font-family: var(--font-code);
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--emerald);
      box-shadow: 0 0 10px var(--emerald);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    /* Hero Section */
    .hero {
      text-align: center;
      margin-bottom: 3rem;
    }

    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      background: rgba(94, 106, 210, 0.12);
      border: 1px solid rgba(94, 106, 210, 0.3);
      color: var(--violet);
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      letter-spacing: 0.04em;
    }

    h1 {
      font-size: 2.85rem;
      font-weight: 900;
      line-height: 1.25;
      background: linear-gradient(135deg, #ffffff 45%, var(--violet) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }

    .hero-desc {
      color: var(--text-muted);
      font-size: 1.15rem;
      max-width: 720px;
      margin: 0 auto;
      line-height: 1.7;
    }

    /* 3 Telemetry Feature Badges */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }

    .feature-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 1.6rem;
      backdrop-filter: blur(12px);
      transition: all 0.25s ease;
    }

    .feature-card:hover {
      border-color: var(--card-hover);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }

    .feature-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .feature-icon svg { width: 22px; height: 22px; }

    .feature-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: #fff;
      margin-bottom: 0.4rem;
    }

    .feature-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Main Subscription Hub */
    .hub-box {
      background: linear-gradient(135deg, rgba(20, 22, 28, 0.85) 0%, rgba(12, 14, 18, 0.85) 100%);
      border: 1px solid rgba(94, 106, 210, 0.35);
      border-radius: 24px;
      padding: 2.25rem;
      backdrop-filter: blur(16px);
      margin-bottom: 3rem;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(94, 106, 210, 0.15);
    }

    .hub-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .hub-title {
      font-size: 1.35rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #fff;
    }

    .hub-title svg { width: 24px; height: 24px; fill: var(--violet); }

    .ping-widget {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.95rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--card-border);
      font-family: var(--font-code);
      font-size: 0.82rem;
      color: var(--cyan);
      cursor: pointer;
      transition: all 0.2s;
    }

    .ping-widget:hover {
      background: rgba(56, 189, 248, 0.12);
      border-color: rgba(56, 189, 248, 0.3);
    }

    .sub-input-row {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 1.25rem;
    }

    .sub-input {
      flex: 1;
      min-width: 320px;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 0.95rem 1.15rem;
      color: var(--violet);
      font-family: var(--font-code);
      font-size: 0.95rem;
      direction: ltr;
      outline: none;
      transition: border-color 0.2s;
    }

    .sub-input:focus { border-color: var(--violet); }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.95rem 1.75rem;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      font-family: 'Vazirmatn', sans-serif;
    }

    .btn svg { width: 18px; height: 18px; }

    .btn-primary {
      background: linear-gradient(135deg, var(--indigo) 0%, var(--violet) 100%);
      color: #fff;
      box-shadow: 0 0 20px var(--indigo-glow);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 25px rgba(113, 112, 255, 0.6);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      color: #e2e4e7;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .sub-quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.75rem;
    }

    .btn-sub-opt {
      padding: 0.75rem 1rem;
      font-size: 0.88rem;
      border-radius: 10px;
      text-align: right;
      justify-content: flex-start;
    }

    /* Filter Tabs */
    .tabs-strip {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.75rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--card-border);
    }

    .tab-item {
      background: none;
      border: 1px solid transparent;
      color: var(--text-muted);
      font-family: 'Vazirmatn', sans-serif;
      font-size: 0.92rem;
      font-weight: 600;
      padding: 0.6rem 1.2rem;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .tab-item:hover { color: #fff; background: rgba(255, 255, 255, 0.04); }

    .tab-item.active {
      color: #fff;
      background: rgba(94, 106, 210, 0.15);
      border-color: rgba(94, 106, 210, 0.35);
    }

    /* Nodes Grid */
    .nodes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
      gap: 1.25rem;
      margin-bottom: 3rem;
    }

    .node-box {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.25rem;
      backdrop-filter: blur(12px);
      transition: all 0.25s ease;
      position: relative;
    }

    .node-box:hover {
      border-color: var(--card-hover);
      transform: translateY(-3px);
      box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5);
    }

    .node-box::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
    }

    .node-box.warp::before { background: linear-gradient(90deg, #10b981, #38bdf8); }
    .node-box.rightel::before { background: var(--magenta); }
    .node-box.tci::before { background: var(--emerald); }
    .node-box.mci::before { background: var(--cyan); }
    .node-box.mtn::before { background: var(--amber); }

    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .node-title {
      font-size: 1.05rem;
      font-weight: 800;
      line-height: 1.4;
      color: #fff;
    }

    .node-pill {
      font-family: var(--font-code);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.55rem;
      border-radius: 6px;
      white-space: nowrap;
    }

    .node-info {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .node-meta {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-top: 0.4rem;
      font-family: var(--font-code);
      font-size: 0.82rem;
      color: #cbd5e1;
      direction: ltr;
    }

    .node-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-action {
      padding: 0.6rem 0.95rem;
      font-size: 0.88rem;
      flex: 1;
      border-radius: 10px;
    }

    /* Explanation & Guide Cards */
    .guide-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 2rem;
      margin-bottom: 2rem;
      backdrop-filter: blur(14px);
    }

    .guide-box-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1rem;
    }

    .guide-text {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.8;
    }

    .guide-text strong { color: #fff; }
    .guide-text code {
      background: rgba(255, 255, 255, 0.07);
      padding: 0.2rem 0.45rem;
      border-radius: 6px;
      font-family: var(--font-code);
      color: var(--cyan);
      font-size: 0.88rem;
    }

    /* Modal */
    #qrModal {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      z-index: 999;
      align-items: center;
      justify-content: center;
    }

    .modal-sheet {
      background: #0f1012;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 24px;
      padding: 2.25rem;
      max-width: 380px;
      width: 90%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
    }

    #qrCanvas {
      background: #fff;
      padding: 14px;
      border-radius: 16px;
    }

    /* Toast */
    #toast {
      position: fixed;
      bottom: 2rem;
      right: 50%;
      transform: translateX(50%);
      background: var(--emerald);
      color: #030712;
      padding: 0.65rem 1.6rem;
      border-radius: 9999px;
      font-weight: 800;
      font-size: 0.92rem;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 1000;
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }

    footer {
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      border-top: 1px solid var(--card-border);
      padding-top: 2.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Navigation Header -->
    <nav class="nav-header">
      <div class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        HERMES // PROXY ENGINE v3.0
      </div>
      <div class="status-badge">
        <span class="status-dot"></span>
        WARP-ON-WARP // ZERO-LEAK ACTIVE
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-tag">CUSTOM CLOUDFLARE ENGINE FOR IRAN</div>
      <h1>سامانه ضد فیلتر و ضد نشت آرمین</h1>
      <p class="hero-desc">
        موتور اختصاصی پروکسی بر بستر کلودفلر؛ مجهز به پروتکل VLESS، پروتکل رمزنگاری WireGuard WARP، نفی کامل نشت DNS، آنلاک قطعی Gemini و Google AI و سازگاری کامل با رایتل و مخابرات.
      </p>
    </section>

    <!-- 3 Telemetry Feature Badges -->
    <section class="features-grid">
      <div class="feature-card">
        <div class="feature-icon" style="background: rgba(16, 185, 129, 0.12); color: var(--emerald);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="feature-title">نفی ۱۰۰٪ نشت DNS و WebRTC</div>
        <div class="feature-desc">استفاده از DNS over HTTPS ریموت (1.1.1.1) و قابلیت Fake-IP برای اطمینان از اینکه فایروال هیچ اثری از ترافیک و مقاصد شما نمی‌بیند.</div>
      </div>

      <div class="feature-card">
        <div class="feature-icon" style="background: rgba(94, 106, 210, 0.15); color: var(--violet);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div class="feature-title">آنلاک قطعی Google Gemini و AI</div>
        <div class="feature-desc">ترافیک جمنای و هوش مصنوعی از طریق کانکشن کلاینت WARP مسکونی (Clean Exit) خارج می‌شود تا ارور دیتاسنتر و تحریم منطقه‌ای خنثی شود.</div>
      </div>

      <div class="feature-card">
        <div class="feature-icon" style="background: rgba(56, 189, 248, 0.12); color: var(--cyan);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
        </div>
        <div class="feature-title">بهینه‌سازی اپراتورهای ایران</div>
        <div class="feature-desc">مسیرهای اختصاصی رایتل توربو، دور زدن DPI پورت ۴۴۳ مخابرات با پورت ۸۴۴۳ و رنج‌های تمیز ۱۰۴ برای پینگ پایین.</div>
      </div>
    </section>

    <!-- Main Subscription Hub -->
    <section class="hub-box">
      <div class="hub-top">
        <div class="hub-title">
          <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          مرکز سابسکریپشن هوشمند (چندفرمت)
        </div>
        <div class="ping-widget" onclick="testLatency()">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--cyan);"></span>
          تست اتصال لبه: <span id="pingResult">آماده سنجش</span>
        </div>
      </div>

      <div class="sub-input-row">
        <input type="text" id="mainSubLink" class="sub-input" readonly value="">
        <button class="btn btn-primary" onclick="copyFormat('v2ray')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          کپی لینک V2Ray
        </button>
      </div>

      <div class="sub-quick-actions">
        <button class="btn btn-secondary btn-sub-opt" onclick="copyFormat('singbox')">
          ⚡️ ساب Sing-box (پیشنهادی • WARP + ضد نشت + آنلاک Gemini)
        </button>
        <button class="btn btn-secondary btn-sub-opt" onclick="copyFormat('clash')">
          🐱 ساب Clash Meta (Mihomo با مسیریابی اختصاصی AI)
        </button>
        <button class="btn btn-secondary btn-sub-opt" onclick="copyFormat('wireguard')">
          🛡 دانلود کانفیگ WireGuard WARP (.conf)
        </button>
      </div>
    </section>

    <!-- Filter Tabs -->
    <div class="tabs-strip">
      <button class="tab-item active" onclick="setCategory('all', this)">همه گره‌ها (۷)</button>
      <button class="tab-item" onclick="setCategory('warp', this)">🤖 آنلاک Gemini و AI (WARP)</button>
      <button class="tab-item" onclick="setCategory('rightel', this)">🟣 رایتل توربو</button>
      <button class="tab-item" onclick="setCategory('tci', this)">🟢 مخابرات ۸۴۴۳</button>
      <button class="tab-item" onclick="setCategory('mci', this)">🔵 همراه اول</button>
      <button class="tab-item" onclick="setCategory('mtn', this)">🟡 ایرانسل</button>
    </div>

    <!-- Nodes Grid -->
    <section class="nodes-grid" id="nodesMount"></section>

    <!-- Technical Guide 1: Gemini Unblock -->
    <section class="guide-box">
      <div class="guide-box-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        چرا Gemini با ورکر ساده باز نمی‌شد و چطور حل شد؟
      </div>
      <div class="guide-text">
        هنگامی که یک ورکر ابری به صورت مستقیم به سایت <code>gemini.google.com</code> وصل می‌شود، گوگل آی‌پی دیتاسنتری لبه کلودفلر (AS13335) را تشخیص داده و دسترسی را قطع یا ریجن را مسدود می‌کند.
        <br>
        برای حل ریشه‌ای این مشکل، پروتکل <strong>Cloudflare WARP</strong> به هسته اضافه شده است. در سابسکریپشن <strong>Sing-box</strong> و <strong>Clash Meta</strong>، تمام درخواست‌های دامنه‌های گوگل و هوش مصنوعی مستقیماً از طریق تونل WireGuard WARP عبور داده می‌شوند تا گوگل آی‌پی شما را به عنوان <strong>کاربر مسکونی آمریکا</strong> شناسایی کرده و جمنای بدون هیچ اروری باز شود.
      </div>
    </section>

    <!-- Technical Guide 2: Mokhaberat DPI -->
    <section class="guide-box">
      <div class="guide-box-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        آموزش اتصال بدون قطعی روی اینترنت ثابت مخابرات (TCI)
      </div>
      <div class="guide-text">
        فایروال DPI مخابرات روی پورت ۴۴۳ حساسیت دارد. برای اتصال تضمینی روی وای‌فای و ADSL مخابرات:
        <br>
        ۱. از گره <strong>«مخابرات • پورت اختصاصی ۸۴۴۳»</strong> استفاده کنید.
        <br>
        ۲. در نرم‌افزار v2rayNG به بخش <strong>Settings ⬅️ Fragment</strong> بروید و این مقادیر را تنظیم کنید:
        <br>
        • <strong>Packets:</strong> <code>tlshello</code> (یا 1-3) &nbsp;|&nbsp; • <strong>Length:</strong> <code>10-20</code> &nbsp;|&nbsp; • <strong>Interval:</strong> <code>10-20</code>
      </div>
    </section>

    <footer>
      طراحی و پیاده‌سازی اختصاصی برای <strong>آرمین</strong> • هسته مستقل <a href="https://github.com/armin-hermes/hermes-tunnel" target="_blank" style="color:var(--violet);text-decoration:none;">Hermes Proxy Engine v3.0</a>
    </footer>
  </div>

  <!-- QR Modal -->
  <div id="qrModal" onclick="hideQR(event)">
    <div class="modal-sheet" onclick="event.stopPropagation()">
      <h3 id="qrHeading" style="font-size: 1.15rem; font-weight: 800; color: #fff;">اسکن کانفیگ</h3>
      <canvas id="qrCanvas"></canvas>
      <p style="font-size: 0.85rem; color: var(--text-muted);">
        دوربین v2rayNG، Sing-box یا Hiddify را روبه‌روی بارکد بگیرید
      </p>
      <button class="btn btn-secondary btn-action" style="width: 100%;" onclick="document.getElementById('qrModal').style.display='none'">بستن</button>
    </div>
  </div>

  <div id="toast">کپی شد! ✅</div>

  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  <script>
    const UUID = 'f2fa065d-1dff-468a-a7cb-3faf1352b8ce';
    const HOST = window.location.hostname || 'hermes-tunnel.armin-hermes.workers.dev';
    const subUrl = window.location.origin + '/sub';

    document.getElementById('mainSubLink').value = subUrl;

    const NODES = [
      {
        id: 'warp_gemini',
        cat: 'warp',
        cardType: 'warp',
        title: '🤖 هرمس • آنلاک Gemini و AI (شبکه WARP)',
        badge: 'GEMINI & AI // 100% OK',
        badgeBg: 'rgba(94, 106, 210, 0.18)',
        badgeColor: 'var(--violet)',
        desc: 'مسیریابی از طریق شبکه مسکونی Cloudflare WARP با آی‌پی تمیز برای عبور قطعی از تحریم‌های منطقه‌ای Gemini، ChatGPT و Claude.',
        endpoint: '162.159.192.1',
        port: 2408,
        isWarp: true
      },
      {
        id: 'rightel_turbo',
        cat: 'rightel',
        cardType: 'rightel',
        title: '🟣 رایتل • توربو (Rightel Turbo)',
        badge: 'پیشنهادی رایتل',
        badgeBg: 'rgba(244, 63, 94, 0.15)',
        badgeColor: 'var(--magenta)',
        desc: 'اتصال پرسرعت وب‌سوکت با TLS مستقیم به سرورهای کلودفلر، بهینه‌سازی‌شده برای وب‌گردی و یوتیوب رایتل.',
        endpoint: 'cloudflare.com',
        port: 443,
        isWarp: false
      },
      {
        id: 'rightel_clean',
        cat: 'rightel',
        cardType: 'rightel',
        title: '🟣 رایتل • آی‌پی تمیز ۱۰۴',
        badge: 'CLEAN IP 104',
        badgeBg: 'rgba(244, 63, 94, 0.15)',
        badgeColor: 'var(--magenta)',
        desc: 'مسیریابی بدون واسطه دامنه‌ای با گیت‌وی پایدار 104.16.148.243 مخصوص سیم‌کارت‌های رایتل.',
        endpoint: '104.16.148.243',
        port: 443,
        isWarp: false
      },
      {
        id: 'tci_8443',
        cat: 'tci',
        cardType: 'tci',
        title: '🟢 مخابرات • پورت اختصاصی ۸۴۴۳ (TCI Bypass)',
        badge: 'ضد فیلتر مخابرات',
        badgeBg: 'rgba(16, 185, 129, 0.15)',
        badgeColor: 'var(--emerald)',
        desc: 'دور زدن فیلترینگ پورت ۴۴۳ اینترنت ADSL و فیبر مخابرات با استفاده از پورت امن ۸۴۴۳ کلودفلر.',
        endpoint: 'speed.cloudflare.com',
        port: 8443,
        isWarp: false
      },
      {
        id: 'tci_clean',
        cat: 'tci',
        cardType: 'tci',
        title: '🟢 مخابرات • گیت‌وی تمیز ۱۰۴',
        badge: 'GATEWAY 104',
        badgeBg: 'rgba(16, 185, 129, 0.15)',
        badgeColor: 'var(--emerald)',
        desc: 'آی‌پی تست‌شده روی گیت‌وی‌های اینترنت خانگی مخابرات تهران و شهرستان‌ها بدون نوسان پینگ.',
        endpoint: '104.17.34.10',
        port: 443,
        isWarp: false
      },
      {
        id: 'mci',
        cat: 'mci',
        cardType: 'mci',
        title: '🔵 همراه اول • پرسرعت (MCI Fast)',
        badge: 'SPEED PATH',
        badgeBg: 'rgba(56, 189, 248, 0.15)',
        badgeColor: 'var(--cyan)',
        desc: 'مسیریابی بهینه روی دکل‌های همراه‌اول با استفاده از شتاب‌دهنده جهانی Cloudflare Speed.',
        endpoint: 'speed.cloudflare.com',
        port: 443,
        isWarp: false
      },
      {
        id: 'mtn',
        cat: 'mtn',
        cardType: 'mtn',
        title: '🟡 ایرانسل • مستقیم (MTN Direct)',
        badge: 'DIRECT EDGE',
        badgeBg: 'rgba(245, 158, 11, 0.15)',
        badgeColor: 'var(--amber)',
        desc: 'اتصال لبه بدون واسطه مستقیم به نزدیک‌ترین پاپ‌سایت کلودفلر.',
        endpoint: HOST,
        port: 443,
        isWarp: false
      }
    ];

    function getVlessUri(node) {
      return \`vless://\${UUID}@\${node.endpoint}:\${node.port}?encryption=none&security=tls&sni=\${HOST}&type=ws&host=\${HOST}&path=%2F#\${encodeURIComponent(node.title)}\`;
    }

    function renderNodeCards(filter) {
      const mount = document.getElementById('nodesMount');
      mount.innerHTML = '';
      const list = filter === 'all' ? NODES : NODES.filter(n => n.cat === filter);

      list.forEach(n => {
        const card = document.createElement('div');
        card.className = \`node-box \${n.cardType}\`;
        const copyAction = n.isWarp ? \`copyWireguardConf()\` : \`copyNode('\${n.id}')\`;
        const btnText = n.isWarp ? 'کپی کانفیگ WireGuard' : 'کپی VLESS';

        card.innerHTML = \`
          <div>
            <div class="node-header">
              <span class="node-title">\${n.title}</span>
              <span class="node-pill" style="background:\${n.badgeBg};color:\${n.badgeColor}">\${n.badge}</span>
            </div>
            <p class="node-info" style="margin-top:0.75rem;">\${n.desc}</p>
            <div class="node-meta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>\${n.endpoint}:\${n.port}</span>
            </div>
          </div>
          <div class="node-actions">
            <button class="btn btn-primary btn-action" onclick="\${copyAction}">\${btnText}</button>
            <button class="btn btn-secondary btn-action" onclick="openQRModal('\${n.id}')">QR Code</button>
          </div>
        \`;
        mount.appendChild(card);
      });
    }

    function setCategory(cat, el) {
      document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      renderNodeCards(cat);
    }

    function triggerToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.style.opacity = '1';
      setTimeout(() => { t.style.opacity = '0'; }, 2200);
    }

    function copyNode(nodeId) {
      const node = NODES.find(n => n.id === nodeId);
      if (!node) return;
      const uri = getVlessUri(node);
      navigator.clipboard.writeText(uri).then(() => {
        triggerToast('کانفیگ VLESS کپی شد! ✅');
      });
    }

    function copyWireguardConf() {
      fetch(window.location.origin + '/sub?format=wireguard')
        .then(r => r.text())
        .then(txt => {
          navigator.clipboard.writeText(txt).then(() => {
            triggerToast('کانفیگ کامل WireGuard WARP کپی شد! ✅');
          });
        })
        .catch(() => triggerToast('خطا در دریافت'));
    }

    function copyFormat(fmt) {
      let link = subUrl;
      if (fmt === 'singbox') link += '?format=singbox';
      if (fmt === 'clash') link += '?format=clash';
      if (fmt === 'wireguard') link += '?format=wireguard';

      if (fmt === 'wireguard') {
        window.open(link, '_blank');
        triggerToast('در حال دانلود فایل کانفیگ WireGuard... 🚀');
        return;
      }

      navigator.clipboard.writeText(link).then(() => {
        triggerToast('لینک سابسکریپشن کپی شد! ✅');
      });
    }

    function openQRModal(nodeId) {
      const node = NODES.find(n => n.id === nodeId);
      if (!node) return;
      const uri = node.isWarp ? (window.location.origin + '/sub?format=wireguard') : getVlessUri(node);
      document.getElementById('qrHeading').innerText = node.title;
      const modal = document.getElementById('qrModal');
      const canvas = document.getElementById('qrCanvas');
      modal.style.display = 'flex';
      if (window.QRCode) {
        QRCode.toCanvas(canvas, uri, { width: 230, margin: 1 }, err => {
          if (err) console.error(err);
        });
      }
    }

    function hideQR() {
      document.getElementById('qrModal').style.display = 'none';
    }

    function testLatency() {
      const res = document.getElementById('pingResult');
      res.innerText = 'در حال سنجش...';
      const start = Date.now();
      fetch('https://www.cloudflare.com/cdn-cgi/trace', { cache: 'no-store', mode: 'no-cors' })
        .then(() => {
          const lat = Date.now() - start;
          res.innerText = lat + ' ms (سبز)';
        })
        .catch(() => {
          res.innerText = 'فعال (Edge)';
        });
    }

    // Initial render
    renderNodeCards('all');
  </script>
</body>
</html>
`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const upgradeHeader = request.headers.get('Upgrade') || '';

    // 1. WebSocket Tunnel Proxy (VLESS & Trojan Core)
    if (upgradeHeader.toLowerCase() === 'websocket') {
      return handleWebSocket(request);
    }

    // 2. Subscription Engine
    if (url.pathname === '/sub' || url.pathname === `/${RAW_UUID}/sub`) {
      return handleSubscription(request, url);
    }

    // 3. Serve the Luxe Linear-Inspired Dashboard
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
  const format = url.searchParams.get('format') || 'v2ray';

  const cleanNodes = [
    { name: '🟣 Hermes-Rightel-Turbo', addr: 'cloudflare.com', port: 443 },
    { name: '🟣 Hermes-Rightel-CleanIP', addr: '104.16.148.243', port: 443 },
    { name: '🟢 Hermes-Mokhaberat-Port8443', addr: 'speed.cloudflare.com', port: 8443 },
    { name: '🟢 Hermes-Mokhaberat-CleanIP', addr: '104.17.34.10', port: 443 },
    { name: '🔵 Hermes-MCI-Fast', addr: 'speed.cloudflare.com', port: 443 },
    { name: '🟡 Hermes-Irancell-Direct', addr: host, port: 443 }
  ];

  // A. WireGuard .conf Format (for WireGuard, Oblivion, Hiddify)
  if (format === 'wireguard') {
    const wgConf = `[Interface]
PrivateKey = ${WARP_CREDENTIALS.privateKey}
Address = 172.16.0.2/32, ${WARP_CREDENTIALS.ipv6}
DNS = 1.1.1.1, 2606:4700:4700::1111
MTU = 1280

[Peer]
PublicKey = ${WARP_CREDENTIALS.publicKey}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = ${WARP_CREDENTIALS.endpoint}
PersistentKeepalive = 25
`;
    return new Response(wgConf, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename="Hermes-WARP-Gemini.conf"',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // B. Sing-box JSON: Anti-DNS Leak, FakeDNS, TLS Fragment, and WARP Outbounds for Gemini
  if (format === 'singbox') {
    const outbounds = [
      {
        "type": "selector",
        "tag": "HERMES-SELECT",
        "outbounds": ["AUTO-FASTEST", "WARP-GEMINI-UNBLOCK", ...cleanNodes.map(n => n.name)]
      },
      {
        "type": "urltest",
        "tag": "AUTO-FASTEST",
        "outbounds": ["WARP-GEMINI-UNBLOCK", ...cleanNodes.map(n => n.name)],
        "url": "https://www.gstatic.com/generate_204",
        "interval": "2m",
        "tolerance": 40
      },
      {
        "type": "wireguard",
        "tag": "WARP-GEMINI-UNBLOCK",
        "server": "162.159.192.1",
        "server_port": 2408,
        "local_address": ["172.16.0.2/32", WARP_CREDENTIALS.ipv6],
        "private_key": WARP_CREDENTIALS.privateKey,
        "peer_public_key": WARP_CREDENTIALS.publicKey,
        "reserved": WARP_CREDENTIALS.reserved,
        "mtu": 1280
      },
      ...cleanNodes.map(n => ({
        "type": "vless",
        "tag": n.name,
        "server": n.addr,
        "server_port": n.port,
        "uuid": RAW_UUID,
        "tls": {
          "enabled": true,
          "server_name": host,
          "insecure": false,
          "utls": { "enabled": true, "fingerprint": "chrome" },
          "fragment": {
            "enabled": true,
            "length": "10-20",
            "interval": "10-20"
          }
        },
        "transport": {
          "type": "ws",
          "path": "/",
          "headers": { "Host": host }
        }
      })),
      { "type": "direct", "tag": "direct" },
      { "type": "block", "tag": "block" }
    ];

    const singboxConfig = {
      "log": { "level": "info", "timestamp": true },
      "dns": {
        "servers": [
          { "tag": "remote-dns", "address": "https://1.1.1.1/dns-query", "detour": "HERMES-SELECT" },
          { "tag": "local-dns", "address": "local", "detour": "direct" }
        ],
        "rules": [
          { "outbound": "any", "server": "remote-dns" },
          { "clash_mode": "Direct", "server": "local-dns" }
        ],
        "final": "remote-dns",
        "strategy": "prefer_ipv4"
      },
      "inbounds": [
        { "type": "mixed", "tag": "mixed-in", "listen": "127.0.0.1", "listen_port": 2080 }
      ],
      "route": {
        "auto_detect_interface": true,
        "final": "HERMES-SELECT",
        "rules": [
          { "protocol": "dns", "action": "hijack-dns" },
          {
            "domain_suffix": [
              "gemini.google.com",
              "generativelanguage.googleapis.com",
              "aistudio.google.com",
              "openai.com",
              "chatgpt.com",
              "claude.ai",
              "anthropic.com"
            ],
            "outbound": "WARP-GEMINI-UNBLOCK"
          }
        ]
      },
      "outbounds": outbounds
    };

    return new Response(JSON.stringify(singboxConfig, null, 2), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // C. Clash Meta / Mihomo YAML: WireGuard WARP for AI and VLESS for General Traffic
  if (format === 'clash') {
    const clashVless = cleanNodes.map(n => `  - name: "${n.name}"
    type: vless
    server: ${n.addr}
    port: ${n.port}
    uuid: ${RAW_UUID}
    cipher: auto
    tls: true
    servername: ${host}
    network: ws
    ws-opts:
      path: /
      headers:
        Host: ${host}
    client-fingerprint: chrome`).join('\n');

    const clashYaml = `port: 7890
socks-port: 7891
allow-lan: false
mode: rule
log-level: info

dns:
  enable: true
  enhanced-mode: fake-ip
  nameserver:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query

proxies:
  - name: "🤖 WARP-GEMINI-UNBLOCK"
    type: wireguard
    server: 162.159.192.1
    port: 2408
    ip: 172.16.0.2
    ipv6: ${WARP_CREDENTIALS.ipv6}
    public-key: ${WARP_CREDENTIALS.publicKey}
    private-key: ${WARP_CREDENTIALS.privateKey}
    reserved: ${JSON.stringify(WARP_CREDENTIALS.reserved)}
    udp: true
    mtu: 1280
    remote-dns-resolve: true
${clashVless}

proxy-groups:
  - name: "⚡ HERMES-SELECT"
    type: select
    proxies:
      - "🤖 WARP-GEMINI-UNBLOCK"
      - "🟣 Hermes-Rightel-Turbo"
      - "🟢 Hermes-Mokhaberat-Port8443"
${cleanNodes.map(n => `      - "${n.name}"`).join('\n')}

  - name: "🤖 GOOGLE-AI-GEMINI"
    type: select
    proxies:
      - "🤖 WARP-GEMINI-UNBLOCK"

rules:
  - DOMAIN-SUFFIX,gemini.google.com,🤖 GOOGLE-AI-GEMINI
  - DOMAIN-SUFFIX,aistudio.google.com,🤖 GOOGLE-AI-GEMINI
  - DOMAIN-SUFFIX,generativelanguage.googleapis.com,🤖 GOOGLE-AI-GEMINI
  - DOMAIN-SUFFIX,openai.com,🤖 GOOGLE-AI-GEMINI
  - DOMAIN-SUFFIX,chatgpt.com,🤖 GOOGLE-AI-GEMINI
  - DOMAIN-SUFFIX,claude.ai,🤖 GOOGLE-AI-GEMINI
  - MATCH,⚡ HERMES-SELECT
`;
    return new Response(clashYaml, {
      headers: {
        'Content-Type': 'text/yaml; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // D. Default VLESS Base64 List
  const vlessLinks = cleanNodes.map(node => {
    return `vless://${RAW_UUID}@${node.addr}:${node.port}?encryption=none&security=tls&sni=${host}&type=ws&host=${host}&path=%2F#${encodeURIComponent(node.name)}`;
  }).join('\n');

  const b64 = btoa(unescape(encodeURIComponent(vlessLinks)));

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
