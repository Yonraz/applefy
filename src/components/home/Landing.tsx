import { useContext } from "react";
import useSpotifyAuth from "../../hooks/UseSpotifyAuth/useSpotifyAuth";
import { AuthContext } from "../../state/authContext/AuthContext";

export default function Landing() {
  const { isLoggedIn } = useContext(AuthContext);
  const requestAuth = useSpotifyAuth();

  function handleClick(): void {
    requestAuth();
  }
  return (
    <div>
      <h1>Welcome to applefy!</h1>
      <h3>log in to spotify to start creating playlists!</h3>
      {!isLoggedIn && <button onClick={handleClick}>spotify</button>}
    </div>
  );
}
