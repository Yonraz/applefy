import { useEffect, useState } from "react";
import { SimplifiedPlaylistObjectType } from "../../types/playlistTypes/playlistTypes";
import PlaylistCard from "../playlistCard/PlaylistCard";
import "./Playlists.css";
import { useNavigate } from "react-router-dom";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<SimplifiedPlaylistObjectType[]>();
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  async function getPlaylists() {
    const playlists: SimplifiedPlaylistObjectType[] =
      await fetchUserPlaylists();
    setPlaylists(playlists);
  }
  useEffect(() => {
    getPlaylists();
  }, []);
  useEffect(() => {
    if (!playlists || userId !== "") return;
    setUserId(playlists[0].owner.id);
  }, [playlists]);
  return (
    <>
      <div>
        <button onClick={() => navigate(`/create/${userId}`)}>
          Create new playlist
        </button>
        <h1>Your Playlists:</h1>
        <div className="user-playlists">
          {playlists &&
            playlists.map((x) => <PlaylistCard playlist={x} key={x.id} />)}
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
