import React, { useRef, useState } from "react";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  SelectFormsy,
  CheckboxFormsy
} from "components/common/formsyComponents";
import {
  MenuItem,
  FormControl,
  FormControlLabel,
  Paper,
  Grid
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import caseWorkflowService from "services/caseWorkflow/caseWorkflowService";
import { GenericButton } from "@application";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    width: "100%"
  },
  formControl: {
    margin: 1,
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
  },
  expandedPanel: {
    backgroundColor: "#f4f5fa"
  },
  heading: {
    color: "#052a4f",
    fontSize: 18,
    fontWeight: "500"
  },
  rowDesign: {
    paddingTop: 15
  }
});

function CWFFileCase(props) {
  const classes = useClasses(styles);
  const formRef = useRef(null);

  const [isFormValid, setIsFormValid] = useState(false);
  const [submitType, setSubmitType] = useState(null);

  const paramData = props.data;
  //console.log("paramData :>> ", paramData.caseNo, paramData.actionCode);
  const caseNo = paramData.caseNo;
  const actionCode = paramData.actionCode;
  const usersList = paramData.USERSLIST;
  const subActionsList = paramData.SUBACTIONS;
  const inputParams = paramData.INPUTPARAMS;

  const handleAllocationTo = e => {};

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
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <FormControlLabel
                  className={undefined} // optional, if you need for styling
                  control={
                    <CheckboxFormsy
                      checked={false} // optional, if you need for styling
                      name="teleCall"
                      onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                      value="" // mandatory, value of the selected element
                    />
                  }
                  label="Tele Call"
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="phoneNo"
                  label="Phone Number"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <FormControlLabel
                  className={undefined} // optional, if you need for styling
                  control={
                    <CheckboxFormsy
                      checked={false} // optional, if you need for styling
                      name="sms"
                      onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                      value="" // mandatory, value of the selected element
                    />
                  }
                  label="SMS"
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="phoneNo"
                  label="Phone Number"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <FormControlLabel
                  className={undefined} // optional, if you need for styling
                  control={
                    <CheckboxFormsy
                      checked={false} // optional, if you need for styling
                      name="email"
                      onChange={() => {}} // optional, a callback if you need to do any logic on the value change
                      value="" // mandatory, value of the selected element
                    />
                  }
                  label="Email"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="emailId"
                  label="EmailId"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  value=""
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="email"
                  label="Email"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  multiline={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
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

export default CWFFileCase;
