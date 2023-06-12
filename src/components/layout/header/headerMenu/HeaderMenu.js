import React, { useState } from "react";
// import { makeStyles } from "@mui/material/styles";
import { useClasses } from '@application';
import { GenericDialog } from "@application";
import UserSettings from "./UserSetting";
import getIconByKey from 'assets';
import {
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  MenuItem,
  MenuList,
  ListItemIcon,
} from "@mui/material";


// VIVEK - Header Menu - 09.04.2020
const styles = theme => ({
  topbarLi: {
    display: "inline-block",
    verticalAlign: "middle",
    padding: "0px 10px",
    borderLeft: "1px solid #4993b8",
    cursor: "pointer"
  },
  iconsDiv: {
    verticalAlign: "middle"
  },
  topbarIcons: {
    margin: "auto",
    width: "15px",
    height: "15px"
    // maxWidth: "15px",
    // maxHeight: "15px"
  },
  menuItems: {
    color: "#4993b8",
    fontFamily: "inherit",
    fontSize: "inherit"
  },
  listItemIcons: {
    minWidth: 0,
    marginRight: "1rem"
  }
});

function HeaderMenu() {
  //VIVEK - imported all the topbar icons at once
  
  const classes = useClasses(styles);

  function handleTraceClick() {
    //alert("Vivek clicked trace icon");
  }

  const modalData = {
    settings: {
      title: "User Settings",
      size: "lg"
    }
  };

  // VIVEK - Code for modal open
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayProperty = data => {
    setProperty(modalData[data]);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className="hidden xl:flex justify-center items-center ">
          <div className="border-0 border-l-2 border-l-[#4993b8] border-solid pl-4 pr-2" >
            <img
              src={getIconByKey('list')}
              className="h-4 w-auto mt-1"
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              //aria-haspopup="true"
              onClick={handleToggle}
              alt="list"
            />
          </div>
      <Popper
        style={{ zIndex: 200 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        className="m-4"
        // placement="bottom"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              marginTop: '7px',
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    className={classes.menuItems}
                    onClick={handleTraceClick}
                  >
                    <ListItemIcon className={classes.listItemIcons}>
                      <img
                        src={getIconByKey('trace')}
                        className={classes.topbarIcons}
                        alt="trace"
                      />
                    </ListItemIcon>
                    User Guide
                  </MenuItem>
                  <MenuItem className={classes.menuItems}>
                    <ListItemIcon className={classes.listItemIcons}>
                      <img
                        src={getIconByKey('log')}
                        className={classes.topbarIcons}
                        alt="log"
                      />
                    </ListItemIcon>
                    User Notes
                  </MenuItem>
                  <MenuItem className={classes.menuItems}>
                    <ListItemIcon className={classes.listItemIcons}>
                      <img
                        src={getIconByKey('reportsHeaderMenu')}
                        className={`${classes.topbarIcons}`}
                        alt="reports"
                      />
                    </ListItemIcon>
                    Reports
                  </MenuItem>
                  <MenuItem className={classes.menuItems}>
                    <ListItemIcon className={classes.listItemIcons}>
                      <img
                        src={getIconByKey('chat')}
                        className={classes.topbarIcons}
                        alt="chat"
                      />
                    </ListItemIcon>
                    Chat
                  </MenuItem>
                  <MenuItem className={classes.menuItems}>
                    <ListItemIcon className={classes.listItemIcons}>
                      <img
                        src={getIconByKey('email')}
                        className={classes.topbarIcons}
                        alt="chat"
                      />
                    </ListItemIcon>
                    Email
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItems}
                    onClick={e => {
                      handleClickOpenModal();
                      displayProperty("settings");
                    }}
                  >
                    <ListItemIcon className={classes.listItemIcons}>
                      <img
                        src={getIconByKey('settings')}
                        className={classes.topbarIcons}
                        alt="settings"
                      />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <GenericDialog
        closeModal={handleCloseModal}
        state={openModal}
        property={property}
      >
        <UserSettings closeModal={handleCloseModal} />
      </GenericDialog>
    </div>
  );
}
export default HeaderMenu;
