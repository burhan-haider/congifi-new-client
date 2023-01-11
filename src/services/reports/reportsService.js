import httpService from "../httpservice/httpService";
import commonService from "../common/commonService";
class reportsService {
  fetchReportSerialIdDetails = async (
    group,
    viewType,
    reportId,
    reportSerialNo
  ) => {
    if ((group || viewType || reportId || reportSerialNo) !== null) {
      const result = await new Promise((resolve, reject) => {
        httpService
          .post(
            `/api/reports/reportBenchMarkDetails/${group}/${viewType}/${reportId}/${reportSerialNo}`
          )
          .then(response => {
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

  addOrRemoveReportBenchMarkParameters = (actionType, data) => {
    actionType = commonService.makeCamelCaseString(actionType);
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/api/reports/reportBenchMarkParameters/${actionType}`,
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
            //console.log(response.data);
            resolve(response.data);
          } else {
            //console.log(response.err);
            reject(response.data.err);
          }
        });
    });
  };

  //VIVEK - 24.07.2020 - consult me before changing this code
  generateReportWithBenchMarks = data => {
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/api/reports/reportWithBenchMarks/generate`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: data, responseType: "blob" }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
            // console.log(response.headers);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              // IE variant
              window.navigator.msSaveOrOpenBlob(
                new Blob([response.data], {
                  type:
                    //"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    "application/octet-stream"
                }),
                //response.headers["content-disposition"].split("filename=")[1]
                "test.xlsx"
              );
            } else {
              const url = window.URL.createObjectURL(
                new Blob([response.data], {
                  type:
                    //"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    "application/octet-stream"
                })
              );
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute(
                "download",
                //response.headers["content-disposition"].split("filename=")[1]
                //"test.xlsx" or "test.csv"
                "test.xlsx"
              );
              document.body.appendChild(link);
              link.click();
            }
          } else {
            reject(response.data.err);
          }
        });
    });
  };

  resetReportColumnsDetails = async reportId => {
    if (reportId !== null) {
      const result = await new Promise((resolve, reject) => {
        httpService
          .get(`/api/reports/resetReportColumnsDetails/${reportId}`)
          .then(response => {
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

  resetReportColumns = async (reportId, data) => {
    if (reportId !== null) {
      const result = await new Promise((resolve, reject) => {
        httpService
          .post(
            `/api/reports/resetReportColumns/${reportId}`,
            // VIVEK - sent the below data as request body
            data,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "cognifi_token"
                )}`
              }
            }
            // VIVEK - if wanna send as FormData, use below param object
            //{ params: data }
          )
          .then(response => {
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
}

const instance = new reportsService();
export default instance;
