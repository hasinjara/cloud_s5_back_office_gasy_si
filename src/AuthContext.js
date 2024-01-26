import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
    const [url, setUrl] = useState(localStorage.getItem('url') || '');
    const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo') || null);

    useEffect(() => {
        setUrl("https://devvoitures5backend-production.up.railway.app/");
    }, []);

    const InitializeToken = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const DestructToken = () => {
        localStorage.removeItem('authToken');
        setAuthToken('');
    };
    // login(response.data.data[1].token, response.data.data[0]);
    const getToken = () => {
        const json = localStorage.getItem('authToken');
        if (json != null) {
            return json;
        }
        return null;
    }
    const getHeaderToken = () => {
        const token = getToken(); // Assurez-vous que la fonction getToken() est définie et retourne le token
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
    };
    const getidUser = () => {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            return userInfo.idUser;
        }
        return null;
    };

    const login = (token, userInfo) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setAuthToken(token);
        setUserInfo(userInfo);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken('');
        localStorage.removeItem('userInfo');
        setUserInfo(null);
    };

    const InitializeUserInfo = (userInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setUserInfo(userInfo);
    };

    const DestructUserInfo = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, url, userInfo, getToken, getidUser, InitializeUserInfo, DestructUserInfo, login, logout, InitializeToken, DestructToken, getHeaderToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
