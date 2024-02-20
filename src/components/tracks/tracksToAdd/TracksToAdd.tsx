import { useState } from "react";
import AddTracksForm from "../addTracksForm/AddTracksForm";
import { useParams } from "react-router-dom";
import TrackToAddListItem from "./trackToAddListItem/TrackToAddListItem";
import "./TracksToAdd.css";
import { searchItem } from "./requests/searchTrack";
import { v4 } from "uuid";
import { TrackObjectType } from "../../../types/trackTypes/trackTypes";
import { addItemsToPlaylistById } from "./requests/addItemsToPlaylist";
export interface trackFinderType {
  data: { name: string; album: string; artist: string };
  found: boolean;
  id: string;
  img: string | null;
  uri: string | null;
}

function getMatchAlbum(
  track: trackFinderType,
  data: TrackObjectType,
  album: string
) {
  return (
    track.data.album === "" ||
    data.album.name.trim().toLowerCase() === album.trim().toLowerCase()
  );
}

function getMatchName(track: trackFinderType, data: TrackObjectType) {
  return data.name
    .trim()
    .toLowerCase()
    .includes(track.data.name.trim().toLowerCase());
}
function getMatchArtist(
  track: trackFinderType,
  data: TrackObjectType,
  artist: string
) {
  return (
    track.data.artist === "" ||
    data.artists.find((a) =>
      a.name
        .trim()
        .toLocaleLowerCase()
        .includes(artist.trim().toLocaleLowerCase())
    )
  );
}

export default function TracksToAdd() {
  const [tracks, setTracks] = useState<trackFinderType[]>([]);
  const { playlistId } = useParams();
  function handleAddTrack(track: trackFinderType) {
    setTracks((prev) => [...prev, track]);
    getTrack(track);
  }

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
        prev.map((track) => {
          const matchName = getMatchName(track, data);
          const matchAlbum = getMatchAlbum(track, data, album);
          const matchArtist = getMatchArtist(track, data, artist);
          if (matchName && matchAlbum && matchArtist) {
            track.id = data.id;
            track.found = true;
            track.img = data.album.images[0].url;
            track.uri = data.uri;
            if (data.album.name) {
              track.data.album = data.album.name;
            }
            if (data.artists[0]) {
              track.data.artist = data.artists[0].name;
            }
          }
          return track;
        })
      );
    }
  }

  async function addItemsToPlaylist() {
    try {
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
    } catch (e) {
      console.error(e);
    }
  }

  function handleAddTracks() {
    addItemsToPlaylist();
  }

  function handleRemove(trackId: string) {
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
  }
  return (
    <>
      <AddTracksForm addTrack={handleAddTrack} />
      {tracks.length > 0 &&
        tracks.map((track) => (
          <div key={v4()} className="tracklist-item">
            <TrackToAddListItem track={track} handleRemove={handleRemove} />
          </div>
        ))}
      <button onClick={handleAddTracks}>Add</button>
    </>
  );
}
