import React, { useState } from "react";
import {
    Button, 
    Grow, 
    Paper, 
    Popper, 
    MenuList, 
    MenuItem,
    ClickAwayListener,
    Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "redux/auth/user/user.actions";
import { useClasses } from "@application";

import { GenericDialog } from "@application";
import UserProfile from "components/layout/header/userMenu/UserProfile";
// import VivekImage from "assets/Vivek.jpg";

const styles = theme => ({
  Buttonroot: {
    zIndex: 99,
  },
  paper: {
    zIndex: 9999
  },
  popper: {
    zIndex: 22
  },
  button: {
    color: "#fff",
    textTransform: "capitalize"
  },
  small: {
    width: '25px',
    height: '25px'
  },
  root: {
    "&.MuiAvatar-root": {
      width: "30px",
      height: "30px",
      // marginTop: "5px",
    }
  }
});

function UserMenuList() {
  const classes = useClasses(styles);
  const [open, setOpen] = useState(false);
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

  const handleListKeyDown = (event) => {
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

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };

  const userData = useSelector(data => data.auth.user);

  const modalData = {
    profile: {
      title: "User Profile",
      size: "lg"
    }
  };

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

  return (
    <div className={`${classes.Buttonroot}`}>
      <Button
        className={`${classes.button}`}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="small"
        //variant="outlined"
        //endIcon={<AccountCircleRounded />}
        style={{ padding: "0" }}
      >
        
        <span
          className="hidden xl:block"
          style={{
            // wordBreak: "normal",
            lineHeight: "1.2em",
            // marginTop: "3px",
            fontFamily: '"GoogleSans-Regular",-apple-system, BlinkMacSystemFont, "Segoe UI",Roboto, Helvetica Neue, Arial, sans-serif',
            textAlign: 'left',
            marginRight: '10px',
            marginLeft: '5px',
            minWidth: 'fit-content'
          }}
        >
          {userData.data.displayName}
        </span>
        <Avatar className={classes.root}>
          {/* <AccountCircleRounded /> */}
          {/* <img src={VivekImage} alt="" /> */}
        </Avatar>
        {/* VIVEK - 25.04.2020 */}
        {/* //className="ml-1" */}
        
      </Button>

      <Popper
        style={{ zIndex: 200 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
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
                    onClick={e => {
                      handleClickOpenModal();
                      displayProperty("profile");
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
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
        <UserProfile closeModal={handleCloseModal} />
      </GenericDialog>
    </div>
  );
}

export default UserMenuList;
