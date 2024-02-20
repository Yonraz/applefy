import { TrackObjectType } from "../../../../types/trackTypes/trackTypes";
import { trackFinderType } from "../TracksToAdd";

export function getMatchAlbum(
  track: trackFinderType,
  data: TrackObjectType,
  album: string
) {
  return (
    track.data.album === "" ||
    data.album.name.trim().toLowerCase() === album.trim().toLowerCase()
  );
}

export function getMatchName(track: trackFinderType, data: TrackObjectType) {
  return data.name
    .trim()
    .toLowerCase()
    .includes(track.data.name.trim().toLowerCase());
}
export function getMatchArtist(
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
