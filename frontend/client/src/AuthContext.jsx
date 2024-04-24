import React, { useContext, useState } from "react";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

const useAuthStatus = () => {
    return useContext(AuthContext);
}

const useAuthStatusUpdate = () => {
    return useContext(AuthUpdateContext);
}

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const authenticate = () => {
        setLoggedIn(true);
    }
    
    const logout = async () => {
        setLoggedIn(false);
        await fetch('/api/logout', {
            method: "POST"
        });
    }

    const authStatusObject = {
        authenticate,
        logout,
        login: authenticate
    }

    return (
        <AuthContext.Provider value={loggedIn}>
            <AuthUpdateContext.Provider value={authStatusObject}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
};

export {
    useAuthStatus,
    useAuthStatusUpdate,
    AuthContextProvider
}