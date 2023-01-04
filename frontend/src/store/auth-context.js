import React, { useState, useCallback } from "react";

const AuthContext = React.createContext({
    token: '',
    refresh: '',
    isLoggedIn: false,
    login: (token, refresh) => {},
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

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setRefresh(null);
        localStorage.clear();
    }, []);

    const loginHandler = (token, refresh) => {
        setToken(token);
        setRefresh(refresh);
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
    };

    const contextValue = {
        token: token,
        refresh: refresh,
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