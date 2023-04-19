import React, { useEffect, useState } from 'react';
import {
    Grid,
    MenuItem,
    Box,
    Typography,
    Divider
} from '@mui/material'
import httpService from 'services/httpservice/httpService'
import Formsy from "formsy-react";
import { GenericButton, styles, useClasses } from "@application";
import { TextFieldFormsy } from "components/common/formsyComponents";
import GraphComponent from './data/GraphComponent'

const Customer360Component = (props) => {
    
    const [customerData, setCustomerData] = useState({});
    const [showTree, setShowTree] = useState(false);
    const classes = useClasses(styles);
    const feature = props.feature
    
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
        <div className={classes.root} >
            <Box className="moduleName">{feature.breadCrumbs[feature.breadCrumbs.length - 1].label}</Box>
            <Divider className="mb-[10px] border-[#C1C9D3]"></Divider>
            <Formsy onValidSubmit={data=>handleSubmit(data)} >
                <Grid container spacing={3} className={` main_input_container py-5 container`} >
                    <Grid className='inputContainer' item xs={4} >
                        <Typography>Customer Id</Typography>
                        <TextFieldFormsy
                            variant="outlined"
                            name={`customerId`}
                            // label={`Customer Id`}
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
