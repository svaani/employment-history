import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EHRouter from './utils/router';
import * as serviceWorker from './serviceWorker';

import * as reduxMock from './redux-mock/init-redux-mock';

ReactDOM.render(<EHRouter />, document.getElementById('employment-history'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
