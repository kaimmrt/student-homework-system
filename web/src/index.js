import React from 'react';
import ReactDOM from 'react-dom';
import NextApp from './NextApp';
import 'antd/dist/antd.css';
import './App.css'

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
ReactDOM.render(
    <NextApp />,
    document.getElementById('root')
);
