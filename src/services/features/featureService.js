import httpService from "../httpservice/httpService";

class featureService {
  fetchFeaturesmodulesList = async featureCode => {
    // console.log(featureCode);
    return await new Promise((resolve, reject) => {
      httpService.get(`/api/features/${featureCode}`).then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
    });
  };

  fetchModuleData = async url => {
    return await new Promise((resolve, reject) => {
      httpService.get(url).then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
    });
  };

  fetchAllModules = async () => {
    return new Promise((resolve, reject) => {
      httpService.get(`/api/features/modules/all`).then(response => {
        console.table(response);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
    });
  };

  getFeaturesHierarchy = async featurecode => {
    //console.log(featurecode);
    return new Promise((resolve, reject) => {
      httpService
        .get(`/api/features/getFeaturesHierarchy/${featurecode}`)
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

  createFeature = async featureData => {
    return new Promise((resolve, reject) => {
      httpService.post(`/api/features/create`, featureData).then(response => {
        if (response.status === 200) {
          //console.log(response.data);
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
    });
  };

  updateFeature = async featureData => {
    return new Promise((resolve, reject) => {
      httpService.post(`/api/features/update`, featureData).then(response => {
        if (response.status === 200) {
          //console.log(response.data);
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
    });
  };
}

const instance = new featureService();

export default instance;
