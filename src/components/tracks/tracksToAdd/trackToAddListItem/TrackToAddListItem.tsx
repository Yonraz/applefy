import { trackFinderType } from "../TracksToAdd";
import "./TrackToAddListItem.css";
import loader from "../../../../assets/images/loader-blue.gif";
interface props {
  track: trackFinderType;
  handleRemove: (value: string) => void;
}

export default function TrackToAddListItem(props: props) {
  const { track, handleRemove } = props;
  return (
    <>
      <div className="track-list-item-container">
        <img src={track.img ? track.img : loader} />
        <div className="track-list-item-details-container">
          <h3>{track.data.name}</h3>
          <div className="">
            {track.data.album !== "" && <p>Album: {track.data.album}</p>}
            {track.data.artist !== "" && <p>Artist: {track.data.artist} </p>}
          </div>
        </div>
        <p>{!track.found ? "❌" : "✅"}</p>
        <button className="remove-btn" onClick={() => handleRemove(track.id)}>x</button>
      </div>
    </>
  );
}
