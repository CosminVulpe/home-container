import GlobalStyles from "../../global-style/GlobalStyles";
import NavBar from "../../navBar/NavBar";
import {useAtom} from "jotai";
import {Button} from "../container/content-container/ContentContainer";
import React, {useEffect, useState} from "react";
import Footer from "../../footer/Footer";
import {CONTAINER_DETAILS_CHECKOUT, RESERVATION_DETAILS_CHECKOUT, RESERVATION_ID} from "../../jotai-atom/useAtom";
import {FormControl, FormHelperText, FormLabel, Heading, Input} from "@chakra-ui/react";
// import emailjs from '@emailjs/browser';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from "react-stripe-checkout";
import {fetchUserData} from "../api/AuthenticationService";


function Checkout() {
    window.scroll(0, 0);
    const [containerDetailsCheckout, setContainerDetailsCheckout] = useAtom(CONTAINER_DETAILS_CHECKOUT);
    const [reservationDetailsCheckout, setReservationDetailsCheckout] = useAtom(RESERVATION_DETAILS_CHECKOUT);
    const [reservationName, setReservationName] = useState("");
    const [reservationEmail, setReservationEmail] = useState("");
    const [reservationID, setReservationID] = useAtom(RESERVATION_ID);
    const [userInfo, setUserInfo] = useState({});
    const isError = (reservationEmail === "");


    useEffect(() => {
        fetchUserData()
            .then((response) => {
                if (response.status === 200) {
                    setUserInfo(response.data)
                }
            })
            .catch((error) => {
                if ( error.response && error.response.status === 500 ) {
                    setUserInfo(null);
                }
            });
    }, []);


    async function sendInfoBackend() {
        if(userInfo !== null){
            reservationDetailsCheckout["reservationCustomerName"] = userInfo.firstName + " " + userInfo.lastName;
            reservationDetailsCheckout["reservationCustomerEmail"] = userInfo.emailAddress;
        }else{
            reservationDetailsCheckout["reservationCustomerName"] = reservationName;
            reservationDetailsCheckout["reservationCustomerEmail"] = reservationEmail;
        }

        await axios.post(process.env.REACT_APP_BACKEND_API_RESERVATION + containerDetailsCheckout.id,
            JSON.stringify(reservationDetailsCheckout),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });

        await axios.get(process.env.REACT_APP_BACKEND_API_RESERVATION + containerDetailsCheckout.id)
            .then(data => setReservationID(data.data))
            .catch(error => console.log(error));
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
            toast.success('💸 Payment successful!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            sendInfoBackend();

        }).catch(err => {
            toast.error('🔴 Payment failed!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }


    // function sendEmail(e) {
    //     e.preventDefault();
    //     console.log("send email");
    //
    //     emailjs.sendForm("service_8ad3g9q"
    //         , "template_kbbhldg"
    //         , e.target
    //         , "BmkZHoPM4owIfU5Zy")
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(error => console.log(error));
    // }
    //


    return (
        <>
            <GlobalStyles/>
            <NavBar/>
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
                                { userInfo !== null ?
                                    <FormControl isRequired>
                                        <div style={{marginBottom: "10px"}}>
                                            <FormLabel htmlFor='name'>Full name</FormLabel>
                                            <Input id='name'
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
                                            <Input id='name' placeholder='name'
                                                   onChange={(e) => setReservationName(e.target.value)}
                                                   style={{marginBottom: "10px"}}/>
                                        </div>

                                        <FormLabel htmlFor="user_email">Email</FormLabel>
                                        <Input
                                            id='user_email'
                                            type='user_email'
                                            name='email'
                                            value={reservationEmail}
                                            onChange={(e) => setReservationEmail(e.target.value)}
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
                                <p className="d-flex justify-content-center" style={{padding: "10px"}}>
                                    {"Kids Number: " + reservationDetailsCheckout.numberKids
                                        + " x "
                                        + containerDetailsCheckout.pricePerKid
                                        + " lei "}
                                </p>
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
                                    <StripeCheckout
                                        name="Payment"
                                        description="Enter Details"
                                        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                                        token={handleToken}
                                        amount={reservationDetailsCheckout.totalPrice * 100}
                                        currency="RON"
                                    >
                                        <Button to="#">Payment</Button>
                                    </StripeCheckout>
                                    {/*<Button to="#" onClick={sendInfoBackend}>Payment</Button>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Checkout;