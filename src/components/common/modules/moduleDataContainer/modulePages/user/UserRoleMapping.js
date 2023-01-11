import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import { 
  Accordion, 
  AccordionActions, 
  AccordionDetails, 
  AccordionSummary,
  Typography 
} from '@mui/material'
import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md'
import RoleOperationService from "services/role/RoleOperationService";
// import AlertDescription from "../../../../common/AlertDescription";
import { GenericButton } from "@application";
import { SelectFormsy } from "components/common/formsyComponents";
import Formsy from "formsy-react";
import { useClasses } from "@application";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
});

function UserRoleMapping(props) {
  // console.log(props);
  let userAndRole = props.indexPageData.USERANDROLE || {};

  let pendingUsers = props.indexPageData.PENDINGUSER || {};
  
  let roleObjectList = props.indexPageData.ROLEFEATUREMAP.ROLELIST || {};

  let approvedUserPendingRole = props.indexPageData.APPROVEDUSERPENDINGROLE || {};

  let roleFeatureMap = props.indexPageData.ROLEFEATUREMAP.ROLEFEATUREMAPPING || {};

  let userCodeList = [];

  Object.keys(userAndRole).map((key,index)=>{
    if(userCodeList.filter(e=>e===key).length===0){
      userCodeList.push(key);
    }
  })
  
  Object.keys(pendingUsers).map((user, index)=>{
    if(userCodeList.filter(e=>e===user).length===0){
      userCodeList.push(user)
    }
  })

  Object.keys(approvedUserPendingRole).map((user, index)=>{
    if(userCodeList.filter(e=>e===user).length===0){
      userCodeList.push(user)
    }
  })

  const classes = useClasses(styles);
  const [userCode, setUserCode] = useState();
  const [roleIds, setroleIds] = useState([]);
  const [roleCodeList, setRoleCodeList] = useState([]);
  const [activateField, setActivateField] = useState(false);
  const [currentRoles, setCurrentRoles] = useState([]);
  const [pendingRoles, setPendingRoles] = useState([]);
  const [newRoles, setNewRoles] = useState([]);
  const [removed, setRemoved] = useState([]);
  // const [successMessage, setSuccessMessage] = useState();

  const userCodeOnChange = event => {
    setActivateField(true);
    setNewRoles([]);
    setPendingRoles([]);
    setCurrentRoles([]);
    setRemoved([]);
    let currentSelectedUserCode = event.target.value;
    setUserCode(currentSelectedUserCode);

    let currentSelectedUserRoleList = pendingUsers[currentSelectedUserCode]?Object.values(
      pendingUsers[currentSelectedUserCode]
    ): approvedUserPendingRole[currentSelectedUserCode] ? Object.values(
      approvedUserPendingRole[currentSelectedUserCode]
    ): Object.values(userAndRole[currentSelectedUserCode]);

    setroleIds(currentSelectedUserRoleList); 

    if( userAndRole[currentSelectedUserCode] ) {
      if( approvedUserPendingRole[currentSelectedUserCode] ) {
        setPendingRoles(currentSelectedUserRoleList);
        setCurrentRoles(Object.values(userAndRole[currentSelectedUserCode]));
        let currentRoleList = Object.values(userAndRole[currentSelectedUserCode]);
        let removedRoles = [];
        currentRoleList.map((role, index)=>{
          if(currentSelectedUserRoleList.filter(e=>e===role).length === 0){
            removedRoles.push(role);
          }
        })
        console.log("Removed Roles",removedRoles);
        setRemoved(removedRoles);
      }
      else {
        setCurrentRoles(currentSelectedUserRoleList);
      }
    } 
    else {
      setPendingRoles(currentSelectedUserRoleList)
    }
  }
    

  const handleChangeMultiple = event => {

    let selectedList = event.target.value;
    let allRoles = roleObjectList;
    let currentSelectedRoleCodeList = [];
    let newRolesList = [];
    let newPendingRolesList = [];

    if(selectedList.length > 0){
      selectedList.map(roleId => {
        allRoles.map(role => {
          if(role.roleName == roleId){
            if(currentSelectedRoleCodeList.filter(e=>e===role.roleName).length === 0){
              currentSelectedRoleCodeList.push(role.roleId);
            }
          }
          return null;
        })
        return null;
      })
    }

    selectedList.map((item, index)=>{
      if(pendingRoles.filter(e=>e===item).length === 0){
        newRolesList.push(item);
      }
    })

    newPendingRolesList = pendingRoles.filter(x=>
      selectedList.filter(e=>e===x).length === 1
    );

    // console.log("current Code List:-", currentSelectedRoleCodeList);
    // console.log("allRoles:-",allRoles)
    // console.log("Event:-",selectedList)
    setRoleCodeList(currentSelectedRoleCodeList);
    setroleIds(selectedList);
    setNewRoles(newRolesList);
    setPendingRoles(newPendingRolesList);
  };

  const assignRoleToUser = () => {
    RoleOperationService.assignRoleToUser(userCode, roleCodeList)
      .then(data => {
        //setSuccessMessage("ROles has assigned to user =" + userCode);
        alert("Role has assigned to user");
        console.log("Props (User Role Mapping):-", props);
        props.refreshCurrentModule();
      })
      .catch(err => {});
  };

  return (
    <div className="p-3 pb-20" >
      <Formsy>
        <div style={{ marginTop: "1%" }}>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item md={3}>
              <FormControl className={classes.formControl} fullWidth={true}>
                {/* <InputLabel htmlFor="age-native-simple">
                  Select User Code
                </InputLabel> */}
                <SelectFormsy
                  variant="outlined"
                  name="userCode"
                  native
                  label="Select User Code"
                  value={userCode ? userCode : ""}
                  onChange={userCodeOnChange}
                  inputProps={{
                    name: "userCode",
                    id: "userCode"
                  }}
                >
                  <option aria-label="None" disabled />
                  {userCodeList.map((user, index) => {
                    return (
                      <option key={user} value={user}>
                        {user}
                      </option>
                    );
                  })}
                </SelectFormsy>
              </FormControl>
            </Grid>
            <Grid item md={5}>
              <FormControl className={classes.formControl} fullWidth={true}>
                {/* <InputLabel id="userRoleLabel">User Roles</InputLabel> */}
                <SelectFormsy
                  labelId="role-mutiple-chip-label"
                  label="Select Role"
                  id="userRole"
                  name="userRole"
                  variant="outlined"
                  disabled={!activateField}
                  multiple
                  value={roleIds}
                  onChange={handleChangeMultiple}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip 
                          key={value} 
                          label={value} 
                          className={classes.chip} 
                          />
                      ))}
                    </div>
                  )}
                >
                  {roleObjectList.map(role => (
                    <MenuItem key={role.roleName} value={role.roleName}>
                      {role.roleName}
                    </MenuItem>
                  ))}
                </SelectFormsy>
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <GenericButton
                variant="contained"
                color="primary"
                onClick={assignRoleToUser}
              >
                Assign Role
              </GenericButton>
            </Grid>
          </Grid>
          {/* {successMessage ? <AlertDescription message={AlertDescription} /> : null} */}
        </div>
      </Formsy>
      <div>
        <Grid container >
          <Grid item sm={6}>
              <div>
                <h3 className="text-left ml-3 underline font-gSans">Assigned Roles</h3>
                {currentRoles&&currentRoles.map((item, index)=>(
                  <Accordion className="ml-3 mr-5" >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="bg-green-200 flex flex-row justify-between items-center"
                    >
                      <Typography className="font-gSans font-bold mr-3" >{item}</Typography>
                      <Chip label="Approved" size="small" className="bg-green-300" />
                    </AccordionSummary>
                    <AccordionDetails className="text-left" >
                      <Typography className="font-gSans font-bold" >
                        List of Features for {item}:
                      </Typography>
                      {roleFeatureMap&&roleFeatureMap.map((obj, objIndex)=>{
                          if(obj.ROLE&&obj.ROLE.roleName == item){
                            return (
                              <ul key={objIndex} >
                                  {obj.FEATURELIST && obj.FEATURELIST.length>0 ? obj.FEATURELIST.map((feature, featureIndex)=>(
                                    <li key={featureIndex} >{feature.featureName}</li>
                                  )) : <li>No Features</li>}
                              </ul>
                            )
                          }
                        })}
                    </AccordionDetails>
                  </Accordion>
                ))}
                
                
              </div>
          </Grid>
          <Grid item sm={6} >
              <div>
                <h3 className="text-left ml-3 underline font-gSans">New Roles</h3>
                {pendingRoles&&pendingRoles.map((item, index)=>(
                  <Accordion key={index} className="ml-3 mr-5" >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="bg-yellow-200 flex flex-row justify-start items-center"
                    >
                      <Typography className="font-gSans font-bold mr-3" >{item}</Typography>
                      {currentRoles.filter(e=>e===item).length > 0?(
                        <Chip label="Already Assigned" size="small" className="bg-green-300" />
                      ):(
                        <Chip label="Pending Approval" size="small" className="bg-yellow-300" />
                      )}
                    </AccordionSummary>
                    <AccordionDetails className="text-left">
                      <Typography className="font-gSans font-bold" >
                        List of Features for {item}:
                      </Typography>
                      {roleFeatureMap&&roleFeatureMap.map((obj, objIndex)=>{
                          if(obj.ROLE&&obj.ROLE.roleName == item){
                            return (
                              <ul key={objIndex} >
                                  {obj.FEATURELIST && obj.FEATURELIST.length>0 ? obj.FEATURELIST.map((feature, featureIndex)=>(
                                    <li key={featureIndex} >{feature.featureName}</li>
                                  )) : <li>No Features</li>}
                              </ul>
                            )
                          }
                        })}
                    </AccordionDetails>
                  </Accordion>
                ))}
                {removed&&removed.map((item, index)=>(
                  <Accordion key={index} className="ml-3 mr-5" >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="bg-yellow-200 flex flex-row justify-start items-center"
                    >
                      <Typography className="font-gSans font-bold mr-3" >{item}</Typography>
                      
                      <Chip label="Pending Removal" size="small" className="bg-red-200" />
                      
                    </AccordionSummary>
                    <AccordionDetails className="text-left">
                      <Typography className="font-gSans font-bold" >
                        List of Features for {item}:
                      </Typography>
                      {roleFeatureMap&&roleFeatureMap.map((obj, objIndex)=>{
                          if(obj.ROLE&&obj.ROLE.roleName == item){
                            return (
                              <ul key={objIndex} >
                                  {obj.FEATURELIST && obj.FEATURELIST.length>0 ? obj.FEATURELIST.map((feature, featureIndex)=>(
                                    <li key={featureIndex} >{feature.featureName}</li>
                                  )) : <li>No Features</li>}
                              </ul>
                            )
                          }
                        })}
                    </AccordionDetails>
                  </Accordion>
                ))}
                {newRoles&&newRoles.map((item, index)=>(
                  <Accordion key={index} className="ml-3 mr-5" >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="bg-yellow-200 flex flex-row justify-start items-center"
                    >
                      <Typography className="font-gSans font-bold mr-3" >{item}</Typography>
                      <Chip label="Unassigned" size="small" className="bg-gray-300" />

                    </AccordionSummary>
                    <AccordionDetails className="text-left">
                      <Typography className="font-gSans font-bold" >
                        List of Features for {item}:
                      </Typography>
                      {roleFeatureMap&&roleFeatureMap.map((obj, objIndex)=>{
                        if(obj.ROLE&&obj.ROLE.roleName == item){
                          return (
                            <ul key={objIndex} >
                                {obj.FEATURELIST && obj.FEATURELIST.length>0 ? obj.FEATURELIST.map((feature, featureIndex)=>(
                                  <li key={featureIndex} >{feature.featureName}</li>
                                )) : <li>No Features</li>}
                            </ul>
                          )
                        }
                      })}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UserRoleMapping;
