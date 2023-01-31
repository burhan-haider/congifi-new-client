import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
// import FirstPageIcon from "@mui/icons-material/FirstPage";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { MdKeyboardArrowRight as KeyboardArrowRight } from 'react-icons/md'
// import LastPageIcon from "@mui/icons-material/LastPage";
import Pagination from "@mui/material/Pagination";
import { Typography, TextField } from "@mui/material";
import clsx from "clsx";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    display: "flex",
    flexShrink: 0,
    marginLeft: 1
  },
  paginationRoot: {
    "& .MuiPaginationItem-root": {
      fontFamily: "inherit",
      color: "#052a4f",
      margin: 0
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      color: "#fff",
      backgroundColor: "#052a4f"
    }
  },
  typography: {
    fontFamily: "inherit",
    fontSize: "14px",
    margin: "0 5px",
    color: "#353535"
  },
  textFieldRoot: {
    width: "50px",
    alignSelf: "center",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "solid 1px #052a4f"
      },
      "&.Mui-focused fieldset": {
        border: "solid 1px #052a4f"
      }
    }
  },
  textFieldInput: {
    textAlign: "center"
  },
  inputFieldDesign: {
    maxHeight: "30px",
    borderRadius: "10px",
    fontFamily: "inherit",
    fontSize: "inherit",
    color: "#353535",
    "& .MuiOutlinedInput-input": {
      padding: "18px 8px",
      textAlign: "center"
    }
  }
});

export default function GenericPaginationActions(props) {
  const classes = useClasses(styles);
  const { count, page, rowsPerPage, onPageChange } = props;
  const [goToPage, setGoToPage] = useState(0);
  const pagesCount = Math.ceil(count / rowsPerPage);

  const handleGoToPage = event => {
    //console.log("VIVEK -", event.target.value + "---" + pagesCount);
    if (event.target.value > pagesCount) {
      setGoToPage(pagesCount);
    } else {
      setGoToPage(event.target.value);
    }
  };

  // const handleFirstPageButtonClick = event => {
  //   onChangePage(event, 0);
  // };

  // const handleBackButtonClick = event => {
  //   onChangePage(event, page - 1);
  // };

  // const handleNextButtonClick = event => {
  //   onChangePage(event, page + 1);
  // };

  // const handleLastPageButtonClick = event => {
  //   onChangePage(event, Math.max(0, pagesCount));
  // };

  return (
    <div className={classes.root}>
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton> */}
      <Pagination
        count={pagesCount}
        siblingCount={1}
        boundaryCount={2}
        onChange={onPageChange}
        page={page + 1}
        className={clsx("self-center", classes.paginationRoot)}
      />
      <div style={{ display: "flex", maxWidth: "250px" }}>
        <Typography className={clsx("self-center", classes.typography)}>
          Go to Page
        </Typography>
        <TextField
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={event => handleGoToPage(event)}
          classes={{
            root: classes.textFieldRoot,
            label: classes.textFieldLabel
          }}
          InputProps={{
            className: classes.inputFieldDesign
          }}
        />
        <IconButton
          onClick={event => onPageChange(event, goToPage)}
          style={{ padding: "0", marginRight: "10px" }}
        >
          <KeyboardArrowRight />
        </IconButton>
      </div>
      {/* <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= pagesCount}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= pagesCount}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton> */}
    </div>
  );
}
