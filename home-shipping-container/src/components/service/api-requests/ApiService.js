import axios from "axios";


export const ApiPostReservation = async (authRequest, endPointUrl) => {
    return await axios.post(process.env.REACT_APP_BACKEND_API_RESERVATION + endPointUrl,
        JSON.stringify(authRequest),
        {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });
}

export const ApiGetReservation = async (endPointUrl) => {
    return await axios.get(process.env.REACT_APP_BACKEND_API_RESERVATION + endPointUrl);
}

export const ApiGetContainer = async (endPointUrl) => {
    return await axios.get(process.env.REACT_APP_BACKEND_API_CONTAINER + endPointUrl);
}

export const ApiGetReview = async (endPointUrl) => {
    return await axios.get(process.env.REACT_APP_BACKEND_API_REVIEW + endPointUrl);
}
