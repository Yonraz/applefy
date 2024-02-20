import { useEffect, useState } from "react";
import useCodeChallenge from "../UseCodeChallenge/useCodeChallenge";

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export default function useSpotifyAuth() {
  const storageVerifier = localStorage.getItem("code_verifier");
  const codeVerifier = !storageVerifier
    ? generateRandomString(64)
    : storageVerifier;
  console.log("in auth " + codeVerifier);
  const codeChallenge = useCodeChallenge(codeVerifier);
  const [readyToRequest, setReadyToRequest] = useState(false);
  useEffect(() => {
    if (!codeChallenge || readyToRequest) return;
    else setReadyToRequest(true);
  }, [codeChallenge]);

  const clientId = "f40436f8ac9f46118fa58893beb1514b";
  const redirectUri = "http://localhost:5173/";
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const scope =
    "user-read-private user-read-email playlist-modify-public playlist-modify-private";

  useEffect(() => {
    if (codeVerifier) {
      if (!localStorage.getItem("code_verifier"))
        localStorage.setItem("code_verifier", codeVerifier);
    }
  }, [codeVerifier]);

  function requestAuth() {
    try {
      if (!readyToRequest || !codeChallenge) return;
      const params = {
        response_type: "code",
        client_id: clientId,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return requestAuth;
}

export const getToken = async (code: string) => {
  try {
    console.log("getting token");
    const url = "https://accounts.spotify.com/api/token";
    const clientId = "f40436f8ac9f46118fa58893beb1514b";
    const redirectUri = "http://localhost:5173/";
    const codeVerifier = localStorage.getItem("code_verifier");
    if (!codeVerifier) throw new Error("verifier doesnt exist");
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };
    const response = await fetch(url, payload);
    console.log(response);
    if (!response.ok) throw new Error("token failed" + response);
    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem(
      "spotify_token_expires_at",
      (Date.now() + data.expires_in * 1000).toString()
    );
    return data.access_token !== undefined;
  } catch (e) {
    console.log(e);
    return false;
  }
};
