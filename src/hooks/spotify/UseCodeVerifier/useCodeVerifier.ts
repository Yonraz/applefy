import { useEffect, useState } from "react";

export default function useCodeVerifier() {
  const [codeVerifier, setCodeVerifier] = useState<string | null>();
  useEffect(() => {
    const verifier = localStorage.getItem("code_verifier");
    if (verifier && verifier !== "undefined") {
      setCodeVerifier(verifier);
    } else {
      const newVerifier = generateRandomString(64);
      setCodeVerifier(newVerifier);
    }
  }, []);
  return codeVerifier;
}
const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
