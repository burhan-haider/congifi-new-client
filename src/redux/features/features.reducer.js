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
    FETCH_ROLE_BASED_MODULES
} from 'redux/features/features.types';
import _ from "lodash";
import { RESET_STATE_AFTER_LOGOUT } from 'redux/auth/user/user.types';

const initialState = {
    userFeatures: [],
    featureCode: null,
    features: [],
    openFeatures: [],
    pinnedModules: [],
    success: true,
    refreshModule: true,
    isLoading: true,
    userModules: [],
}

const features = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_FEATURES_SUCCESS:
            return {
                ...state,
                userFeatures: action.payload,
                isLoading: false,
            };

        case FETCH_USER_FEATURES_ERROR:
            return {
                ...state,
                success: false,
            };

        case FETCH_ROLE_BASED_MODULES:
            return {
                ...state,
                userModules: action.payload,
            };

        case SET_SELECTED_FEATURE:
            return {
                ...state,
                featureCode: action.payload,
            }

        case FETCH_FEATURE_MODULES_SUCCESS: {
            const { data, featureCode } = action.payload;

            const moduleData = data.map(item => ({
                ...item,
                parentModuleId: null,
                parentModule_Id: null,
            }))

            var stateData = state.features;

            const featureName = state.userFeatures.filter(item => item.featureCode === featureCode)[0].featureName;


            if (state.features.filter(item => item.featureCode === featureCode).length > 0) {
                stateData = state.features.map(item => {

                    if (item.featureCode === featureCode) {

                        let allModules = [...moduleData, ...item.modules];

                        item.modules = _.unionBy(allModules, "uniqueNo");
                        item.modules = _.uniqBy(allModules, "uniqueNo");

                        item.showRoot = true;
                        item.showModule = featureCode;

                    }
                    return item;

                });
            }
            else {
                stateData = [
                    ...state.features,
                    {
                        featureCode: featureCode,
                        modules: [...moduleData],
                        breadCrumbs: [{
                            id: featureCode,
                            code: featureCode,
                            label: featureName,
                            level: 0,
                        }],
                        openTabs: [],
                        showRoot: true,
                        showModule: featureCode,
                    }
                ]
            }
            return { ...state, features: stateData };
        }

        case FETCH_FEATURE_MODULES_ERROR: {
            return {
                ...state,
                success: false,
            }
        }

        case FETCH_MODULE_DATA_SUCCESS: {
            const { data, moduleCode, uniqueNo, featureCode } = action.payload;
            const moduleData = data.map(d => ({
                ...d,
                parentModuleId: uniqueNo,
                parentModule_Id: moduleCode
            }));
            const showData = state.features.map(f => {
                if (f.featureCode === featureCode) {
                    f.showModule = uniqueNo;
                    f.showRoot = false;

                    f.modules.map(z =>
                        z.uniqueNo === uniqueNo ? (z.selected = true) : z.selected
                    );

                    var mergeObj = f.modules.map(
                        obj => moduleData.find(o => o.uniqueNo === obj.uniqueNo) || obj
                    );

                    let finalObjList = [...mergeObj, ...moduleData];
                    f.modules = _.unionWith(finalObjList, _.isEqual);

                    f.modules = _.uniqBy(finalObjList, "uniqueNo");
                }

                return f;
            });

            return { ...state, features: showData };
        }
        case FETCH_MODULE_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case SET_SELECTED_MODULE:
            return {
                ...state,
                features: state.features.map(item => {
                    if (item.featureCode === action.payload.featureCode) {
                        return {
                            ...item,
                            showModule: action.payload.uniqueNo,
                            showRoot: false,
                        }

                    }
                    return item;
                })
            }
        case ADD_TO_BREADCRUMBS:
            return {
                ...state,
                features: state.features.map(item => {
                    if (item.featureCode === action.payload.featureCode) {
                        return {
                            ...item,
                            breadCrumbs: [...item.breadCrumbs, action.payload.module]
                        }
                    }
                    return item;
                })
            }
        case REMOVE_FROM_BREADCRUMBS:
            return {
                ...state,
                features: state.features.map(item => {
                    if (item.featureCode === action.payload.featureCode) {
                        return {
                            ...item,
                            breadCrumbs: item.breadCrumbs.filter(item => item.id !== action.payload.module.id)
                        }
                    }
                    return item;
                })
            }
        case ADD_TO_OPENTABS:
            return {
                ...state,
                features: state.features.map(item => {
                    if (item.featureCode === action.payload.featureCode) {
                        return {
                            ...item,
                            openTabs: [...item.openTabs, action.payload.module]
                        }
                    }
                    return item;
                })
            }
        case REMOVE_FROM_OPENTABS:
            return {
                ...state,
                features: state.features.map(item => {
                    if (item.featureCode === action.payload.featureCode) {
                        return {
                            ...item,
                            openTabs: item.openTabs.filter(item => item !== action.payload.module)
                        }
                    }
                    return item;
                })
            }
        case PUT_MAP_CLICK_DATA_IN_FEATURES: {
            const showData = state.features.map(f => {
                if (f.featureCode === state.featureCode) {
                    f.showModule = action.payload.uniqueNo;
                    f.showRoot = false;
                    let newModules = [];
                    action.payload.module.map(item => {
                        if (f.modules.filter(e => e.uniqueNo === item.uniqueNo).length == 0) {
                            newModules.push({
                                ...item,
                                parentModuleId: action.payload.parentModuleId,
                                parentModule_Id: action.payload.parentModule_Id,
                            });
                        }
                    });
                    f.modules = [...f.modules, ...newModules];
                }
                return f;
            });

            return { ...state, features: showData };
        }
        case ADD_TO_PINNED_MODULES: {
            return {
                ...state,
                pinnedModules: [...state.pinnedModules, action.payload]
            }
        }
        case REMOVE_FROM_PINNED_MODULES: {
            return {
                ...state,
                pinnedModules: state.pinnedModules.filter(item => item !== action.payload)
            }
        }
        case OPEN_PINNED_MODULE: {
            return {
                ...state,
                featureCode: action.payload.featureCode,
                features: state.features.map(item => {
                    if (item.featureCode === action.payload.featureCode) {
                        return action.payload.module
                    }
                    return item;
                })
            }
        }

        case REMOVE_REFRESH_MODULE: {
            return {
                ...state,
                refreshModule: null
            };
        }
        case RESET_STATE_AFTER_LOGOUT: {
            return {
                userFeatures: [],
                featureCode: null,
                features: [],
                openFeatures: [],
                pinnedModules: [],
                success: true,
                refreshModule: true,
                isLoading: true,
            };
        }
        default:
            return state;
    }



}

export default features;