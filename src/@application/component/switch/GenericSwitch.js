// //Created by Vivek - 04.09.2020
// import React from "react";
// import { makeStyles } from "@mui/styles";
// import { Switch } from "@mui/material";

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: 36,
//     height: 20,
//     padding: 0,
//     margin: theme.spacing(1)
//   },
//   switchBase: {
//     height: "inherit",
//     padding: 1,
//     "&$checked": {
//       transform: "translateX(20px)",
//       color: theme.palette.common.white,
//       "& + $track": {
//         backgroundColor: "#fff",
//         opacity: 1,
//         border: "none"
//       }
//     },
//     "&$focusVisible $thumb": {
//       color: "#052a4f",
//       border: "6px solid #fff"
//     }
//   },
//   thumb: {
//     width: 12,
//     height: 12,
//     backgroundColor: "#052a4f"
//   },
//   track: {
//     borderRadius: 24 / 2,
//     backgroundColor: "#fff",
//     opacity: 1
//     //transition: theme.transitions.create(["background-color", "border"])
//   },
//   checked: {},
//   focusVisible: {}
// }));

// function GenericSwitch(props) {
//   const classes = useClasses(styles);
//   return (
//     <Switch
//       focusVisibleClassName={classes.focusVisible}
//       disableRipple
//       classes={{
//         root: classes.root,
//         switchBase: classes.switchBase,
//         thumb: classes.thumb,
//         track: classes.track,
//         checked: classes.checked
//       }}
//       {...props}
//     />
//   );
// }

// export default GenericSwitch;
