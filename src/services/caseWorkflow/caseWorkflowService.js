import httpService from "../httpservice/httpService";

class caseWorkflowService {
  searchAction = paramData => {
    return new Promise((resolve, reject) => {
      httpService.post("/api/action/searchAction", paramData).then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
    });
  };

  createAction = paramData => {
    return new Promise((resolve, reject) => {
      httpService.post("/api/action/create", paramData).then(response => {
        if (response.status === 200) {
          resolve(response.data);
          //console.log(response.data);
        } else {
          reject(response.data.err);
        }
      });
    });
  };

  searchActionParams = paramData => {
    // console.log(paramData);
    return new Promise((resolve, reject) => {
      httpService
        .post("/api/action/searchActionParams", paramData)
        .then(response => {
          if (response.status === 200) {
            //console.log(response.data);
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  saveActionParams = paramData => {
    return new Promise((resolve, reject) => {
      httpService
        .post("/api/action/saveActionParams", paramData)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  getActionDetails = paramData => {
    //console.log(paramData);
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/api/action/getActionDetails`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: paramData }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
            //console.log(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  updateAction = paramData => {
    return new Promise((resolve, reject) => {
      httpService.post("/api/action/updateAction", paramData).then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
    });
  };

  getActionParamDetails = paramData => {
    //console.log(paramData);
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/api/action/getActionParamDetails`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: paramData }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
            //console.log(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  updateActionParams = paramData => {
    return new Promise((resolve, reject) => {
      httpService
        .post("/api/action/updateActionParams", paramData)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  fetchCWFCases = data => {
    return new Promise((resolve, reject) => {
      httpService
        .post(
          "/api/caseworkflow/searchCases",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: data }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  draftCaseAndComments = data => {
    //console.log(data);
    return new Promise((resolve, reject) => {
      httpService
        .post(
          "/api/caseworkflow/saveCWFCaseAndCommentsDetails",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: data }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  saveCaseAndComments = data => {
    return new Promise((resolve, reject) => {
      httpService
        .post(
          "/api/caseworkflow/saveCWFCaseAndCommentsDetails",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: data }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  // postCase = (data) => {
  //   return new Promise((resolve, reject) => {
  //     httpService
  //       .post("/caseworkflow/saveCWFCaseAndCommentsDetails", data)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           resolve(response.data);
  //         } else {
  //           reject(response.data.err);
  //         }
  //       });
  //   });
  // };

  // postAndCloseCase = (data) => {
  //   return new Promise((resolve, reject) => {
  //     httpService
  //       .post("/caseworkflow/saveCWFCaseAndCommentsDetails", data)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           resolve(response.data);
  //         } else {
  //           reject(response.data.err);
  //         }
  //       });
  //   });
  // };

  getCWFCommentsDetails = paramData => {
    //console.log(paramData);
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/api/caseworkflow/getCWFCommentsDetails`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: paramData }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
            //console.log(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  getCWFCaseAndCommentsDetails = paramData => {
    // console.log(paramData);
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/api/caseworkflow/getCWFCaseAndCommentsDetails`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: paramData }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
            //console.log(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };
}
const instance = new caseWorkflowService();
export default instance;
