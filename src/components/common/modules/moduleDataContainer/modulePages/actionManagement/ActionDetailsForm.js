import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  TextFieldFormsy,
  SelectFormsy
} from "components/common/formsyComponents";
import { MenuItem, FormControl, Grid, Typography } from "@mui/material";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    width: "100%",
    "& .MuiOutlinedInput-input": {
      padding: '5px 20px',

    },
  },
  formControl: {
    fullWidth: true,
    display: "flex",
    wrap: "nowrap",
    margin: '10px'
  },
  rowDesign: {
    paddingTop: 15
  }
});

export default function ActionDetailsForm(props) {
  const classes = useClasses(styles);

  const [assignedTrayEnable, setAssignedTrayEnable] = useState(true);
  const [assignedModuleEnable, setAssignedModuleEnable] = useState(true);
  const [actionNameEnable, setActionNameEnable] = useState(true);
  const [actionCodeEnable, setActionCodeEnable] = useState(true);
  const [applicableRoleEnable, setApplicableRoleEnable] = useState(true);
  const [previousActionsEnable, setPreviousActionsEnable] = useState(true);
  const [actionResultEnable, setActionResultEnable] = useState(true);
  const [escalatableRolesEnable, setEscalatableRolesEnable] = useState(true);
  const [positionEnable, setPositionEnable] = useState(true);
  const [isEnabledFieldEnable, setIsEnabledFieldEnable] = useState(true);
  const [actionTypeEnable, setActionTypeEnable] = useState(true);

  var isEnabled = "";
  var actionCode = "";
  var actionName = "";
  var moduleCode = "";
  var position = "";
  var workflow = "";
  var applicableRole = "";
  var workflowAssignedTray = "";
  var workflowActionResult = "";
  var workflowEscalatableRoles = "";
  var workflowPreviousActionCode = "";
  var actionType = "";

  if (props.dataMap !== null) {
    Object.entries(props.dataMap).map((key, value) => {
      if (key[0] === "ISENABLED") {
        isEnabled = key[1];
      } else if (key[0] === "ACTIONCODE") {
        actionCode = key[1];
      } else if (key[0] === "ACTIONNAME") {
        actionName = key[1];
      } else if (key[0] === "MODULECODE") {
        moduleCode = key[1];
      } else if (key[0] === "POSITION") {
        position = key[1];
      } else if (key[0] === "WORKFLOWCODE") {
        workflow = key[1];
      } else if (key[0] === "APPLICABLEROLE") {
        applicableRole = key[1];
      } else if (key[0] === "WORKFLOWASSIGNEDTRAY") {
        workflowAssignedTray = key[1];
      } else if (key[0] === "WORKFLOWACTIONRESULT") {
        workflowActionResult = key[1];
      } else if (key[0] === "WORKFLOWESCALATABLEROLES") {
        workflowEscalatableRoles = key[1];
      } else if (key[0] === "WORKFLOWPREVIOUSACTIONCODE") {
        workflowPreviousActionCode = key[1];
      } else if (key[0] === "ACTIONTYPE") {
        actionType = key[1];
      }
    });
  }

  const enableNextField = (currentField, nextField) => {
    if (currentField === "workflowCode" && nextField === "assignedTray") {
      setAssignedTrayEnable(false);
    } else if (
      currentField === "assignedTray" &&
      nextField === "assignedModule"
    ) {
      setAssignedModuleEnable(false);
    } else if (
      currentField === "assignedModule" &&
      nextField === "actionName"
    ) {
      setActionNameEnable(false);
    } else if (currentField === "actionName" && nextField === "actionCode") {
      setActionCodeEnable(false);
    } else if (
      currentField === "actionCode" &&
      nextField === "applicableRole"
    ) {
      setApplicableRoleEnable(false);
    } else if (
      currentField === "applicableRole" &&
      nextField === "previousActions"
    ) {
      setPreviousActionsEnable(false);
    } else if (
      currentField === "previousActions" &&
      nextField === "actionResult"
    ) {
      setActionResultEnable(false);
    } else if (
      currentField === "actionResult" &&
      nextField === "escalatableRoles"
    ) {
      setEscalatableRolesEnable(false);
    } else if (
      currentField === "escalatableRoles" &&
      nextField === "position"
    ) {
      setPositionEnable(false);
    } else if (currentField === "position" && nextField === "isEnabled") {
      setIsEnabledFieldEnable(false);
    } else if (currentField === "isEnabled" && nextField === "actionType") {
      setActionTypeEnable(false);
    }
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      spacing={2}
      className={classes.root}
    >
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Workflow</Typography>
        <FormControl className={`${classes.formControl}`} fullWidth>
          <SelectFormsy
            variant="outlined"
            name="workflowCode"
            // label="Workflow"
            value={workflow}
            className={undefined}
            onChange={() => enableNextField("workflowCode", "assignedTray")}
            validationError=""
            required={true}
          >
            <MenuItem value="">Select One</MenuItem>
            {props.workflowList
              ? props.workflowList.map(workflow =>
                  workflow != null
                    ? Object.entries(workflow).map((key, value) => {
                        return (
                          <MenuItem value={key[0]} key={value}>
                            {key[1]}
                          </MenuItem>
                        );
                      })
                    : null
                )
              : null}
          </SelectFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Assigned Tray</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <SelectFormsy
            variant="outlined"
            name="assignedTray"
            // label="Assigned Tray"
            value={workflowAssignedTray}
            className={undefined}
            onChange={() => enableNextField("assignedTray", "assignedModule")}
            validationError=""
            required={true}
            // disabled={assignedTrayEnable}
            disabled={props.isExisting === true ? false : assignedTrayEnable}
          >
            <MenuItem value="">Select One</MenuItem>
            {props.allowedModulesList
              ? props.allowedModulesList.map(modules =>
                  modules != null
                    ? Object.entries(modules).map((key, value) => {
                        return (
                          <MenuItem value={key[0]} key={value}>
                            {key[1]}
                          </MenuItem>
                        );
                      })
                    : null
                )
              : null}
          </SelectFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Assigned Module</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <SelectFormsy
            variant="outlined"
            name="assignedModule"
            // label="Assigned Module"
            className={undefined}
            onChange={() => enableNextField("assignedModule", "actionName")}
            validationError=""
            required={true}
            value={moduleCode}
            //disabled={assignedModuleEnable}
            disabled={props.isExisting === true ? false : assignedModuleEnable}
          >
            <MenuItem value="">Select One</MenuItem>
            {props.allowedModulesList
              ? props.allowedModulesList.map(modules =>
                  modules != null
                    ? Object.entries(modules).map((key, value) => {
                        return (
                          <MenuItem value={key[0]} key={value}>
                            {key[1]}
                          </MenuItem>
                        );
                      })
                    : null
                )
              : null}
          </SelectFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Action Name</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <TextFieldFormsy
            variant="outlined"
            name="actionName"
            // label="Action Name"
            className={undefined}
            onChange={() => enableNextField("actionName", "actionCode")}
            validationError=""
            required={true}
            value={actionName}
            //disabled={actionNameEnable}
            disabled={props.isExisting === true ? false : actionNameEnable}
          ></TextFieldFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Action Code</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <TextFieldFormsy
            variant="outlined"
            name="actionCode"
            // label="Action Code"
            className={undefined}
            onChange={() => enableNextField("actionCode", "applicableRole")}
            validationError=""
            required={true}
            value={actionCode}
            disabled={props.isExisting === true ? true : actionCodeEnable}
          ></TextFieldFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Applicable Role</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <SelectFormsy
            variant="outlined"
            name="applicableRole"
            // label="Applicable Role"
            value={applicableRole}
            className={undefined}
            onChange={() =>
              enableNextField("applicableRole", "previousActions")
            }
            validationError=""
            required={true}
            //disabled={applicableRoleEnable}
            disabled={props.isExisting === true ? false : applicableRoleEnable}
          >
            <MenuItem value="">Select One</MenuItem>
            {props.allowedRolesList
              ? props.allowedRolesList.map(allowedRoles =>
                  allowedRoles != null
                    ? Object.entries(allowedRoles).map((key, value) => {
                        return (
                          <MenuItem value={key[0]} key={value}>
                            {key[1]}
                          </MenuItem>
                        );
                      })
                    : null
                )
              : null}
          </SelectFormsy>
        </FormControl>
      </Grid>
      {/* <Grid item xs={4}>
        <FormControl className={classes.formControl}>
          <TextFieldFormsy
            variant="outlined"
            name="subActions"
            label="Sub Actions"
            className={undefined}
            onChange={() => {}}
            validationError=""
            required={true}
            value={workflowSubActions}
          ></TextFieldFormsy>
        </FormControl>
      </Grid> */}
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Previous Actions</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <SelectFormsy
            variant="outlined"
            name="previousActions"
            // label="Previous Actions"
            value={workflowPreviousActionCode}
            className={undefined}
            onChange={() => enableNextField("previousActions", "actionResult")}
            validationError=""
            required={true}
            //disabled={previousActionsEnable}
            disabled={props.isExisting === true ? false : previousActionsEnable}
          >
            <MenuItem value="">Select One</MenuItem>

            {props.previousActionsList
              ? props.previousActionsList.map(previousActions =>
                  previousActions != null
                    ? Object.entries(previousActions).map((key, value) => {
                        return key[0] !== null || "" ? (
                          <MenuItem value={key[0]} key={value}>
                            {key[0]}
                          </MenuItem>
                        ) : (
                          <MenuItem value="NA">Not Applicable</MenuItem>
                        );
                      })
                    : null
                )
              : null}
          </SelectFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Action Result</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <SelectFormsy
            variant="outlined"
            name="actionResult"
            // label="Action Result"
            className={undefined}
            onChange={() => enableNextField("actionResult", "escalatableRoles")}
            validationError=""
            required={true}
            value={workflowActionResult}
            //disabled={actionResultEnable}
            disabled={props.isExisting === true ? false : actionResultEnable}
          >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="P">Pending</MenuItem>
            <MenuItem value="C">Closed</MenuItem>
            <MenuItem value="N">Not Applicable</MenuItem>
          </SelectFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Escalatable Role</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <SelectFormsy
            variant="outlined"
            name="escalatableRoles"
            // label="Escalatable Role"
            value={workflowEscalatableRoles}
            className={undefined}
            onChange={() => enableNextField("escalatableRoles", "position")}
            validationError=""
            required={true}
            //multiple={true}
            //disabled={escalatableRolesEnable}
            disabled={
              props.isExisting === true ? false : escalatableRolesEnable
            }
          >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="NA">Not Applicable</MenuItem>
            {props.allowedRolesList
              ? props.allowedRolesList.map(allowedRoles =>
                  allowedRoles != null
                    ? Object.entries(allowedRoles).map((key, value) => {
                        return (
                          <MenuItem value={key[0]} key={value}>
                            {key[1]}
                          </MenuItem>
                        );
                      })
                    : null
                )
              : null}
          </SelectFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Position</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <SelectFormsy
            variant="outlined"
            name="position"
            // label="Position"
            className={undefined}
            onChange={() => enableNextField("position", "isEnabled")}
            validationError=""
            required={true}
            value={position}
            //disabled={positionEnable}
            disabled={props.isExisting === true ? false : positionEnable}
          >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="T">Top Frame</MenuItem>
            <MenuItem value="B">Bottom Frame</MenuItem>
          </SelectFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
        <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Is Enabled</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <SelectFormsy
            variant="outlined"
            name="isEnabled"
            // label="Is Enabled"
            className={undefined}
            onChange={() => enableNextField("isEnabled", "actionType")}
            validationError=""
            required={true}
            value={isEnabled}
            //disabled={isEnabledFieldEnable}
            disabled={props.isExisting === true ? false : isEnabledFieldEnable}
          >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </SelectFormsy>
        </FormControl>
      </Grid>
      <Grid className="flex items-center" item xs={4}>
      <Typography className="text-[12px] text-right min-w-[100px] mr-[10px]">Action Type</Typography>
        <FormControl className={`${classes.formControl} w-full m-2 w-100 flex flex-nowrap`}>
          <SelectFormsy
            variant="outlined"
            name="actionType"
            // label="Action Type"
            className={undefined}
            //onChange={e => handleActionRoleTrayMapping(e)}
            validationError=""
            required={true}
            value={actionType}
            //disabled={actionTypeEnable}
            disabled={props.isExisting === true ? false : actionTypeEnable}
          >
            <MenuItem value="">Select One</MenuItem>
            <MenuItem value="W">Read/Write</MenuItem>
            <MenuItem value="R">Read Only</MenuItem>
          </SelectFormsy>
        </FormControl>
      </Grid>
    </Grid>
  );
}
