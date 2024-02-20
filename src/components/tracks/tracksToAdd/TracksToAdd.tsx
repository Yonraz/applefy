import { useState } from "react";
import AddTracksForm from "../addTracksForm/AddTracksForm";
import { useNavigate, useParams } from "react-router-dom";
import TrackToAddListItem from "./trackToAddListItem/TrackToAddListItem";
import "./TracksToAdd.css";
import { searchItem } from "./requests/searchTrack";
import { v4 } from "uuid";
import { addItemsToPlaylistById } from "./requests/addItemsToPlaylist";
import { getMatchAlbum, getMatchArtist, getMatchName } from "./helpers/helpers";
import useResetToken from "../../../hooks/spotify/useResetToken/useResetToken";
import imageNotFound from "../../../assets/images/image-not-found.png";
export interface trackFinderType {
  data: { name: string; album: string; artist: string };
  found: boolean;
  id: string;
  img: string | null;
  uri: string | null;
}

export default function TracksToAdd() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tokenExpired, checkAndRefreshToken] = useResetToken();
  const [tracks, setTracks] = useState<trackFinderType[]>([]);
  const { playlistId } = useParams();
  function handleAddTrack(track: trackFinderType) {
    setTracks((prev) => [...prev, track]);
    getTrack(track);
  }
  const navigate = useNavigate();

  async function getTrack(track: trackFinderType) {
    let { name, album, artist } = track.data;
    name = name.trim();
    artist = artist.trim();
    album = album.trim();
    const data = await searchItem({
      track: name,
      album,
      artist,
    });
    if (data) {
      setTracks((prev) =>
        prev.map((currentTrack) => {
          const matchName = getMatchName(currentTrack, data);
          const matchAlbum = getMatchAlbum(currentTrack, data, album);
          const matchArtist = getMatchArtist(currentTrack, data, artist);
          if (matchName && matchAlbum && matchArtist) {
            currentTrack.id = data.id;
            currentTrack.found = true;
            currentTrack.img = data.album.images[0].url;
            currentTrack.uri = data.uri;
            if (data.album.name) {
              currentTrack.data.album = data.album.name;
            }
            if (data.artists[0]) {
              currentTrack.data.artist = data.artists[0].name;
            }
          }
          return currentTrack;
        })
      );
    } else {
      setTracks((prev) =>
        prev.map((currentTrack) => {
          if (currentTrack.data.name === name) {
            if (currentTrack.found) return track;
            currentTrack.img = imageNotFound;
          }
          return track;
        })
      );
    }
  }

  async function addItemsToPlaylist() {
    try {
      if (tokenExpired) checkAndRefreshToken();
      const trackUris = tracks.map((track) => track.uri);
      let length = trackUris.length;
      let index = 0;
      if (length >= 100) {
        while (length > 0) {
          const uris = trackUris
            .slice(index, index + 99)
            .filter((item) => item !== null) as string[];
          index += 99;
          length -= 99;
          if (playlistId === undefined) return;
          const response = await addItemsToPlaylistById(playlistId, uris);
          if (!response) throw new Error("operation failed");
        }
      }
      const uris = trackUris.filter((item) => item !== null) as string[];
      index += 99;
      length -= 99;
      if (playlistId === undefined) return;
      const response = await addItemsToPlaylistById(playlistId, uris);
      if (!response) throw new Error("operation failed");
      navigate(`/playlist/${playlistId}`);
    } catch (e) {
      console.error(e);
      navigate(`/playlists/${e}`);
    }
  }

  function handleAddTracks() {
    navigate("/awaitadd");
    addItemsToPlaylist();
  }

  function handleRemove(trackId: string) {
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
  }
  return (
    <>
      <AddTracksForm
        addTrack={handleAddTrack}
        navigate={navigate}
        playlistId={playlistId === undefined ? "" : playlistId}
      />
      {tracks.length > 0 &&
        tracks.map((track) => (
          <div key={v4()} className="tracklist-item">
            <TrackToAddListItem track={track} handleRemove={handleRemove} />
          </div>
        ))}

      {tracks.length > 0 && (
        <button className="add-btn" onClick={handleAddTracks}>
          Add tracks to spotify
        </button>
      )}
    </>
  );
}
