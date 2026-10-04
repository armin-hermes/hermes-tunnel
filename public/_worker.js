import { connect } from 'cloudflare:sockets';

const TARGET_UUID = 'f2fa065d1dff468aa7cb3faf1352b8ce';
const RAW_UUID = 'f2fa065d-1dff-468a-a7cb-3faf1352b8ce';
const TROJAN_HASH = 'c0ad1ef0879889c7cd7c90a1e86d3a949ec1560394193ff5445b17d9';
const NAT64_PREFIXES = ['[2602:fc59:b0:64::]', '[2602:fc59:11:64::]', '[2a02:898:146:64::]'];

export default {
  async fetch(request, env) {
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

    // 3. Fallback to static assets (HTML/CSS/JS)
    if (env && env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Hermes Tunnel Gateway - Active', { status: 200 });
  }
};

function handleSubscription(request, url) {
  const host = request.headers.get('host') || url.hostname;
  
  // Curated clean IPs for Iranian ISPs (especially Rightel)
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
          idx++; // command
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
