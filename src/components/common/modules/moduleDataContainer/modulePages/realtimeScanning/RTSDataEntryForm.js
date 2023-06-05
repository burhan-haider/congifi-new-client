import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Grid } from "@mui/material";
import TextFieldFormsy from "components/common/formsyComponents/TextFieldFormsy";
import { useClasses } from "@application";

const styles = theme => ({
  MuiOutlinedInput: {
    paddingLeft: "10px",
    //paddingright: "8px"
  },
  MuiGridRow: {
    backgroundColor: "#f1f2f3",
    borderRadius: "50px",
    padding: '8px 0px'

  },
  MuiTypoGraphy: {
    float: "left",
    marginBottom: "0.5%",
    fontWeight: "bold",
    marginLeft: "1%",
    fontSize: "15px"
  },
  TestAlignment: {
    alignSelf: "center",
  }
});
function RTSDataEntryForm(props) {
  const classes = useClasses(styles);
  return (
    <div className="m-8">
      <Typography className={classes.MuiTypoGraphy}>Data Entry Form</Typography>
      <Grid
        alignItems="center"
        justify="center"
        container
        className={classes.MuiGridRow}
      >
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Name 1
            </Grid>
            <Grid xs={7} item={true} style={{border: 'none'}} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                value="osama bin laden"
                name="NAME1"
                // className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Name 2
            </Grid>
            <Grid xs={7} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="NAME2"
                // className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Name 3
            </Grid>
            <Grid xs={6} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="NAME3"
                className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br></br>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.MuiGridRow}
      >
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Name 4
            </Grid>
            <Grid xs={7} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="NAME4"
                className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Name 5
            </Grid>
            <Grid xs={7} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="NAME5"
                className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Date of Birth
            </Grid>
            <Grid xs={6} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="DATEOFBIRTH"
                variant="standard"
                className="w-full rounded-full bg-white"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br></br>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.MuiGridRow}
      >
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Passport No
            </Grid>
            <Grid xs={7} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="PASSPORTNO"
                variant="standard"
                className="w-full rounded-full bg-white"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, , 'text-sm'].join(" ")}>
              National Id value
            </Grid>
            <Grid xs={7} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="PANNO"
                className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm' ].join(" ")}>
              Account No
            </Grid>
            <Grid xs={6} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="ACCOUNTNO"
                className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br></br>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.MuiGridRow}
      >
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Customer Id
            </Grid>
            <Grid xs={7} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="CUSTOMERID"
                className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Address
            </Grid>
            <Grid xs={7} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="ADDRESS"
                className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Image File Path
            </Grid>
            <Grid xs={6} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="IMAGEFILEPATH"
                className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br></br>
      <Grid container alignItems="center" className={classes.MuiGridRow}>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={[classes.TestAlignment, 'text-sm'].join(" ")}>
              Image Scan Threshold
            </Grid>
            <Grid xs={7} item={true} className={`${classes.TestAlignment} w-full rounded-full bg-white`}>
              <TextFieldFormsy
                size="small"
                name="IMAGESCANTHRESHOLD"
                className="w-full rounded-full bg-white"
                variant="standard"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default RTSDataEntryForm;
