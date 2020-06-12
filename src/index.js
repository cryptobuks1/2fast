import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

import 'mdbreact/dist/css/mdb.css';
import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
  <App />,
document.getElementById('root')
);

serviceWorker.unregister();