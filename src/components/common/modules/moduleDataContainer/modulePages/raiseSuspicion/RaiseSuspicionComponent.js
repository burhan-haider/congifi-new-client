import React, { useState, useEffect, useMemo, useRef } from 'react';

import {
    Box,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormControl,
    FormControlLabel,
    // Menu,
    MenuItem,
    RadioGroup,
    Radio
} from '@mui/material'

import Formsy from "formsy-react";
import { 
    GenericButton,
    GenericDatagrid,
    // GenericDatatable,
    useClasses,
    styles
} from "@application";

import { 
    TextFieldFormsy, 
    DatePickerFormsy,
    SelectFormsy, 
    ViewFieldFormsy,
    CheckboxFormsy
} from "components/common/formsyComponents";

import { 
    MdExpandMore as ExpandMoreIcon,  
    MdOutlineSearch as SearchButtonIcon, 
} from 'react-icons/md';
// import { GenericDetailsBottomContainer } from "components/common/modules/moduleDataContainer/modulePages/common/bottomPages";


import commonService from 'services/common/commonService'
import clsx from 'clsx'
// import httpService from 'services/httpservice/httpService';

// const styles = theme => ({
//     root: {
//       width: "100%",
  
//       "& .MuiExpansionPanelSummary-content": {
//         margin: "2px 0"
//       },
  
//       " & .MuiExpansionPanelSummary-root": {
//         backgroundColor: "#f4f5fa"
//       }
//     },
//     formControl: {
//       // margin: 1,
//       fullWidth: true,
//       display: "flex",
//       wrap: "nowrap"
//     },
//     expandedPanel: {
//       backgroundColor: "#f4f5fa"
//     },
//     heading: {
//       color: "#052a4f",
//       fontSize: 18,
//       fontWeight: "500"
//     },
//     rowDesign: {
//       paddingTop: 15,
//       paddingRight: 20,
//       paddingLeft: 20,
//     }
//   });

const AuditLogComponent = (props) => {

    const { 
        indexPageData,
        // moduleCode, 
    } = props;

    const moduleType = props.moduleCode;
    // let searchFormData = [];

    // const selectionIndex = "0,1,2,3,4,5,6,7,8,9";

    const [expandedPanel, setExpandedPanel] = useState(true);
    const [moduleHeader, setModuleHeader] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchData, setSearchData] = useState({});
    const [dataSelected, setDataSelected] = useState([]);
    const [inputParams, setInputParams] = useState({});
    const [actionButtons, setActionButtons] = useState([]);


    const formRef = useRef(null);
    const classes = useClasses(styles);

    const paramObj = useMemo(() => (
        indexPageData && indexPageData.length ? indexPageData : []
    ),[indexPageData])

    useEffect(() => {
        if (paramObj) {
          setModuleHeader(paramObj.map(param => param.MODULENAME));
        }
    }, [paramObj]);

    const handleSubmit = data => {
        console.log("Form Data:-", data);

        setIsFormValid(false);
        
        data["moduleType"] = moduleType;
        // searchFormData = data;
        commonService.fetchMasterSearchData(data).then(response => {
          setSearchData(response);
        });
    };

    useEffect(()=>{
        if(Object.keys(searchData).length>0){
            setShowResults(true);
            setExpandedPanel(false);
        }
    },[searchData])

    const ResultFrame = () => (
        <div id="bottomFrame" className={classes.root} style={{ paddingTop: 5 }}>
          {searchData ? (
            <GenericDatagrid
                tableData={searchData}
                setSelectedData={setDataSelected}
                selectedData={dataSelected}
                inputParams={inputParams}
                title={`${moduleHeader[0]} Results`}
                // actionButtons={GenericDetailsBottomContainer}
                moduleType={"auditLog"}
          />
          ) : (
            "No data available"
          )}
        </div>
      );


    return(
        <Box className='p-5' >
            <Accordion
                expanded={expandedPanel}
                onChange={()=>setExpandedPanel(!expandedPanel)}
                id="searchExpansionPanel"
                >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="searchPanelcontent"
                    id="searchPanelHeader"
                    classes={{
                        root: classes.root,
                        expanded: classes.expandedPanel
                    }}
                >
                    <Typography className={classes.heading} id="searchHeader">
                        Audit Log Search
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    align="left"
                    id="searchExpansionPanelDetails"
                    style={{ padding: 5 }}
                >
                    <Formsy
                        onValidSubmit={data => handleSubmit(data)}
                        onValid={() => setIsFormValid(true)}
                        onInvalid={() => setIsFormValid(false)}
                        ref={formRef}
                        className="flex flex-col justify-center w-full"
                    >
                    <Grid
                        container
                        alignItems="flex-start"
                        spacing={2}
                        className={classes.root}
                    >
                        {paramObj
                        ? paramObj.map((eachParam, index) =>
                            eachParam.MODULEPARAMDATATYPE === "date" ? (
                                <Grid className='inputContainer' item xs={3} key={index}>
                                <FormControl fullWidth>
                                    <DatePickerFormsy
                                    variant="outlined"
                                    name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                                    label={`${eachParam.MODULEPARAMIDNAME}`}
                                    ampm={false} // 24Hr / 12hr clock settings
                                    className={undefined} // optional, if you need for styling
                                    dateTime={false} // true, if need the Date and Time Picker. false if you need only Date Picker
                                    allowKeyboardControl={true} // optional, this will allow keybord to control the picker.
                                    value={eachParam.MODULEPARAMDEFAULTVALUE}
                                    />
                                </FormControl>
                                </Grid>
                            ) : null
                            )
                        : null}

                        {paramObj
                        ? paramObj.map((eachParam, index) =>
                            eachParam.MODULEPARAMDATATYPE === "view" ? (
                                <Grid className='inputContainer' item xs={3} key={index}>
                                <FormControl
                                fullWidth
                                    // className={
                                    // (clsx(classes.margin, classes.textField),
                                    // classes.formControl)
                                    // }
                                    variant="outlined"
                                >
                                    <ViewFieldFormsy
                                    className={undefined}
                                    name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                                    label={`${eachParam.MODULEPARAMIDNAME}`}
                                    onChange={() => {}}
                                    validationError=""
                                    //required={true}
                                    value=""
                                    viewname={eachParam.MODULEPARAMVIEWNAME}
                                    ismultipleselect={eachParam.SEARCHMULTIPLESELECT}
                                    />
                                </FormControl>
                                </Grid>
                            ) : null
                            )
                        : null}

                        {paramObj
                        ? paramObj.map((eachParam, index) =>
                            eachParam.MODULEPARAMDATATYPE === "text" ? (
                                <Grid className='inputContainer' item xs={3} key={index}>
                                <FormControl fullWidth>
                                    <TextFieldFormsy
                                    variant="outlined"
                                    name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                                    label={`${eachParam.MODULEPARAMIDNAME}`}
                                    className={undefined} // optional, if you need for styling
                                    onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                                    validationError="" // optional, to show error if validation fails
                                    //required={true} // optional, if make this mandatory field in the form
                                    value=""
                                    ></TextFieldFormsy>
                                </FormControl>
                                </Grid>
                            ) : null
                            )
                        : null}

                        {paramObj
                        ? paramObj.map((eachParam, index) =>
                            eachParam.MODULEPARAMDATATYPE === "select" ? (
                                <Grid className='inputContainer' item xs={3} key={index}>
                                <FormControl fullWidth >
                                    <SelectFormsy
                                    variant='outlined'
                                    name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                                    //label={`${eachParam.MODULEPARAMIDNAME}`}
                                    label={commonService.getLabel(
                                        eachParam.MODULEPARAMNAME,
                                        eachParam.MODULEPARAMIDNAME
                                    )}
                                    value="" // mandatory, value of the selected element
                                    className={undefined} // optional, if you need for styling
                                    onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                                    validationError="" // optional, to show error if validation fails
                                    //required={true} // optional, if make this mandatory field in the form
                                    >
                                    <MenuItem value="">Select One</MenuItem>
                                    {Object.entries(
                                        eachParam.MODULEPARAMSELECTNAMEVALUES
                                    ).map((key, value) => {
                                        return (
                                        <MenuItem value={key[0]} key={value}>
                                            {key[1]}
                                        </MenuItem>
                                        );
                                    })}
                                    </SelectFormsy>
                                </FormControl>
                                </Grid>
                            ) : null
                            )
                        : null}

                        {paramObj
                        ? paramObj.map((eachParam, index) =>
                            eachParam.MODULEPARAMDATATYPE === "radio" ? (
                                <Grid className='inputContainer' item xs={3} key={index}>
                                <FormControl fullWidth>
                                    <RadioGroup
                                    row
                                    aria-label={`${eachParam.MODULEPARAMIDNAME}_${eachParam.MODULEPARAMINDEX}`}
                                    name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                                    onChange={() => {}}
                                    >
                                    {Object.entries(
                                        eachParam.MODULEPARAMSELECTNAMEVALUES
                                    ).map((key, value) => {
                                        return (
                                        <FormControlLabel
                                            control={<Radio color="primary" />}
                                            value={key[0]}
                                            label={key[1]}
                                        />
                                        );
                                    })}
                                    </RadioGroup>
                                </FormControl>
                                </Grid>
                            ) : null
                            )
                        : null}

                        {paramObj
                        ? paramObj.map((eachParam, index) =>
                            eachParam.MODULEPARAMDATATYPE === "checkbox" ? (
                                <Grid className='inputContainer' item xs={3} key={index}>
                                <FormControl fullWidth>
                                    <FormControlLabel
                                    className={undefined} // optional, if you need for styling
                                    control={
                                        <CheckboxFormsy
                                        checked={false} // optional, if you need for styling
                                        name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`} // mandatory, this will appear in the final JSON data once form is submitted
                                        onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                                        value="" // mandatory, value of the selected element
                                        />
                                    }
                                    label={`${eachParam.MODULEPARAMIDNAME}`}
                                    />
                                </FormControl>
                                </Grid>
                            ) : null
                            )
                        : null}

                        <Grid
                            container
                            className="mx-4 my-3 flex flex-row justify-end w-100"
                        >
                            <GenericButton
                                type="submit"
                                variant="outlined"
                                aria-label="search"
                                startIcon={<SearchButtonIcon />}
                                disabled={!isFormValid}
                                value="search"
                            >
                                Search
                            </GenericButton>
                        </Grid>
                        
                    </Grid>
                    </Formsy>
                </AccordionDetails>
            </Accordion>
            {showResults===true && (
                <ResultFrame />
            )}
        </Box>
    )
}

export default AuditLogComponent;