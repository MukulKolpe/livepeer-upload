import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createReactClient,
  studioProvider,
  LivepeerConfig,
} from "@livepeer/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = createReactClient({
  provider: studioProvider({
    apiKey: process.env.REACT_APP_LIVEPEER_API_KEY,
  }),
  config: LivepeerConfig.studio,
});

root.render(
  <LivepeerConfig client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LivepeerConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
