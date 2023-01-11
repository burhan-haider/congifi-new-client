import React from "react";
export default function Error_404(props) {
  return (
    <div>
      <h1>404 Error</h1>
      <h3>No Mapping found for moduleCode = {props.moduleCode}</h3>
      <h2>Please add component entry in 'ModuleComponentConfig' File</h2>
    </div>
  );
}