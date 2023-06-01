import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Layout from "./components/layout/Layout";
// import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
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

const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router history={history}>
        <Authentication history={history}>
          <Authorization history={history}>
            <ThemeProvider theme={theme}>
              <StyledEngineProvider injectFirst>
                {/* <MUIThemeProvider theme={theme}> */}
                  <Layout>
                    <App />
                  </Layout>
                {/* </MUIThemeProvider> */}
              </StyledEngineProvider>
            </ThemeProvider>
          </Authorization>
        </Authentication>
      </Router>
      {/* </PersistGate> */}
    </Provider>
);

reportWebVitals();
