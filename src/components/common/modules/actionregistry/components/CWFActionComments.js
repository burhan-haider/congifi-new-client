import React, { useRef, useState } from "react";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  DatePickerFormsy,
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
    width: "100%",

    "& .MuiExpansionPanelSummary-content": {
      margin: "2px 0"
    },

    " & .MuiExpansionPanelSummary-root": {
      backgroundColor: "#f4f5fa"
    }
  },
  formControl: {
    margin: 2,
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

function CWFActionComments(props) {
  const classes = useClasses(styles);
  const paramObj = props && props.actionParams.length ? props.actionParams : [];
  const paramData = props.data;
  const caseNo = paramData.caseNo;
  const actionCode = paramData.actionCode;
  const usersList = paramData.USERSLIST;

  const subActionsList = paramData.SUBACTIONS;
  const inputParams = paramData.INPUTPARAMS;

  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitType, setSubmitType] = useState(null);
  var users = {};

  //const [inputParams, setInputParams] = useState({});

  if (usersList && usersList !== null) {
    users = Object.entries(usersList).map((key, index) => {
      return key[1];
    });
  }

  const postCase = () => {
    setSubmitType("post");
  };

  const postAndCloseCase = () => {
    setSubmitType("postAndClose");
  };

  // const [cwfCasesData, setCWFCasesData] = useState({});
  // const [bottomAction, setBottomAction] = useState([]);

  const handleSubmit = data => {
    setIsFormValid(false);
    //const formData = formRef.current.getModel();
    Object.entries(inputParams).map((key, value) => {
      //formData[key[0]] = key[1] === null ? "" : key[1];
      data[key[0]] = key[1] === null ? "" : key[1];
      return null;
    });
    /* formData["caseNos"] = caseNo;
    formData["inputActionCode"] = actionCode;
    formData["addedToMarkAll"] = "N";
    formData["addedToFalsePositive"] = "N";
    formData["alertNos"] = "";
    formData["fiuReferenceNo"] = "";
    formData["fiuReferenceDate"] = "";*/
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
    //console.log(result);
    if (result !== null) {
      result
        .then(() => {
          props.reloadData(props.inputParams);
        })
        .finally(() => {
          if (props.fromInfo === false) {
            props.handleClose();
          }
          setIsFormValid(true);
        });
    }
  };

  return (
    <Paper style={{ padding: "4px" }}>
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
            {paramObj && paramObj !== null
              ? paramObj.map((eachParam, index) =>
                  eachParam.ACTIONPARAMDATATYPE === "date" ? (
                    <Grid item xs={3} key={index}>
                      <FormControl className={classes.formControl}>
                        <DatePickerFormsy
                          variant="outlined"
                          name={`${eachParam.ACTIONPARAMID}`}
                          label={`${eachParam.ACTIONPARAMNAME}`}
                          ampm={false} // 24Hr / 12hr clock settings
                          className={undefined}
                          dateTime={false} // true, if need the Date and Time Picker. false if you need only Date Picker
                          allowKeyboardControl={true} // optional, this will allow keybord to control the picker.
                          value={new Date()}
                        />
                      </FormControl>
                    </Grid>
                  ) : null
                )
              : null}

            {paramObj
              ? paramObj.map((eachParam, index) =>
                  eachParam.ACTIONPARAMDATATYPE === "text" ? (
                    <Grid item xs={3} key={index}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name={`${eachParam.ACTIONPARAMID}`}
                          label={`${eachParam.ACTIONPARAMNAME}`}
                          className={undefined}
                          onChange={() => {}}
                          validationError=""
                          //required={true}
                          value=""
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                  ) : null
                )
              : null}
            {/*   <MenuItem value="email">Email</MenuItem>
            <MenuItem value="dunningLetter">Dunning Letter</MenuItem>  */}
            {paramObj
              ? paramObj.map((eachParam, index) =>
                  eachParam.ACTIONPARAMDATATYPE === "select" ? (
                    <Grid item xs={3} key={index}>
                      <FormControl className={classes.formControl}>
                        <SelectFormsy
                          variant="outlined"
                          name={`${eachParam.ACTIONPARAMID}`}
                          label={`${eachParam.ACTIONPARAMNAME}`}
                          value={
                            eachParam.ACTIONPARAMDEFAULTVALUE === null || " "
                              ? `NA`
                              : `${eachParam.ACTIONPARAMDEFAULTVALUE}`
                          }
                          className={undefined}
                          onChange={() => {}}
                          validationError=""
                          //required={true}
                        >
                          <MenuItem value="">Select One</MenuItem>
                          {Object.entries(
                            eachParam.ACTIONPARAMSELECTNAMEVALUES
                          ).map((key, value) => {
                            return (
                              <MenuItem value={key[0]} key={value}>
                                {key[1] === null || " " ? `NA` : key[1]}
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
                  eachParam.ACTIONPARAMDATATYPE === "usersList" ? (
                    <Grid item xs={3} key={index}>
                      <FormControl className={classes.formControl}>
                        <SelectFormsy
                          variant="outlined"
                          //name={`${eachParam.ACTIONPARAMID}`}
                          name="reassignToUserCode"
                          label={`${eachParam.ACTIONPARAMNAME}`}
                          value={
                            eachParam.ACTIONPARAMDEFAULTVALUE === null || " "
                              ? `NA`
                              : `${eachParam.ACTIONPARAMDEFAULTVALUE}`
                          }
                          className={undefined}
                          onChange={() => {}}
                          validationError=""
                          //required={true}
                        >
                          <MenuItem value="NA">Select One</MenuItem>
                          {Object.entries(users[0]).map((key, value) => {
                            return key[0] !== null ? (
                              <MenuItem value={key[0]} key={value}>
                                {key[1]}
                              </MenuItem>
                            ) : null;
                          })}
                        </SelectFormsy>
                      </FormControl>
                    </Grid>
                  ) : null
                )
              : null}

            {paramObj
              ? paramObj.map((eachParam, index) =>
                  eachParam.ACTIONPARAMDATATYPE === "teleCall" ? (
                    <Grid
                      container
                      style={{
                        marginRight: 15,
                        marginBottom: 10,
                        marginLeft: 15
                      }}
                      key={index}
                    >
                      <Grid item xs={2}>
                        <FormControlLabel
                          className={classes.formControl}
                          control={
                            <CheckboxFormsy
                              checked={true}
                              name="isTeleCall"
                              onChange={() => {}}
                              value={true}
                            />
                          }
                          label="Tele Call"
                        />
                      </Grid>
                      <Grid item xs={8}>
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
                      </Grid>
                      <Grid item xs={2}>
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
                            //onClick={() => makeCall()}
                          >
                            Call
                          </GenericButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null
                )
              : null}

            {paramObj
              ? paramObj.map((eachParam, index) =>
                  eachParam.ACTIONPARAMDATATYPE === "sms" ? (
                    <Grid
                      container
                      style={{
                        marginRight: 15,
                        marginBottom: 10,
                        marginLeft: 15
                      }}
                      key={index}
                    >
                      <Grid item xs={1}>
                        <FormControlLabel
                          className={classes.formControl}
                          control={
                            <CheckboxFormsy
                              checked={true}
                              name="isSMS"
                              onChange={() => {}}
                              value={true}
                            />
                          }
                          label="SMS"
                        />
                      </Grid>
                      <Grid item xs={2}>
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
                      </Grid>
                      <Grid item xs={8}>
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
                      </Grid>
                      <Grid item xs={1}>
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
                            // onClick={() => sendSMS()}
                          >
                            SMS
                          </GenericButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null
                )
              : null}

            {paramObj
              ? paramObj.map((eachParam, index) =>
                  eachParam.ACTIONPARAMDATATYPE === "dunningLetter" ? (
                    <Grid
                      container
                      style={{
                        marginRight: 15,
                        marginBottom: 10,
                        marginLeft: 15
                      }}
                      key={index}
                    >
                      <Grid item xs={2}>
                        <FormControlLabel
                          className={classes.formControl}
                          control={
                            <CheckboxFormsy
                              checked={true}
                              name="isDunningLetter"
                              onChange={() => {}}
                              value={true}
                            />
                          }
                          label="SMS"
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl className={classes.formControl}>
                          <TextFieldFormsy
                            variant="outlined"
                            name="dunningMessage"
                            label="Message"
                            className={undefined}
                            onChange={() => {}}
                            validationError=""
                            required={true}
                            multiline={true}
                            value=""
                          ></TextFieldFormsy>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
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
                            name="sendDunningLetter"
                            value="sendDunningLetter"
                            style={{ margin: 10 }}
                            disabled={!isFormValid}
                            // onClick={() => sendDunningLetter()}
                          >
                            Send DunningLetter
                          </GenericButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null
                )
              : null}

            {paramObj
              ? paramObj.map((eachParam, index) =>
                  eachParam.ACTIONPARAMDATATYPE === "email" ? (
                    <Grid container key={index}>
                      <Grid
                        container
                        style={{
                          marginRight: 15,
                          marginBottom: 10,
                          marginLeft: 15
                        }}
                      >
                        <Grid item xs={2}>
                          <FormControlLabel
                            className={classes.formControl}
                            control={
                              <CheckboxFormsy
                                checked={true}
                                name="isEmail"
                                onChange={() => {}}
                                value={true}
                              />
                            }
                            label="Email"
                          />
                        </Grid>
                        <Grid item xs={10}>
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
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        style={{
                          marginRight: 15,
                          marginBottom: 10,
                          marginLeft: 15
                        }}
                      >
                        <Grid item xs={12}>
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
                          aria-label={""}
                          className={classes.button}
                          name="sendEmail"
                          value="sendEmail"
                          style={{ margin: 10 }}
                          disabled={!isFormValid}
                          //onClick={() => sendEmail()}
                        >
                          Email
                        </GenericButton>
                      </Grid>
                    </Grid>
                  ) : null
                )
              : null}

            {paramObj
              ? paramObj.map((eachParam, index) =>
                  eachParam.ACTIONPARAMDATATYPE === "textarea" ? (
                    <Grid item xs={12} key={index}>
                      <FormControl className={classes.formControl}>
                        <TextFieldFormsy
                          variant="outlined"
                          name={`${eachParam.ACTIONPARAMID}`}
                          label={`${eachParam.ACTIONPARAMNAME}`}
                          className={undefined}
                          onChange={() => {}}
                          validationError=""
                          required={true}
                          value={`${eachParam.ACTIONPARAMDEFAULTVALUE}`}
                          multiline={true}
                        ></TextFieldFormsy>
                      </FormControl>
                    </Grid>
                  ) : null
                )
              : null}
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
                //onClick={() => attachEvidence()}
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
export default CWFActionComments;
