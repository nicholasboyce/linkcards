import React, { useContext, useEffect, useState } from "react";

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
    const [user, setUser] = useState('');

    useEffect(() => {
        const abortController = new AbortController();
    
        const fetchUserStatus = async () => {
          try {
            const response = await fetch(`/api/users/status/`, {
              signal: abortController.signal
            });

            if (response.status === 200) {
                const userData = await response.json();
                setLoggedIn(true);
                setUser(userData.username);
            }
    
            // setPicture(userData.picture);
          } catch(error) {
            console.log(error);
          }
        }
    
        fetchUserStatus();
        return () => abortController.abort();
    }, []);

    const authenticate = (username) => {
        setLoggedIn(true);
        setUser(username);
    }
    
    const logout = async () => {
        setLoggedIn(false);
        const csrfResponse = await fetch('/api/csrf');
        const csrf = await csrfResponse.json()
        const options = new Request('/api/logout', {
            method: 'POST',
            headers: {
                'x-csrf-token': csrf.token,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const response = await fetch(options);
        console.log(response.status);
    }

    const authStatusUpdateObject = {
        authenticate,
        logout,
        login: authenticate
    }

    return (
        <AuthContext.Provider value={{ authenticated: loggedIn, user }}>
            <AuthUpdateContext.Provider value={authStatusUpdateObject}>
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