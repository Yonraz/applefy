import { useState } from "react";
import "./AddPlaylistForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { sendPlaylist } from "./requests/sendPlaylistRequest";

export default function AddPlaylistForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState("");
  const { userId } = useParams();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = { name, description, isPublic };
    if (userId === undefined) return;
    sendPlaylist(userId, formData);
  }

  function handleBack(): void {
    navigate("/playlists");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="text-label">Name</label>
        <div>
          <input
            className="text-input"
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="text-label"
            type="checkbox"
            name="public"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label>Public playlist</label>
        </div>
        <label className="text-label">Description</label>
        <div>
          <textarea
            className="text-input"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add playlist</button>
        <button onClick={handleBack}>Back</button>
      </form>
    </>
  );
}
