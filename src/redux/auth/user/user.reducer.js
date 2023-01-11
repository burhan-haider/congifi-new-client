import * as Actions from "./user.types";

const initialState = {
  roleId: "",
  roleName: "",

  data: {
    displayName: "",
    email: "",
    mobileNo: "",
    designation: "",
    language: "",
    labelDirection: "",
    roles: []
  },
  labels: {
    allLabels: []
  }
};

const user = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      //console.log(action.payload);
      return {
        ...state,
        roleId: action.payload.roleId,
        roleName: action.payload.roleName,
        data: {
          displayName: action.payload.firstName + " " + action.payload.lastName,
          email: action.payload.emailId,
          mobileNo: action.payload.mobileNo,
          designation: action.payload.designation,
          language: action.payload.language,
          labelDirection: action.payload.labelDirection,
          roles: action.payload.roles
        }
      };
    }

    case Actions.SET_GUEST_USER_DATA: {
      return {
        ...state,
        roleId: null,
        roleName: null,
        data: {
          displayName: "",
          email: "",
          mobileNo: "",
          designation: "",
          language: "",
          labelDirection: "",
          roles: []
        }
      };
    }

    case Actions.USER_LOGGED_OUT: {
      return {
        ...state,
        roleId: null,
        roleName: null,
        data: {
          displayName: "",
          email: "",
          mobileNo: "",
          designation: "",
          language: "",
          labelDirection: "",
          roles: []
        }
      };
    }

    case Actions.FETCH_ALL_LABELS: {
      return {
        ...state,
        labels: {
          allLabels: action.payload
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default user;
