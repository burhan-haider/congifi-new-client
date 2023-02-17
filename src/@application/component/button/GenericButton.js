//Created by Vivek - 28.05.2020
import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useClasses } from "@application/hooks";

const styles = theme => ({
  buttonRoot: {
    left: '5px',
    borderRadius: "25px",
    marginRight: "1%",
    color: "#052a4f",
    backgroundColor: "#fff",
    border: "1px solid #052a4f",
    fontFamily: "inherit",
    "&:hover, &:focus": {
      color: "#fff",
      backgroundColor: "#052a4f"
    },
    textTransform: "none"
  },
});

function GenericButton(props) {
  const classes = useClasses(styles);
  return (
    <Button
      classes={{
        root: classes.buttonRoot,
        label: classes.buttonLabel
      }}
      {...props}
    />
  );
}

export default GenericButton;
