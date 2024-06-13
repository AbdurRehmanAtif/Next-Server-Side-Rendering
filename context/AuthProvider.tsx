"use client"
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect, use } from "react";
import AuthService from "@/service/AuthService";
import User from "@/models/User";
import { ApiResponse } from "@/service/http/NextApi";
import { Auth, Profile } from "@/app/components/auth/login/route";
import ProfileService from "@/service/ProfileService";

interface AuthContextType {
  auth: AuthService
  user: User
  isAppReady: boolean
  updateContextUser: Dispatch<SetStateAction<User>>
  isAuthenticated: Boolean;
  setIsAuthenticated: (value: boolean) => void;
  // updateContextUser: Dispatch<SetStateAction<User>>
  // updateAuth: Dispatch<SetStateAction<AuthService>>
  // isLoggedIn: Boolean;
  // setIsLoggedIn: (value: boolean) => void;

  // authService: typeof authServiceObject;
  // isLoggedIn: boolean | undefined;
  // login: (payload: any) => void;
  logout: () => void;
  // getToken: () => string | null;
  // role: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [auth] = useState(new AuthService());
  const [user, updateContextUser] = useState<User>(new User())
  const [isAppReady, setIsAppReady] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());


  function logout(){
    updateContextUser(new User())
    auth.logout()
    setIsAuthenticated(false)
  }
 

  useEffect(() => {

    const initialHandshake = async () => {
      const token = auth.getToken()
      setIsAuthenticated(false)
      if (token) {
        // Means token actually exist and now you can fetch the initial profile information.
        try {

          if (!user.isUserStateUpdated()) {
            // Do login verification or profile fetching because user is already logged in and refreshed the app.
            const newUser = new User()
            //const auth: Auth = await auth.fetchAuthDetailsUsingToken() // external api call
            const profile: ApiResponse<Profile> = await ProfileService.fetchProfileByToken<Profile>(token)// external api call
            //user.parseAuth(auth)
            newUser.parseProfile(profile.body.data)
            updateContextUser(newUser)
            setIsAppReady(true)
            setIsAuthenticated(true)

            // once we get the details, we just have to upload the global context state of the user.

            // setIsLoggedIn(true)
          }
          //Fetch Inital loggedIn USER Profile
          //Fetch user email
          //Fetch Settings
          //fetch theme settings
        } catch (error) {
          setIsAppReady(true)
          setIsAuthenticated(false)
        }
      } else {
        setIsAppReady(true)
        setIsAuthenticated(false)
      }
    };

    initialHandshake();
  }, []);


  const contextValue: AuthContextType = {

    auth,
    user,
    isAppReady,
    updateContextUser,
    isAuthenticated,
    setIsAuthenticated,
    // updateAuth,
    // updateContextUser,
    // isLoggedIn,
    // setIsLoggedIn,

    // isLoggedIn: authService.isLoggedIn(),
    // login: (payload) => authService.login(payload),
    logout: () => logout()
    // getToken: () => authService.getToken(),
    // role: () => authService.getRole(),
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
