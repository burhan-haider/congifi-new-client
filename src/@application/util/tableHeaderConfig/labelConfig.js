import axios from 'axios';



const headerConfig = {

    // General Headers
    "app.common.ISENABLED": "Is Enabled",
    "app.common.UPDATETIMESTAMP": "Update Timestamp",
    "app.common.ROWPOSITION": "Row Position",
    "app.common.UPDATEDBY": "Updated By",
    "app.common.POSITION": "Position",
    "app.common.MODULECODE": "Module Code",
    "app.common.SEQNO": "Sequence No.",

    // Action Management Headers
    "app.common.ACTIONCODE": "Action Code",
    "app.common.PARAMACTIONCODE": "Paramter Action Code",
    "app.common.PARAMETERNAME": "Parameter Name",
    "app.common.PARAMETERALIASNAME": "Parameter Alias Name",
    "app.common.PARAMETERID": "Parameter ID",
    "app.common.PARAMETERINDEX": "Parameter Index",
    "app.common.PARAMETERDATATYPE": "Parameter Data Type",
    "app.common.PARAMETERSTATICVALUES": "Parameter Static Values",
    "app.common.PARAMETERDEFAULTVALUE": "Parameter Default Value",
    "app.common.ISMULTIPLESELECT": "Is Multiple Select",
    "app.common.VALIDATIONFIELD": "Validation Field",
    "app.common.VALIDATIONTYPE": "Validation Type",
    "app.common.ACTIONNAME": "Action Name",
    "app.common.WORKFLOWCODE": "Workflow Code",
    "app.common.APPLICABLEROLE": "Applicable Role",
    "app.common.WORKFLOWASSIGNEDTRAY": 'Workflow Assigned Tray',
    "app.common.WORKFLOWACTIONRESULT": "Workflow Action Result",
    "app.common.WORKFLOWESCALATABLEROLES": "Workflow Escalatable Roles",
    "app.common.WORKFLOWPREVIOUSACTIONCODE": "Workflow Previous Action Code",
    "app.common.ACTIONTYPE": "Action Type",

    // Report Headers
    "app.common.REPORTID": "Report ID",
    "app.common.REPORTNAME": "Report Name",
    "app.common.REPORTSUBGROUP": "Report Sub Group",
    "app.common.REPORTSUBGROUPORDER": "Report Sub Group Order",

    //Account Master Headers
    "app.common.ACCOUNTNO": "Account No.",
    "app.common.CUSTOMERID": "Customer ID",
    "app.common.PRODUCTCODE": "Product Code",
    "app.common.ACCOUNTTYPE": "Account Type",
    "app.common.BANKCODE": "Bank Code",
    "app.common.BRANCHCODE": "Branch Code",
    "app.common.ACCOUNTOPENEDDATE": "Account Opened Date",
    "app.common.MODEOFOPERATION": "Mode Of Operation",
    "app.common.ODLIMIT": "OD Limit",
    "app.common.ACCOUNTCURRENCY": "Account Currency",
    "app.common.CURRENTBALANCE": "Current Balance",
    "app.common.ACCOUNTSTATUS": "Account Status",
    "app.common.RISKRATING": "Risk Rating",
    "app.common.CUSTOMERNAME": "Customer Name",
    "app.common.RESIDENTIALSTATUS": "Residential Status",

    // Scenario Management Headers
    "app.common.ALERTID": "Alert Id",
    "app.common.ALERTNAME": "Alert Name",
    "app.common.ALERTFREQUENCY": "Alert Frequency",
    "app.common.SOURCESYSTEM": "Source System",
    "app.common.ALERTSUBGROUP": "Alert Sub Group",
    "app.common.ALERTSUBGROUPORDER": "Alert Sub Group Order",

    // Caseworkflow Headers
    "app.common.CASENO": "Case No.",
    "app.common.CURRENT_CASESTATUS": "Current Case Status",
    "app.common.ALERTCODE": "Alert Code",
    "app.common.CASEDATE": "Case Date",
    "app.common.CASERATING": "Case Rating",
    "app.common.LASTUPDATEDUSERCODE": "Last Updated User Code",
    "app.common.LASTUPDATEDTIMESTAMP": "Last Updated Timestamp",
    "app.common.HASANYOLDCASES": "Has Any Old Cases",
    "app.common.MERGEDCASE_FLAG": "Merged Case Flag",
    "app.common.PRIMARY_USERCODE": "Primary User Code",
    "app.common.ACTIONEDDATE": "Actioned Date",
    "app.common.SUBACTION": "Sub Action",
    "app.common.ASSIGNEDUSERCODE": "Assigned User Code",
    "app.common.ASSIGNEDUSERROLE": "Assigned User Role",
    "app.common.ASSIGNEDUSERTIMESTAMP": "Assigned User Timestamp",
    "app.common.COMMENTS": "Comments",
    "app.common.USERACTIONTYPE": "User Action Type",
    "app.common.STARTDATE": "Start Date",
    "app.common.DUEDATE": "Due Date",
    "app.common.ISMANUALCASE": "Is Manual Case",
    "app.common.MERGEDBY_USERCOMMENTS": "Merged By User Comments",
    "app.common.MERGEDBY_USERSUBACTION": "Merged By User Sub Action",
    "app.common.AGEINGFOR": "Ageing For",
    "app.common.ISREVIEWRECOMMENDED": "Is Review Recommended",
    "app.common.PREVIOUS_ASSIGNEDTIMESTAMP": "Previous Assigned Timestamp",
    "app.common.PREVIOUS_USERCODE": "Previous User Code",
    "app.common.CURRENT_ASSIGNEDTIMESTAMP": "Current Assigned Timestamp",
    "app.common.CURRENT_USERCODE": "Current User Code",
    "app.common.ADDEDTOFALSEPOSITIVE": "Added To False Positive",
    "app.common.REASSIGNEDUSERCODE": "Reassigned User Code",
    "app.common.REASSIGNEDUSERTIMESTAMP": "Reassigned User Timestamp",
    "app.common.REPORTEDREFERENCENO": "Reported Reference No.",
    "app.common.REPORTEDREFERENCEDATE": "Reported Reference Date",
    "app.common.REPORTEDREFERENCECASENO": "Reported Reference Case No.",
    "app.common.DPD": "DPD",
    "app.common.PROFILEACCOUNTNO": "Profile Account No.",
    "app.common.ACCT_OPENEDDATE": "Account Open Date",
    "app.common.TRANSACTIONSTARTDATE": "Transaction Start Date",
    "app.common.TRANSACTIONLASTDATE": "Transaction Last Date"
}

export default headerConfig