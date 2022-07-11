import GlobalStyles from "../../global-style/GlobalStyles";
import NavBar from "../../navBar/NavBar";
import {useAtom} from "jotai";
import {Button} from "../container/content-container/ContentContainer";
import React, {useRef, useState} from "react";
import Footer from "../../footer/Footer";
import {
    CONTAINER_DETAILS_CHECKOUT,
    RESERVATION_DETAILS_CHECKOUT,
    RESERVATION_ID,
    USER_INFO
} from "../../jotai-atom/useAtom";
import {FormControl, FormHelperText, FormLabel, Heading, Input} from "@chakra-ui/react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import {errorNotification, successfulNotification} from "../../service/toastify-notifications/ToastifyNotifications";
import {ToastContainer} from "react-toastify";
import {sendEmail, submitFormEmail} from "../send-email-service/EmailService";
import {useNavigate} from "react-router-dom";
import {ApiGetReservation, ApiPostReservation} from "../../service/api-requests/ApiService";
import StripeCheckout from "react-stripe-checkout";

function Checkout() {
    window.scroll(0, 0);
    const [containerDetailsCheckout, setContainerDetailsCheckout] = useAtom(CONTAINER_DETAILS_CHECKOUT);
    const [reservationDetailsCheckout, setReservationDetailsCheckout] = useAtom(RESERVATION_DETAILS_CHECKOUT);
    const [reservationInfoCustomer, setReservationInfoCustomer] = useState({
        reservationName: "",
        reservationEmail: ""
    })

    const [reservationID, setReservationID] = useAtom(RESERVATION_ID);
    const [userInfo, setUserInfo] = useAtom(USER_INFO);
    const isError = (reservationInfoCustomer.reservationEmail === "");
    const form = useRef();
    const navigate = useNavigate();

    function onChangeEvent(e) {
        e.persist();
        setReservationInfoCustomer(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    async function sendInfoBackend() {
        if (userInfo !== null) {
            reservationDetailsCheckout["reservationCustomerName"] = userInfo.firstName + " " + userInfo.lastName;
            reservationDetailsCheckout["reservationCustomerEmail"] = userInfo.emailAddress;
            reservationDetailsCheckout["applicationUser"] = {
                "username": userInfo.username
            };
        } else {
            reservationDetailsCheckout["reservationCustomerName"] = reservationInfoCustomer.reservationName;
            reservationDetailsCheckout["reservationCustomerEmail"] = reservationInfoCustomer.reservationEmail;
        }
        await ApiPostReservation(reservationDetailsCheckout, containerDetailsCheckout.id.toString());

        await ApiGetReservation(containerDetailsCheckout.id)
            .then(data => setReservationID(data.data))
            .catch(error => console.log(error));
        // submitFormEmail();
        setTimeout(() => {
            navigate("/");
        }, 5000);
    }


    async function handleToken(token) {
        await axios.post(process.env.REACT_APP_BACKEND_STRIPE_API
            , ""
            , {
                headers: {
                    token: token.id,
                    amount: reservationDetailsCheckout.totalPrice
                },
            }).then(() => {
            successfulNotification("💸 Payment successful!");
            sendInfoBackend();
        }).catch(err => errorNotification("🔴 Payment failed!"));
    }

    return (
        <>
            <GlobalStyles/>
            <NavBar/>
            <ToastContainer/>
            <section style={{
                width: "100%",
                padding: "7rem 0rem",
                height: "100%"
            }} className="container">
                <Heading as='h3' size='lg'> Checkout page</Heading>
                <Heading as='h3' size='md' className="mt-5">Your Reservation</Heading>

                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column mb-3">
                        <div className="p-4">
                            <Heading as='h5' size='sm'>Date</Heading>
                            <p>
                                {
                                    reservationDetailsCheckout.startDate.getDate()
                                    + "/"
                                    + (reservationDetailsCheckout.startDate.getMonth() + 1)
                                    + "/"
                                    + reservationDetailsCheckout.startDate.getFullYear()
                                    + " - "
                                    + reservationDetailsCheckout.finishDate.getDate()
                                    + "/"
                                    + (reservationDetailsCheckout.finishDate.getMonth() + 1)
                                    + "/"
                                    + reservationDetailsCheckout.finishDate.getFullYear()
                                }
                            </p>
                        </div>
                        <div className="p-4">
                            <Heading as='h5' size='sm'>Guests</Heading>
                            <p>
                                Number of kids: {reservationDetailsCheckout.numberKids}
                            </p>
                            <p>
                                Number of adults: {reservationDetailsCheckout.numberAdults}
                            </p>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="d-flex flex-column mb-3">
                            <div className="p-2">
                                <Heading as='h5' size='sm'> Important Info</Heading>
                            </div>

                            <div className="p-2">
                                {userInfo !== null ?
                                    <FormControl isRequired>
                                        <div style={{marginBottom: "10px"}}>
                                            <FormLabel htmlFor='name'>Full name</FormLabel>
                                            <Input id='name'
                                                   name="name"
                                                   placeholder={userInfo.firstName + " " + userInfo.lastName}
                                                   style={{marginBottom: "10px"}}
                                                   isDisabled={true}
                                            />
                                        </div>

                                        <FormLabel htmlFor="user_email">Email</FormLabel>
                                        <Input
                                            id='user_email'
                                            type='user_email'
                                            name='email'
                                            placeholder={userInfo.emailAddress}
                                            isDisabled={true}
                                        />
                                    </FormControl>
                                    :
                                    <FormControl isRequired>
                                        <div style={{marginBottom: "10px"}}>
                                            <FormLabel htmlFor='name'>Full name</FormLabel>
                                            <Input id='name'
                                                   placeholder='name'
                                                   name="reservationName"
                                                   onChange={onChangeEvent}
                                                   style={{marginBottom: "10px"}}/>
                                        </div>

                                        <FormLabel htmlFor="user_email">Email</FormLabel>
                                        <Input
                                            id='user_email'
                                            type='user_email'
                                            name='reservationEmail'
                                            value={reservationInfoCustomer.reservationEmail}
                                            onChange={onChangeEvent}
                                        />
                                        {!isError ? (
                                            <FormHelperText style={{marginBottom: "10px"}}>Enter your email to receive
                                                reservation details</FormHelperText>
                                        ) : (
                                            <FormHelperText style={{marginBottom: "10px"}}>Email is
                                                required</FormHelperText>
                                        )}
                                    </FormControl>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column mb-3">
                        <div className="card" style={{
                            width: "18rem",
                            boxShadow: "10px 10px 10px 10px",
                        }}>
                            <img src={reservationDetailsCheckout.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <Heading as='h4' size='sm'
                                         className="card-title text-center">{containerDetailsCheckout.name}</Heading>
                                {reservationDetailsCheckout.numberKids !== 0 &&
                                    <p className="d-flex justify-content-center" style={{padding: "10px"}}>
                                        {
                                            "Kids Number: " + reservationDetailsCheckout.numberKids
                                            + " x "
                                            + containerDetailsCheckout.pricePerKid
                                            + " lei "
                                        }
                                    </p>
                                }
                                <p className="d-flex justify-content-center" style={{padding: "10px"}}>
                                    {"Per night " + containerDetailsCheckout.pricePerNight
                                        + " x "
                                        + reservationDetailsCheckout.totalNumberOfDays
                                        + " days "}
                                </p>
                                <p className="d-flex justify-content-center" style={{padding: "10px"}}>Total
                                    Price {reservationDetailsCheckout.totalPrice} Lei</p>
                                <div className="d-flex justify-content-center">
                                    <ToastContainer/>
                                    {/*<StripeCheckout*/}
                                    {/*    name="Payment"*/}
                                    {/*    description="Enter Details"*/}
                                    {/*    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}*/}
                                    {/*    token={handleToken}*/}
                                    {/*    amount={reservationDetailsCheckout.totalPrice * 100}*/}
                                    {/*    currency="RON"*/}
                                    {/*>*/}
                                    {/*    <Button to="#">Payment</Button>*/}
                                    {/*</StripeCheckout>*/}
                                    <Button to="#" onClick={sendInfoBackend}>Payment</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
            <div style={{display: "none"}}>
                <form ref={form} onSubmit={(e) => sendEmail(e, form, "template_ft6dwo5")}>
                    <label>Name</label>
                    {userInfo !== null ?
                        <>
                            <input type="text" name="name" value={userInfo.firstName + " " + userInfo.lastName}/>
                            <label>Email</label>
                            <input type="email" name="user_email" value={userInfo.emailAddress}/>
                        </>
                        :
                        <>
                            <input type="text" name="name" value={reservationInfoCustomer.reservationName}/>
                            <label>Email</label>
                            <input type="email" name="user_email" value={reservationInfoCustomer.reservationEmail}/>
                        </>
                    }
                    <label>Message</label>
                    <textarea name="message" value={reservationID}/>
                    <input type="submit" value="Send" id="submit_email"/>
                </form>
            </div>
        </>
    );
}

export default Checkout;
