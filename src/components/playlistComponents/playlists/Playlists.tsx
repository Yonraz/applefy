import { useEffect, useState } from "react";
import { SimplifiedPlaylistObjectType } from "../../../types/playlistTypes/playlistTypes";
import PlaylistCard from "../playlistCard/PlaylistCard";
import "./Playlists.css";
import { useNavigate, useParams } from "react-router-dom";
import useResetToken from "../../../hooks/spotify/useResetToken/useResetToken";

export default function Playlists() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tokenExpired, checkAndRefreshToken] = useResetToken();
  const [playlists, setPlaylists] = useState<SimplifiedPlaylistObjectType[]>();
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { error } = useParams();
  async function getPlaylists() {
    if (tokenExpired) checkAndRefreshToken();
    const playlists: SimplifiedPlaylistObjectType[] =
      await fetchUserPlaylists();
    setPlaylists(playlists);
  }
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
    getPlaylists();
  }, []);
  useEffect(() => {
    if (!playlists || userId !== "") return;
    setUserId(playlists[0].owner.id);
  }, [playlists]);
  function handleErrorDismiss(): void {
    setShowError(false);
  }

  return (
    <>
      <div className="container">
        {showError && (
          <div className="error-div">
            <button onClick={handleErrorDismiss}>dismiss</button>
            <p>{error}</p>
          </div>
        )}
        <h2>Your Playlists:</h2>
        <div className="justify-left">
          <button
            className="create-new-button"
            onClick={() => navigate(`/create/${userId}`)}
          >
            <span className="large-screen-text">Create new playlist</span>
          </button>
          <div className="user-playlists">
            {playlists &&
              playlists.map((x) => <PlaylistCard playlist={x} key={x.id} />)}
          </div>
        </div>
      </div>
    </>
  );
}

async function fetchUserPlaylists() {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("no access token");
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error("something went wrong in the response");
    const playlistArray: SimplifiedPlaylistObjectType[] = data.items;
    return playlistArray;
  } catch (e) {
    console.error(e);
    return [];
  }
}
