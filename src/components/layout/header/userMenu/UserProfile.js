import React from "react";
// import { makeStyles } from "@mui/styles";
import { GenericButton } from "@application";

function UserProfile(props) {

  return (
    <div>
      <div>
        <h3>Profile page</h3>
      </div>
      <div className="flex justify-end mb-4">
        <GenericButton
          variant="outlined"
          onClick={props.closeModal}
        >
          Close
        </GenericButton>
      </div>
    </div>
  );
}

export default UserProfile;
