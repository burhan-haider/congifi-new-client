//Created by Vivek - 20.04.2020
import React from "react";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useClasses } from "@application";

const styles = theme => ({
  arrow: {
    color: '#242526'
  },
  tooltip: {
    backgroundColor: '#242526',
    fontSize: "16px",
    color: "#fff",
    marginBottom: "7px"
  }
});

function GenericTooltip(props) {
  const classes = useClasses(styles);
  //return <Tooltip arrow classes={classes} {...props} />;
  return (
    <Tooltip
      arrow
      TransitionComponent={Zoom}
      placement="top-start"
      classes={classes}
      {...props}
    />
  );
}

export default GenericTooltip;
