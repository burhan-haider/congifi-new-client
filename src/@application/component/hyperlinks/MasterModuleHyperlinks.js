//Created by Vivek - 21.04.2020
import commonService from "services/common/commonService";
// import store from "app/store";

const genericHyperlinksMap = new Map();
genericHyperlinksMap.set("app.common.CUSTOMERID", {
  function: "genericDetailsFunction",
  title: "Customer Details",
  detailsModule: "customerMaster"
});
genericHyperlinksMap.set("app.common.BRANCHCODE", {
  function: "genericDetailsFunction",
  title: "Branch Details",
  detailsModule: "branchMaster"
});
genericHyperlinksMap.set("app.common.ACCOUNTNO", {
  function: "genericDetailsFunction",
  title: "Account Details",
  detailsModule: "accountsMaster"
});
genericHyperlinksMap.set("app.common.ALERTSERIALID", {
  function: "openAlertSerialIdDetails",
  title: "Alert Serial ID Details",
  detailsModule: "alertSerialId"
});
genericHyperlinksMap.set("app.common.REPORTSERIALID", {
  function: "openReportSerialIdDetails",
  title: "Report Serial ID Details",
  detailsModule: "reportSerialId"
});
genericHyperlinksMap.set("app.common.JOINTCUSTOMERID", {
  function: "genericDetailsFunction",
  title: "Customer Details",
  detailsModule: "customerMaster"
});
genericHyperlinksMap.set("app.common.PARAMACTIONCODE", {
  function: "openActionParametersModule",
  title: "Action Param Details",
  detailsModule: "actionParamsForm"
});
genericHyperlinksMap.set("app.common.LISTID", {
  function: "openRtScanListIDDetails",
  title: "Transaction Details",
  detailsModule: "rtScanListID"
});
genericHyperlinksMap.set("app.common.PROFILEACCOUNTNO", {
  function: "openAccountProfilingDetails",
  title: "Account Profile Details",
  detailsModule: "accountProfiling"
});

class MasterModuleHyperlinks {
  finalDataConstructor = (
    data,
    hyperlinkTitle,
    hyperlinkDetailsModule,
    textContent
  ) => {
    const dataMap = {
      modalData: {
        title: hyperlinkTitle,
        size: "lg"
      },
      textContent: textContent,
      hyperlinkDetailsModule: hyperlinkDetailsModule,
      dataSet: data
    };
    return dataMap;
  };

  // VIVEK - functions below
  genericDetailsFunction = (
    hyperlinkTitle,
    hyperlinkDetailsModule,
    hyperlinkRow,
    rowIndex,
    columnIndex,
    dynamicProps
  ) => {
    const data = commonService.fetchModuleDetails(
      hyperlinkDetailsModule,
      hyperlinkRow[columnIndex]
    );
    return this.finalDataConstructor(
      data,
      hyperlinkTitle,
      hyperlinkDetailsModule,
      hyperlinkRow[columnIndex]
    );
  };

  // openAlertSerialIdDetails = (
  //   hyperlinkTitle,
  //   hyperlinkDetailsModule,
  //   hyperlinkRow,
  //   rowIndex,
  //   columnIndex,
  //   dynamicProps
  // ) => {
  //   const state = store.getState();
  //   const alertId =
  //     state.scenarios.scenariosDetails.openedScenarioDetails.openedScenarioId;
  //   const viewtype = "ALL";
  //   const data = scenariosService.fetchAlertSerialIdDetails(
  //     viewtype,
  //     alertId,
  //     hyperlinkRow[columnIndex]
  //   );
  //   return this.finalDataConstructor(
  //     data,
  //     alertId,
  //     hyperlinkDetailsModule,
  //     hyperlinkRow[columnIndex]
  //   );
  // };

  // openReportSerialIdDetails = (
  //   hyperlinkTitle,
  //   hyperlinkDetailsModule,
  //   hyperlinkRow,
  //   rowIndex,
  //   columnIndex,
  //   dynamicProps
  // ) => {
  //   const state = store.getState();
  //   const group = commonService.makeUpperCaseString(
  //     state.reports.reportsDetails.openedReportDetails.openedModule
  //   );
  //   const reportId =
  //     state.reports.reportsDetails.openedReportDetails.openedReportId;
  //   const viewtype = "ALL";
  //   const data = reportsService.fetchReportSerialIdDetails(
  //     group,
  //     viewtype,
  //     reportId,
  //     hyperlinkRow[columnIndex]
  //   );
  //   return this.finalDataConstructor(
  //     data,
  //     reportId + " - Save/Generate Report",
  //     hyperlinkDetailsModule,
  //     hyperlinkRow[columnIndex]
  //   );
  // };
  

  /*customerIdClick = (hyperlinkTitle, hyperlinkDetailsModule, event) => {
    console.log("Vivek customerId onClick = ", event.target.textContent);
    //return "customerId";
    const data = commonService.fetchModuleDetails(
      hyperlinkDetailsModule,
      event.target.textContent
    );
    const customerIDMap = {
      modalData: {
        title: hyperlinkTitle,
        size: "lg"
      },
      textContent: event.target.textContent,
      hyperlinkDetailsModule: hyperlinkDetailsModule,
      dataSet: data
    };
    return customerIDMap;
  };*/

  openAccountProfilingDetails = (
    hyperlinkTitle,
    hyperlinkDetailsModule,
    hyperlinkRow,
    rowIndex,
    columnIndex,
    dynamicProps
  ) => {
    //console.log(dynamicProps);
    const data = commonService.fetchAccountProfilingDetails(
      hyperlinkDetailsModule,
      hyperlinkRow[columnIndex] +
        `~~` +
        dynamicProps["1_FROMDATE"] +
        `~~` +
        dynamicProps["2_TODATE"] +
        `~~` +
        hyperlinkRow[columnIndex + 1]
    );
    return this.finalDataConstructor(
      data,
      hyperlinkTitle,
      hyperlinkDetailsModule,
      hyperlinkRow[columnIndex]
    );
  };

  openActionParametersModule = (
    hyperlinkTitle,
    hyperlinkDetailsModule,
    hyperlinkRow,
    rowIndex,
    columnIndex
  ) => {
    //const actionCode = hyperlinkRow[columnIndex];
    //const dispatch = useDispatch();
    //dispatch(ActionManagementActions.getCWFCases(actionCode));
    // caseWorkflowService
    //   .searchActionParams([{ actionCode: actionCode }])
    //   .then(data => {
    //     console.log(data);
    //     // setActionParamData(data);
    //     // setShowResults(true);
    //     // setExpandedPanel(false);
    //     // setIsFormValid(true);
    //   })
    //   .catch(error => {
    //     // console.log(error);
    //   });
  };

  getAllHyperlinksData() {
    return genericHyperlinksMap;
  }

  hyperlinkFunction = (
    hyperlinkColumn,
    desiredHyperlinkFunction,
    hyperlinkTitle,
    hyperlinkDetailsModule,
    hyperlinkRow,
    rowIndex,
    columnIndex,
    dynamicProps
  ) => {
    //console.log(desiredHyperlinkFunction + "---" + hyperlinkDetailsModule);
    //VIVEK - Below line is for separate functions click for each hyperlink
    return [desiredHyperlinkFunction](
      hyperlinkTitle,
      hyperlinkDetailsModule,
      hyperlinkRow,
      rowIndex,
      columnIndex,
      dynamicProps
    );
  };
}

const instance = new MasterModuleHyperlinks();
export default instance;
