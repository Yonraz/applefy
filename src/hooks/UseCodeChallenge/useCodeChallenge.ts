import { useState, useEffect } from "react";
const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};
const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export default function useCodeChallenge(
  codeVerifier: string | null | undefined
) {
  const [codeChallenge, setCodeChallenge] = useState<string>();
  useEffect(() => {
    if (codeVerifier && codeVerifier !== undefined) {
      if (codeVerifier === "undefined") return;
      getCodeChallenge(codeVerifier);
    }
  }, []);

  async function getCodeChallenge(codeVerifier: string) {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    setCodeChallenge(codeChallenge);
  }

  return codeChallenge;
}
