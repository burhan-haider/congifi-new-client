import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  SelectFormsy
} from "components/common/formsyComponents";
import {
  MenuItem,
  FormControl,
  Grid,
  Accordion as ExpansionPanel,
  AccordionDetails as ExpansionPanelDetails,
  AccordionSummary as ExpansionPanelSummary,
  Typography,
  IconButton,
  Divider,
  Button
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
import { MdAdd as AddIcon, MdDelete as DeleteIcon, MdExpandMore as ExpandMoreIcon } from 'react-icons/md'
import caseWorkflowService from "services/caseWorkflow/caseWorkflowService";
import { GenericButton } from "@application";
import { GenericDatatable, GenericDatagrid } from "@application";
import { ActionsBottomContainer } from "../common/bottomPages";
import { store } from "redux/store";
import { useClasses, styles } from "@application";

// const styles = theme => ({
//   root: {
//     width: "100%"
//   },
//   formControl: {
//     margin: 1,
//     fullWidth: true,
//     display: "flex",
//     wrap: "nowrap"
//   },
//   rowDesign: {
//     paddingTop: 15
//   },
//   expandedPanel: {
//     backgroundColor: "#f4f5fa"
//   },
//   heading: {
//     color: "#052a4f",
//     fontSize: 18,
//     fontWeight: "500"
//   },
//   margin: {
//     borderRadius: "25px",
//     color: '#052a4f',
//     borderColor: '#052a4f',
//     textTransform: "none",
//   }
// });

function ActionParamsForm(props) {
  const classes = useClasses(styles);
  const allActionsList = props.allActionsList;
  const isCallFromActionDetails = props.fromDetails;

  const [expandedPanel, setExpandedPanel] = useState(
    "actionParamExpansionPanel"
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [showStaticValuesField, setShowStaticValuesField] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [actionParamData, setActionParamData] = useState({});
  const [dataSelected, setDataSelected] = useState([]);

  const [actionParamDatatypeEnable, setActionParamDatatypeEnable] = useState(
    true
  );
  const [actionParamIsEnabledEnable, setActionParamIsEnabledEnable] = useState(
    true
  );
  const [actionParamNameEnable, setActionParamNameEnable] = useState(true);
  const [actionParamIdEnable, setActionParamIdEnable] = useState(true);
  // const [actionParamAliasNameEnable, setActionParamAliasNameEnable] = useState(
  //   true
  // );
  // const [actionParamIndexEnable, setActionParamIndexEnable] = useState(true);
  const [
    actionParamStaticValuesEnable,
    setActionParamStaticValuesEnable
  ] = useState(true);
  const [
    actionParamDefaultValueEnable,
    setActionParamDefaultValueEnable
  ] = useState(true);
  const [
    actionParamValidationTypeEnable,
    setActionParamValidationTypeEnable
  ] = useState(true);
  const [
    actionParamValidationFieldEnable,
    setActionParamValidationFieldEnable
  ] = useState(true);

  useEffect(() => {
    if (isCallFromActionDetails === true) {
      const state = store.getState();
      const selectedActionCode =
        state.actionMaster.actionManagementData.selectedActionCode;

      caseWorkflowService
        .searchActionParams([{ actionCode: selectedActionCode }])
        .then(data => {
          //console.log(data);
          setActionParamData(data);
          setShowResults(true);
          setExpandedPanel(false);
          setIsFormValid(true);
        })
        .catch(error => {
          console.log("caseworkflow Service Error:-",error);
        });
    }
  }, [isCallFromActionDetails]);

  const handlePanelExpansion = panel => (event, expandedPanel) => {
    setExpandedPanel(expandedPanel ? panel : false);
  };

  const selectionIndex = "all";

  const [mandatoryInputFields, setMandatoryInputFields] = useState([
    {
      commentsFieldActionCode: "",
      commentsFieldActionParamDatatype: "",
      commentsFieldActionParamIsEnabled: "",
      commentsFieldActionParamName: "",
      commentsFieldActionParamId: "",
      commentsFieldActionParamDefaultValue: "",
      commentsFieldActionParamValidationType: "",
      commentsFieldActionParamValidationField: ""
    }
  ]);

  const [inputFields, setInputFields] = useState([
    {
      // actionFieldsId: "1234",
      actionCode: "",
      actionParamIsEnabled: "",
      actionParamName: "",
      actionParamId: "",
      // actionParamAliasName: "",
      // actionParamIndex: "",
      actionParamDatatype: "",
      actionParamStaticValues: "",
      actionParamDefaultValue: "",
      actionParamValidationType: "",
      actionParamValidationField: ""
      //status: ["actionCode"]
    }
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      actionCode: "",
      actionParamIsEnabled: "",
      actionParamName: "",
      actionParamId: "",
      // actionParamAliasName: "",
      // actionParamIndex: "",
      actionParamDatatype: "",
      actionParamStaticValues: "",
      actionParamDefaultValue: "",
      actionParamValidationType: "",
      actionParamValidationField: ""
    });

    setInputFields(values);
  };

  const handleRemoveFields = index => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    
  };

  const handleInputChange = (index, eventName, event, nextEvent) => {
    const values = [...inputFields];
    const fieldValue = event.target.value;
    //console.log(nextEvent);
    if (eventName === "actionCode") {
      values[index].actionCode = fieldValue;
      if (nextEvent === "actionParamDatatype") {
        setActionParamDatatypeEnable(false);
      }
    } else if (eventName === "actionParamDatatype") {
      values[index].actionParamDatatype = fieldValue;
      if (fieldValue === "select") {
        setShowStaticValuesField(true);
      } else {
        setShowStaticValuesField(false);
      }
      if (nextEvent === "actionParamIsEnabled") {
        setActionParamIsEnabledEnable(false);
      }
    } else if (eventName === "actionParamIsEnabled") {
      values[index].actionParamIsEnabled = fieldValue;
      if (nextEvent === "actionParamName") {
        setActionParamNameEnable(false);
      }
    } else if (event.target.name === "actionParamName") {
      values[index].actionParamName = fieldValue;
      if (nextEvent === "actionParamId") {
        setActionParamIdEnable(false);
      }
    } else if (event.target.name === "actionParamId") {
      values[index].actionParamId = fieldValue;
      if (showStaticValuesField === true) {
        setActionParamStaticValuesEnable(false);
      } else if (
        nextEvent === "actionParamDefaultValue" &&
        showStaticValuesField === false
      ) {
        setActionParamDefaultValueEnable(false);
      }
      // } else if (eventName === "actionParamAliasName") {
      //   values[index].actionParamAliasName = fieldValue;
      // } else if (eventName === "actionParamIndex") {
      //   values[index].actionParamIndex = fieldValue;
      // }
    } else if (eventName === "actionParamStaticValues") {
      values[index].actionParamStaticValues = fieldValue;
      if (nextEvent === "actionParamDefaultValue") {
        setActionParamDefaultValueEnable(false);
      }
    } else if (eventName === "actionParamDefaultValue") {
      values[index].actionParamDefaultValue = fieldValue;
      if (nextEvent === "actionParamValidationType") {
        setActionParamValidationTypeEnable(false);
      }
    } else if (eventName === "actionParamValidationType") {
      values[index].actionParamValidationType = fieldValue;
      if (nextEvent === "actionParamValidationField") {
        setActionParamValidationFieldEnable(false);
      }
    } else if (eventName === "actionParamValidationField") {
      values[index].actionParamValidationField = fieldValue;
    }
    setInputFields(values);
  };

  const handleSubmit = () => {
    //console.log("inputFields", JSON.stringify(inputFields));
    //    inputFields["commentsFieldActionCode"] = commentsFieldActionCode.value;

    //setMandatoryInputFields(mandatoryInputFields);
    caseWorkflowService
      .saveActionParams(inputFields)
      .then(data => {
        // console.log(data);
        alert("Created");
        setActionParamData(data);
        setShowResults(true);
        setExpandedPanel(false);
        setIsFormValid(true);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const handleActionParamSearch = () => {
    //console.log(inputFields);
    caseWorkflowService
      .searchActionParams(inputFields)
      .then(data => {
        setActionParamData(data);
        setShowResults(true);
        setExpandedPanel(false);
        setIsFormValid(true);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const ResultFrame = () => (
    <div id="bottomFrame" className={classes.root} style={{ paddingTop: 20 }}>
      {actionParamData && actionParamData !== null ? (
        <>
          <GenericDatatable
            dataSet={actionParamData}
            infoEnabled={true}
            moduleName="Action Params List"
            isSelection={false}
            isMultipleSelect={false}
            selectionIndex={selectionIndex}
            selected={dataSelected}
            selectHandler={setDataSelected}
            BottomContainer={ActionsBottomContainer}
          ></GenericDatatable>
          <GenericDatagrid 
              title={'Entity List Tab View'} 
              tableData={actionParamData} 
              utilColumn={'select'}
          />
        </>
      ) : (
        "No data available"
      )}
    </div>
  );

  return (
    <React.Fragment>
      <div id="topFrame" className={classes.root}>
        <ExpansionPanel
          expanded={expandedPanel === "actionParamExpansionPanel"}
          onChange={handlePanelExpansion("actionParamExpansionPanel")}
          id="actionParamExpansionPanel"
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="actionParamPanelcontent"
            id="actionParamPanelHeader"
            className={classes.root}
            classes={{
              root: "w-full",
              expanded: "bg-[#f4f5fa]",
            }}
            styles={{display: 'flex', justifyContent: "flex-end", flexDirection: 'row', alignItems: 'center'}}
          >
            <Typography sx={{display: 'flex', alignItems: 'center'}} className={classes.heading} id="actionParamHeader" >
              Action Parameter Master
            </Typography>
           
          </ExpansionPanelSummary>
          <Divider/>
          <ExpansionPanelDetails
            align="left"
            id="actionParamExpansionPanelDetails"
            // style={{ padding: 10 }}
          >
             <Button
              type="button"
              aria-label="remove"
              className='float-right mb-[10px]'
              color="primary"
              variant="outlined"
              onClick={() => handleAddFields()}
            >
              Add Field
            </Button>
            
            <Formsy
              onValid={() => setIsFormValid(true)}
              onInvalid={() => setIsFormValid(false)}
              className="flex flex-col justify-center w-full"
            >
              {/* {mandatoryInputFields.map((mandatoryInputField, index) => (
                <React.Fragment key={`${mandatoryInputField}~${index}`}>
                  <Grid
                    container
                    alignItems="flex-start"
                    spacing={2}
                    className={classes.rowDesign}
                  >
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <SelectFormsy
                          variant="outlined"
                          name="commentsFieldActionCode"
                          id="commentsFieldActionCode"
                          label="Action Code"
                          className={undefined}
                          value={mandatoryInputField.commentsFieldActionCode}
                          required={true}
                          disabled={false}
                          validationError=""
                        >
                          <MenuItem value="">Select One</MenuItem>
                          {allActionsList
                            ? allActionsList.map(allActions =>
                                allActions != null
                                  ? Object.entries(allActions).map(
                                      (key, value) => {
                                        return (
                                          <MenuItem value={key[0]} key={value}>
                                            {key[0]} - {key[1]}
                                          </MenuItem>
                                        );
                                      }
                                    )
                                  : null
                              )
                            : null}
                        </SelectFormsy>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="commentsFieldActionParamDatatype"
                          id="commentsFieldActionParamDatatype"
                          label="Parameter Datatype"
                          className={undefined}
                          value="textarea"
                          validationError=""
                          disabled={true}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="commentsFieldActionParamIsEnabled"
                          id="commentsFieldActionParamIsEnabled"
                          label="Parameter Is Enabled"
                          className={undefined}
                          validationError=""
                          required={true}
                          value="Yes"
                          disabled={true}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="commentsFieldActionParamName"
                          id="commentsFieldActionParamName"
                          label="Parameter Name"
                          className={undefined}
                          validationError=""
                          value="Comments"
                          disabled={true}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="commentsFieldActionParamId"
                          id="commentsFieldActionParamId"
                          label="Parameter Id"
                          className={undefined}
                          validationError=""
                          value="comments"
                          disabled={true}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="commentsFieldActionParamDefaultValue"
                          id="commentsFieldActionParamDefaultValue"
                          label="Parameter Default Value"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={
                            mandatoryInputField.commentsFieldActionParamDefaultValue
                          }
                          disabled={false}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="commentsFieldActionParamValidationType"
                          id="commentsFieldActionParamValidationType"
                          label="Parameter Validation Type"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={
                            mandatoryInputField.commentsFieldActionParamValidationType
                          }
                          disabled={false}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="commentsFieldActionParamValidationField"
                          id="commentsFieldActionParamValidationField"
                          label="Parameter Validation Field"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={
                            mandatoryInputField.commentsFieldActionParamValidationField
                          }
                          disabled={false}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))} */}
              {inputFields.map((inputField, index) => (
                <React.Fragment key={`${inputField}~${index}`}>
                  {/* <Divider
                    variant="middle"
                    style={{
                      margin: "10px 8px 0 8px",
                      backgroundColor: "#052a4f"
                    }}
                  /> */}
                  <Grid
                    container
                    alignItems="flex-start"
                    spacing={2}
                    className={classes.root}
                  >
                    <Grid className="flex items-center" item xs={4}>
                      <Typography>Action Code</Typography>
                      <FormControl fullWidth>
                        {/* <TextFieldFormsy
                          variant="outlined"
                          name="actionCode"
                          label="Action Code"
                          className={undefined}
                          validationError=""
                          //required={true}
                          value={inputField.actionCode}
                          onChange={event =>
                            handleInputChange(index, "actionCode", event)
                          }
                        ></TextFieldFormsy> */}
                        <SelectFormsy
                          variant="outlined"
                          name="actionCode"
                          id="actionCode"
                          // label="Action Code"
                          className={undefined}
                          value={inputField.actionCode}
                          onChange={event => {
                            handleInputChange(
                              index,
                              "actionCode",
                              event,
                              "actionParamDatatype"
                            );
                            //enableNextField("actionCode", "actionParamDatatype");
                          }}
                          validationError=""
                          required={true}
                        >
                          <MenuItem value="">Select One</MenuItem>
                          {allActionsList
                            ? allActionsList.map(allActions =>
                                allActions != null
                                  ? Object.entries(allActions).map(
                                      (key, value) => {
                                        return (
                                          <MenuItem value={key[0]} key={value}>
                                            {key[0]} - {key[1]}
                                          </MenuItem>
                                        );
                                      }
                                    )
                                  : null
                              )
                            : null}
                        </SelectFormsy>
                      </FormControl>
                    </Grid>
                    <Grid className={`${classes.root} flex items-center`} item xs={4}>
                      <Typography>Parameter Datatype</Typography>
                      <FormControl fullWidth>
                        <SelectFormsy
                          variant="outlined"
                          name="actionParamDatatype"
                          id="actionParamDatatype"
                          // label="Parameter Datatype"
                          className={undefined}
                          value={inputField.actionParamDatatype}
                          onChange={event =>
                            handleInputChange(
                              index,
                              "actionParamDatatype",
                              event,
                              "actionParamIsEnabled"
                            )
                          }
                          validationError=""
                          required={true}
                          disabled={actionParamDatatypeEnable}
                          // disabled={isFieldDisabled(
                          //   "1234",
                          //   "actionParamDatatype",
                          //   "actionCode"
                          // )}
                        >
                          <MenuItem value="">Select One</MenuItem>
                          <MenuItem value="date">Date</MenuItem>
                          <MenuItem value="text">Text</MenuItem>
                          <MenuItem value="textarea">Textarea</MenuItem>
                          <MenuItem value="select">Select</MenuItem>
                          <MenuItem value="usersList">Users List</MenuItem>
                          <MenuItem value="teleCall">Tele Call</MenuItem>
                          <MenuItem value="sms">SMS</MenuItem>
                          <MenuItem value="email">Email</MenuItem>
                          <MenuItem value="dunningLetter">
                            Dunning Letter
                          </MenuItem>
                        </SelectFormsy>
                      </FormControl>
                    </Grid>
                    <Grid className="flex items-center" item xs={4}>
                      <Typography>Parameter Is Enabled</Typography>
                      <FormControl fullWidth>
                        <SelectFormsy
                          variant="outlined"
                          name="actionParamIsEnabled"
                          // label="Parameter Is Enabled"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={inputField.actionParamIsEnabled}
                          onChange={event =>
                            handleInputChange(
                              index,
                              "actionParamIsEnabled",
                              event,
                              "actionParamName"
                            )
                          }
                          disabled={actionParamIsEnabledEnable}
                        >
                          <MenuItem value="">Select One</MenuItem>
                          <MenuItem value="Y">Yes</MenuItem>
                          <MenuItem value="N">No</MenuItem>
                        </SelectFormsy>
                      </FormControl>
                    </Grid>
                    <Grid className="flex items-center" item xs={4}>
                      <Typography>Parameter Name</Typography>
                      <FormControl fullWidth className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="actionParamName"
                          // label="Parameter Name"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={inputField.actionParamName}
                          onChange={event =>
                            handleInputChange(
                              index,
                              "actionParamName",
                              event,
                              "actionParamId"
                            )
                          }
                          disabled={actionParamNameEnable}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid className="flex items-center" item xs={4}>
                      <Typography>Parameter Id</Typography>
                      <FormControl fullWidth >
                        <TextFieldFormsy
                          variant="outlined"
                          name="actionParamId"
                          // label="Parameter Id"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={inputField.actionParamId}
                          onChange={event =>
                            handleInputChange(
                              index,
                              "actionParamId",
                              event,
                              "actionParamDefaultValue"
                            )
                          }
                          disabled={actionParamIdEnable}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="actionParamAliasName"
                          label="Parameter Alias"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={inputField.actionParamAliasName}
                          onChange={event =>
                            handleInputChange(
                              index,
                              "actionParamAliasName",
                              event,
                              "actionParamIndex"
                            )
                          }
                          //disabled={actionParamAliasNameEnable}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name="actionParamIndex"
                          label="Parameter Index"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={inputField.actionParamIndex}
                          onChange={event =>
                            handleInputChange(
                              index,
                              "actionParamIndex",
                              event,
                              "actionParamStaticValues"
                            )
                          }
                          //disabled={actionParamIndexEnable}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid> */}
                    {showStaticValuesField ? (
                      <Grid className="flex items-center" item xs={4}>
                        <Typography>Parameter Static Values</Typography>
                        <FormControl fullWidth>
                          <TextFieldFormsy
                            variant="outlined"
                            name="actionParamStaticValues"
                            // label="Parameter Static Values"
                            className={undefined}
                            validationError=""
                            required={true}
                            value={inputField.actionParamStaticValues}
                            onChange={event =>
                              handleInputChange(
                                index,
                                "actionParamStaticValues",
                                event,
                                "actionParamDefaultValue"
                              )
                            }
                            disabled={actionParamStaticValuesEnable}
                          ></TextFieldFormsy>
                        </FormControl>
                      </Grid>
                    ) : null}
                    <Grid className="flex items-center" item xs={4}>
                      <Typography>Parameter Default Value</Typography>
                      <FormControl fullWidth>
                        <TextFieldFormsy
                          variant="outlined"
                          name="actionParamDefaultValue"
                          // label="Parameter Default Value"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={inputField.actionParamDefaultValue}
                          onChange={event =>
                            handleInputChange(
                              index,
                              "actionParamDefaultValue",
                              event,
                              "actionParamValidationType"
                            )
                          }
                          disabled={actionParamDefaultValueEnable}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid className="flex items-center" item xs={4}>
                      <Typography>Parameter Validation Type</Typography>
                      <FormControl fullWidth>
                        <TextFieldFormsy
                          variant="outlined"
                          name="actionParamValidationType"
                          // label="Parameter Validation Type"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={inputField.actionParamValidationType}
                          onChange={event =>
                            handleInputChange(
                              index,
                              "actionParamValidationType",
                              event,
                              "actionParamValidationField"
                            )
                          }
                          disabled={actionParamValidationTypeEnable}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                    <Grid className="flex items-center" item xs={4}>
                      <Typography>Parameter Validation Field</Typography>
                      <FormControl fullWidth>
                        <TextFieldFormsy
                          variant="outlined"
                          name="actionParamValidationField"
                          // label="Parameter Validation Field"
                          className={undefined}
                          validationError=""
                          required={true}
                          value={inputField.actionParamValidationField}
                          onChange={event =>
                            handleInputChange(
                              index,
                              "actionParamValidationField",
                              event
                            )
                          }
                          disabled={actionParamValidationFieldEnable}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid
                        container
                        style={{ marginRight: 15, display: "flex", justifyContent: "flex-end", flexDirection: "row" }}
                      >
                        {/* <IconButton
                          type="button"
                          aria-label="remove"
                          className={classes.margin}
                          color="primary"
                          onClick={() => handleAddFields()}
                        >
                          <AddIcon color={'#3f51b5'} size={45} />
                        </IconButton> */}
                        <Button
                          type="button"
                          aria-label="remove"
                          className={classes.margin}
                          style={{ margin: 10 }}
                          color="primary"
                          variant="outlined"
                          onClick={() => handleRemoveFields(index)}
                        >Delete</Button>
                        {/* <IconButton
                          type="button"
                          aria-label="remove"
                          className={classes.margin}
                          color="secondary"
                          onClick={() => handleRemoveFields(index)}
                        >
                          <DeleteIcon color={'#f50057'} size={45} />
                        </IconButton> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid
                container
                style={{ marginRight: 15, display: "flex", justifyContent: "flex-end", flexDirection: "row" }}
              >
                <GenericButton
                  type="button"
                  variant="outlined"
                  color="primary"
                  aria-label="saveActionParams"
                  className={classes.button}
                  id="saveActionParams"
                  style={{ margin: 10 }}
                  disabled={!isFormValid}
                  value="saveActionParams"
                  onClick={() => handleSubmit()}
                >
                  Save
                </GenericButton>

                <GenericButton
                  type="button"
                  variant="outlined"
                  color="primary"
                  aria-label="searchActionParams"
                  className={classes.button}
                  id="searchActionParams"
                  style={{ margin: 10 }}
                  //disabled={!isFormValid}
                  value="searchActionParams"
                  onClick={() => handleActionParamSearch()}
                >
                  Search
                </GenericButton>
              </Grid>
              {/* <br></br>
          <pre>{JSON.stringify(inputFields, null, 2)}</pre> */}
            </Formsy>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      {showResults ? <ResultFrame /> : null}
    </React.Fragment>
  );
}

export default ActionParamsForm;
