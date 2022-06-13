import { ajaxCall, formRequestData } from './ajaxService';

const constants = window.getConfig;

const loginUrl = `${constants.ajax.baseUrl}/auth/login`;
const refreshTokenUrl = `${constants.ajax.baseUrl}/auth/refresh`;

const validateTokenUrl = `${constants.ajax.baseUrl}/user/validate`; //TODO:
const logoutUrl = `${constants.ajax.baseUrl}/auth/logout`;


const ajaxLogin = userData => new Promise((res, rej) => {
    ajaxCall(loginUrl, formRequestData(constants.ajax.methods.post, false, constants.ajax.credentials.include, userData))
        .then(res)
        .catch(rej);
})

const ajaxValidateToken = () => new Promise((res, rej) => {
    ajaxCall(validateTokenUrl, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
});

const ajaxLogout = () => new Promise((res, rej) => {
    ajaxCall(logoutUrl, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);

});
const ajaxRefreshToken = () => new Promise((res, rej) => {
    ajaxCall(refreshTokenUrl, formRequestData(constants.ajax.methods.get, false, constants.ajax.credentials.include))
        .then(res)
        .catch(rej);
});

export {
    ajaxLogin,
    ajaxValidateToken,
    ajaxLogout,
    ajaxRefreshToken
};