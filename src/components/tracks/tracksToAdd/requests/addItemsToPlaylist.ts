export async function addItemsToPlaylistById(
  playlistId: string,
  trackUris: string[]
) {
  try {
    const token = localStorage.getItem("access_token");
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const body = JSON.stringify({
      uris: trackUris,
    });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) throw new Error("add items failed");
    return true;
  } catch (e) {
    console.error(e);
  }
}
