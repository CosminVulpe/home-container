import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Redirect = (page) => {
    return useNavigate(page);
}

export const getToken = () => {
    return localStorage.getItem("USER_KEY");
}

export const logOut = () => {
    localStorage.clear();
    // window.location.reload();
    Redirect("/");
}


export const registerUser = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_AUTH_REGISTER}`,
        data: authRequest
    });
}

export const userLogin = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_AUTH_LOGIN}`,
        data: authRequest
    });
}

export const fetchUserData = (url) => {
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BACKEND_AUTH_FETCH_USER_DATA}` + url,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}