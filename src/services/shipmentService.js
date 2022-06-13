import { ajaxCall, formRequestData } from './ajaxService';

const constants = window.getConfig;

const getShipmentUrl = `${constants.ajax.baseUrl}/shipment`;
const getAdminShipmentUrl = `${constants.ajax.baseUrl}/admin/shipment`;

const markShipmentRecievedUrl = `${constants.ajax.baseUrl}/shipment/mark_recieved`;

const ajaxGetShipments = companyId => new Promise((res, rej) => {

    if (companyId) {
        ajaxCall(getAdminShipmentUrl + `/${companyId}`, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);
    } else {
        ajaxCall(getShipmentUrl, formRequestData(constants.ajax.methods.get, true))
            .then(res)
            .catch(rej);
    }

})

const ajaxMarkShipmentRecieved = shipmentId => new Promise((res, rej) => {
    ajaxCall(markShipmentRecievedUrl + `/${shipmentId}`, formRequestData(constants.ajax.methods.get, true))
        .then(res)
        .catch(rej);
})

export {
    ajaxGetShipments,
    ajaxMarkShipmentRecieved
};