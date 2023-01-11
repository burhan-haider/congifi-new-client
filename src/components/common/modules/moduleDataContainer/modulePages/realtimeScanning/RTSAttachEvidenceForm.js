import React from "react";
import Formsy from "formsy-react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableCell,
  TableHead,
  TableBody
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useClasses } from "@application";

const styles = theme => ({
  muiTyphography: {
    fontFamily: "inherit",
    fontSize: "inherit",
    paddingLeft: "1%"
  },
  dragDropFile: {
    border: "dotted",
    borderColor: "blue",
    align: "center"
  },
  ChildOne: {
    width: "80%",
    float: "left"
  },
  childTwo: {
    width: "20%",
    float: "left"
  },
  headerOne: {
    backgroundColor: "#7dc0f7",
    paddingLeft: "1%",
    height: "6vh"
  },
  headerTwo: {
    backgroundColor: "#7dc0f7",
    paddingLeft: "3%",
    height: "6vh"
  },
  containerTwo: {
    marginLeft: "5%"
  },
  parentDiv: {
    margin: "0.5%"
  },
  heightOne: {
    paddingLeft: "3%",
    gridAutoRows: ""
  },
  FileOne: {
    height: "8vh"
  },
  spaceAllocater: {
    height: "6vh"
  },
  MuiButton: {
    textTransform: "initial",
    marginRight: "1%",
    borderRadius: "15px",
    borderColor: "#1562ca",
    padding: "2px 2.5% 2px 2.5%",
    "&:hover": {
      backgroundColor: "#0b4ca2",
      color: "white"
    }
  }
});
function RTSAttachEvidenceForm(props) {
  const classes = useClasses(styles);
  return (
    <Formsy>
      <div className={classes.parentDiv}>
        <div className={classes.ChildOne}>
          <Grid container>
            <Grid xs={12} item className={classes.headerOne}>
              <Typography>Upload File</Typography>
            </Grid>
            <Grid xs={12} item className="border bg-gray-100">
              <Typography className={classes.muiTyphography}>
                Allowed File Size : <b>3GB</b>
              </Typography>
              <Typography className={classes.muiTyphography}>
                Allowed File Type :<b>ALL</b>
              </Typography>
              <Typography className={classes.muiTyphography}>
                Block File Type : <b>exe,rar,zip</b>
              </Typography>
              <Typography className={classes.muiTyphography}>
                Maximum File Select Count : <b>3</b>
              </Typography>
              <Typography className={classes.muiTyphography}>
                Upload Enable : <b>Yes</b>
              </Typography>
            </Grid>
            <Grid container className={clsx("border", classes.FileOne)}>
              <Grid xs={2} item className="border">
                Select Files
              </Grid>
              <Grid xs={10} item className="border">
                <TextField type="file">Choose Files</TextField>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              item
              className={clsx("border bg-gray-100", classes.spaceAllocater)}
            >
              <Typography align="center">
                <b>Or</b>
              </Typography>
            </Grid>
            <Grid container className="border h-32">
              <Grid xs={2} item className="border">
                Drop Files
              </Grid>
              <Grid xs={10} item className={classes.dragDropFile}>
                Drag & Drop Files Here
              </Grid>
            </Grid>
            <Grid container className="bg-gray-100 border h-40">
              <Grid xs={2} item>
                Selected Files
              </Grid>
              <Grid xs={10} item className="border">
                <Table>
                  <TableBody>
                    <TableHead className="border">
                      <TableCell className="border">File Name</TableCell>
                      <TableCell className="border">File Size</TableCell>
                      <TableCell className="border">File Type</TableCell>
                      <TableCell className="border">Progress</TableCell>
                      <TableCell className="border">Action/Status</TableCell>
                    </TableHead>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
            <Grid xs={12} item className="border center h-24">
              <Button
                variant="outlined"
                size="small"
                className={classes.MuiButton}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </div>

        <div className={classes.childTwo}>
          <Grid container className={classes.containerTwo}>
            <Grid item xs={12} className={clsx("border", classes.headerTwo)}>
              <Typography>Download File</Typography>
            </Grid>
            <Grid item xs={12} className={clsx("border", classes.heightOne)}>
              No File Available For Download<br></br>
              <br></br>
              <br></br>
              <br></br>
            </Grid>
          </Grid>
        </div>
      </div>
    </Formsy>
  );
}
export default RTSAttachEvidenceForm;
