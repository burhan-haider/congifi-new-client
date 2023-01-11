import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Radio
} from "@mui/material";
import { GenericButton } from "@application";
import { useClasses } from "@application";

const styles = theme =>({
  root: {
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  treeview: {
    flexGrow: 1,
    maxHeight: "450px",
    //maxWidth: "400px",
    overflowY: "auto"
  },
  // VIVEK - CHECKBOX
  checkboxRoot: {
    color: "#052a4f",
    "&$checked": {
      color: "#052a4f"
    }
  },
  checked: {},
  textFieldRoot: {
    width: "80%",
    // background: "linear-gradient(45deg, #89f7fe 30%, #66a6ff 90%)",
    margin: "3% 3% 5% 3%",
    borderRadius: 50,
    //border: 0,
    //boxShadow: '0 3px 5px 2px rgba(124, 217, 254, 1)',
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        //borderColor: "#353535",
        border: "solid 1px #3a3a3a"
      },
      "&:hover fieldset": {
        border: "solid 2px #3a3a3a"
      },
      "&.Mui-focused fieldset": {
        border: "solid 2px #3a3a3a"
      }
    }
  },
  textFieldInput: {
    color: "#333333",
    // padding: "10px",
    borderRadius: "50px"
  },
  MuiOutlinedInput: {
    borderRadius: "50px",
    padding: "0px"
  }
});
function ModulesDropDown(props) {
  const { modulesList, addNode } = props;
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);

  const handleToggle = value => () => {
    //checkbox handler
    // const currentIndex = selectedCheckbox.indexOf(value);
    // const newChecked = [...selectedCheckbox];
    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }
    // setSelectedCheckbox(newChecked);
    //radio handler
    setSelectedCheckbox(value);
  };
  //console.log(selectedCheckbox);

  const classes = useClasses(styles);
  return (
    <React.Fragment>
      <List className={classes.root}>
        {modulesList.map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={index}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Radio
                  edge="start"
                  //checked={selectedCheckbox.indexOf(value) !== -1}
                  checked={selectedCheckbox === value}
                  //checked={false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
      </List>
      <div className="flex justify-end mr-4 my-4">
        <GenericButton
          variant="outlined"
          onClick={() => {
            addNode(selectedCheckbox);
            props.closeModal();
          }}
          autoFocus
          className={classes.MuiButton}
        >
          Add
        </GenericButton>
        <GenericButton
          variant="outlined"
          onClick={props.closeModal}
          autoFocus
          className={classes.MuiButton}
        >
          Close
        </GenericButton>
      </div>
    </React.Fragment>
  );
}
export default ModulesDropDown;