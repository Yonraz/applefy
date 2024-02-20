import { useState } from "react";
import { trackFinderType } from "../tracksToAdd/TracksToAdd";
import { v4 } from "uuid";
import "./AddTracksForm.css";

interface tracksformProps {
  addTrack: (value: trackFinderType) => void;
}

export default function AddTracksForm(props: tracksformProps) {
  const { addTrack } = props;
  const [track, setTrack] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trackData = {
      data: { name: track, album, artist },
      found: false,
      id: v4(),
      img: null,
      uri: null,
    };
    addTrack(trackData);
    resetFields();
  }

  function resetFields() {
    setTrack("");
    setAlbum("");
    setArtist("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="text-label">Track Name</label>
        <div>
          <input
            className="text-input"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            required
          />
        </div>
        <label className="text-label optional">
          Album Name <span>optional</span>
        </label>
        <div>
          <input
            className="text-input"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </div>
        <label className="text-label optional">
          Artist Name <span>optional</span>
        </label>
        <div>
          <input
            className="text-input"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          Add track
        </button>
      </form>
    </>
  );
}
