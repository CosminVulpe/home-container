import React from 'react';
import axios from 'axios';

const getToken =()=> {
    return localStorage.getItem("USER_KEY");
}

export const registerUser = (authRequest) => {
    return axios({
        'method':'POST',
        'url': `${process.env.REACT_APP_BACKEND_AUTH_REGISTER}`,
        'data': authRequest
    });
}