import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { getDesiredLabels } from "redux/actions/auth/user.action";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "components/login/Login";

function Authorization(props) {
  const dispatch = useDispatch();
  const [isValid, setValid] = useState(true);
  const [label, setLabel] = useState();

  const langData = useSelector(data => data.auth.user.data);
  const roleId = useSelector(state => state.auth.user.roleId);
  const lang = langData ? langData.language : null;
  const direction = langData ? langData.labelDirection : null;

  return (
    <React.Fragment>
      {isValid ? (
        roleId != null ? (
          <React.Fragment>{props.children}</React.Fragment>
        ) : (
          <Route path="/login" render={() => <Login />} />
        )
      ) : (
        <div>
          Not Authorized
          {/* // <React.Fragment>{props.children}</React.Fragment> */}
        </div>
      )}
    </React.Fragment>
  );
}

export default Authorization;
