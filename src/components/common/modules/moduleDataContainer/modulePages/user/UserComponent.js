import React, { useState } from "react";
import Fab from "@mui/material/Fab";
// import AddIcon from "@material-ui/icons/Add";
import { MdAdd as AddIcon } from 'react-icons/md'
import { GenericDatatable, GenericButton } from "@application";
import UserCreationForm from "./UserCreationForm";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import { AppBar, Toolbar, Typography } from "@mui/material";
import userOperationService from "services/user/UserOperationService";
import UserList from "../user/UserList";

export default function UserComponent(props) {
  const [isDialogopen, setDialogOpen] = React.useState(false);

  const openCreaeUserDialog = () => {
    setDialogOpen(true);
  };
  const closeCreaeUserDialog = () => {
    setDialogOpen(false);
  };

  function addNewUser(newUserDetails) {
    userOperationService
      .createNewUser("api/user/", newUserDetails)
      .then(data => {
        closeCreaeUserDialog();
        props.refreshCurrentModule();
      })
      .catch(err => {});
  }
  // const [dataSelected, setDataSelected] = useState([]);

  const selectionIndex = "all";
  //const selectionIndex = "0,1,2,3,4,5,6,7,8,9";
  const [rowData, setRowData] = useState([]);
  // const currentRowData = selectedRow => {
  //   setRowData(selectedRow);
  // };

  const verifyUser = () => {
    userOperationService
      .verifyUser(rowData[0])
      .then(data => {
        alert("Successful verified");
        //closeCreaeUserDialog();
        props.refreshCurrentModule();
      })
      .catch(err => {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("Error");
        }
      });
  };

  return (
    <div>
      {/* <GenericDatatable dataSet={props.indexPageData} verifyUser={verifyUser}></GenericDatatable> */}
      <Grid container>
        <GenericDatatable
          dataSet={props.indexPageData}
          infoEnabled={false}
          moduleName="User"
          isSelection={true}
          isMultipleSelect={false}
          selectionIndex={selectionIndex}
          selected={rowData}
          selectHandler={setRowData}
        ></GenericDatatable>
        {/* <UserList
          columnNames={props.indexPageData.HEADER}
          rows={props.indexPageData.DATA}
          currentRowData={currentRowData}
        ></UserList> */}
      </Grid>
      <Grid
        style={{ padding: "2px  8px 10px 3px" }}
        container
        justify="flex-end"
        direction="row"
        spacing={3}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={openCreaeUserDialog} />
        </Fab>
        <GenericButton
          variant="contained"
          color="secondary"
          onClick={() => verifyUser()}
        >
          Verify User
        </GenericButton>
      </Grid>

      {/*  /> */}

      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={isDialogopen}
        onClose={closeCreaeUserDialog}
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="static" elevation={1} className="headerStyle">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              Add User
            </Typography>
          </Toolbar>
        </AppBar>
        <UserCreationForm
          closeCreaeUserDialog={closeCreaeUserDialog}
          addNewUser={addNewUser}
        />
      </Dialog>
    </div>
  );
}