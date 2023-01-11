import * as reduxModule from "redux";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// import { persistStore, persistReducer } from 'redux-persist';

// import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';

reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = "@@redux/INIT";
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));


// const persistConfig = {
//     key: 'root',
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(rootReducer, enhancer);
// export const persistor = persistStore(store);