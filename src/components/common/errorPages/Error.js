import React from "react";

function Error(props) {
  return <div>{JSON.stringify(props.error)}</div>;
}

export default Error;