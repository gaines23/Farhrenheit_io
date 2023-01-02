import React, { useState, useCallback } from "react";

const AuthContext = React.createContext({
    token: '',
    refresh: '',
    fah_id: '',
    isLoggedIn: false,
    login: (token, refresh, fah_id) => {},
    logout: () => {}
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedRefresh = localStorage.getItem('refresh');
    const storedFahId = localStorage.getItem('fah_id');

    return {
        token: storedToken,
        refresh: storedRefresh,
        fah_id: storedFahId,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();

    let initialToken;
    let initialRefresh;
    let initialFahId;

    if (tokenData) {
        initialToken = tokenData.token;
        initialRefresh = tokenData.refresh;
        initialFahId = tokenData.fah_id;
    }

    const [token, setToken] = useState(initialToken);
    const [refresh, setRefresh] = useState(initialRefresh);
    const [fah_id, setFahId] = useState(initialFahId);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setRefresh(null);
        localStorage.clear();
    }, []);

    const loginHandler = (token, refresh, fah_id) => {
        setToken(token);
        setRefresh(refresh);
        setFahId(fah_id);
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('fah_id', fah_id);
    };

    const contextValue = {
        token: token,
        refresh: refresh,
        fah_id: fah_id,
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