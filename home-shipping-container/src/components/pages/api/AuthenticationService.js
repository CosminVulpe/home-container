import React from 'react';
import axios from 'axios';

export const getToken =()=> {
    return localStorage.getItem("USER_KEY");
}

export const logOut =()=> {
   localStorage.clear();
}

const refreshPage = ()=>{

}

export const registerUser = (authRequest) => {
    return axios({
        method:'POST',
        url: `${process.env.REACT_APP_BACKEND_AUTH_REGISTER}`,
        data: authRequest
    });
}

export const userLogin = (authRequest) => {
    return axios({
        method:'POST',
        url: `${process.env.REACT_APP_BACKEND_AUTH_LOGIN}`,
        data: authRequest
    });
}

export const fetchUserData = (authRequest) => {
    return axios({
        method : 'GET',
        url:`${process.env.REACT_APP_BACKEND_AUTH_REGISTER}`
    })
}