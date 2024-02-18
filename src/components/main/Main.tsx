import { useContext } from "react";
import { AuthContext } from "../../state/authContext/AuthContext";
import AuthHandler from "../AuthHandler/AuthHandler";

export default function Main() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <>
      <AuthHandler isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}
