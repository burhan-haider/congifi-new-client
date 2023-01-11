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

function CWFInitiateCommunication(props) {
  const classes = useClasses(styles);
  const formRef = useRef(null);

  const [isFormValid, setIsFormValid] = useState(false);
  const [submitType, setSubmitType] = useState(null);

  const [openBranchManager, setOpenBranchManager] = useState(false);
  const [openProductManager, setOpenProductManager] = useState(false);

  const paramData = props.data;
  //console.log("paramData :>> ", paramData.caseNo, paramData.actionCode);
  const caseNo = paramData.caseNo;
  const actionCode = paramData.actionCode;
  const usersList = paramData.USERSLIST;
  const subActionsList = paramData.SUBACTIONS;
  const inputParams = paramData.INPUTPARAMS;

  const handleAllocationTo = e => {
    if (e.target.value === "BM") {
      setOpenBranchManager(true);
      setOpenProductManager(false);
    } else {
      setOpenProductManager(true);
      setOpenBranchManager(false);
    }
  };

  const postCase = () => {
    setSubmitType("post");
  };

  const postAndCloseCase = () => {
    setSubmitType("postAndClose");
  };

  const makeCall = () => {};
  const sendSMS = () => {};
  const sendEmail = () => {};

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

    if (submitType === "post") {
      data["userActionType"] = "Post";
    } else {
      data["userActionType"] = "PostAndClose";
    }
    //console.log("Form JSON data " + JSON.stringify(data));
    const result = caseWorkflowService.saveCaseAndComments(data);
    //console.log(result);
    if (result && result !== null) {
      setIsFormValid(true);
      props.handleClose();
      props.reloadData(props.inputParams);
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
              <FormControlLabel
                className={classes.formControl}
                control={
                  <CheckboxFormsy
                    checked={true}
                    name="isTeleCall"
                    onChange={() => {}}
                    value=""
                  />
                }
                label="Tele Call"
              />
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="callPhoneNo"
                  label="Phone Number"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
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
                  aria-label={""}
                  className={classes.button}
                  name="makeCall"
                  value="makeCall"
                  style={{ margin: 10 }}
                  disabled={!isFormValid}
                  onClick={() => makeCall()}
                >
                  Call
                </GenericButton>
              </Grid>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <CheckboxFormsy
                    checked={true}
                    name="isDunningLetter"
                    onChange={() => {}}
                    value=""
                  />
                }
                label="Send Dunning Letter"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <CheckboxFormsy
                    checked={true}
                    name="isSMS"
                    onChange={() => {}}
                    value=""
                  />
                }
                label="SMS"
              />
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="smsPhoneNo"
                  label="Phone Number"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="message"
                  label="Message"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  multiline={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
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
                  aria-label={""}
                  className={classes.button}
                  name="sendSMS"
                  value="sendSMS"
                  style={{ margin: 10 }}
                  disabled={!isFormValid}
                  onClick={() => sendSMS()}
                >
                  SMS
                </GenericButton>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <CheckboxFormsy
                    checked={true}
                    name="isEmail"
                    onChange={() => {}}
                    value=""
                  />
                }
                label="Email"
              />
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="emailId"
                  label="Email Id"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="emailContent"
                  label="Email Content"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  multiline={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
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
                  aria-label={""}
                  className={classes.button}
                  name="sendEmail"
                  value="sendEmail"
                  style={{ margin: 10 }}
                  disabled={!isFormValid}
                  onClick={() => sendEmail()}
                >
                  Email
                </GenericButton>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="comment"
                  label="Comment"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  multiline={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
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
              </Grid> */}
            </Grid>
          </Grid>
        </Formsy>
      </div>
    </Paper>
  );
}

export default CWFInitiateCommunication;
