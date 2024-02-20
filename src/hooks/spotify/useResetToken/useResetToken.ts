import { useEffect, useState } from "react";

export default function useResetToken() {
  const [tokenExpired, setTokenExpired] = useState<boolean>(isTokenExpired());
  const refreshToken = async () => {
    try {
      await requestNewToken();
      setTokenExpired(isTokenExpired());
    } catch (e) {
      console.error(e);
    }
  };
  const checkAndRefreshToken: () => void = () => {
    if (tokenExpired) {
      refreshToken();
    }
  };
  useEffect(() => {
    checkAndRefreshToken();
  }, []);
  return [tokenExpired, checkAndRefreshToken] as const;
}

function isTokenExpired() {
  const expiredAt = localStorage.getItem("spotify_token_expires_at");
  if (!expiredAt) {
    console.warn("Token expiration time not found in localStorage");
    return true;
  }
  return parseInt(expiredAt) < Date.now();
}

async function requestNewToken() {
  try {
    const clientId = "f40436f8ac9f46118fa58893beb1514b";
    const grant_type = "refresh_token";
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) throw new Error("refresh token not found");
    const url = "https://accounts.spotify.com/api/token";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type,
        client_id: clientId,
        refresh_token,
      }),
    });
    if (!response.ok) throw new Error("access token refresh failed");
    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem(
      "spotify_token_expires_at",
      (Date.now() + data.expires_in * 1000).toString()
    );
  } catch (e) {
    console.error(e);
  }
}
