import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
// import { makeStyles } from "@mui/material/styles";
import { useClasses } from "@application";
import TextField from "@mui/material/TextField";
import commonService from "services/common/commonService";
import { useDispatch, useSelector } from "react-redux";
import { getDesiredLabels } from "redux/auth/user/user.actions";
import httpService from "services/httpservice/httpService";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GenericButton } from "@application";

const styles = theme => ({
  divStyle: {
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f4f5fa",
    borderRadius: "35px"
  },
  textFieldRoot: {
    width: "100%",
    fontFamily: "inherit",
    // background: "linear-gradient(45deg, #89f7fe 30%, #66a6ff 90%)",
    //boxShadow: '0 3px 5px 2px rgba(124, 217, 254, 1)',
    borderRadius: 50
  },
  textFieldInput: {
    color: "Black",
    borderRadius: "50px"
  },
  MuiOutlinedInput: {
    borderRadius: "50px",
    padding: "0px"
  },
  settingsTypography: {
    width: "100%",
    fontFamily: "inherit",
    fontSize: "14px",
    minHeight: "25px",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    whiteSpace: "normal",
    color: "#333333"
  }
});

function UserSettings(props) {
  //return <div>settings are here</div>;
  const userData = useSelector(data => data.auth.user);
  //console.log(userData);
  const [applicationTimeout, setApplicationTimeout] = useState("");
  const [labelLanguage, setLabelLanguage] = useState(userData.data.language);
  const [labelDirection, setLabelDirection] = useState(
    userData.data.labelDirection
  );
  const [allLanguages, setAllLanguages] = useState([]);

  const dispatch = useDispatch();
  const classes = useClasses(styles);

  /*const token = window.localStorage.getItem("cognifi_token");
  let config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };*/

  useEffect(() => {
    //Vivek - fetching the current timeout seconds
    commonService.fetchTimeout().then(response => {
      setApplicationTimeout(response);
    });

    //Vivek - fetching all the label languages
    commonService.fetchAllLanguages().then(response => {
      setAllLanguages(response);
    });
  }, []);

  const timeoutSpans = [];
  for (var i = 900; i <= 3600; i = i + 300) {
    //console.log("Vivek timeout= ",i);
    timeoutSpans.push(i);
  }

  const handleSelectChange = event => {
    //console.log("Vivek onChange = ",event.target.name+ "---" + event.target.value);
    if (event.target.name === "Timeout Seconds") {
      setApplicationTimeout(event.target.value);
    } else if (event.target.name === "Labels Language") {
      setLabelLanguage(event.target.value);
    } else if (event.target.name === "Labels Direction") {
      setLabelDirection(event.target.value);
    }
  };

  const handleSetSettings = () => {
    if (
      labelLanguage !== ("" || "select") &&
      labelDirection !== ("" || "select")
    ) {
      dispatch(getDesiredLabels(labelLanguage, labelDirection));
      httpService
        .post(`/common/systemTimeout/${applicationTimeout}`)
        .then(response => {
          props.closeModal();
        });
      alert("Settings have been set successfully");
    } else {
      alert("Please select the language and direction both");
    }
  };

  return (
    <div>
      {/* <h3>Settings content</h3> */}
      <div className={clsx("flex justify-start", classes.divStyle)}>
        <Grid container spacing={3} sx={{paddingRight: '0.5rem', paddingLeft:'0.5rem'}}>
          <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Typography className={classes.settingsTypography}>
              {commonService.getLabel(
                "app.common.TIMEOUTSECONDS",
                "Timeout Seconds"
              )}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <TextField
              select
              variant="outlined"
              name="Timeout Seconds"
              value={applicationTimeout}
              onChange={e => {
                handleSelectChange(e);
              }}
              // label={commonService.getLabel(
              //   "app.common.TIMEOUTSECONDS",
              //   "Timeout Seconds"
              // )}
              SelectProps={{
                native: true
              }}
              classes={{
                root: classes.textFieldRoot,
                label: classes.textFieldLabel
              }}
              InputProps={{
                className: classes.MuiOutlinedInput
              }}
              InputLabelProps={{ shrink: false }}
            >
              {/* Vivek - 17.04.2020 */}
              {timeoutSpans.map(x => {
                return (
                  <option key={x} value={x}>
                    {x}
                  </option>
                );
              })}
            </TextField>
          </Grid>
          <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Typography className={classes.settingsTypography}>
              {commonService.getLabel(
                "app.common.LABELSLANGUAGE",
                "Labels Language"
              )}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <TextField
              select
              variant="outlined"
              name="Labels Language"
              value={labelLanguage}
              onChange={e => {
                handleSelectChange(e);
              }}
              // label={commonService.getLabel(
              //   "app.common.LABELSLANGUAGE",
              //   "Labels Language"
              // )}
              SelectProps={{
                native: true
              }}
              classes={{
                root: classes.textFieldRoot,
                label: classes.textFieldLabel
              }}
              InputProps={{
                className: classes.MuiOutlinedInput
              }}
              InputLabelProps={{ shrink: false }}
            >
              <option key="select" value="select">
                Select
              </option>
              {allLanguages.map(eachLanguage => {
                return (
                  <option key={eachLanguage} value={eachLanguage}>
                    {commonService.makeFirstLetterUpperCase(eachLanguage)}
                  </option>
                );
              })}
            </TextField>
          </Grid>
          <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Typography className={classes.settingsTypography}>
              {commonService.getLabel(
                "app.common.LABELSDIRECTION",
                "Labels Direction"
              )}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <TextField
              select
              variant="outlined"
              name="Labels Direction"
              value={labelDirection}
              onChange={e => {
                handleSelectChange(e);
              }}
              // label={commonService.getLabel(
              //   "app.common.LABELSDIRECTION",
              //   "Labels Direction"
              // )}
              SelectProps={{
                native: true
              }}
              classes={{
                root: classes.textFieldRoot,
                label: classes.textFieldLabel
              }}
              InputProps={{
                className: classes.MuiOutlinedInput
              }}
              InputLabelProps={{ shrink: false }}
            >
              <option key="select" value="select">
                Select
              </option>
              <option key="ltr" value="ltr">
                Left to Right
              </option>
              <option key="rtl" value="rtl">
                Right to Left
              </option>
            </TextField>
          </Grid>
        </Grid>
      </div>
      {/* TAILWIND AND MAKESTYLES BOTH AT ONCE */}
      {/* <div
        className={clsx(
          "flex justify-center mb-10 py-10 border-solid border-1 border-gray-400 rounded-md",
          classes.buttonRoot
        )}>
        </div> */}
      <div className="flex justify-end mb-4" style={{display: 'flex', justifyContent: 'flex-end', marginTop: '0.85rem', marginBottom: '0.05rem'}} >
        <GenericButton
          variant="outlined"
          //autoFocus
          onClick={handleSetSettings}
        >
          Set Changes
        </GenericButton>
        <GenericButton
          variant="outlined"
          onClick={props.closeModal}
          //autoFocus
        >
          Close
        </GenericButton>
      </div>
    </div>
  );
}

export default UserSettings;
