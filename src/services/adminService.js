import { ajaxCall, formRequestData } from './ajaxService';

const constants = window.getConfig;

const getAdminProductsUrl = `${constants.ajax.baseUrl}/admin/products`;

const getAdminOptionsUrl = `${constants.ajax.baseUrl}/admin/options`;

const getAdminShipmentUrl = `${constants.ajax.baseUrl}/admin/shipment`;

const getAdminDistributorsUrl = `${constants.ajax.baseUrl}/admin/distributors`;

const ajaxGetAdminProducts = params => new Promise((res, rej) => {

    if (params.ProductId) {
        ajaxCall(getAdminProductsUrl + `/${params.ProductId}`, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);

    } else {
        ajaxCall(getAdminProductsUrl, formRequestData(constants.ajax.methods.post, true, false, params))
            .then(res)
            .catch(rej);
    }

})

const ajaxGetAdminOptions = params => new Promise((res, rej) => {
    if (params.OptionId) {
        ajaxCall(getAdminOptionsUrl + `/${params.OptionId}`, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);

    } else {
        ajaxCall(getAdminOptionsUrl, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);
    }
})

const ajaxSaveAdminOption = params => new Promise((res, rej) => {
    ajaxCall(getAdminOptionsUrl + `/save`, formRequestData(constants.ajax.methods.post, true, false, params))
        .then(res)
        .catch(rej);
})

const ajaxGetAdminProductOptions = params => new Promise((res, rej) => {
    ajaxCall(getAdminProductsUrl + `/options/${params.ProductId}`, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
})

const ajaxSaveAdminProductOption = params => new Promise((res, rej) => {
    ajaxCall(getAdminProductsUrl + `/options/save/${params.product_code_id}`, formRequestData(constants.ajax.methods.post, true, false, params))
        .then(res)
        .catch(rej);
})

const ajaxDisableAdminProductOption = params => new Promise((res, rej) => {
    ajaxCall(getAdminProductsUrl + `/options/disable/${params.id}`, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
})

const ajaxEnableAdminProductOption = params => new Promise((res, rej) => {
    ajaxCall(getAdminProductsUrl + `/options/enable/${params.id}`, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
})



const ajaxSaveAdminProduct = params => new Promise((res, rej) => {
    ajaxCall(getAdminProductsUrl + "/save", formRequestData(constants.ajax.methods.post, true, false, params))
        .then(res)
        .catch(rej);
})

const ajaxDisableAdminProduct = params => new Promise((res, rej) => {
    ajaxCall(getAdminProductsUrl + `/disable/${params.ProductId}`, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
})

const ajaxEnableAdminProduct = params => new Promise((res, rej) => {
    ajaxCall(getAdminProductsUrl + `/enable/${params.ProductId}`, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
})

const ajaxGetAdminShipments = () => new Promise((res, rej) => {
    ajaxCall(getAdminShipmentUrl, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
})



const ajaxAddAdminShipment = params => new Promise((res, rej) => {
    ajaxCall(getAdminShipmentUrl + `/add/${params.company_id}`, formRequestData(constants.ajax.methods.post, true, false, params, true))
        .then(res)
        .catch(rej);
})


const ajaxGetAdminDistributors = params => new Promise((res, rej) => {

    if (params.CompanyId) {
        ajaxCall(getAdminDistributorsUrl + `/${params.CompanyId}`, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);

    } else {
        ajaxCall(getAdminDistributorsUrl, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);
    }
})

const ajaxSaveAdminDistributor = params => new Promise((res, rej) => {
    ajaxCall(getAdminDistributorsUrl + "/save", formRequestData(constants.ajax.methods.post, true, false, params, true))
        .then(res)
        .catch(rej);
})

const ajaxGetAdminDistributorsAutocomplete = () => new Promise((res, rej) => {
    ajaxCall(getAdminDistributorsUrl + "/autocomplete", formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
})

const ajaxDisableAdminDistributor = params => new Promise((res, rej) => {

    if (params.id) {
        ajaxCall(getAdminDistributorsUrl + `/disable/${params.id}`, formRequestData(constants.ajax.methods.put, true))
            .then(res)
            .catch(rej);

    }
})

const ajaxEnableAdminDistributor = params => new Promise((res, rej) => {

    if (params.id) {
        ajaxCall(getAdminDistributorsUrl + `/enable/${params.id}`, formRequestData(constants.ajax.methods.put, true))
            .then(res)
            .catch(rej);

    }
})


export {
    ajaxGetAdminProducts,
    ajaxGetAdminShipments,
    ajaxAddAdminShipment,

    ajaxGetAdminOptions,
    ajaxSaveAdminOption,

    ajaxGetAdminDistributorsAutocomplete,
    ajaxGetAdminDistributors,
    ajaxSaveAdminDistributor,
    ajaxDisableAdminDistributor,
    ajaxEnableAdminDistributor,

    ajaxSaveAdminProduct,
    ajaxDisableAdminProduct,
    ajaxEnableAdminProduct,

    ajaxGetAdminProductOptions,
    ajaxSaveAdminProductOption,
    ajaxDisableAdminProductOption,
    ajaxEnableAdminProductOption
};