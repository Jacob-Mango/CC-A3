import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:5000/";
//axios.defaults.baseURL = "http://cc-a3-dev-1.ap-southeast-2.elasticbeanstalk.com/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
