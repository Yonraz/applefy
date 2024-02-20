import { useNavigate } from "react-router-dom";
import { SimplifiedPlaylistObjectType } from "../../types/playlistTypes/playlistTypes";
import "./PlaylistCard.css";
export default function PlaylistCard(props: {
  playlist: SimplifiedPlaylistObjectType;
}) {
  const { playlist } = props;
  const navigate = useNavigate();
  const playlistImage = playlist.images[0] ? playlist.images[0].url : "";
  const imageWidth = playlist.images[0]
    ? playlist.images[0].width / 5
    : "200px";
  return (
    <>
      <div
        className="playlist-card"
        onClick={() => navigate(`/playlist/${playlist.id}`)}
      >
        <div className="playlist-card-header">
          <img src={playlistImage} style={{ width: imageWidth }} />
          <div className="playlist-card-body">
            <h3>{playlist.name}</h3>
            <p>{playlist.tracks.total} tracks</p>
          </div>
        </div>
      </div>
    </>
  );
}
