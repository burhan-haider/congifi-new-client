import React, { useState, useEffect } from "react";
import Login from "components/login/Login";
import { useSelector, useDispatch } from "react-redux";
import authservice from "services/auth/authService";
import {
  setUserData,
  setGuestUserRole
} from "redux/auth/user/user.actions";

function Authentication(props) {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector(data => data.auth);

  useEffect(() => {
    if (loading && !auth) {
      // login check

      let access_token = authservice.getAccessToken();
      authservice.setSession(access_token);
      //console.log("token", access_token);
      authservice
        .signInWithToken()
        .then(data => {
          //console.log("user Data", data);
          dispatch(setUserData(data));
          setAuth(true);
          setLoading(false);
        })
        .catch(err => {
          setAuth(false);
          setLoading(false);

          authservice.setSession(false);
        });
    }
    else{
      props.history.push("/");
    }
  }, [auth, dispatch, loading]);

  return (
    <React.Fragment>
      {loading ? (
        <div>loading</div>
      ) : auth ? (
        <>
          <React.Fragment>{props.children}</React.Fragment>
        </>
      ) : (
        <>
          <Login loadingHandler={setLoading} />
        </>
      )}
    </React.Fragment>
  );
}

export default Authentication;
