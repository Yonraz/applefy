import React, { useEffect } from "react";
import { getToken } from "../../hooks/spotify/UseSpotifyAuth/useSpotifyAuth";
import { useNavigate } from "react-router-dom";
import Landing from "../home/Landing";

interface AuthHandlerProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}
const AuthHandler = React.memo(
  ({ isLoggedIn, setIsLoggedIn }: AuthHandlerProps) => {
    const urlParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const code = urlParams.get("code");
    const error = urlParams.get("code");

    useEffect(() => {
      if (!code) return;
      async function handleCode(code: string) {
        if (code && !isLoggedIn) {
          console.log(`in handle code ${code}, ${isLoggedIn}`);
          awaitToken(code);
        }
      }
      async function awaitToken(code: string) {
        try {
          const tokenValid = await getToken(code);
          setIsLoggedIn(true);
          console.log("token" + tokenValid);
        } catch (e) {
          console.log(e);
        }
      }
      if (code) handleCode(code);
    }, [code]);
    if (!code || (error && error === "access_denied")) {
      return (
        <>
          <Landing />
        </>
      );
    }
    navigate("/playlists");
  }
);

export default AuthHandler;
