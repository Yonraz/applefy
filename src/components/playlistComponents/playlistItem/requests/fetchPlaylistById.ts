import {
  PlaylistResponseObject,
} from "../../../types/playlistTypes/playlistTypes";

export const fetchPlaylistById = async (playlistId: string) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("access token not found");
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: PlaylistResponseObject = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
