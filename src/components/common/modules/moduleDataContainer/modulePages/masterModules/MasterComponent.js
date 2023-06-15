import React, { useEffect, useState, useRef, useMemo } from "react";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Box
} from "@mui/material";
import clsx from "clsx";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import SearchButtonIcon from "@material-ui/icons/SearchOutlined";
import {
  MdExpandMore as ExpandMoreIcon,
  MdOutlineSearch as SearchButtonIcon,
} from "react-icons/md"
import commonService from "services/common/commonService";
// import { useDispatch, useSelector } from "react-redux";
import { GenericDatatable, GenericButton, GenericDatagrid } from "@application";
import { GenericDetailsBottomContainer } from "components/common/modules/moduleDataContainer/modulePages/common/bottomPages";
import { useClasses, styles } from "@application";
import moment from 'moment';
// const styles = theme => ({
//   root: {
//     width: "100%",
//     fontSize: '14px',
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "70px",
//       height: 'auto',
//       backgroundColor: '#fff',

//       // fontSize: "14px",
//     },

//     "& .MuiExpansionPanelSummary-content": {
//       margin: "2px 0"
//     },
//     "& .MuiOutlinedInput-input": {
//       padding: '5px 20px'
//     },

//     " & .MuiExpansionPanelSummary-root": {
//       backgroundColor: "#f4f5fa",
//       margin: '0px'
//     }
//   },
//   formControl: {
//     // margin: 1,
//     fullWidth: true,
//     display: "flex",
//     wrap: "nowrap"
//   },
//   expandedPanel: {
//     backgroundColor: "#f4f5fa"
//   },
//   heading: {
//     color: "#052a4f",
//     fontSize: 18,
//     fontWeight: "500"
//   },
//   rowDesign: {
//     paddingTop: 15
//   }
// });

let searchFormData = {};

export default function MasterComponent(props) {
  const feature = props.feature
  const classes = useClasses(styles);
  const [moduleHeader, setModuleHeader] = useState([]);

  const paramObj = useMemo(() =>
    props && props.indexPageData.length ? props.indexPageData : []
    , [props])



  useEffect(() => {
    if (paramObj) {
      setModuleHeader(paramObj.map(param => param.MODULENAME));
    }
  }, [paramObj]);


  const [dataSelected, setDataSelected] = useState(null);

  //const selectionIndex = "all";
  const selectionIndex = "0,1,2,3,4,5,6,7,8,9";

  const moduleType = props.moduleCode;

  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const [showResults, setShowResults] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState("searchExpansionPanel");

  const handlePanelExpansion = panel => (event, expandedPanel) => {
    //console.log(expandedPanel, panel);
    setExpandedPanel(expandedPanel ? panel : false);
  };

  const [searchData, setSearchData] = useState(null);
  //const [bottomAction, setBottomAction] = useState([]);

  const handleSubmit = data => {
    console.log("Form JSON data " + JSON.stringify(data));
    setIsFormValid(false);
    data["moduleType"] = moduleType;
    searchFormData = data;
    commonService.fetchMasterSearchData(data).then(response => {
      setSearchData(response);
      console.log('response', commonService)
    });
    console.log('searchData', searchData)
    setShowResults(true);
    setExpandedPanel(false);
  };


  //console.log("VIVEK - searchFormData = "+searchFormData);

  const ResultFrame = () => (
    <div id="bottomFrame" className={classes.root} style={{ padding: '5px 20px 0px' }}>
      {searchData ? (
        <>
          <GenericDatagrid
            tableData={searchData}
            utilColumn={'select'}
            isInfo={true}
            setSelectedData={setDataSelected}
            selectedData={dataSelected}
            // inputParams={inputParams}
            title={moduleHeader[0]}
            // actionButtons={GenericDetailsBottomContainer}
            moduleType={"masters"}
          // ComponentBottomContainer={GenericDetailsBottomContainer}
          // InfoContainer={GenericDetailsBottomContainer}
          />
          {/* <GenericDatatable
            dataSet={searchData}
            infoEnabled={true}
            moduleName={moduleHeader[0]}
            isSelection={true}
            isMultipleSelect={true}
            selectionIndex={selectionIndex}
            BottomContainer={GenericDetailsBottomContainer}
            selected={dataSelected}
            selectHandler={setDataSelected}
            dynamicProps={searchFormData}
          ></GenericDatatable> */}
        </>
      ) : (
        "No data available"
      )}
    </div>
  );

  return (
    <Paper>
      <div id="topFrame" className={`${classes.root}`}>
        <Box className="moduleName">{feature.breadCrumbs[feature.breadCrumbs.length - 1].label}</Box>
        <Divider className="mb-[10px] border-[#C1C9D3]"></Divider>
        <Accordion
          className="px-5"
          expanded={expandedPanel === "searchExpansionPanel"}
          onChange={handlePanelExpansion("searchExpansionPanel")}
          id="searchExpansionPanel"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="searchPanelcontent"
            id="searchPanelHeader"
            classes={{
              root: classes.root,
              // expanded: 'bg-[#F4F5FA]'
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
                        <Typography>{`${eachParam.MODULEPARAMIDNAME}`}</Typography>
                        <FormControl fullWidth required>
                          <DatePickerFormsy
                            variant="outlined"
                            name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                            // label={`${eachParam.MODULEPARAMIDNAME}`}
                            ampm={false} // 24Hr / 12hr clock settings
                            className={undefined} // optional, if you need for styling
                            dateTime={false} // true, if need the Date and Time Picker. false if you need only Date Picker
                            allowKeyboardControl={true} // optional, this will allow keybord to control the picker.
                            value={moment(new Date).format('DD/MM/YYYY')}
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
                            (clsx(classes.margin, classes.textField),
                              classes.formControl)
                          }
                          fullWidth
                          variant="outlined"
                        >
                          <ViewFieldFormsy
                            className={undefined}
                            name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                            // label={`${eachParam.MODULEPARAMIDNAME}`}
                            onChange={() => { }}
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
                        <FormControl fullWidth>
                          <TextFieldFormsy
                            variant="outlined"
                            name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                            // label={`${eachParam.MODULEPARAMIDNAME}`}
                            className={undefined} // optional, if you need for styling
                            onChange={() => { }} // optional, a callback if you need to do any logic on the value change
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
                        <FormControl fullWidth variant={'outlined'} >
                          <SelectFormsy
                            variant="outlined"
                            name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                            //label={`${eachParam.MODULEPARAMIDNAME}`}
                            // label={commonService.getLabel(
                            //   eachParam.MODULEPARAMNAME,
                            //   eachParam.MODULEPARAMIDNAME
                            // )}
                            value="" // mandatory, value of the selected element
                            className={undefined} // optional, if you need for styling
                            onChange={() => { }} // optional, a callback if you need to do any logic on the value change
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
                        <Typography>{`${eachParam.MODULEPARAMALIASNAME}`}</Typography>
                        <FormControl fullWidth>
                          <RadioGroup
                            row
                            aria-label={`${eachParam.MODULEPARAMIDNAME}_${eachParam.MODULEPARAMINDEX}`}
                            name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                            onChange={() => { }}
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
                      <Grid className="inputContainer" item xs={4} key={index}>
                        <Typography>{`${eachParam.MODULEPARAMALIASNAME}`}</Typography>
                        <FormControl fullWidth>
                          <FormControlLabel
                            className={undefined} // optional, if you need for styling
                            control={
                              <CheckboxFormsy
                                checked={false} // optional, if you need for styling
                                name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`} // mandatory, this will appear in the final JSON data once form is submitted
                                onChange={() => { }} // optional, a callback if you need to do any logic on the value change
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

              </Grid>
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
              {/* {paramObj
                  ? paramObj.map((eachParam, index) =>
                      eachParam.ACTIONS != null ? (
                        <Grid
                          key={index}
                          container
                          alignItems="flex-start"
                          justify="flex-end"
                          direction="row"
                          style={{ marginRight: 15, marginBottom: 10 }}
                        >
                          {eachParam.ACTIONS.map(eachAction =>
                            Object.entries(eachAction).map((key, value) => {
                              return (
                                <Button
                                  type="submit"
                                  variant="outlined"
                                  color="primary"
                                  aria-label={key[1]}
                                  className={classes.button}
                                  id={key[1]}
                                  style={{ margin: 10 }}
                                  startIcon={
                                    `${key[0]}`.includes("search") ? (
                                      <SearchButtonIcon />
                                    ) : (
                                      ""
                                    )
                                  }
                                  disabled={!isFormValid}
                                  value={key[0]}
                                  key={key[0]}
                                >
                                  {key[1]}
                                </Button>
                              );
                            })
                          )}
                        </Grid>
                      ) : null
                    )
                  : null} */}
              {/* </Grid> */}
            </Formsy>
          </AccordionDetails>
        </Accordion>
      </div>
      {/* ) : null} */}
      {showResults ? <ResultFrame /> : null}
    </Paper>
  );
}
