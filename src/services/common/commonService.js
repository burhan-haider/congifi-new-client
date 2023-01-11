import httpService from "services/httpservice/httpService";
//import user from "../../components/auth/reducer/userReducer";
import {store} from "redux/store";
class commonService {
    fetchTimeout = async () => {
      return await new Promise((resolve, reject) => {
        httpService.get(`/api/common/systemTimeout`).then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
      });
    };
    fetchAllLanguages = async () => {
      return await new Promise((resolve, reject) => {
        httpService.get(`/api/labels/languages`).then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
      });
    };
    fetchUserFeatures = async () => {
      return await new Promise((resolve, reject) => {
        httpService.get(`/api/features/role`).then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
      });
    };
    getLabel = (labelProperty, defaultValue) => {
      const state = store.getState();
      const allLabels = state.auth.user.labels.allLabels;
      //console.log("labels", allLabels);
      return allLabels[labelProperty] && allLabels[labelProperty] !== null
        ? allLabels[labelProperty]
        : defaultValue;
    };
    makeCamelCaseString = (text) => {
      //  VIVEK - make the string camel case for id and class
      text = text.split(" ").join("");
      text = text.charAt(0).toLowerCase() + text.slice(1);
      return text;
    };
    makeUpperCaseString = (text) => {
      //  VIVEK - make the string camel case for id and class
      text = text.split(" ").join("");
      text = text.toUpperCase();
      return text;
    };
    makeFirstLetterUpperCase = (text) => {
      //  VIVEK - make the string upper case for displaying
      text = text.charAt(0).toUpperCase() + text.slice(1);
      return text;
    };
    fetchMasterSearchData = (data) => {
      return new Promise((resolve, reject) => {
        httpService
          .post(
            `/api/common/searchGenericMaster`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "cognifi_token"
                )}`,
              },
            },
            { params: data }
          )
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data);
            } else {
              reject(response.data.err);
            }
          });
      });
    };
    fetchIndexPageData = async (url) => {
      return await new Promise((resolve, reject) => {
       
        httpService
          .get(url)
          .then((response) => {
            if (response.status === 200) {
              // console.log("fetchIndexPageData :"+response.data);
              resolve(response.data);
            } else {
              reject(response.data.err);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    };
    fetchModuleDetails = async (detailsModule, moduleValue) => {
      if ((detailsModule || moduleValue) !== null) {
        const result = await new Promise((resolve, reject) => {
          httpService
            .get(`/api/common/moduleDetails/${detailsModule}/${moduleValue}`)
            .then((response) => {
              if (response.status === 200) {
                resolve(response.data);
              } else {
                reject(response.data.err);
              }
            });
        });
        //console.log("VIVEK - result data = ", result);
        return result;
      }
    };
    fetchAccountProfilingDetails = async (detailsModule, moduleValue) => {
      if ((detailsModule || moduleValue) !== null) {
        const result = await new Promise((resolve, reject) => {
          httpService
            .post(
              `/api/common/accountProfiling/moduleDetails`,
              {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(
                    "cognifi_token"
                  )}`,
                },
              },
              { params: { moduleValue: moduleValue } }
            )
            .then((response) => {
              if (response.status === 200) {
                resolve(response.data);
              } else {
                reject(response.data.err);
              }
            });
        });
        return result;
      }
    };
    fetchPinnedModuleData = async () => {
      const result = await new Promise((resolve, reject) => {
        httpService
          .get(`/api/common/pinnedModuleDetails/fetch`)
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data);
            } else {
              reject(response.data.err);
            }
          });
      });
      return result;
    };
    pinModuleData = (moduleData) => {
      if (moduleData !== null) {
        const result = new Promise((resolve, reject) => {
          httpService
            .post(
              `/api/common/pinnedModuleDetails/add`,
              {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(
                    "cognifi_token"
                  )}`,
                },
              },
              { params: moduleData }
            )
            .then((response) => {
              if (response.status === 200) {
                resolve(response.data);
              } else {
                reject(response.data.err);
              }
            });
        });
        return result;
      }
    };
    removePinnedModuleData = (pinnedModuledata) => {
      const result = new Promise((resolve, reject) => {
        httpService
          .post(`/api/common/pinnedModuleDetails/remove/${pinnedModuledata}`, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data);
            } else {
              reject(response.data.err);
            }
          });
      });
      return result;
    };
    createLabels = (labelData) => {
      const labelDataFormat = [labelData];
      return new Promise((resolve, reject) => {
        httpService
          .post("/api/labels/create", labelDataFormat)
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data);
            } else {
              reject(response.data.err);
            }
          });
      });
    };
    updateLabels = (updateData) => {
      const dataFormat = [updateData];
      return new Promise((resolve, reject) => {
        httpService
          .post("/api/common/labels/update", dataFormat)
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data);
            } else {
              reject(response.data.err);
            }
          });
      });
    };
}

const instance = new commonService();
export default instance;
