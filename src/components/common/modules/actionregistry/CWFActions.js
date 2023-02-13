import httpService from "services/httpservice/httpService";

/* ----------- Taha's escalateCasesByBranchManager1 ----------- */
// export const escalateCasesByBranchManager1 = (action, data, caseNo, userActionType) =>{
//     return new Promise((resolve, reject)=>{
//         httpService
//         .post(
//           "/api/caseworkflow/saveCWFCaseAndCommentsDetails",
//           {
//             headers: {
//               Authorization: `Bearer ${window.localStorage.getItem(
//                 "cognifi_token"
//               )}`
//             }
//           },
//           { params: {
//             caseNo: caseNo,
//             ActionCode: action.actionCode,
//             comments: data.comments,
//             userActionType: userActionType||"defaultAction",
//             reassignToUserCode: 'LEVEL2',
//             caseStatus: '2',
//           } }
//         )
//         .then(response => {
//           if (response.status === 200) {
//             resolve(response.data);
//           } else {
//             reject(response.data.err);
//           }
//         });
//     })
// }

export const escalateCasesByBranchManager1 = (action, data, caseNo, userActionType) =>{
    return new Promise((resolve, reject)=>{
        const caseStatus = {
            Post: '1',
            PostAndClose: '2' 
        }
        const reassignTo={
            Post: 'BRANCHMANAGER1',
            PostAndClose: 'LEVEL2'
          }
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
            { params: {
              caseNo: caseNo,
              ActionCode: action.actionCode,
              comments: data.comments,
              userActionType: userActionType||"defaultAction",
              reassignToUserCode: reassignTo[userActionType],
              caseStatus: caseStatus[userActionType],
            } }
            )
            .then(response => {
              if (response.status === 200) {
                resolve(response.data);
              } else {
                reject(response.data.err);
              }
            });
        })
    }
export const approveCaseByLEVEL1 = (action, data, caseNo, userActionType) =>{
  return new Promise((resolve, reject)=>{
    const caseStatus = {
        Legal: '7',
        CRIB: '8',
        SKIP: '9'
    }
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
      { params: {
        caseNo: caseNo,
        ActionCode: action.actionCode,
        comments: data.comments,
        userActionType: userActionType||"defaultAction",
        caseStatus: '13',
        reassignToUserCode: 'LEVEL3'
      } }
      )
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
  })

}

export const referToBranchManager1ByLevel2 = (action, data, caseNo, userActionType) =>{
  return new Promise((resolve, reject)=>{
    const caseStatus = {
        Legal: '7',
        CRIB: '8',
        SKIP: '9'
    }
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
      { params: {
        caseNo: caseNo,
        ActionCode: action.actionCode,
        comments: data.comments,
        userActionType: userActionType||"defaultAction",
        caseStatus: caseStatus[data.referTo], 
        reassignToUserCode: data.reassignTo,
        observation: data.observation
      } }
      )
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
  })

}
export const rejectCaseByLEVEL1 = (action, data, caseNo, userActionType) =>{
    return new Promise((resolve, reject)=>{
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
          { params: {
            caseNo: caseNo,
            ActionCode: action.actionCode,
            comments: data.comments,
            userActionType: userActionType||"defaultAction",
            caseStatus: '14',
            reassignToUserCode: 'BRANCHMANAGER1'
          } }
          )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    })
}

/* ----------- Prerna's approveCaseByLevel1 ----------- */

// export const approveCaseByLEVEL1 = (action, data, caseNo, userActionType) =>{
//     return new Promise((resolve, reject)=>{
//         httpService
//         .post(
//           "/api/caseworkflow/saveCWFCaseAndCommentsDetails",
//           {
//             headers: {
//               Authorization: `Bearer ${window.localStorage.getItem(
//                 "cognifi_token"
//               )}`
//             }
//           },
//           { params: {
//             caseNo: caseNo,
//             ActionCode: action.actionCode,
//             comments: data.comments,
//             userActionType: userActionType||"defaultAction",
//             caseStatus: '13',
//             reassignToUserCode: 'LEVEL3'
//           } }
//         )
//         .then(response => {
//           if (response.status === 200) {
//             resolve(response.data);
//           } else {
//             reject(response.data.err);
//           }
//         });
//     })
// }


export const getCWFCaseAndCommentsDetails = (action, caseNo, userActionType) =>{
    return new Promise((resolve, reject)=>{
        httpService
        .post(
          "/api/caseworkflow/getCWFCommentsDetails",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: {
            caseNo: caseNo,
            actionCode: action.actionCode
            
        } }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    })
}

export const uploadPromise = (action, data, caseNo, userActionType) =>{
  return new Promise((resolve, reject)=>{
      const caseStatus = {
          RSLVD: '28',
          STAB: '29',
          PARTP: '30', 
          
      }
      const actionType = {
        Post: 'LEVEL2',
        PostAndClose: 'BRANCHMANAGER1'
      }
      

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
        { params: {
          caseNo: caseNo,
          ActionCode: action.actionCode,
          comments: data.comments,
          userActionType: userActionType||"defaultAction",
          caseStatus: caseStatus[data.uploadPromise] || "27",
          reassignToUserCode:actionType[userActionType],
          fromDate: data.promiseFromDate,
          toDate: data.promiseToDate
        } }
      )
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
  })
}
