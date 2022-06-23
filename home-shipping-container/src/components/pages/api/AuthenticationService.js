import React from 'react';
import axios from 'axios';

export const getToken =()=> {
    return localStorage.getItem("USER_KEY");
}

export const logOut =()=> {
   localStorage.clear();
    window.location.reload();
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

export const fetchUserData = () => {
    return axios({
        method : 'GET',
        url:`${process.env.REACT_APP_BACKEND_AUTH_FETCH_USER_DATA}`,
        headers:{
            'Authorization': 'Bearer '+ getToken()
        }
    })
}