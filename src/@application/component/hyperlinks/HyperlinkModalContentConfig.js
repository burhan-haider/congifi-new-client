import React from "react";
import { GenericTabContent } from "components/common/modules/moduleDataContainer/modulePages/common/modalContentPages";
import Error_hyperlink from "components/common/errorPages/Error_hyperlink";
function HyperlinkModalContentConfig(props) {
  //console.log(props);
  const modalContainer = {
    Error_hyperlink: Error_hyperlink,
    customerMaster: GenericTabContent,
    branchMaster: GenericTabContent,
    accountsMaster: GenericTabContent,
    accountProfiling: GenericTabContent
  };

  let ContentComponent = modalContainer[props.data.hyperlinkDetailsModule]
    ? modalContainer[props.data.hyperlinkDetailsModule]
    : modalContainer["Error_hyperlink"];
  return (
    <div>
      <ContentComponent
        data={props.data}
        closeModal={props.closeModal}
      ></ContentComponent>
    </div>
  );
}
export default HyperlinkModalContentConfig;
