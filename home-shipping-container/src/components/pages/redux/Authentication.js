import {AUTH_REQ,AUTH_SUCCESS,AUTH_FAILURE} from './AuthenticationTypes';

export const authentication =()=>{
    return{
        type: AUTH_REQ
    }
}

export const authenticationSuccess = (content) => {
    localStorage.setItem("USER_KEY", content);
    return{
        type:AUTH_SUCCESS,
        payload:content
    }
}
export const authenticationFailure = (error) => {
    return{
        type: AUTH_FAILURE,
        payload: error
    }
}