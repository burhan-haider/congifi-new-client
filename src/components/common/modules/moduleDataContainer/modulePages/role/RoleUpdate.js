import React from "react";
import {
    DialogContent,
    Grid,
    FormControl,
    TextField,
    DialogActions
} from "@mui/material"
import { GenericButton } from "@application";
import { TextFieldFormsy } from "components/common/formsyComponents";
import roleOperationService from "services/role/RoleOperationService";
import Formsy from "formsy-react";
const styles = {
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
};
const RoleUpdate = (props) => {
    const handleSubmit = update => {};

    return (
        <div>
            <Formsy onValidSubmit={data => handleSubmit(data)}>
                <Grid container className="px-16 sm:px-24 mt-3">
                    <Grid item xs={6}>
                        <TextFieldFormsy
                            className="w-5/6"
                            name="roleId"
                            label="Role Id"
                            variant="outlined"
                            value={props.selectedData[0]}
                            disabled
                            InputProps={{
                                classes:  styles.MuiOutlinedInput
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldFormsy
                            className="w-5/6"
                            name="roleName"
                            label="Role Name"
                            variant="outlined"
                            value={props.selectedData[1]}
                            InputProps={{
                                classes:  styles.MuiOutlinedInput
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
                        color="primary"
                        className={styles.MuiButton}
                        // onClick={e => props.addNewRole(roleForm)}
                        onClick={e => ""}
                    >
                        Update
                    </GenericButton>
                    <GenericButton
                        variant="contained"
                        color="default"
                        className={styles.MuiButton}
                        onClick={props.closeModal}
                    >
                        Close
                    </GenericButton>
                </div>
            </Formsy>
        </div>
    );
}

export default RoleUpdate;
