import React, { useRef, useState } from "react";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  DatePickerFormsy,
  SelectFormsy
} from "components/common/formsyComponents";
import { MenuItem, FormControl, Paper, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import caseWorkflowService from "services/caseWorkflow/caseWorkflowService";
import { GenericButton } from "@application";
import { useClasses } from "@application";

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
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "500"
  },
  rowDesign: {
    paddingTop: 15
  }
});

function CWFApproveCase(props) {
  const classes = useClasses(styles);
  const formRef = useRef(null);

  const [isFormValid, setIsFormValid] = useState(false);
  const [submitType, setSubmitType] = useState(null);

  const paramData = props.data;
  const caseNo = paramData.caseNo;
  const actionCode = paramData.actionCode;
  const usersList = paramData.USERSLIST;
  const subActionsList = paramData.SUBACTIONS;
  const inputParams = paramData.INPUTPARAMS;
  const postCase = () => {
    setSubmitType("post");
  };

  const postAndCloseCase = () => {
    setSubmitType("postAndClose");
  };

  const attachEvidence = () => {};

  const handleSubmit = data => {
    setIsFormValid(false);
    Object.entries(inputParams).map((key, value) => {
      data[key[0]] = key[1] === null ? "" : key[1];
    });
    data["caseNos"] = caseNo;
    data["inputActionCode"] = actionCode;
    data["addedToMarkAll"] = "N";
    data["addedToFalsePositive"] = "N";
    data["alertNos"] = "";
    data["fiuReferenceNo"] = "";
    data["fiuReferenceDate"] = "";

    var result = null;
    if (submitType === "post") {
      data["userActionType"] = "Post";
      result = caseWorkflowService.draftCaseAndComments(data);
    } else {
      data["userActionType"] = "PostAndClose";
      result = caseWorkflowService.saveCaseAndComments(data);
    }
    if (result !== null) {
      result
        .then(() => {
          props.reloadData(props.inputParams);
        })
        .finally(() => {
          props.handleClose();
          setIsFormValid(true);
        });
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <div id="topFrame" className={classes.root}>
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
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <DatePickerFormsy
                  variant="outlined"
                  name="lastReviewedDate"
                  label="Account Reviewed Date"
                  ampm={false}
                  className={undefined}
                  dateTime={false}
                  allowKeyboardControl={true}
                  required={true}
                  value={new Date()}
                  disabled={true}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                {actionCode !== "approveCasesByLEVEL2" ? (
                  <SelectFormsy
                    variant="outlined"
                    name="subAction"
                    label="Sub-Action"
                    value=""
                    className={undefined}
                    onChange={() => {}}
                    required={true}
                  >
                    <MenuItem value="">Select One</MenuItem>
                    {subActionsList && subActionsList !== null
                      ? Object.entries(subActionsList).map((key, value) => {
                          return (
                            <MenuItem value={key[1]} key={value}>
                              {key[1]}
                            </MenuItem>
                          );
                        })
                      : null}
                  </SelectFormsy>
                ) : (
                  <SelectFormsy
                    variant="outlined"
                    name="subAction"
                    label="Sub-Action"
                    value=""
                    className={undefined}
                    onChange={() => {}}
                    required={true}
                  >
                    <MenuItem value="">Select One</MenuItem>
                    <MenuItem value="TO_LEGAL">Refer to LEGAL</MenuItem>
                    <MenuItem value="TO_CRIB">Refer to CRIB</MenuItem>
                    <MenuItem value="TO_SKIP">Refer to SKIP</MenuItem>
                  </SelectFormsy>
                )}
              </FormControl>
            </Grid>
            {usersList && usersList != null
              ? usersList.map((user, index) => (
                  <Grid item xs={4} key={index}>
                    <FormControl className={classes.formControl}>
                      {actionCode !== "approveCasesByLEVEL2" ? (
                        <SelectFormsy
                          variant="outlined"
                          name="reassignToUserCode"
                          label="Assigned User"
                          value=""
                          className={undefined}
                          onChange={() => {}}
                          required={true}
                        >
                          <MenuItem value="">Select One</MenuItem>
                          {user
                            ? Object.entries(user).map((key, value) => {
                                return (
                                  <MenuItem value={key[1]} key={value}>
                                    {key[1]}
                                  </MenuItem>
                                );
                              })
                            : null}
                        </SelectFormsy>
                      ) : (
                        <SelectFormsy
                          variant="outlined"
                          name="reassignToUserCode"
                          label="Assigned User"
                          value=""
                          className={undefined}
                          onChange={() => {}}
                          required={true}
                        >
                          <MenuItem value="">Select One</MenuItem>
                          <MenuItem value="LEVEL1">LEVEL1</MenuItem>
                          <MenuItem value="LEGAL">LEGAL</MenuItem>
                          <MenuItem value="CRIB">CRIB</MenuItem>
                          <MenuItem value="SKIP">SKIP</MenuItem>
                        </SelectFormsy>
                      )}
                    </FormControl>
                  </Grid>
                ))
              : null}
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="comments"
                  label="Comments"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  multiline={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={12}></Grid>
            {/* <Grid
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
                aria-label={""}
                className={classes.button}
                name="post"
                value="post"
                style={{ margin: 10 }}
                disabled={!isFormValid}
                onClick={() => postCase()}
              >
                Post
              </GenericButton>
              <GenericButton
                type="submit"
                variant="outlined"
                color="primary"
                aria-label={""}
                className={classes.button}
                name="postAndClose"
                value="postAndClose"
                style={{ margin: 10 }}
                disabled={!isFormValid}
                onClick={() => postAndCloseCase()}
              >
                Post & Close
              </GenericButton>
              <GenericButton
                type="submit"
                variant="outlined"
                color="primary"
                aria-label={""}
                className={classes.button}
                name="attachEvidence"
                value="attachEvidence"
                style={{ margin: 10 }}
                disabled={!isFormValid}
                onClick={() => attachEvidence()}
              >
                Attach Evidence
              </GenericButton>
            </Grid> */}
          </Grid>
        </Formsy>
      </div>
    </Paper>
  );
}

export default CWFApproveCase;
