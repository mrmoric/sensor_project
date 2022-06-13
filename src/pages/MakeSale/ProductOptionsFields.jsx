import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MakeSaleFormControl from './MakeSaleFormControl';

export default function ProductOptionsFields({ productOptions, soldOptions, controlData, setControlData, newControlData, setNewControlData }) {

    //set cotrolData (fields data) if soldOptions exists in the product and this is a new sell of the sold product 
    useEffect(() => {

        if (soldOptions) {

            let data = [];

            Object.entries(soldOptions).forEach(([key, val]) => {

                let item_name = 'option_' + key;
                data[item_name] = val['value'];
            })

            setControlData(data);

        }

    }, [soldOptions, setControlData]);


    const handleChangeOptionField = event => {

        let value = event.target.value;

        var data1 = [];
        var newDataOnly = [];

        if (event.target.type === "text") {
            value = value.replace(/\D/g, '');
            let newValue = value;

            if (soldOptions) {
                //don't let to choose lower number than previous value in sold options
                Object.entries(soldOptions).forEach(([key, val]) => {

                    let item_name = 'option_' + key;

                    if (item_name === event.target.name) {
                        if (value > val['value']) {
                            newValue = value - val['value'];  
                        }
                        else {
                            value = val['value'];
                            newValue = 0;
                        }
                        return;
                    }

                })
            }

            if (newValue > 0) {
                newDataOnly[event.target.name] = newValue;    
            }
            
            data1[event.target.name] = value;

        } else if (event.target.type === "checkbox") {

            data1[event.target.name] = event.target.checked;
            newDataOnly[event.target.name] = data1[event.target.name]; 
        }

        data1 = { ...controlData, ...data1 };
        newDataOnly = { ...newControlData, ...newDataOnly };

        setControlData(data1);

        // it saves only new data, we need it to generate license later:
        setNewControlData(newDataOnly);

    }


    const getProductOption = (item) => {

        const item_name = 'option_' + item.id;
        let isDisabled = false;

        if (soldOptions && soldOptions[item.id] && (item.type === "boolean" || item.type === "fixed")) {
            isDisabled = true;
        }

        return (
            <MakeSaleFormControl name={item_name} key={item.id} label={item.title} dataType={item.type} onChangeHandler={handleChangeOptionField} data={getData(item_name, item)} disabled={isDisabled} />
        );
    }

    const getData = (key, item) => {
        //  let initialValue = type === "integer" ? 1 : false;
        let initialValue = false;

        if (soldOptions && soldOptions[item.id]) {
            initialValue = soldOptions[item.id].value;
        }

        return controlData[key] ? controlData[key] : initialValue;
    }

    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ width: "280px", textAlign: "right", }}>Product Options</Typography>
            {productOptions.map((item) => (
                getProductOption(item)
            ))}
        </React.Fragment>
    );
}