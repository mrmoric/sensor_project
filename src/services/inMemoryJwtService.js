import { ajaxRefreshToken } from './authenticationService';

const inMemoryJwtService = () => {
    let inMemoryJWT = null;
    let refreshTimeoutId;
    const storageKey = 'logout';

    const parseJwt = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    window.addEventListener('storage', event => {
        if (event.key === storageKey) {
            inMemoryJWT = null;
        }
    });

    const refreshToken = payload => {

        const delay = (payload['exp'] - payload['iat']);

        // Fire five seconds before JWT expires
        const timeoutTrigger = delay - 5000;

        refreshTimeoutId = window.setTimeout(() => {
            ajaxRefreshToken()
                .then(res => {
                    // const { token } = res.data;
                    const { access_token, } = res;
                    setToken(access_token);
                }).catch(console.error);
        }, timeoutTrigger);
    };

    const abortRefreshToken = () => {
        if (refreshTimeoutId) {
            window.clearTimeout(refreshTimeoutId);
        }
    };

    const getToken = () => inMemoryJWT;

    const setToken = (token) => {
        inMemoryJWT = token;

        let tokenPayload = parseJwt(token);

        refreshToken(tokenPayload);
        return true;
    };

    const getTokenPayload = () => {
        if (inMemoryJWT) {
            return parseJwt(inMemoryJWT);
        } else return [];


    }

    const deleteToken = () => {
        inMemoryJWT = null;
        abortRefreshToken();
        window.localStorage.setItem(storageKey, Date.now());
        return true;
    };

    return {
        getToken,
        setToken,
        deleteToken,
        getTokenPayload,
    };
};

export default inMemoryJwtService();