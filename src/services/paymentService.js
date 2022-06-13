import { ajaxCall, formRequestData } from './ajaxService';

const constants = window.getConfig;

const paymentsAdminEndpoint = `${constants.ajax.baseUrl}/admin/payments`;

const ajaxRecievePayment = params => new Promise((res, rej) => {
    ajaxCall(paymentsAdminEndpoint + '/recieve', formRequestData(constants.ajax.methods.post, true, false, params))
        .then(res)
        .catch(rej);
})

export {
    ajaxRecievePayment,
};