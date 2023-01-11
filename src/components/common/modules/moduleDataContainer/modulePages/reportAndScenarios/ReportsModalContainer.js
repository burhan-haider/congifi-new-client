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
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
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
import reportsService from "services/reports/reportsService";
import { GenericButton, GenericDialog } from "@application";
import * as MessageActions from "redux/message/message.actions";
import ResetColumnsModal from "./ResetColumnsModal";

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

export default function ReportsModalContainer(props) {
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
  const [expandedPanel, setExpandedPanel] = useState("searchExpansionPanel");
  const handlePanelExpansion = panel => (event, expandedPanel) => {
    //console.log(expandedPanel, panel);
    setExpandedPanel(expandedPanel ? panel : false);
  };

  const handleButtonClick = event => {
    //console.log(event.target.textContent);
    setSubmitType(event.target.textContent);
  };

  const handleCsvClick = event => {
    //console.log(event.target.textContent);
    setSubmitType("exportCSV");
  };

  const handleExcelClick = event => {
    //console.log(event.target.textContent);
    setSubmitType("exportExcel");
  };

  const handleSubmit = data => {
    setIsFormValid(false);
    data["moduleType"] = moduleHeader;
    data["reportId"] = wholeData.REPORTID;
    data["reportSerialNo"] = wholeData.REPORTSERIALNO;
    data["viewType"] = wholeData.VIEWTYPE;
    data["group"] = wholeData.GROUP;
    if (submitType === "Save" || submitType === "Delete") {
      //console.log(submitType);
      reportsService
        .addOrRemoveReportBenchMarkParameters(submitType, data)
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
    } else if (submitType === "exportCSV" || submitType === "exportExcel") {
      data["generationType"] = submitType;
      reportsService.generateReportWithBenchMarks(data);
    } else {
    }
    setIsFormValid(true);
  };
  //console.log("ReportsModal");

  const modalData = {
    resetColumns: {
      title: "Reset Report Columns: " + wholeData.REPORTID,
      size: "lg"
    }
  };

  // VIVEK - Code for modal open
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayProperty = data => {
    setProperty(modalData[data]);
  };

  useEffect(() => {
    //console.log("useEffect - dataSet");
    if (props.data.dataSet !== undefined) {
      props.data.dataSet.then(response => {
        setWholeData(response);
      });
    }
  }, [props.data.dataSet]);
  //console.log(wholeData);

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
              {wholeData.REPORTNAME && wholeData.REPORTNAME !== null
                ? wholeData.REPORTNAME
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
                    aria-label="excel"
                    className={classes.button}
                    id="excel"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="excel"
                    key="excel"
                    onClick={event => handleExcelClick(event)}
                  >
                    Export Excel
                  </GenericButton>
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="csv"
                    className={classes.button}
                    id="csv"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="csv"
                    key="csv"
                    onClick={event => handleCsvClick(event)}
                  >
                    Export CSV
                  </GenericButton>
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="pdf"
                    className={classes.button}
                    id="pdf"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="pdf"
                    key="pdf"
                    //onClick={event => handleButtonClick(event)}
                  >
                    Export PDF
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
                    //onClick={event => handleButtonClick(event)}
                  >
                    Generate
                  </GenericButton>
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="email"
                    className={classes.button}
                    id="email"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="email"
                    key="email"
                    //onClick={event => handleButtonClick(event)}
                  >
                    Email Report
                  </GenericButton>
                  <GenericButton
                    type="submit"
                    variant="outlined"
                    color="primary"
                    aria-label="reset"
                    className={classes.button}
                    id="reset"
                    style={{ margin: 10 }}
                    disabled={!isFormValid}
                    value="reset"
                    key="reset"
                    onClick={e => {
                      handleClickOpenModal();
                      displayProperty("resetColumns");
                    }}
                  >
                    Reset Columns
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
                  {/* <button onClick={this.submit2}>Simulate Alerts</button> */}
                </div>
              </Grid>
            </Formsy>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <GenericDialog
        closeModal={handleCloseModal}
        state={openModal}
        property={property}
      >
        <ResetColumnsModal
          closeModal={handleCloseModal}
          reportId={wholeData.REPORTID}
          reportName={wholeData.REPORTNAME}
          reportSerialNo={wholeData.REPORTSERIALNO}
        />
      </GenericDialog>
    </Paper>
  );
}
