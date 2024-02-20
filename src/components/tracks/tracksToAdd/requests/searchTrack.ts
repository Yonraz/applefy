import { TracksFromSearchType } from "../../../../types/trackTypes/trackTypes";

interface TrackData {
  track: string;
  artist: string;
  album: string;
}

interface ResponseData {
  tracks: TracksFromSearchType;
}

export async function searchItem(trackData: TrackData) {
  try {
    const { track, artist, album } = trackData;
    const encodedTrack = encodeURIComponent(track);
    const encodedAlbum = encodeURIComponent(album);
    const encodedArtist = encodeURIComponent(artist);
    // Construct the query string with properly encoded values
    const query = buildQuery({
      track: encodedTrack,
      album: encodedAlbum,
      artist: encodedArtist,
    });
    const token = localStorage.getItem("access_token");
    const url = `https://api.spotify.com/v1/search?${query}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("fetching error");
    }
    const data: ResponseData = await response.json();
    if (!data.tracks.items || data.tracks.items.length === 0)
      throw new Error("no items found");
    return data.tracks.items[0];
  } catch (e) {
    console.error(e);
  }
}

function buildQuery(data: { track: string; album: string; artist: string }) {
  const { track, artist, album } = data;
  let query = `q=track:${track}`;
  if (album !== "") query += ` album:${album}`;
  if (artist !== "") query += ` artist:${artist}`;
  query += "&type=track";
  return query;
}
