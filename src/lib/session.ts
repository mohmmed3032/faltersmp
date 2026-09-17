// Session signing/verification using Web Crypto API (works in Edge + Node.js)

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(data: string): Promise<string> {
  const key = await getKey();
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const sigHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${data}.${sigHex}`;
}

export async function verifySession(signed: string): Promise<boolean> {
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return false;

  const data = signed.slice(0, idx);
  const sigHex = signed.slice(idx + 1);

  const key = await getKey();
  const encoder = new TextEncoder();
  const sigBytes = Uint8Array.from(
    sigHex.match(/.{2}/g)!.map((h) => parseInt(h, 16))
  );

  return crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(data));
}

export function getSessionData(signed: string): string {
  return signed.slice(0, signed.lastIndexOf("."));
}
