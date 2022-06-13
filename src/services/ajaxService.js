import inMemoryJwt from './inMemoryJwtService';


function appendFormdata(FormData, data, name) {
    name = name || '';
    if (typeof data === 'object' && !(data instanceof File)) {

        for (const index in data) {

            if (name === '') {
                appendFormdata(FormData, data[index], index);
            } else {
                appendFormdata(FormData, data[index], name + '[' + index + ']');
            }

        }


    } else {
        FormData.append(name, data);
    }
}

const formRequestData = (method, addAuthorization, credentials, data, isMultipartFormData) => {
    let requestData = {
        headers: {}
    };
    requestData.method = method;

    if (addAuthorization) {
        //requestData.headers['Authorization'] = `JWT ${inMemoryJwt.getToken()}`;
        requestData.headers['Authorization'] = `Bearer ${inMemoryJwt.getToken()}`;
    }

    if (credentials) {
        requestData.credentials = credentials;
    }

    if (data) {
        requestData.initialData = data;
    }

    if (data && isMultipartFormData) {

        let formData = new FormData();

        for (const prop in data) {
            if (data.hasOwnProperty(prop)) {
                appendFormdata(formData, data[prop], prop);
            }
        }

        requestData.body = formData;

    } else if (data) {
        requestData.headers['Content-Type'] = 'application/json';
        requestData.body = JSON.stringify(data);
    }

    return requestData;
};

const ajaxCall = async(url, data) => {
    const response = await fetch(url, data);

    if (!response.ok) {
        const err = await response.json();

        let errorMessage = '';

        if (data.initialData) {
            let initialData = data.initialData;

            for (let prop in initialData) {
                if (Object.prototype.hasOwnProperty.call(initialData, prop)) {
                    if (err[prop]) errorMessage = errorMessage + err[prop] + ' ';
                }

            }

        }

        if (err[0]) errorMessage = err[0];
        if (err['error']) errorMessage = err['error'];

        throw new Error(errorMessage ? errorMessage : err.message);
    }

    return response.json();
};

const ajaxCallBlob = async(url, data) => {
    const response = await fetch(url, data);

    if (!response.ok) {
        const err = await response.json();

        throw new Error(err);
    }

    return response.blob()
};

export {
    formRequestData,
    ajaxCall,
    ajaxCallBlob
};