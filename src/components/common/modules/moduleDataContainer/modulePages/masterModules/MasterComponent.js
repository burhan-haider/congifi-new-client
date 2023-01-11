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
  RadioGroup
} from "@mui/material";
import clsx from "clsx";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import SearchButtonIcon from "@material-ui/icons/SearchOutlined";
import { 
  MdExpandMore as ExpandMoreIcon, 
  MdOutlineSearch as SearchButtonIcon,
} from "react-icons/md"
import commonService from "services/common/commonService";
import { useDispatch, useSelector } from "react-redux";
import { GenericDatatable, GenericButton } from "@application";
import { GenericDetailsBottomContainer } from "components/common/modules/moduleDataContainer/modulePages/common/bottomPages";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    width: "100%",

    "& .MuiExpansionPanelSummary-content": {
      margin: "2px 0"
    },

    " & .MuiExpansionPanelSummary-root": {
      backgroundColor: "#f4f5fa"
    }
  },
  formControl: {
    // margin: theme.spacing(1),
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
  },
  expandedPanel: {
    // backgroundColor: "#f4f5fa"
  },
  heading: {
    color: "#052a4f",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "500"
  },
  rowDesign: {
    paddingTop: 15
  }
});

let searchFormData = {};

export default function MasterComponent(props) {
  const classes = useClasses(styles);
  const [moduleHeader, setModuleHeader] = useState([]);

  const paramObj = useMemo(() =>
    props && props.indexPageData.length ? props.indexPageData : []
  ,[props])
  
    

  useEffect(() => {
    if (paramObj) {
      setModuleHeader(paramObj.map(param => param.MODULENAME));
    }
  }, [paramObj]);
  const [dataSelected, setDataSelected] = useState([]);

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

  const [searchData, setSearchData] = useState({});
  //const [bottomAction, setBottomAction] = useState([]);

  const handleSubmit = data => {
    //console.log("Form JSON data " + JSON.stringify(data));
    setIsFormValid(false);
    data["moduleType"] = moduleType;
    searchFormData = data;
    commonService.fetchMasterSearchData(data).then(response => {
      setSearchData(response);
    });
    setShowResults(true);
    setExpandedPanel(false);
  };
  //console.log("VIVEK - searchFormData = "+searchFormData);

  const ResultFrame = () => (
    <div id="bottomFrame" className={classes.root} style={{ paddingTop: 5 }}>
      {searchData ? (
        <GenericDatatable
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
        ></GenericDatatable>
      ) : (
        "No data available"
      )}
    </div>
  );

  return (
    <Paper style={{ padding: "4px" }}>
      <div id="topFrame" className={classes.root}>
        <Accordion
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
              expanded: classes.expandedPanel
            }}
          >
            <Typography className={classes.heading} id="searchHeader">
              {moduleHeader[0]}
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
                className={classes.rowDesign}
              >
                {paramObj
                  ? paramObj.map((eachParam, index) =>
                      eachParam.MODULEPARAMDATATYPE === "date" ? (
                        <Grid item xs={3} key={index}>
                          <FormControl className={classes.formControl}>
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
                        <Grid item xs={3} key={index}>
                          <FormControl
                            className={
                              (clsx(classes.margin, classes.textField),
                              classes.formControl)
                            }
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
                        <Grid item xs={3} key={index}>
                          <FormControl className={classes.formControl}>
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
                        <Grid item xs={3} key={index}>
                          <FormControl className={classes.formControl} variant={'outlined'} >
                            <SelectFormsy
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
                        <Grid item xs={3} key={index}>
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

                {paramObj
                  ? paramObj.map((eachParam, index) =>
                      eachParam.MODULEPARAMDATATYPE === "checkbox" ? (
                        <Grid item xs={3} key={index}>
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
                      ) : null
                    )
                  : null}

                <Grid item xs={12}></Grid>
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
              </Grid>
            </Formsy>
          </AccordionDetails>
        </Accordion>
      </div>
      {/* ) : null} */}
      {showResults ? <ResultFrame /> : null}
    </Paper>
  );
}
