import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPlaylistById } from "./requests/fetchPlaylistById";
import { PlaylistResponseObject } from "../../../types/playlistTypes/playlistTypes";
import "./PlaylistItem.css";

export default function PlaylistItem() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistResponseObject>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPlaylist() {
      if (playlistId === undefined) return;
      const data = await fetchPlaylistById(playlistId);
      setPlaylist(data);
      setIsLoading(false);
    }
    fetchPlaylist();
  }, []);
  function handleAddTracks(): void {
    navigate(`/addtracks/${playlistId}`);
  }

  return (
    <>
      <button onClick={handleAddTracks}>Add Tracks</button>
      {isLoading && <h1>Loading...</h1>}
      {playlist && (
        <div>
          <h1>{playlist.name}</h1>
          <div className="tracks-container">
            {playlist.tracks.items &&
              playlist.tracks.items.map((track) => (
                <div key={track.track.id} className="track-item">
                  <img
                    src={track.track.album.images[0].url}
                    style={{ width: track.track.album.images[0].width / 2 }}
                  />
                  <h2>{track.track.name}</h2>
                  <p>Album: {track.track.album.name}</p>
                  <p>
                    Artist:{" "}
                    {track.track.artists.map((a) => (
                      <span key={a.id}>{a.name} </span>
                    ))}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
