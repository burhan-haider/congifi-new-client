import React from "react";
import { FormHelper } from "components/common/FormHelper";
import {
  DialogContent,
  Grid,
  FormControl,
  TextField,
  DialogActions
} from "@mui/material";
import { GenericButton } from "@application";
import { TextFieldFormsy } from "components/common/formsyComponents";
import roleOperationService from "services/role/RoleOperationService";
import Formsy from "formsy-react";
import { useClasses } from '@application'
import httpService from "services/httpservice/httpService";

const styles = theme => ({
  MuiButton: {
    textTransform: "initial",
    marginRight: "1%",
    borderRadius: "15px",
    borderColor: "#052a4f",
    padding: "2px 2.5% 2px 2.5%",
    "&:hover": {
      backgroundColor: "#052a4f",
      color: "white"
    }
  },
  MuiOutlinedInput: {
    borderRadius: "50px"
  }
});
const RoleCreationForm = (props) => {

    const token = window.localStorage.getItem("cognifi_token");
    let config = {
    headers: {
        Authorization: "Bearer " + token,
        'Content-Type': `multipart/form-data`,
    }
  };

  const handleSubmit = newRoleDetails => {

    httpService
      .post(`/role/?roleName=${newRoleDetails.roleName}`, config)
      .then(data => {
        // setOpen(false);
        props.refreshCurrentModule();
      })
      .catch(err => {
        console.log(err);
      });
    props.closeModal();
  };

  const classes = useClasses(styles);
  // const [roleForm, handleChange] = FormHelper({
  //   roleName: ""
  // });
  return (
    <div>
      <Formsy onValidSubmit={data => handleSubmit(data)}>
        <Grid container className="px-16 sm:px-24 mt-3">
          <Grid item xs={6}>
                {/* <TextField
                  fullWidth
                  label="Role Name"
                  autoFocus
                  name="roleName"
                  value={roleForm.roleName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                /> */}
                <TextFieldFormsy 
                  className="w-5/6"
                  name="roleName"
                  label="Role Name"
                  variant="outlined"
                  InputProps={{
                    className: classes.MuiOutlinedInput
                  }}
                />
            </Grid>
          </Grid>
          <div
            className="flex justify-end"
            style={{
              marginTop: "2%",
              marginBottom: "1.5%"
            }}
          >
          <GenericButton
          type="submit"
          variant="contained"
          // onClick={e => props.addNewRole(roleForm)}
        >
          Add
        </GenericButton>
        <GenericButton
          variant="contained"
          onClick={props.closeModal}
        >
          Close
        </GenericButton>
          </div>
      </Formsy>
    </div>
  );
}

export default RoleCreationForm;
