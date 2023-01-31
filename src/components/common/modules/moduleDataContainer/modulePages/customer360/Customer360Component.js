import React, { useEffect, useState } from 'react';
import {
    Grid,
    MenuItem,
    Box,
} from '@mui/material'
import httpService from 'services/httpservice/httpService'
import Formsy from "formsy-react";
import { GenericButton } from "@application";
import { TextFieldFormsy } from "components/common/formsyComponents";
import GraphComponent from './data/GraphComponent'

const Customer360Component = () => {
    
    const [customerData, setCustomerData] = useState({});
    const [showTree, setShowTree] = useState(false);

    const token = window.localStorage.getItem("cognifi_token");
    let config = {
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': `multipart/form-data`,
        }
    };

    const handleSubmit = async(formData) => {
        console.log("Form Data:-", formData)

        await httpService
            .post("/api/investigation/searchCustomer360Data", config, {
                params: formData
            })
            .then(response => {
                console.log("Response:-", response)
                setCustomerData(response.data);
                setShowTree(true);
            })
            .catch(err=>{
                console.log(err);
            });
    };

    return(
        <div className='p-5' >
            <Formsy onValidSubmit={data=>handleSubmit(data)} >
                <Grid container spacing={3} className="py-5 container">
                    <Grid item xs={4} className="" >
                        <TextFieldFormsy
                            variant="outlined"
                            name={`customerId`}
                            label={`Customer Id`}
                            className="w-[80%]"
                            required={true}
                            value=""
                        ></TextFieldFormsy>    
                    </Grid>
                    <Grid item xs={2}>
                        <GenericButton
                            color="primary"
                            type="submit"
                            className="px-10"
                        >
                            Search
                        </GenericButton>
                    </Grid>
                </Grid>
            </Formsy>
            {showTree && (customerData!=null && Object.keys(customerData).length > 0) && (
                <div id={"chartParentDiv"} >
                    <GraphComponent data={customerData} />
                </div>
            )}
        </div>
    )
}

export default Customer360Component;
