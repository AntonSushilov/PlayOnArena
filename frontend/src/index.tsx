import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { applyMiddleware, ActionCreator, Action } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./services/reducers";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import reportWebVitals from "./reportWebVitals";

import "./index.css";
// import "antd/dist/antd.css"

import App from "./components/App/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const middlewareEnhacer = applyMiddleware(thunk);
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type AppThunk<TReturn = void> = ActionCreator<
//   ThunkAction<TReturn, Action, RootState>
// >;


root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </HashRouter>{" "}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
