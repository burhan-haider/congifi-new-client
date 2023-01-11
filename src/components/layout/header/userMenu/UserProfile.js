import React from "react";
// import { makeStyles } from "@mui/styles";
import { GenericButton } from "@application";
import { useClasses } from "@application";

const styles = theme => ({
  textFieldRoot: {
    width: "40%",
    // background: "linear-gradient(45deg, #89f7fe 30%, #66a6ff 90%)",
    //marginBottom: 20,
    borderRadius: 50,
    marginLeft: "5%",
    marginRight: "5%"
    //border: 0,
    //boxShadow: '0 3px 5px 2px rgba(124, 217, 254, 1)',
  },
  textFieldInput: {
    color: "Black",
    // padding: "10px",
    borderRadius: "50px"
  },
  MuiOutlinedInput: {
    borderRadius: "50px",
    padding: "0px"
  }
});

function UserProfile(props) {
  
  const classes = useClasses(styles);

  return (
    <div>
      <div>
        <h3>Profile page</h3>
      </div>
      <div className="flex justify-end mb-4">
        <GenericButton
          variant="outlined"
          onClick={props.closeModal}
          //autoFocus
        >
          Close
        </GenericButton>
      </div>
    </div>
  );
}

export default UserProfile;
