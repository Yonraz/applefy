import {
  Route,
  Navigate,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./state/authContext/AuthContext";
import AddPlaylistForm from "./components/addPlaylistForm/AddPlaylistForm";
import Playlists from "./components/playlistCreator/Playlists";
import Main from "./components/main/Main";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" Component={Main} />
            <Route path="/playlists" Component={Playlists} />
            <Route path="/create/:userId" Component={AddPlaylistForm} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
