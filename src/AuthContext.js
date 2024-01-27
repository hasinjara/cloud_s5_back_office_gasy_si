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
    const getHeaderTokenTest = () => {
        const token = getToken() + "1"; // Assurez-vous que la fonction getToken() est définie et retourne le token
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

    function estUnNombre(input) {
        const nombre = parseFloat(input);
        return !isNaN(nombre) && isFinite(nombre);
    }
    function estNegatif(nombre) {
        return nombre < 0;
    }
    function contientUniquementLettresEtChiffres(chaine) {
        return /^[A-Za-z0-9]*$/.test(chaine);
    }
    function contientCaractereSpecial(chaine) {
        return /[^A-Za-z0-9]/.test(chaine);
    }
    function NeContientPasCharactereSpecial(chaine) {
        return contientUniquementLettresEtChiffres(chaine)
    }
    function getStatusError(error) {
        return error.response.status
    }
    function handleRequestError(error) {
        if (error.response.status == 500) {
            logout();
        }
        console.log("Détails de l'erreur : ", error.response.data);
        if (error.request) {
            console.log("Erreur de requête : ", error.request);
            console.log("Message d'Erreur : ", error.message);
        }
    }
    const anneeActuelle = new Date().getFullYear();
    return (
        <AuthContext.Provider value={{ anneeActuelle, authToken, url, userInfo,handleRequestError,getHeaderTokenTest, NeContientPasCharactereSpecial, estNegatif, estUnNombre, getToken, getidUser, InitializeUserInfo, DestructUserInfo, login, logout, InitializeToken, DestructToken, getHeaderToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
