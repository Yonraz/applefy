export async function sendPlaylist(
  userId: string,
  formData: { name: string; description: string; isPublic: boolean }
) {
  try {
    const { name, description, isPublic } = formData;
    const token = localStorage.getItem("access_token");
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const body = JSON.stringify({
      name,
      description,
      public: isPublic,
    });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) throw new Error("failed to create playlist");
    const data = await response.json();
    console.log(data);
    console.log(data);
    window.location.reload();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
