import React, { useState, useCallback } from "react";

const AuthContext = React.createContext({
    token: '',
    refresh: '',
    username: '',
    apps: false,
    isLoggedIn: false,
    login: (token, refresh, username, apps) => {},
    logout: () => {}
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedRefresh = localStorage.getItem('refresh');

    return {
        token: storedToken,
        refresh: storedRefresh,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();

    let initialToken;
    let initialRefresh;

    if (tokenData) {
        initialToken = tokenData.token;
        initialRefresh = tokenData.refresh;
    }

    const [token, setToken] = useState(initialToken);
    const [refresh, setRefresh] = useState(initialRefresh);
    const [username, setUsername] = useState('');
    const [isFollowingApps, setFollowingApps] = useState();

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setRefresh(null);
        localStorage.clear();
    }, []);

    const loginHandler = (token, refresh, username, apps) => {
        setToken(token);
        setRefresh(refresh);
        setUsername(username);
        setFollowingApps(apps);
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
    };

    const contextValue = {
        token: token,
        refresh: refresh,
        username: username,
        apps: isFollowingApps,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;