import { MasterComponent } from "./modulePages";
import { RoleComponent, RoleFeatureMapping } from "./modulePages";

import { UserList, TempUserList, UserRoleMapping } from "./modulePages";
// import { SingleRowEntity } from "./modulePages";
//import { UserRoleAssign } from "./modulePages";

import { ActionMasterComponent } from "./modulePages";
 import { CaseWorkflowComponent } from "./modulePages";

import Error_404 from "components/common/errorPages/Error_404";
import { FeaturesComponent } from "./modulePages";
import { LabelsComponent } from "./modulePages";
import { ReportAndScenariosComponent } from "./modulePages";
import { RealtimeScanningComponent } from "./modulePages";
import { RiskDashboardComponent } from './modulePages';
import { Customer360Component } from './modulePages';
import { UserActionsComponent } from './modulePages';
import { ELAComponent } from './modulePages'
import { store } from 'redux/store'

/*
    Structure of this object like 
    presentationCategory:Component (In which data will render of module)
*/

const reduxState = store.getState();
console.log("reduxState :", reduxState);

const moduleComponentConfig = {
  master: MasterComponent,
  roleComponent: RoleComponent,
  roleFeatureMapping: RoleFeatureMapping,
  userOperations: UserList,
  // singleRowEntity: SingleRowEntity,
  userRoleMapping: UserRoleMapping,
  userAction: UserActionsComponent,
  Error_404: Error_404,
  actionManagement: ActionMasterComponent,
  caseworkflow: CaseWorkflowComponent,
  allFeatures: FeaturesComponent,
  allLabels: LabelsComponent,
  allScenarios: ReportAndScenariosComponent,
  allReports: ReportAndScenariosComponent,
  rtScanning: RealtimeScanningComponent,
  accountProfiling: MasterComponent,
  // accountProfiling: ELAComponent,
  riskDashboard: RiskDashboardComponent,
  customer360: Customer360Component,
  entityLinkAnalysis: ELAComponent,
};

export default moduleComponentConfig;
