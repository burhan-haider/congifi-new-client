import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Layout from "./components/layout/Layout";
// import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
// import { ThemeProvider as MUIThemeProvider } from "@mui/styles";
// import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Router } from "react-router-dom";
import history from "services/history";
import Authentication from "components/auth/Authentication";
import Authorization from "components/auth/Authorization";

const rootElement = document.getElementById('root')

const theme = createTheme({
  components: {
    MuiDialog: {
        defaultProps: {
            container: rootElement,
        },
    },
    MuiMenu: {
        defaultProps: {
            container: rootElement,
        },
    },
},
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router history={history}>
        <Authentication history={history}>
          <Authorization history={history}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                {/* <MUIThemeProvider theme={theme}> */}
                  <Layout>
                    <App />
                  </Layout>
                {/* </MUIThemeProvider> */}
              </ThemeProvider>
            </StyledEngineProvider>
          </Authorization>
        </Authentication>
      </Router>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
