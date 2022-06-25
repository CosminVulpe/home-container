import emailjs from "@emailjs/browser";
import {errorNotification, successfulNotification} from "../../toastify-notifications/ToastifyNotifications";

export const handleClickEventEmail = () =>{
    document.querySelector("#submit_email").click();
}

export const sendEmail = (e, form, templateId)=>{
    e.preventDefault();
    emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID
        , templateId
        , form.current
        , process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
        .then((result) =>{
            console.log(result);
            successfulNotification("Email send successful");
        })
        .catch((error) => errorNotification("Email failed"));
}


