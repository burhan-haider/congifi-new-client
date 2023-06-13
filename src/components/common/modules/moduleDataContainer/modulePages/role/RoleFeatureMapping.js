import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";

import { Grid, Chip, Typography, Box, Divider } from "@mui/material/";
// import Chip from "@mui/material/Chip";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import RoleOperationService from "services/role/RoleOperationService";
import { SelectFormsy } from "components/common/formsyComponents";
import { GenericButton, useClasses, styles } from "@application";
import Formsy from "formsy-react";

// const styles = theme => ({
//   formControl: {
//     margin: 1,
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: 2
//   },
//   chips: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   chip: {
//     margin: '1px',
//   },
//   Muigrid: {}
// });

function RoleFeatureMapping(props) {
  let featureList = props.indexPageData.FEATURELIST;
  let roleList = props.indexPageData.ROLELIST;
  let roleFeatureMappingList = props.indexPageData.ROLEFEATUREMAPPING;
  const feature = props.feature

  const classes = useClasses(styles);
  const [selectedFeatureList, setSelectedFeatureList] = useState([]);
  const [featureCodeList, setFeatureCodeList] = useState([]);
  const [roleId, setroleId] = useState();
  const [activateField, setActivateField] = useState(false);
  // const [successMessage, setSuccessMessage] = useState();

  const roleOnChange = event => {
    setActivateField(true);
    let currentSelectedroleId = event.target.value;
    setroleId(currentSelectedroleId);
    // userAndRole[currentSelectedUserCode];
    let roleAssignedFeatureList = roleFeatureMappingList.filter(function (
      roleFeaturemapping
    ) {
      return roleFeaturemapping.ROLE.roleId === currentSelectedroleId;
    });
    console.log("Feature List:-", roleAssignedFeatureList)
    let currentSelectedFeatureCodeList = [];
    let currentSelectedFeatureList = [];

    roleAssignedFeatureList[0].FEATURELIST.map(feature => {
      currentSelectedFeatureCodeList.push(feature.featureName);
      currentSelectedFeatureList.push(feature.featureMapping_Id);
      return null;
    });

    setSelectedFeatureList(currentSelectedFeatureCodeList);
    setFeatureCodeList(currentSelectedFeatureList);
  };

  const handleChangeMultiple = event => {

    let selectedList = event.target.value;
    let allFeatures = featureList;
    let currentSelectedFeatureCodeList = [];

    if (selectedList.length > 0) {
      selectedList.map(value => {
        allFeatures.map(feature => {
          if (feature.featureName === value) {
            if (currentSelectedFeatureCodeList.filter(e => e === feature.featureName).length === 0) {
              currentSelectedFeatureCodeList.push(feature.featureCode);
            }
            console.log("Selected Feature Code List:-", currentSelectedFeatureCodeList);
          }
          return null;
        })
        return null;
      })
    }
    // console.log('event:-', event.target.value)
    setSelectedFeatureList(selectedList);
    setFeatureCodeList(currentSelectedFeatureCodeList);
  };

  const assignFeatureToRole = () => {
    RoleOperationService.roleFeatureMaping(roleId, featureCodeList)
      .then(data => {
        //setSuccessMessage("ROles has assigned to user =" + userCode);
        alert("Feature has assigned to role");
        props.refreshCurrentModule();
      })
      .catch(err => { });
  };

  return (
    <div className={`${classes.root}`}>
      <Box className="moduleName">{feature.breadCrumbs[feature.breadCrumbs.length - 1].label}</Box>
      <Divider className="mb-[10px] border-[#C1C9D3]"></Divider>
      <Formsy>
        <Grid
          className='main_input_container'
          container justify="center"
          alignItems="center" spacing={3}>
          <Grid
            item
            className='inputContainer'
            md={2}
          >
            <Typography>Select Role</Typography>
            <FormControl
              className={classes.formControl}
              fullWidth
            >
              <SelectFormsy
                name="Role"
                // label="Select Role"
                variant="outlined"
                // style={{ paddingLeft: "10px" }}
                native
                value={roleId ? roleId : ""}
                onChange={roleOnChange}
                inputProps={{
                  name: "roleId",
                  id: "roleId"
                }}
              >
                {/* <option aria-label="None" disabled value="" />
              {roleList.map((role, index) => {
                return (
                  <option key={role["roleId"]} value={role["roleId"]}>
                    {role["roleName"]}
                  </option>
                );
              })} */}
              </SelectFormsy>
            </FormControl>
          </Grid>
          <Grid
            className='inputContainer' item md={7} >
            <Typography>Feature</Typography>
            <FormControl
              className={classes.formControl}
              fullWidth
            >
              <SelectFormsy
                labelId="role-mutiple-chip-label"
                // label="Feature"
                id="userRole"
                name="Features"
                variant="outlined"
                disabled={!activateField}
                multiple
                value={selectedFeatureList}
                onChange={handleChangeMultiple}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map((value, index) => (
                      <Chip
                        key={index}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {/* {featureList.map(feature => (
                <MenuItem
                  key={feature.featureName}
                  value={feature.featureName}
                >
                  {feature.featureName}
                </MenuItem>
              ))} */}
              </SelectFormsy>
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <GenericButton
              variant="contained"
              color="primary"
              onClick={assignFeatureToRole}
            >
              Assign Feature
            </GenericButton>
          </Grid>
        </Grid>
        {/* {successMessage ? <AlertDescription message={AlertDescription} /> : null} */}
      </Formsy>
    </div>
  );
}

export default RoleFeatureMapping;
