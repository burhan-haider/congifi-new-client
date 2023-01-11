import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
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
  Accordion as ExpansionPanel,
  AccordionSummary as ExpansionPanelSummary,
  AccordionDetails as ExpansionPanelDetails,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { useClasses } from "@application";
import clsx from "clsx";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md'
import commonService from "services/common/commonService";
import scenariosService from "services/scenarios/scenariosService";
import { GenericButton } from "@application";
import * as MessageActions from "redux/message/message.actions";

const styles = theme => ({
  root: {
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
  },
  expandedPanel: {
    backgroundColor: "#f4f5fa"
  },
  heading: {
    color: "#052a4f",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "500"
  },
  rowDesign: {
    paddingTop: 15
  }
});

export default function ScenariosModalContainer(props) {
  //console.log(props);
  const classes = useClasses(styles);
  const dispatch = useDispatch();
  const [wholeData, setWholeData] = useState([]);
  const [submitType, setSubmitType] = useState("");
  const paramObj =
    wholeData.MASTERSEARCHFRAME && wholeData.MASTERSEARCHFRAME.length
      ? wholeData.MASTERSEARCHFRAME
      : [];
  //console.log(paramObj);
  const moduleHeader =
    wholeData.MASTERSEARCHFRAME && wholeData.MASTERSEARCHFRAME.length
      ? wholeData.MASTERSEARCHFRAME[0].MODULENAME
      : "";

  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState("searchExpansionPanel");
  const handlePanelExpansion = panel => (event, expandedPanel) => {
    //console.log(expandedPanel, panel);
    setExpandedPanel(expandedPanel ? panel : false);
  };
  const [resultData, setResultData] = useState("");

  const handleButtonClick = event => {
    //console.log(event.target.textContent);
    setSubmitType(event.target.textContent);
  };

  const handleSubmit = data => {
    setIsFormValid(false);
    data["moduleType"] = moduleHeader;
    data["alertId"] = wholeData.ALERTID;
    data["alertSerialNo"] = wholeData.ALERTSERIALNO;
    data["viewType"] = wholeData.VIEWTYPE;
    if (submitType === "Save" || submitType === "Delete") {
      //console.log(submitType);
      scenariosService
        .addOrRemoveAlertBenchMarkParameters(submitType, data)
        .then(response => {
          dispatch(
            MessageActions.showMessage({
              message: response,
              variant: "success"
            })
          );
          //props.closeModal();
        })
        .catch(error => {
          return dispatch(
            MessageActions.showMessage({ message: error, variant: "error" })
          );
        });
    } else if (submitType === "Generate" || submitType === "Simulate") {
      data["generationType"] = "ALERTDATA";
      scenariosService
        .generateOrSimulateAlertWithBenchMarks(submitType, data)
        .then(response => {
          setResultData(response);
        });
      setShowResults(true);
      setExpandedPanel(false);
    } else {
    }
    setIsFormValid(true);
  };

  const ResultFrame = () => (
    <div id="bottomFrame" className={classes.root} style={{ paddingTop: 20 }}>
      <ExpansionPanel defaultExpanded={true} id="resultExpansionPanel">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="resultPanelContent"
          id="resultPanelHeader"
          classes={{
            root: classes.root,
            expanded: classes.expandedPanel
          }}
        >
          <Typography className={classes.heading} id="resultHeader">
            {submitType} Result
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          align="left"
          id="resultExpansionPanelDetails"
          style={{ padding: 5 }}
        >
          <Grid container>
            <Grid item xs={12}>
              {resultData !== null ? resultData : "No data available"}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );

  useEffect(() => {
    //console.log("useEffect - dataSet");
    if (props.data.dataSet !== undefined) {
      props.data.dataSet.then(response => {
        setWholeData(response);
      });
    }
  }, [props.data.dataSet]);
  //console.log(wholeData);

  useEffect(() => {
    //console.log("useEffect - showResults");
    if (showResults) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [showResults]);

  return (
    <Paper style={{ padding: 16 }}>
      <div id="topFrame" className={classes.root}>
        <ExpansionPanel
          expanded={expandedPanel === "searchExpansionPanel"}
          onChange={handlePanelExpansion("searchExpansionPanel")}
          id="searchExpansionPanel"
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="searchPanelcontent"
            id="searchPanelHeader"
            classes={{
              root: classes.root,
              expanded: classes.expandedPanel
            }}
          >
            <Typography className={classes.heading} id="searchHeader">
              {wholeData.ALERTNAME && wholeData.ALERTNAME !== null
                ? wholeData.ALERTNAME
                : moduleHeader}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
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
                              label={commonService.getLabel(
                                eachParam.MODULEPARAMNAME,
                                eachParam.MODULEPARAMIDNAME
                              )}
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
                      eachParam.MODULEPARAMDATATYPE === "search" ? (
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
                              label={commonService.getLabel(
                                eachParam.MODULEPARAMNAME,
                                eachParam.MODULEPARAMIDNAME
                              )}
                              onChange={() => {}}
                              validationError=""
                              //required={true}
                              value={eachParam.MODULEPARAMDEFAULTVALUE}
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
                      eachParam.MODULEPARAMDATATYPE === "string" ? (
                        <Grid item xs={3} key={index}>
                          <FormControl className={classes.formControl}>
                            <TextFieldFormsy
                              variant="outlined"
                              name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                              label={commonService.getLabel(
                                eachParam.MODULEPARAMNAME,
                                eachParam.MODULEPARAMIDNAME
                              )}
                              className={undefined} // optional, if you need for styling
                              onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                              validationError="" // optional, to show error if validation fails
                              //required={true} // optional, if make this mandatory field in the form
                              value={eachParam.MODULEPARAMDEFAULTVALUE}
                            ></TextFieldFormsy>
                          </FormControl>
                        </Grid>
                      ) : null
                    )
                  : null}

                {paramObj
                  ? paramObj.map((eachParam, index) =>
                      eachParam.MODULEPARAMDATATYPE === "numeric" ? (
                        <Grid item xs={3} key={index}>
                          <FormControl className={classes.formControl}>
                            <TextFieldFormsy
                              variant="outlined"
                              name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                              label={commonService.getLabel(
                                eachParam.MODULEPARAMNAME,
                                eachParam.MODULEPARAMIDNAME
                              )}
                              className={undefined} // optional, if you need for styling
                              onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                              validationError="" // optional, to show error if validation fails
                              //required={true} // optional, if make this mandatory field in the form
                              value={eachParam.MODULEPARAMDEFAULTVALUE}
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
                          <FormControl className={classes.formControl}>
                            <SelectFormsy
                              variant="outlined"
                              name={`${eachParam.MODULEPARAMINDEX}_${eachParam.MODULEPARAMIDNAME}`}
                              //label={`${eachParam.MODULEPARAMIDNAME}`}
                              label={commonService.getLabel(
                                eachParam.MODULEPARAMNAME,
                                eachParam.MODULEPARAMIDNAME
                              )}
                              //value="" // mandatory, value of the selected element
                              value={eachParam.MODULEPARAMDEFAULTVALUE}
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
                              label={commonService.getLabel(
                                eachParam.MODULEPARAMNAME,
                                eachParam.MODULEPARAMIDNAME
                              )}
                            />
                          </FormControl>
                        </Grid>
                      ) : null
                    )
                  : null}
                <div className="w-full flex justify-end mb-4">
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="save"
                    className={classes.button}
                    id="save"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="save"
                    key="save"
                    onClick={event => handleButtonClick(event)}
                  >
                    Save
                  </GenericButton>
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="generate"
                    className={classes.button}
                    id="generate"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="generate"
                    key="generate"
                    onClick={event => handleButtonClick(event)}
                  >
                    Generate
                  </GenericButton>
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="delete"
                    className={classes.button}
                    id="delete"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="delete"
                    key="delete"
                    onClick={event => handleButtonClick(event)}
                  >
                    Delete
                  </GenericButton>
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="simulate"
                    className={classes.button}
                    id="simulate"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="simulate"
                    key="simulate"
                    onClick={event => handleButtonClick(event)}
                  >
                    Simulate
                  </GenericButton>
                  {/* <button onClick={this.submit2}>Simulate Alerts</button> */}
                </div>
              </Grid>
            </Formsy>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      {/* ) : null} */}
      {showResults ? <ResultFrame /> : null}
    </Paper>
  );
}
