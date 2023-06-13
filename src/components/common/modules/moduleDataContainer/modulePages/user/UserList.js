import React, { useEffect, useState } from "react";
// import AddIcon from "@material-ui/icons/Add";
import { MdAdd as AddIcon } from 'react-icons/md'
import { GenericDatagrid, styles, GenericDialog, useClasses } from "@application";
import UserCreationForm from "./UserCreationForm";
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Box,
  Divider,
  Paper
} from "@mui/material";

// const styles = theme => ({
//   mainDivSpeedDial: {
//     position: "relative",
//     marginRight: "2%",
//     marginBottom: "1%"
//   },
//   speedDialAction: {
//     background: "#d4d4d4"
//   }
// });

export default function UserComponent(props) {

  const feature = props.feature;

  const classes = useClasses(styles);
  const [isDialogopen, setDialogOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});

  const modalData = {
    AddUser: {
      title: "Add User",
      size: "lg"
    }
  };


  useEffect(() => {
    console.log("User List Props:-", props)
  })
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const displayProperty = data => {
    setProperty(modalData[data]);
  };

  // function addNewUser(newUserDetails) {
  //   userOperationService
  //     .createNewUser("api/user/", newUserDetails)
  //     .then(data => {
  //       // closeCreaeUserDialog();
  //       props.refreshCurrentModule();
  //     })
  //     .catch(err => {
  //       if (err.response) {
  //         alert(err.response.data.message);
  //       } else {
  //         alert("Error");
  //       }
  //     });
  // }
  const selectionIndex = "all";
  const [rowData, setRowData] = useState([]);

  const HEADER = props.indexPageData["HEADER"];
  const DATA = props.indexPageData["DATA"];
  const finalHEADER = HEADER ? HEADER.filter(function (h) {
    return h !== "USERPASS";
  }) : [];

  var letCDATA;
  var finalDATA = [];
  if (DATA) {
    for (var j = 0; j < DATA.length; j++) {
      letCDATA = DATA[j].filter(data => data !== DATA[j][1]);
      finalDATA.push(letCDATA);
      // console.log(
      //  "DATA =",
      //   DATA[i].filter(data => data !== DATA[i][1])
      // );
    }
  }

  return (
    <Paper className={`${classes.root} shadow-none`}>
      <Box className="moduleName">{feature.breadCrumbs[feature.breadCrumbs.length - 1].label}</Box>
      <Divider className="mb-[10px] border-[#C1C9D3]"></Divider>
      <div className="p-5" >
        <GenericDatagrid
          tableData={{
            DATA: finalDATA,
            HEADER: finalHEADER
          }}
          utilColumn={'singleSelect'}
          setSelectedData={setRowData}
          selectedData={rowData}
          title={`User Results`}
        />
      </div>
      <div className="mt-4">
        <SpeedDial
          className={classes.mainDivSpeedDial}
          ariaLabel="Add"
          direction="left"
          onClose={handleClose}
          icon={<SpeedDialIcon />}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
            className={classes.speedDialAction}
            key="AddUser"
            tooltipPlacement="top"
            tooltipTitle="Add"
            icon={<AddIcon />}
            onClick={e => {
              setAction("Add");
              handleOpenModal();
              displayProperty("AddUser");
            }}
          ></SpeedDialAction>
        </SpeedDial>
        <GenericDialog
          state={openModal}
          closeModal={handleCloseModal}
          property={property}
        >
          <UserCreationForm
            closeModal={handleCloseModal}
            action={action}
            refreshCurrentModule={props.refreshCurrentModule}
          ></UserCreationForm>
        </GenericDialog>
      </div>
    </Paper>
  );
}

/* <Grid container>
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
      </Grid>
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
      </Dialog> */
