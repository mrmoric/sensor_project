import { ajaxCall, formRequestData } from './ajaxService';

const constants = window.getConfig;


const ajaxGetCompanyInfoUrl = `${constants.ajax.baseUrl}/company`;
const ajaxGetCompanySalesUrl = `${constants.ajax.baseUrl}/company/sales`;
const ajaxGenerateLicenseUrl = `${constants.ajax.baseUrl}/company/service/generate-license`;
const ajaxMakeSaleUrl = `${constants.ajax.baseUrl}/company/inventory/sale`;

const ajaxAdminGetCompanyInfoUrl = `${constants.ajax.baseUrl}/admin/company`;



const ajaxGetCompanyInfo = params => new Promise((res, rej) => {


    if (params && params['companyId']) {
        ajaxCall(ajaxAdminGetCompanyInfoUrl + `/${params.companyId}`, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);
    } else {
        ajaxCall(ajaxGetCompanyInfoUrl, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);
    }
})

const ajaxGetCompanySales = params => new Promise((res, rej) => {

    if (params.companyId) {
        ajaxCall(ajaxGetCompanySalesUrl + `/${params.companyId}`, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);
    } else {
        ajaxCall(ajaxGetCompanySalesUrl, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);
    }
})

const ajaxGenerateLicense = params => new Promise((res, rej) => {

    ajaxCall(ajaxGenerateLicenseUrl, formRequestData(constants.ajax.methods.post, true, false, params))
        .then(res)
        .catch(rej);
    
})

const ajaxMakeSale = params => new Promise((res, rej) => {
    ajaxCall(ajaxMakeSaleUrl, formRequestData(constants.ajax.methods.post, true, false, params))
        .then(res)
        .catch(rej);
})

export {
    ajaxGetCompanyInfo,
    ajaxGetCompanySales,
    ajaxGenerateLicense,
    ajaxMakeSale,
};