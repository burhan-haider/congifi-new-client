import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
// import CircleChecked from "@material-ui/icons/CheckCircleOutline";
// import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { 
  MdOutlineCheckCircle as CircleChecked,
  MdRadioButtonUnchecked as CircleUnchecked,
 } from 'react-icons/md'
import { Typography, MenuItem, Grid } from "@mui/material";
import {
  CheckboxFormsy,
  SelectFormsy
} from "components/common/formsyComponents";
import { useClasses } from "@application";

const styles = theme => ({
  MuiSvgIcon: {
    color: "#7b666e",
    marginLeft: "8px",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white"
    }
  },
  MuiGridRow: {
    backgroundColor: "#f1f2f3",
    borderRadius: "50px",
    height: "8vh"
  },
  TextAlignment: {
    alignSelf: "center"
  },
  root: {
    float: "left",
    marginBottom: "0.5%",
    fontWeight: "bold",
    marginLeft: "1%",
    fontSize: "15px",
    marginTop: "1.5%"
  },
  CircleUnchecked: {
    color: "#4a5568"
  }
});

export default function ChecklistForm(props) {
  const [rejectList, setRejectList] = useState(true);
  const [customerDataBase, setCustomerDataBase] = useState(true);
  const [blackList, setBlackList] = useState(true);
  function rejectlistHandler(event) {
    setRejectList(event.target.checked);
  }
  function customerDataBaseHandler(event) {
    setCustomerDataBase(event.target.checked);
  }

  function blackListHandler(event) {
    setBlackList(event.target.checked);
  }
  const classes = useClasses(styles);
  return (
    <div className="m-8">
      <Typography className={classes.root}>CheckList Form</Typography>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.MuiGridRow}
      >
        <Grid xs={2} item>
          <Grid container>
            <Grid xs={8} item className={classes.TextAlignment}>
              Black list
            </Grid>
            <Grid xs={4} item className={classes.TextAlignment}>
              <CheckboxFormsy
                //defaultChecked={true}
                name="BlackList"
                value={blackList}
                // onChange={blackListHandler}
                classes={{
                  root: classes.MuiSvgIcon
                }}
                icon={<CircleUnchecked />}
                checkedIcon={
                  <CircleChecked classes={{ root: classes.CircleUnchecked }} />
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={2} item>
          <Grid container>
            <Grid xs={8} item className={classes.TextAlignment}>
              Reject List
            </Grid>
            <Grid xs={4} item className={classes.TextAlignment}>
              <CheckboxFormsy
                name="RejectedList"
                //defaultChecked={true}
                value={rejectList}
                //onChange={rejectlistHandler}
                classes={{
                  root: classes.MuiSvgIcon
                }}
                icon={<CircleUnchecked />}
                checkedIcon={
                  <CircleChecked classes={{ root: classes.CircleUnchecked }} />
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={2} item>
          <Grid container>
            <Grid xs={8} item className={classes.TextAlignment}>
              Customer Database
            </Grid>
            <Grid xs={4} item className={classes.TextAlignment}>
              <CheckboxFormsy
                //defaultChecked={true}
                name="CustomerDataBase"
                value={customerDataBase}
                //onChange={customerDataBaseHandler}
                classes={{
                  root: classes.MuiSvgIcon
                }}
                icon={<CircleUnchecked />}
                checkedIcon={
                  <CircleChecked classes={{ root: classes.CircleUnchecked }} />
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={2} item>
          <Grid container>
            <Grid xs={8} item className={classes.TextAlignment}>
              Employee Database
            </Grid>
            <Grid xs={4} item className={classes.TextAlignment}>
              <CheckboxFormsy
                name="EmployeeDataBase"
                //disabled
                // value={undefined}
                onChange={() => {}}
                classes={{
                  root: classes.MuiSvgIcon
                }}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item className={classes.TextAlignment}>
              Select Lists
            </Grid>
            <Grid xs={6} item className={classes.TextAlignment}>
              <SelectFormsy
                className="w-full py-1 ml-3 bg-white rounded-lg"
                value=""
                onChange={() => {}}
                name="SelectedBlackList"
                disableUnderline={true}
              >
                <MenuItem value="">DOW JONES LIST</MenuItem>
                <MenuItem value="">CIBIL SUIT</MenuItem>
                <MenuItem value="">RBI DEFAULTERS LIST</MenuItem>
                <MenuItem value="">OFAC SDN LIST</MenuItem>
              </SelectFormsy>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
