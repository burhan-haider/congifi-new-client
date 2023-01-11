import React from "react";
import { FormHelper } from "components/common/FormHelper";
// import Switch from "@mui/material/Switch";

import {
  DialogContent,
  Grid,
  FormControl,
  TextField,
  DialogActions
} from "@mui/material";
import { GenericButton, useClasses } from "@application";
import { TextFieldFormsy } from "components/common/formsyComponents";
import userOperationService from "services/user/UserOperationService";
import Formsy from "formsy-react";

const styles = theme => ({
  MuiButton: {
    textTransform: "initial",
    marginRight: "3%",
    borderRadius: "15px",
    borderColor: "#052a4f",
    padding: "2px 2.5% 2px 2.5%",
    "&:hover": {
      backgroundColor: "#052a4f",
      color: "white"
    }
  }
});

export default function UserCreationForm(props) {

  const addNewUser = (newUserDetails) => {
    // console.log("newUserDetails ", newUserDetails);
    userOperationService
      .createNewUser("user/", newUserDetails)
      .then(data => {
        // closeCreaeUserDialog();
        console.log("User Data:-", data)
        props.refreshCurrentModule();
        props.closeModal();
      })
      .catch(err => {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("Error");
        }
      });
  }
  const classes = useClasses(styles);

  const [userForm, handleChange] = FormHelper({
    username: "Ravi",
    userPass: "Cognifi@123",
    firstName: "K",
    lastName: "l",
    emailId: "ravi@gmail.com",
    mobileNo: "8092399476",
    designation: " LRO",
    branchCode: "0021",
    employeeCode: "7896",
    departmentCode: "5623",
    accountEnabled: true,
    accountExpired: false,
    accountLocked: false,
    accountDormant: false,
    accountDeleted: false,
    credentialsExpired: false,
    isETLUser: false,
    chatEnable: true,
    isDBAuthentication: true,
    isDBAuthRequired: true,
    accessStartTime: "00:00:00",
    accessEndTime: "00:00:00",
    accessPoints: "",
    labelDirection: "",
    language: ""
  });

  return (
    <>
      <Formsy>
        <div className="px-16 sm:px-24">
          <Grid container spacing={3} sx={{marginBottom: '15px', marginTop: '0px'}} >
            <Grid item xs={6}>
              <FormControl className="mt-8 mb-16" required fullWidth>
                <TextFieldFormsy
                  label="User Name"
                  autoFocus
                  name="username"
                  value={userForm.username}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className="mt-8 mb-16" required fullWidth>
                <TextFieldFormsy
                  label="First Name"
                  // autoFocus
                  name="firstName"
                  value={userForm.firstName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{marginBottom: '15px'}}>
            <Grid item xs={6}>
              <FormControl required fullWidth>
                <TextFieldFormsy
                  label="Last Name"
                  name="lastName"
                  value={userForm.lastName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth>
                <TextFieldFormsy
                  label="Email ID"
                  name="emailId"
                  type="email"
                  value={userForm.emailId}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{marginBottom: '15px'}}>
            <Grid item xs={6}>
              <FormControl required fullWidth>
                <TextFieldFormsy
                  label="Mobile No."
                  name="mobileNo"
                  type="number"
                  value={userForm.mobileNo}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth>
                <TextFieldFormsy
                  label="Designation"
                  name="designation"
                  value={userForm.designation}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{marginBottom: '15px'}} >
            <Grid item xs={6}>
              <FormControl  required fullWidth>
                <TextFieldFormsy
                  label="Employee Code"
                  name="employeeCode"
                  value={userForm.employeeCode}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl  required fullWidth>
                <TextFieldFormsy
                  label="Branch Code"
                  // autoFocus
                  name="branchCode"
                  value={userForm.branchCode}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          {/* <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl className="mt-8 mb-16" required fullWidth>
                <Switch
                  checked={userForm.accountEnabled}
                  onChange={handleChange}
                  color="primary"
                  name="accountEnabled"
                  label="Account Enable"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className="mt-8 mb-16" required fullWidth>
              <Switch
                  checked={userForm.accountExpired}
                  onChange={handleChange}
                  color="primary"
                  name="accountExpired"
                  label="Account Enable"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </FormControl>
            </Grid>
          </Grid> */}
        </div>
      </Formsy>
      <div 
        className="flex justify-end"
        style={{
          marginTop: "30px",
          marginBottom: "1.5%"
        }}
        >
        <GenericButton
          className={classes.MuiButton}
          variant="contained"
          color="primary"
          name="saveButtonStyle"
          onClick={() => addNewUser(userForm)}
        >
          Add
        </GenericButton>

        <GenericButton
          className={classes.MuiButton}
          variant="contained"
          color="secondary"
          name="cancelButtonStyle"
          onClick={props.closeModal}
        >
          Close
        </GenericButton>
      </div>
    </>
  );
}
