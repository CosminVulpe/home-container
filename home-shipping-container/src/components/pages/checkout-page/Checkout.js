import GlobalStyles from "../../global-style/GlobalStyles";
import NavBar from "../../navBar/NavBar";
import {useAtom} from "jotai";
import {Button} from "../container/content-container/ContentContainer";
import React, {useState} from "react";
import Footer from "../../footer/Footer";
import {CONTAINER_DETAILS_CHECKOUT, RESERVATION_DETAILS_CHECKOUT} from "../../jotai-atom/useAtom";
import {Heading} from "@chakra-ui/react";

function Checkout() {
    window.scroll(0, 0);
    const [containerDetailsCheckout, setContainerDetailsCheckout] = useAtom(CONTAINER_DETAILS_CHECKOUT);
    const [reservationDetailsCheckout, setReservationDetailsCheckout] = useAtom(RESERVATION_DETAILS_CHECKOUT);
    const [reservationName, setReservationName] = useState("");
    const [reservationEmail, setReservationEmail] = useState("");


    async function handleClickEvent() {
        reservationDetailsCheckout["reservationCustomerName"] = reservationName;
        reservationDetailsCheckout["reservationCustomerEmail"] = reservationEmail;

        const response = await fetch(process.env.REACT_APP_BACKEND_API_RESERVATION + containerDetailsCheckout.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(reservationDetailsCheckout)
        });
        const data = await response.json();
    }

    return (
        <>
            <GlobalStyles/>
            <NavBar/>
            <section style={{
                width: "100%",
                padding: "7rem 0rem",
                height: "100%"
            }} className="container">
                <Heading as='h3' size='lg' > Checkout page</Heading>
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
                                <div className="input-group flex-nowrap">
                                    <input type="text" className="form-control" placeholder="Reservation name"
                                           aria-label="Reservation name"
                                           aria-describedby="addon-wrapping"
                                           onInput={(e) => setReservationName(e.target.value)}
                                           required/>
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="input-group flex-nowrap">
                                    <input type="email" className="form-control" placeholder="Reservation email"
                                           aria-label="Reservation email"
                                           aria-describedby="addon-wrapping"
                                           onInput={(e) => setReservationEmail(e.target.value)}
                                           required/>
                                </div>
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
                                <Heading as='h4' size='sm'  className="card-title text-center">{containerDetailsCheckout.name}</Heading>
                                <p className="d-flex justify-content-center" style={{padding:"10px"}}>
                                    {"Per night " + containerDetailsCheckout.pricePerNight
                                        + " x "
                                        + reservationDetailsCheckout.totalNumberOfDays
                                        + " days "}
                                </p>
                                <p className="d-flex justify-content-center" style={{padding:"10px"}}>Total
                                    Price {reservationDetailsCheckout.totalPrice} Lei</p>
                                <div className="d-flex justify-content-center" onClick={handleClickEvent}>
                                    <Button to="/payment">Payment</Button>
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