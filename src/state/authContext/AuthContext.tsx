import { createContext, useState } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
// @ts-expect-error easd
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
