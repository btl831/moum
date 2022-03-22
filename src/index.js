import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './root/serviceWorkerRegistration';
import reportWebVitals from './root/reportWebVitals';

import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();
