import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Grid } from "@mui/material";
import TextFieldFormsy from "components/common/formsyComponents/TextFieldFormsy";
import { useClasses } from "@application";

const styles = theme => ({
  MuiOutlinedInput: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset"
    },
    paddingLeft: "10px",
    paddingright: "8px"
  },
  MuiGridRow: {
    backgroundColor: "#f1f2f3",
    borderRadius: "50px",
    height: "8vh"
  },
  MuiTypoGraphy: {
    float: "left",
    marginBottom: "0.5%",
    fontWeight: "bold",
    marginLeft: "1%",
    fontSize: "15px"
  },
  TextAlignment: {
    alignSelf: "center"
  }
});
export default function DataEntryForm(props) {
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Name 1
            </Grid>
            <Grid xs={7} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                value="osama bin laden"
                name="NAME1"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Name 2
            </Grid>
            <Grid xs={7} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="NAME2"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Name 3
            </Grid>
            <Grid xs={6} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="NAME3"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Name 4
            </Grid>
            <Grid xs={7} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="NAME4"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Name 5
            </Grid>
            <Grid xs={7} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="NAME5"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Date of Birth
            </Grid>
            <Grid xs={6} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="DATEOFBIRTH"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Passport No
            </Grid>
            <Grid xs={7} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="PASSPORTNO"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              National Id value
            </Grid>
            <Grid xs={7} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="PANNO"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Account No
            </Grid>
            <Grid xs={6} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="ACCOUNTNO"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Customer Id
            </Grid>
            <Grid xs={7} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="CUSTOMERID"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Address
            </Grid>
            <Grid xs={7} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="ADDRESS"
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
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Image File Path
            </Grid>
            <Grid xs={6} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="IMAGEFILEPATH"
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
      <Grid container alignItems="center" className={classes.MuiGridRow}>
        <Grid xs={4} item>
          <Grid container>
            <Grid xs={5} item={true} className={classes.TextAlignment}>
              Image Scan Threshold
            </Grid>
            <Grid xs={7} item={true} className={classes.TextAlignment}>
              <TextFieldFormsy
                size="small"
                name="IMAGESCANTHRESHOLD"
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
    </div>
  );
}
