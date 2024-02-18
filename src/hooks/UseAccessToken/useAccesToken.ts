import { useEffect, useState } from "react";
const client_id = "f40436f8ac9f46118fa58893beb1514b";
const client_secret = "52cc3409c271475e806815fa48d1117b";
export default function useAccessToken() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyAccessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    } else {
      requestAccessToken();
    }
  }, []);
  const requestAccessToken = async () => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });
      if (!response.ok) {
        throw new Error("something happened" + response);
      }
      const data: spotifyAccessTokenData = await response.json();
      const accessToken: string = data.access_token;
      localStorage.setItem("spotifyAccessToken", accessToken);
      setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      // @ts-expect-error error type any
      console.error(error.message);
      return "error";
    }
  };
  return [accessToken, requestAccessToken] as const;
}

interface spotifyAccessTokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
}
