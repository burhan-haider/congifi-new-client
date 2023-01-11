import httpService from "../httpservice/httpService";
import commonService from "../common/commonService";
class scenariosService {
  fetchAlertSerialIdDetails = async (viewType, alertId, alertSerialNo) => {
    if ((viewType || alertId || alertSerialNo) !== null) {
      const result = await new Promise((resolve, reject) => {
        httpService
          .post(
            `/scenarios/alertBenchMarkDetails/${viewType}/${alertId}/${alertSerialNo}`
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

  addOrRemoveAlertBenchMarkParameters = (actionType, data) => {
    actionType = commonService.makeCamelCaseString(actionType);
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/scenarios/alertBenchMarkParameters/${actionType}`,
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

  generateOrSimulateAlertWithBenchMarks = (actionType, data) => {
    actionType = commonService.makeCamelCaseString(actionType);
    return new Promise((resolve, reject) => {
      httpService
        .post(
          `/scenarios/alertWithBenchMarks/${actionType}`,
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
}

const instance = new scenariosService();
export default instance;
