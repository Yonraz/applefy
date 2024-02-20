import {
  Route,
  Navigate,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./state/authContext/AuthContext";
import AddPlaylistForm from "./components/addPlaylistForm/AddPlaylistForm";
import Playlists from "./components/playlistComponents/playlists/Playlists";
import Main from "./components/main/Main";
import PlaylistItem from "./components/playlistComponents/playlistItem/PlaylistItem";
import TracksToAdd from "./components/tracks/tracksToAdd/TracksToAdd";
import AwaitAddLoadingScreen from "./components/loadingScreen/AwaitAddLoadingScreen";
import Header from "./components/layout/Header";

function App() {
  return (
    <>
      <Router>
        <header>
          <Header />
        </header>
        <section className="body">
          <AuthProvider>
            <Routes>
              <Route path="/" Component={Main} />
              <Route path="/playlists" Component={Playlists} />
              <Route path="/create/:userId" Component={AddPlaylistForm} />
              <Route path="/playlist/:playlistId" Component={PlaylistItem} />
              <Route path="/addtracks/:playlistId" Component={TracksToAdd} />
              <Route path="/awaitadd" Component={AwaitAddLoadingScreen} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </AuthProvider>
        </section>
      </Router>
    </>
  );
}

export default App;
