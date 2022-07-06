import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const RedirectPage = (page) => {
    return useNavigate(page);
}

export const getToken = () => {
    return localStorage.getItem("USER_KEY");
}

export const logOut = () => {
    localStorage.clear();
    RedirectPage("/");
}

export const userLogin = (authRequest, endPointUrl) => {
    return axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_AUTH_FETCH_USER_DATA}` + endPointUrl,
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
