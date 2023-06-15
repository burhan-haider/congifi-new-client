import featureService from "services/features/featureService";
import commonService from "services/common/commonService";

import {
  FETCH_USER_FEATURES_SUCCESS,
  FETCH_USER_FEATURES_ERROR,
  SET_SELECTED_FEATURE,
  FETCH_FEATURE_MODULES_ERROR,
  FETCH_FEATURE_MODULES_SUCCESS,
  FETCH_MODULE_DATA_ERROR,
  FETCH_MODULE_DATA_SUCCESS,
  SET_SELECTED_MODULE,
  ADD_TO_BREADCRUMBS,
  REMOVE_FROM_BREADCRUMBS,
  ADD_TO_OPENTABS,
  REMOVE_FROM_OPENTABS,
  PUT_MAP_CLICK_DATA_IN_FEATURES,
  ADD_TO_PINNED_MODULES,
  REMOVE_FROM_PINNED_MODULES,
  OPEN_PINNED_MODULE,
  REMOVE_REFRESH_MODULE,
  FETCH_ROLE_BASED_MODULES,
} from './features.types'

export const fetchRoleBasedModules = () => {
  return dispatch => {
    featureService
      .fetchRoleBasedModules()
      .then(data => {
        return dispatch({
          type: FETCH_ROLE_BASED_MODULES,
          payload: data
        });
      })
      .catch(err => {
        console.error("Error Fetching Role Based Modules:-", err)
      })
  }

}

export const fetchUserFeature = user => {
  return dispatch => {
    commonService
      .fetchUserFeatures(user)
      .then(data => {
        return dispatch({
          type: FETCH_USER_FEATURES_SUCCESS,
          payload: data
        });
      })
      .catch(err => {
        return dispatch({
          type: FETCH_USER_FEATURES_ERROR
        });
      });
  };
};

export const setSelectedFeature = featureCode => {
  return dispatch => {
    return dispatch({
      type: SET_SELECTED_FEATURE,
      payload: featureCode
    });
  }
}

export const fetchFeatureModules = featureCode => {
  return dispatch => {
    featureService
      .fetchFeaturesmodulesList(featureCode)
      .then(data => {
        return dispatch({
          type: FETCH_FEATURE_MODULES_SUCCESS,
          payload: { data, featureCode }
        });
      })
      .catch(error => {
        return dispatch({
          type: FETCH_FEATURE_MODULES_ERROR,
          payload: error
        });
      });
  };
};

export const fetchModuleDetails = (url, moduleCode, uniqueNo, featureCode) => {
  return dispatch => {
    featureService
      .fetchModuleData(url)
      .then(data => {
        return dispatch({
          type: FETCH_MODULE_DATA_SUCCESS,
          payload: { data, moduleCode, uniqueNo, featureCode }
        });
      })
      .catch(err => {
        return dispatch({
          type: FETCH_MODULE_DATA_ERROR,
          payload: err
        });
      });
  };
};

export const setSelectedModule = (featureCode, uniqueNo) => {
  return dispatch => {
    return dispatch({
      type: SET_SELECTED_MODULE,
      payload: { featureCode, uniqueNo }
    });
  }
}

export const addToBreadcrumbs = (featureCode, module) => {
  return dispatch => {
    return dispatch({
      type: ADD_TO_BREADCRUMBS,
      payload: { featureCode, module }
    });
  }
}

export const removeFromBreadcrumbs = (featureCode, module) => {
  return dispatch => {
    return dispatch({
      type: REMOVE_FROM_BREADCRUMBS,
      payload: { featureCode, module }
    });
  }
}

export const addToOpenTabs = (featureCode, module) => {
  return dispatch => {
    return dispatch({
      type: ADD_TO_OPENTABS,
      payload: { featureCode, module }
    });
  }
}

export const removeFromOpenTabs = (featureCode, module) => {
  return dispatch => {
    return dispatch({
      type: REMOVE_FROM_OPENTABS,
      payload: { featureCode, module }
    });
  }
}

export const putMapClickedDataInFeatures = (module, parentModuleId, parentModule_Id, uniqueNo) => {
  return {
    type: PUT_MAP_CLICK_DATA_IN_FEATURES,
    payload: { module, parentModuleId, parentModule_Id, uniqueNo }
  };
};

export const addToPinnedModules = (module) => {
  return dispatch => {
    return dispatch({
      type: ADD_TO_PINNED_MODULES,
      payload: module
    });
  }
}

export const removeFromPinnedModules = (module) => {
  return dispatch => {
    return dispatch({
      type: REMOVE_FROM_PINNED_MODULES,
      payload: module
    });
  }
}

export const openPinnedModule = (featureCode, module) => {
  return dispatch => {
    return dispatch({
      type: OPEN_PINNED_MODULE,
      payload: { featureCode, module }
    });
  }
}

// export const selectSpecificModule = (root, code) => {
//   return dispatch => {
//     return dispatch({
//       type: SELECT_SPECIFIC_MODULE,
//       payload: { root, code }
//     });
//   };
// };

// export const showSelectedFeaturesModeules = data => {
//   return {
//     type: SHOW_SELECTED_FEATURE,
//     payload: data
//   };
// };

// export const setLastSelectedModule = data => {
//   return {
//     type: SET_LAST_MODULECODE_SUCCESS,
//     payload: { data }
//   };
// };

// export const removeModuleFromDeleted = code => {
//   return {
//     type: REMOVE_MODULE_FROM_DELETED,
//     payload: { code }
//   };
// };



// export const putTabBarFeatures = (
//   moduleTrail,
//   module_Id,
//   featureCode,
//   uniqueNo
// ) => {
//   return {
//     type: PUT_TABBAR_FEATURES,
//     payload: { moduleTrail, module_Id, featureCode, uniqueNo }
//   };
// };

// export const putBreadCrumsModules = moduleTrail => {
//   return {
//     type: PUT_BREADCRUMS_MODULES,
//     payload: moduleTrail
//   };
// };

// export const deleteTabFromTabBar = (tabCode, featureCode, tabId) => {
//   return dispatch => {
//     // dispatch(removeStateFromPersistedStates(module_Id));
//     return dispatch({
//       type: DELETE_TAB_FROM_TABBAR,
//       payload: { tabCode, featureCode, tabId }
//     });
//   };
// };


// export const selectModuleAsPinned = wholeResponse => {
//   return {
//     type: SELECT_MODULE_AS_PINNED,
//     payload: { wholeResponse }
//   };
// };
// export const removeModuleAsPinned = module => {
//   return {
//     type: REMOVE_MODULE_AS_PINNED,
//     payload: module
//   };
// };

// export const refreshModule = module_Id => {
//   return {
//     type: ONCLICK_REFRESH_MODULE,
//     payload: module_Id
//   };
// };

export const removerFromRefreshModule = () => {
  return {
    type: REMOVE_REFRESH_MODULE
  };
};

// //for mega jump of pinned module or hover modules
// export const showDirectFinalModule = (moduledata, featureCode) => {
//   return {
//     type: SHOW_DIRECT_FINAL_MODULE,
//     payload: { moduledata, featureCode }
//   };
// };

// export const clearPinnedModules = () => {
//   return {
//     type: CLEAR_PINNED_MODULES
//   };
// };
