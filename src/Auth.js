import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    // firebase.auth().onAuthStateChanged((user) => {
    //   setCurrentUser(user)
    //   setPending(false)
    // });

    let accessToken = localStorage.getItem("accessToken");
    if(currentUser !== accessToken){
      setCurrentUser(accessToken);
    }

    setPending(false);

  }, [currentUser]);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};