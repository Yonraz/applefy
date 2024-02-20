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

  function handleReturn(): void {
    navigate(`/playlists`);
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {playlist && (
        <div>
          <h1>{playlist.name}</h1>
          <div className="buttons">
            <button onClick={handleAddTracks}>Add Tracks</button>
            <button onClick={handleReturn}>Return to playlists</button>
          </div>
          <div className="tracks-container">
            {playlist.tracks.items &&
              playlist.tracks.items.map((track) => (
                <div
                  key={track.track.id}
                  className="track-item card-background"
                >
                  <img src={track.track.album.images[0].url} />
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
