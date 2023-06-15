import React from "react";
import { createTheme, ThemeProvider} from "@mui/material/styles";
import {
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MdClose as CloseIcon } from 'react-icons/md';
// import { Typography } from "@mui/material";

function GenericDialog(props) {
  //console.log(props);
  const theme = createTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiDialog: {
        // Name of the rule
        paper: {
          // width: 600,
          // height: 500,
          borderRadius: 10,
          border: 0,
          // color: "white",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
        }
      },
      MuiDialogContent: {
        root: {
          padding: "10px"
        }
      },
      MuiDialogContentText: {
        root: {
          // color: "white"
        }
      },
      MuiButton: {
        text: {
          // color: "white",
          textTransform: "capitalize"
        }
      },
      MuiDialogTitle: {
        root: {
          padding: "10px",
          //backgroundColor: "#1f4068",
          backgroundColor: "#f4f5fa",
          color: "#333333"
        }
      }
    }
  });

  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
        <Dialog
          fullWidth={true}
          open={props.state}
          maxWidth={props.property.size}
          onClose={props.closeModal}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <div className="clearfix">
              {props.property.title}
              <Button onClick={props.closeModal} style={{ float: "right" }}>
                <CloseIcon size={24} color="#333" />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent>{props.children}</DialogContent>
        </Dialog>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default GenericDialog;
