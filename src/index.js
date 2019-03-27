import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './index.css';
// import App from './App_new';
import * as serviceWorker from './serviceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show_new';
import PrivateRoute from './PrivateRoute';

ReactDOM.render(
      <App/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) {
  module.hot.accept(); 
}
