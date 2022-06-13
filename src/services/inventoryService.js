import { ajaxCall, formRequestData } from './ajaxService';

const constants = window.getConfig;

const getInventoryUrl = `${constants.ajax.baseUrl}/inventory`;

const getInventoryItemUrl = `${constants.ajax.baseUrl}/inventory/item`;

const ajaxGetInventory = params => new Promise((res, rej) => {
    if (params.companyId) {
        ajaxCall(getInventoryUrl + `/${params.companyId}`, formRequestData(constants.ajax.methods.post, true, false, params))
            .then(res)
            .catch(rej);
    } else {
        ajaxCall(getInventoryUrl, formRequestData(constants.ajax.methods.post, true, false, params))
            .then(res)
            .catch(rej);
    }

})

const ajaxGetInventoryItem = macOrSerial => new Promise((res, rej) => {
    ajaxCall(getInventoryItemUrl, formRequestData(constants.ajax.methods.post, true, false, macOrSerial))
        .then(res)
        .catch(rej);
})

const ajaxGetProductOptionCodes = () => new Promise((res, rej) => {
    ajaxCall(getInventoryUrl + '/product_codes', formRequestData(constants.ajax.methods.get, true, false))
        .then(res)
        .catch(rej);
})

export {
    ajaxGetInventory,
    ajaxGetInventoryItem,
    ajaxGetProductOptionCodes,
};