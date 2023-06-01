import React, { useEffect, useState, useRef, useCallback } from "react";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  DatePickerFormsy,
  SelectFormsy,
  CheckboxFormsy,
  ViewFieldFormsy
} from "components/common/formsyComponents";
import {
  MenuItem,
  FormControl,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider
} from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import SearchButtonIcon from "@material-ui/icons/SearchOutlined";
import { 
    MdExpandMore as ExpandMoreIcon, 
    MdOutlineSearch as SearchButtonIcon,
  } from "react-icons/md"
import commonService from "services/common/commonService";
import { useDispatch, useSelector } from "react-redux";
import * as CWFActions from "redux/caseWorkflow/cwfbottomframedata/cwfbottomframedata.actions";
import { GenericButton, useClasses, GenericDatagrid, styles } from "@application";
import CWFBottomContainer from "./BottomContainer/CWFBottomContainer";
import { stringify } from "postcss";

// import { CWFDetailsBottomContainer } from "../common/bottomPages";

// const styles = theme => ({
//   root: {
//     width: "100%",
//     fontSize: '14px',
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "70px",
//       height: 'auto',
//       backgroundColor: '#fff',
//     },

//     "& .MuiExpansionPanelSummary-content": {
//       margin: "2px 0"
//     },

//     " & .MuiExpansionPanelSummary-root": {
//       backgroundColor: "#f4f5fa",
//       margin: '0px'
//     },  
//     "& .MuiOutlinedInput-input": {
//       padding: '5px 20px'
//     },
//   },
//   formControl: {
//     margin: 1,
//     fullWidth: true,
//     display: "flex",
//     wrap: "nowrap"
//   },
//   expandedPanel: {
//     backgroundColor: "#f4f5fa",
//     margin: '0px'
//   },
//   heading: {
//     color: "#052a4f",
//     fontSize: 18,
//     fontWeight: "700"
//   },
//   rowDesign: {
//     paddingTop: 15
//   },
//   button: {
//     marginLeft: 10
//   }
// });




export default function CaseWorkflowComponent(props) {

  const feature = props.feature;

  // const heading = feature.breadCrumbs[feature.breadCrumbs.length - 1]


  const classes = useClasses(styles);

  const paramObj = props.indexPageData;

  const moduleType = props.moduleCode;

  const moduleHeader = paramObj.map((eachParam, index) => {
    return eachParam.MODULENAME;
  });

  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const [inputParams, setInputParams] = useState({});

  const [showResults, setShowResults] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState("searchExpansionPanel");

  const [dataSelected, setDataSelected] = useState([]);
  //console.log(dataSelected);
  // const selectionIndex = "all";
  //const selectionIndex = "0,1";

  const handlePanelExpansion = panel => (event, expandedPanel) => {
    setExpandedPanel(expandedPanel ? panel : false);
  };

  const handleDataChange = useCallback(
    (newValue) => {
      setDataSelected(newValue)
    },
    [],
  );

  useEffect(()=> {
    console.log("Selected Data In Parent", dataSelected);
  }, [dataSelected])

  // const newdate = new Date();
  // const datetime = new Date(
  //   newdate.getTime() - newdate.getTimezoneOffset() * 60000
  // ).toJSON();
  // const formattedDate =
  //   datetime
  //     .slice(0, 10)
  //     .replace(new RegExp("-", "g"), "-")
  //     .split("-")
  //     .reverse()
  //     .join("-") + datetime.slice(11, 19);
  //console.log(formattedDate);
  // const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  // const [selectedToDate, setSelectedToDate] = useState(new Date());

  const cwfCases = useSelector(
    ({ caseWorkflow }) => caseWorkflow.cwfBottomFrameData.data
  );

  const [cwfCasesData, setCWFCasesData] = useState(null);
  const [bottomAction, setBottomAction] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = data => {
    setIsFormValid(false);
    data["moduleType"] = moduleType;
    setInputParams(data);
    dispatch(CWFActions.getCWFCases(data));
    setDataSelected([])
    
  };

  useEffect(() => {
    setCWFCasesData(cwfCases&&cwfCases!=null?cwfCases:null);
    setBottomAction(cwfCases&&cwfCases!=null?cwfCases.ACTIONS:[]);
    if(cwfCasesData !== null){
      setShowResults(true);
      setExpandedPanel(false);
    }
    
  }, [cwfCases]);



  const ResultFrame = () => (
    <div id="bottomFrame" className={classes.root} style={{ paddingTop: 5 }}>
      {cwfCasesData ? (
        <>
          {/* <GenericDatatable
            dataSet={cwfCasesData}
            infoEnabled={true}
            moduleName={moduleHeader[0]}
            isSelection={true}
            isMultipleSelect={true}
            selectionIndex={selectionIndex}
            reloadData={handleSubmit}
            inputParams={inputParams}
            selected={dataSelected}
            selectHandler={setDataSelected}
            BottomContainer={CWFDetailsBottomContainer}
          ></GenericDatatable> */}
          <GenericDatagrid
            tableData={cwfCasesData}
            utilColumn={'select'}
            setSelectedData={handleDataChange}
            selectedData={dataSelected}
            inputParams={inputParams}
            title={`${moduleHeader[0]} Results`}
            actionButtons={bottomAction}
            moduleType={"caseworkflow"}
            ComponentBottomContainer={CWFBottomContainer}
          />
        </>
      ) : (
        "No data available"
      )}
    </div>
  );

  return (
    <Paper className={`${classes.root} shadow-none`}>
      <Box className="moduleName">{feature.breadCrumbs[feature.breadCrumbs.length - 1].label}</Box>
      <Divider className="mb-[10px] border-[#C1C9D3]"></Divider>
      <div id="topFrame" >
        <Accordion
          className="px-5"
          expanded={expandedPanel === "searchExpansionPanel"}
          onChange={handlePanelExpansion("searchExpansionPanel")}
          id="searchExpansionPanel"
        > 
          <AccordionSummary
            sx={{'& .Mui-expanded': {
              margin: '0px'}
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="searchPanelcontent"
            id="searchPanelHeader"
            className="max-h-[30px]"
            classes={{
              root: classes.root,
              // expanded: "bg-[#f4f5fa]"
            }}
          >
            <Typography className={`${classes.heading} text-[14px] font-bold`} id="searchHeader">
              {moduleHeader[0]}
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails
            // className='bg-[#F4F5FA]'
            align="left"
            id="searchExpansionPanelDetails"
            // style={{ padding: 5 }}
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
                className={`${classes.root} main_input_container`}
              >
                {paramObj
                  ? paramObj.map((eachParam, index) =>
                      eachParam.MODULEPARAMDATATYPE === "date" ? (
                        <Grid className="inputContainer" item xs={4} key={index}>
                          <Typography>{`${eachParam.MODULEPARAMALIASNAME}`}</Typography>
                          <FormControl className={`${classes.formControl} w-full`}>
                            <DatePickerFormsy
                              sx={{backgroundColor: 'white'}}
                              variant="outlined"
                              name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                              // label={`${eachParam.MODULEPARAMIDNAME}`}
                              ampm={false} // 24Hr / 12hr clock settings
                              className={'rounded-lg bg-[#fff] z-20'} // optional, if you need for styling
                              dateTime={false} // true, if need the Date and Time Picker. false if you need only Date Picker
                              allowKeyboardControl={true} // optional, this will allow keybord to control the picker.
                              value={new Date()}
                            />
                          </FormControl>
                        </Grid>
                      ) : null
                    )
                  : null}

                {paramObj
                  ? paramObj.map((eachParam, index) =>
                      eachParam.MODULEPARAMDATATYPE === "view" ? (
                        <Grid className="inputContainer" item xs={4} key={index}>
                          <Typography>{`${eachParam.MODULEPARAMALIASNAME}`}</Typography>
                          <FormControl
                            className={
                              `$(clsx(classes.margin, classes.textField),
                              classes.formControl) w-full`
                            }
                            variant="outlined"
                          >
                            <ViewFieldFormsy
                              className={undefined}
                              name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                              // label={`${eachParam.MODULEPARAMIDNAME}`}
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
                        <Grid className="inputContainer" item xs={4} key={index}>
                        <Typography>{`${eachParam.MODULEPARAMALIASNAME}`}</Typography>
                          <FormControl className={`${classes.formControl} w-full`}>
                            <TextFieldFormsy
                              variant="outlined"
                              name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                              // label={`${eachParam.MODULEPARAMIDNAME}`}
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
                        <Grid className="inputContainer" item xs={4} key={index}>
                          <Typography>{`${eachParam.MODULEPARAMALIASNAME}`}</Typography>
                          <FormControl className={`${classes.formControl} w-full`}>
                            <SelectFormsy
                              variant="outlined"
                              name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                              //label={`${eachParam.MODULEPARAMIDNAME}`}
                              // label={commonService.getLabel(
                              //   eachParam.MODULEPARAMNAME,
                              //   eachParam.MODULEPARAMIDNAME
                              // )}
                              value={`${eachParam.MODULEPARAMDEFAULTVALUE}`} // mandatory, value of the selected element
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
                        <Grid className="inputContainer" item xs={4} key={index}>
                          <FormControl className={classes.formControl}>
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

                {paramObj && paramObj.map((eachParam, index) =>
                    eachParam.MODULEPARAMDATATYPE === "checkbox" && (
                      <Grid className="inputContainer" item xs={4} key={index}>
                        <FormControl className={classes.formControl}>
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
                    )
                  )
                }
              </Grid>
                <Grid  item xs={12}>
                {paramObj
                  ? paramObj.map((eachParam, index) =>
                      eachParam.ACTIONS != null ? (
                        <Box>
                          {eachParam.ACTIONS.map(eachAction => (
                                <GenericButton
                                  type="submit"
                                  variant="outlined"
                                  color="primary"
                                  aria-label={eachAction.actionName}
                                  className={`${classes.button} mt-0`}
                                  id={eachAction.actionCode}
                                  startIcon={
                                    `${eachAction.actionCode}`.includes("search") ? (
                                      <SearchButtonIcon />
                                    ) : (
                                      ""
                                    )
                                  }
                                  disabled={!isFormValid}
                                  value={eachAction.actionCode}
                                  key={eachAction.actionCode}
                                >
                                  {eachAction.actionName}
                                </GenericButton>
                            )
                          )}
                        </Box>
                      ) : null
                    )
                  : null}
                </Grid>
                
              
            </Formsy>
          </AccordionDetails>
        </Accordion>
      </div>
      {/* ) : null} */}
      {showResults && (
        <div className="p-4" >
          <ResultFrame />
        </div>
      )}
    </Paper>
  );
}

