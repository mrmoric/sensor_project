import { ajaxCallBlob, formRequestData } from './ajaxService';

const constants = window.getConfig;

const ajaxDownloadFileUrl = `${constants.ajax.baseUrl}/files`;
const ajaxAdminDownloadFileUrl = `${constants.ajax.baseUrl}/admin/files`;


const ajaxDownloadFile = params => new Promise((res, rej) => {

    var ajaxUrl = ajaxDownloadFileUrl;

    if (params.role === 'administrator') {
        ajaxUrl = ajaxAdminDownloadFileUrl;
    }

    if (params.fileType) {
        ajaxUrl += '/' + params.fileType;
    }

    if (params.id) {
        ajaxUrl += '/' + params.id;
    }

    ajaxCallBlob(ajaxUrl, formRequestData(constants.ajax.methods.get, true, false))
        .then(res)
        .catch(rej);
})

export {
    ajaxDownloadFile,
};