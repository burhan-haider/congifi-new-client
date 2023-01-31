//Created by Vivek - 06.07.2020
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
// import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@mui/styles";
import * as MessageActions from "redux/message/message.actions";
import { useClasses } from '@application'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: 2
    }
  }
});

export default function GenericMessage(props) {
  const classes = useClasses(styles);
  const dispatch = useDispatch();

  const state = useSelector(data => data.message.genericMessage.state);
  const options = useSelector(data => data.message.genericMessage.options);

  const hideMessage = () => {
    dispatch(MessageActions.hideMessage());
  };
  return (
    <div className={classes.root}>
      <Snackbar
        {...options}
        open={state}
        onClose={hideMessage}
        key={options.message}
      >
        <Alert onClose={hideMessage} severity={options.variant}>
          {options.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
