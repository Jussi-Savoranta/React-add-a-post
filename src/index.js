import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// this is a way to create global default url and headers for whole app
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// this is the MOST global place to put a error handling for whole app
axios.interceptors.request.use(request => {
    console.log(request);
    // edit request config
    return request;
}, error => {
    // this would be normally handled with catch and send to a log or something
    console.log(error);
    return Promise.reject(error);
});

// now we handle the response error globally and in Blog.js locally
axios.interceptors.response.use(response => {
    console.log(response);
    // edit response config
    return response;
}, error => {
    // this also would be handled with catch and send to a log or something
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
