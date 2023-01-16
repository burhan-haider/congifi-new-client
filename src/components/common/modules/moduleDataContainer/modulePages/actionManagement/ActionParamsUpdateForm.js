import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  SelectFormsy,
} from "components/common/formsyComponents";
import {
  MenuItem,
  FormControl,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import caseWorkflowService from "services/caseWorkflow/caseWorkflowService";
import { GenericButton } from "@application";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdExpandMore as ExpandMoreIcon } from "react-icons/md";
import { useClasses } from "@application";

const styles = (theme) => ({
  root: {
    width: "w-full",
  },
  formControl: {
    margin: theme.spacing(1),
    fullWidth: true,
    display: "flex",
    wrap: "flex nowrap w-full m-2",
  },
  rowDesign: {
    paddingTop: "pt-5",
  },
  actionParamsUpdateDiv: {
    backgroundColor: "bg-[#f4f5fa]",
  },
  expandedPanel: {
    backgroundColor: "#f4f5fa",
  },
  heading: {
    color: "text-[#052a4f]",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "500",
  },
});

function ActionParamsUpdateForm(props) {
  const classes = useClasses(styles);

  const [isFormValid, setIsFormValid] = useState(false);
  const [showStaticValuesField, setShowStaticValuesField] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState(
    "actionParamsExpansionPanel"
  );

  const handlePanelExpansion = (panel) => (event, expandedPanel) => {
    setExpandedPanel(expandedPanel ? panel : false);
  };

  var actionParamIsEnabled = "";
  var actionCode = "";
  var actionName = "";
  var actionParamName = "";
  var actionParamAliasName = "";
  var actionParamId = "";
  var actionParamIndex = "";
  var actionParamDatatype = "";
  var actionParamStaticValues = "";
  var actionParamDefaultValue = "";
  var actionParamValidationField = "";
  var actionParamValidationType = "";

  if (props.fieldMap !== null) {
    Object.entries(props.fieldMap).map((key, value) => {
      if (key[0] === "ACTIONPARAMISENABLED") {
        actionParamIsEnabled = key[1];
      } else if (key[0] === "ACTIONCODE") {
        actionCode = key[1];
      } else if (key[0] === "ACTIONNAME") {
        actionName = key[1];
      } else if (key[0] === "ACTIONPARAMNAME") {
        actionParamName = key[1];
      } else if (key[0] === "ACTIONPARAMALIASNAME") {
        actionParamAliasName = key[1];
      } else if (key[0] === "ACTIONPARAMID") {
        actionParamId = key[1];
      } else if (key[0] === "ACTIONPARAMINDEX") {
        actionParamIndex = key[1];
      } else if (key[0] === "ACTIONPARAMDATATYPE") {
        actionParamDatatype = key[1];
      } else if (key[0] === "ACTIONPARAMSTATICVALUES") {
        actionParamStaticValues = key[1];
      } else if (key[0] === "ACTIONPARAMDEFAULTVALUE") {
        actionParamDefaultValue = key[1];
      } else if (key[0] === "ACTIONPARAMVALIDATIONFIELD") {
        actionParamValidationField = key[1];
      } else if (key[0] === "ACTIONPARAMVALIDATIONTYPE") {
        actionParamValidationType = key[1];
      }
    });
  }
  //console.log(actionCode);
  const updateActionParams = (paramData) => {
    caseWorkflowService
      .updateActionParams(paramData)
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        console.log("caseworkflow Service Error:-", error);
      });
  };

  return (
    // <Paper style={{ padding: "4px" }}>
    <Accordion
      expanded={expandedPanel === "actionParamsExpansionPanel"}
      onChange={handlePanelExpansion("actionParamsExpansionPanel")}
      id="actionExpansionPanel"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="actionParamsPanelcontent"
        id="actionParamsPanelHeader"
        classes={{
          root: "w-full",
          expanded: "bg-[#f4f5fa]",
        }}
      >
        <Typography
          component={"p"}
          className={"text-[#052a4f]"}
          id="actionParamsHeader"
        >
          Action Parameter Details
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        align="left"
        id="actionExpansionPanelDetails"
        style={{ padding: 5 }}
      >
        <Formsy
          onValidSubmit={(data) => updateActionParams(data)}
          onValid={() => setIsFormValid(true)}
          onInvalid={() => setIsFormValid(false)}
          className="flex flex-col justify-center w-full"
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            className={"pt-5"}
          >
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <TextFieldFormsy
                  variant="outlined"
                  name="actionCode"
                  label="Action Code"
                  className={undefined}
                  validationError=""
                  //required={true}
                  value={actionCode}
                  onChange={() => {}}
                  disabled={true}
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <SelectFormsy
                  variant="outlined"
                  name="actionParamDatatype"
                  id="actionParamDatatype"
                  label="Parameter Datatype"
                  className={undefined}
                  value={actionParamDatatype}
                  onChange={() => {}}
                  validationError=""
                  //required={true}
                >
                  <MenuItem value="">Select One</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="textarea">Textarea</MenuItem>
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value="usersList">UsersList</MenuItem>
                  <MenuItem value="teleCall">Tele Call</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="dunningLetter">Dunning Letter</MenuItem>
                </SelectFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <SelectFormsy
                  variant="outlined"
                  name="actionParamIsEnabled"
                  label="Parameter Is Enabled"
                  className={undefined}
                  validationError=""
                  //required={true}
                  value={actionParamIsEnabled}
                  onChange={() => {}}
                >
                  <MenuItem value="">Select One</MenuItem>
                  <MenuItem value="Y">Yes</MenuItem>
                  <MenuItem value="N">No</MenuItem>
                </SelectFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <TextFieldFormsy
                  variant="outlined"
                  name="actionParamName"
                  label="Parameter Name"
                  className={undefined}
                  validationError=""
                  //required={true}
                  value={actionParamName}
                  onChange={() => {}}
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <TextFieldFormsy
                  variant="outlined"
                  name="actionParamId"
                  label="Parameter Id"
                  className={undefined}
                  validationError=""
                  //required={true}
                  value={actionParamId}
                  onChange={() => {}}
                  disabled={true}
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <TextFieldFormsy
                  variant="outlined"
                  name="actionParamAliasName"
                  label="Parameter Alias"
                  className={undefined}
                  validationError=""
                  //required={true}
                  value={actionParamAliasName}
                  onChange={() => {}}
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <TextFieldFormsy
                  variant="outlined"
                  name="actionParamIndex"
                  label="Parameter Index"
                  className={undefined}
                  validationError=""
                  //required={true}
                  value={actionParamIndex}
                  onChange={() => {}}
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            {showStaticValuesField ? (
              <Grid item xs={4}>
                <FormControl className={"flex nowrap w-full m-2"}>
                  <TextFieldFormsy
                    variant="outlined"
                    name="actionParamStaticValues"
                    label="Parameter Static Values"
                    className={undefined}
                    validationError=""
                    //required={true}
                    value={actionParamStaticValues}
                    onChange={() => {}}
                  ></TextFieldFormsy>
                </FormControl>
              </Grid>
            ) : null}
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <TextFieldFormsy
                  variant="outlined"
                  name="actionParamDefaultValue"
                  label="Parameter Default Value"
                  className={undefined}
                  validationError=""
                  //required={true}
                  value={actionParamDefaultValue}
                  onChange={() => {}}
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <TextFieldFormsy
                  variant="outlined"
                  name="actionParamValidationType"
                  label="Parameter Validation Type"
                  className={undefined}
                  validationError=""
                  //required={true}
                  value={actionParamValidationType}
                  onChange={() => {}}
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={"flex nowrap w-full m-2"}>
                <TextFieldFormsy
                  variant="outlined"
                  name="actionParamValidationField"
                  label="Parameter Validation Field"
                  className={undefined}
                  validationError=""
                  //required={true}
                  value={actionParamValidationField}
                  onChange={() => {}}
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
            style={{ marginRight: 15, marginBottom: 10 }}
          >
            <GenericButton
              type="submit"
              variant="outlined"
              color="primary"
              aria-label="updateActionParams"
              className={classes.button}
              id="updateActionParams"
              style={{ margin: 10 }}
              disabled={!isFormValid}
              value="updateActionParams"
              //onClick={() => updateActionParams()}
            >
              Update
            </GenericButton>
          </Grid>
        </Formsy>
      </AccordionDetails>
    </Accordion>
    // </Paper>
  );
}

export default ActionParamsUpdateForm;
