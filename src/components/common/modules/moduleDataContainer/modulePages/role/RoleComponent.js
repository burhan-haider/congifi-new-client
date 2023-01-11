import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
// import AddIcon from "@material-ui/icons/Add";
import { MdAdd as AddIcon, MdEdit as EditIcon } from "react-icons/md";
import { GenericDatatable, GenericDialog, GenericDatagrid } from "@application";
import RoleCreationForm from "../role/RoleCreationForm";
import Dialog from "@mui/material/Dialog";
import {
  AppBar,
  Toolbar,
  Typography,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Box,
} from "@mui/material";
import roleOperationService from "services/role/RoleOperationService";
import * as MessageActions from "redux/message/message.actions";
import RoleUpdate from "./RoleUpdate";
import { useDispatch } from "react-redux";
import { useClasses } from "@application";

const styles = (theme) => ({
  speedDial: {},
  mainDivSpeedDial: {
    position: "relative",
    marginRight: "2%",
    marginBottom: "1%",
  },
  speedDialAction: {
    background: "#d4d4d4",
  },
});

function RoleComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [dataSelected, setDataSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");
  const [property, setProperty] = useState({});
  const selectionIndex = "all";
  const dispatch = useDispatch();

  const classes = useClasses(styles);
  //const selectionIndex = "0,1";

  const modalData = {
    AddRole: {
      title: "Add Role",
      size: "lg",
    },
    UpdateRole: {
      title: "Update Role",
      size: "lg",
    },
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const displayProperty = (data) => {
    setProperty(modalData[data]);
  };

  // function addNewRole(newRoleDetails) {
  //   roleOperationService
  //     .createNewRole("/role/", newRoleDetails)
  //     .then(data => {
  //       setOpen(false);
  //       props.refreshCurrentModule();
  //     })
  //     .catch(err => {
  //       console.log("Role Operation Service Error:-",err);
  //     });
  // }
  return (
    <>
      <div className="mx-5 my-5">
        <GenericDatatable
          dataSet={props.indexPageData}
          isSelection={true}
          isMultipleSelect={false}
          selectionIndex={selectionIndex}
          selected={dataSelected}
          selectHandler={setDataSelected}
        ></GenericDatatable>
        {/* <GenericDatagrid dataSet={props.indexPageData} utilColumn={"select"} /> */}
      </div>
      {/* <Fab color="primary" aria-label="add">
          <AddIcon onClick={openCreaeUserDialog} />
        </Fab> */}
      {/* <Dialog
          maxWidth="md"
          fullWidth={true}
          open={open}
          onClose={closeCreaeUserDialog}
          aria-labelledby="form-dialog-title"
        >
          <AppBar position="static" elevation={1} className="headerStyle">
            <Toolbar className="flex w-full">
              <Typography variant="subtitle1" color="inherit">
                Add Role
              </Typography>
            </Toolbar>
          </AppBar>
          <RoleCreationForm
            closeCreaeUserDialog={closeCreaeUserDialog}
            addNewRole={addNewRole}
          />
        </Dialog> */}
      <Box classes={classes.mainDivSpeedDial}>
        <SpeedDial
          classes={classes.speedDial}
          ariaLabel="Role"
          icon={<SpeedDialIcon />}
          direction="left"
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
            classes={classes.speedDialAction}
            key="Add Role"
            tooltipTitle="Add"
            tooltipPlacement="top"
            icon={<AddIcon />}
            onClick={(e) => {
              setAction("Add");
              handleOpenModal();
              displayProperty("AddRole");
            }}
          />
          <SpeedDialAction
            classes={classes.speedDialAction}
            key="Update Role"
            tooltipTitle="Update"
            tooltipPlacement="top"
            icon={<EditIcon />}
            onClick={(e) => {
              if (dataSelected.length > 0) {
                setAction("Update");
                handleOpenModal();
                displayProperty("UpdateRole");
              } else {
                dispatch(
                  MessageActions.showMessage({
                    message: "Please select a record to update",
                    variant: "warning",
                  })
                );
              }
            }}
          />
        </SpeedDial>
        {action === "Add" ? (
          <GenericDialog
            state={openModal}
            closeModal={handleCloseModal}
            property={property}
          >
            <RoleCreationForm
              action={action}
              // addNewRole={addNewRole}
              closeModal={handleCloseModal}
            />
          </GenericDialog>
        ) : action === "Update" ? (
          <GenericDialog
            state={openModal}
            closeModal={handleCloseModal}
            property={property}
          >
            <RoleUpdate
              action={action}
              selectedData={dataSelected}
              // addNewRole={addNewRole}
              closeModal={handleCloseModal}
            />
          </GenericDialog>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
export default RoleComponent;
