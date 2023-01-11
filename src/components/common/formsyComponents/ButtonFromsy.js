import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import _ from "lodash";

const CustomButton = styled(Button)({
  buttonRoot: {
    borderRadius: "25px",
    marginRight: "1%",
    color: "#052a4f",
    backgroundColor: "#fff",
    border: "1px solid #052a4f",
    fontFamily: "inherit",
    "&:hover, &:focus": {
      color: "#fff",
      backgroundColor: "#052a4f"
    }
  },
  buttonLabel: {
    textTransform: "capitalize"
    //color: "white"
  }
});

function GenericButton(props) {
  const importedProps = _.pick(props, [
    "className",
    "disabled",
    "id",
    "name",
    "color",
    "variant"
  ]);

  return (
    <CustomButton
      {...importedProps}
      {...props}
    />
  );
}

export default GenericButton;
