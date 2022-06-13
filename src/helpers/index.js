import { ajaxDownloadFile } from '../services/fileService';


export function strToNum(str) {
    return Number(str.replace(/\D/g, ''));
}


export function downloadFile({ params, fileName, fileExt, onError }) {

    ajaxDownloadFile(params).then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = fileName + '.' + fileExt;
            a.click();
        })
        .catch(error => {
            onError(error.message)
            console.log(error.message);
        });

}