import React from "react";

function Auth(props) {
  //   const { children } = this.props;
  return (
    <React.Fragment>
      {props.children}
      {/* {console.log("through auth", props)} */}
    </React.Fragment>
  );
}

export default Auth;