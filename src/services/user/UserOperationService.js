import httpService from "../httpservice/httpService";
class UserOperationService {
  createNewUser = (url, data) => {
    return new Promise((resolve, reject) => {
      httpService
        .post(url, data)
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

  verifyUser = data => {
    return new Promise((resolve, reject) => {
      httpService
        .post("/user/verify/", data)
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
const instance = new UserOperationService();
export default instance;
