import _ from "lodash";

export const generateRoutesFromConfigs = (configs, defaultAuth) => {
  let allRoutes = [];
  configs.forEach((config) => {
    allRoutes = [...allRoutes, ...setRoutes(config, defaultAuth)];
  });
  return allRoutes;
};

export function setRoutes(config, defaultAuth) {
  let routes = [...config.routes];

  /*
    if (config.settings || config.auth) {
      routes = routes.map((route) => {
        return {
          ...route,
          settings: { ...config.settings, ...route.settings },
        };
      });
    }
    */
  routes = routes.map((route) => {
    let auth =
      config.auth || config.auth === null ? config.auth : defaultAuth || null;
    auth = route.auth || route.auth === null ? route.auth : auth;
    const settings = _.merge({}, config.settings, route.settings);

    return {
      ...route,
      settings,
      auth,
    };
  });

  return [...routes];
}
