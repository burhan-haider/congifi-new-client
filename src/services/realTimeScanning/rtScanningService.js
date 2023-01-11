import httpService from "../httpservice/httpService";
class rtScanningService {
  rtScanData = userData => {
    return new Promise((resolve, reject) => {
      httpService
        .post(
          "/api/scanning/dataEntryFormScanning",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          {
            params: userData
          }
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
  getListIdDetails = (Title, Module, listCode, listId, viewType) => {
    if (listId && listCode !== null) {
      const result = new Promise((resolve, reject) => {
        httpService
          .get(`/api/common/realTimeScanningListIdDetails/${listId}/${listCode}`, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          })
          .then(response => {
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
  updateRecord = (recordData, approveAction, filename, fileimport) => {
    if (recordData !== null) {
      const updated = new Promise((resolve, reject) => {
        httpService
          .get(
            `/api/scanning/AddRTComments`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "cognifi_token"
                )}`
              }
            },
            {
              params: recordData
            }
          )
          .then(response => {
            if (response.status === 200) {
              resolve(response.data);
            } else {
              reject(response.data.err);
            }
          });
      });
      return updated;
    }
  };

  updateCommentRecord = data => {
    return new Promise((resolve, reject) => {
      httpService
        .post(
          "/api/scanning/updateRTRecord",
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
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  printDetails = (action, fileName, userCode) => {
    const dataFormat = {};
    dataFormat["action"] = action;
    dataFormat["fileName"] = fileName;
    dataFormat["userCode"] = userCode;
    return new Promise((resolve, reject) => {
      httpService
        .post(
          "/api/scanning/printPage",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: dataFormat }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}
const objectReference = new rtScanningService();
export default objectReference;
