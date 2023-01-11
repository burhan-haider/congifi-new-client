import httpService from "../httpservice/httpService";
class RoleOperationService {
  createNewRole = async (url, roleData) => {
    return await new Promise((resolve, reject) => {
      httpService
        .post(url, null, {
          params: {
            roleName: roleData.roleName
          }
        })
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        })
        .catch(err => {
          reject(reject.err);
        });
    });
  };

  assignRoleToUser = async (userCode, roleIds) => {
    return await new Promise((resolve, reject) => {
      httpService
        .post("/user/assignRole/" + userCode, roleIds)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch(err => {
          reject(reject.err);
        });
    });
  };

  roleFeatureMaping = async (roleId, featureCodes) => {
    return await new Promise((resolve, reject) => {
      httpService
        .post("/api/role/feature/" + roleId, featureCodes)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch(err => {
          reject(reject.err);
        });
    });
  };
}
const instance = new RoleOperationService();

export default instance;
