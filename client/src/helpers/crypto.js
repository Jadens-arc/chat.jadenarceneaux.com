const subtle = window.crypto.subtle;

export const generateECDHKeyPair = async () => {
  return await crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey"]
  );
};

export const deriveAESKey = async (password, salt) => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
};

export const encryptPrivateKey = async (privateKey, aesKey) => {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM needs 12-byte IV
  const pkcs8 = await crypto.subtle.exportKey("pkcs8", privateKey);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    aesKey,
    pkcs8
  );

  return { encryptedPrivateKey: encrypted, iv };
};


