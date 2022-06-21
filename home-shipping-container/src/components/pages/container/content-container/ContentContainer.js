import styled from "styled-components/macro";
import React, {useContext, useState} from "react";
import CalendarReservation from "../../../calendar/Calendar";
import {ContainerDetails} from "../../../userContext/UserContext";
import {Link, useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {
    CONTAINER_DETAILS_CHECKOUT,
    RESERVATION_DETAILS,
    RESERVATION_DETAILS_CHECKOUT,
    TOTAL_NUMBER_OF_DAY
} from "../../../jotai-atom/useAtom";
import {ImageCarouselData} from "../../../images/image-carousel-data/ImageCarouselData";
import {
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import './ContentContainerStyle.css';

export const Section = styled.section`
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export const Button = styled(Link)`
  width: 100%;
  text-decoration: none;
  height: 100%;
  border: none;
  color: black;
  display: flex !important;
  justify-content: center;
  text-align: center;
  background-color: #CE8952;
  border-radius: 4px;
  box-shadow: inset 0 0 0 0 #BACA70;
  transition: ease-in-out 0.5s;
  font-size: 1.2rem !important;
  font-family: 'monserrat', sans-serif !important;
  outline: none;

  &:hover {
    box-shadow: inset 300px 0 0 0 #BACA70;
    cursor: pointer;
    color: black;
  }
`;


function ContentContainer() {
    const details = useContext(ContainerDetails);

    const [numberOfAdults, setNumberOfAdults] = useState(() => 0);
    const [numberOfKids, setNumberOfKids] = useState(() => 0);
    const [totalNumberOfDays, setTotalNumberOfDays] = useAtom(TOTAL_NUMBER_OF_DAY);
    const [containerDetailsCheckout, setContainerDetailsCheckout] = useAtom(CONTAINER_DETAILS_CHECKOUT);
    const [reservationDetails, setReservationDetails] = useAtom(RESERVATION_DETAILS);
    const [reservationDetailsCheckout, setReservationDetailsCheckout] = useAtom(RESERVATION_DETAILS_CHECKOUT);
    const [totalPrice, setTotalPrice] = useState(() => 0);
    let {id} = useParams();

    function handleClickEvent() {
        setContainerDetailsCheckout(details);
        setReservationDetailsCheckout({
            ...reservationDetails,
            numberKids: parseInt(numberOfKids),
            numberAdults: parseInt(numberOfAdults),
            totalPrice: getTotalPrice(),
            totalNumberOfDays: totalNumberOfDays,
            image: ImageCarouselData[id - 1].image
        });

    }

    function getTotalPrice() {
        let price = document.querySelectorAll('.justify-content-center')[1].innerText;
        let totalPrice = "";
        for (let i = 0; i < price.length; i++) {
            if (!isNaN(price[i])) {
                totalPrice += price[i];
            }
        }
        return parseInt(totalPrice);
    }

    return (
        <>
            <Section>
                <div className="d-flex justify-content-between">
                    <div className="p-2 text-lg-start">
                        <Heading as='h3' size='md'
                                 className="d-flex flex-column title">Description</Heading>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown
                            printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic
                            typesetting,
                            remaining essentially unchanged.It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown
                            printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic
                            typesetting,
                            remaining essentially unchanged.It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <div className="p-2 text-lg-start">
                            <Heading as='h3' size='md' className="d-flex flex-column" style={{
                                marginBottom: "10px",
                                marginTop: "10px"
                            }}>Calendar</Heading>
                            <CalendarReservation/>
                        </div>
                    </div>
                    <div className="p-2 text-lg-start">
                        <div className="card" style={{
                            width: "18rem",
                            boxShadow: "10px 10px 10px 10px"
                        }}>
                            <img src={ImageCarouselData[id - 1].image} className="card-img-top"
                                 alt={"shipping-container-" + id.toString()}/>
                            <div className="card-body">
                                <Heading as='h4' size='sm' className="card-title text-center">{details.name}</Heading>
                                <div className="d-flex justify-content-between">
                                    <div className="p-2">
                                        <p>Number Adults</p>
                                        <NumberInput size='md' maxW={24} defaultValue={0} min={0} max={3}
                                                     onChange={(number) => setNumberOfAdults(parseInt(number))}>
                                            <NumberInputField/>
                                            <NumberInputStepper>
                                                <NumberIncrementStepper/>
                                                <NumberDecrementStepper/>
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </div>
                                    <div className="p-2" onClick={getTotalPrice}>
                                        <p>Number Kids</p>
                                        <NumberInput size='md' maxW={24} defaultValue={0} min={0} max={3}
                                                     onChange={(number) => setNumberOfKids(parseInt(number))}>
                                            <NumberInputField/>
                                            <NumberInputStepper>
                                                <NumberIncrementStepper/>
                                                <NumberDecrementStepper/>
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </div>
                                </div>
                                {
                                    (numberOfKids !== 0 &&
                                        <p className="d-flex justify-content-center" style={{padding: "5px"}}>
                                            Number Kids: {
                                            numberOfKids
                                            + " x "
                                            + details.pricePerKid
                                            + " / kid "
                                            + " = "
                                            + (numberOfKids * details.pricePerKid)
                                        }
                                        </p>)
                                }

                                <p className="d-flex justify-content-center" style={{padding: "15px"}}>
                                    Total Price : { (totalNumberOfDays
                                    * details.pricePerNight) + (numberOfKids * details.pricePerKid)} Lei
                                </p>
                                <div className="d-flex justify-content-center"
                                     onClick={handleClickEvent}>
                                    <Button to="/checkout">Book</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <Section>
                <Heading as='h3' size='md' className='title'>Safety Precautions </Heading>
                <p>Mattis lectus ultricies cubilia, conubia id facilisis, tempor purus vitae volutpat habitant
                    pretium lobortis. Commodo consectetur ipsum, taciti quisque mattis nisi. Eu vulputate phasellus
                    maecenas, donec senectus torquent, turpis urna sed dolor dapibus aptent velit tincidunt. Hac per
                    in, hendrerit senectus, habitasse nullam curae convallis ornare et tortor. Auctor aliquam per,
                    velit suspendisse, quis vivamus morbi arcu potenti lacinia. Mollis eleifend morbi sagittis,
                    donec fames aliquet tempus vivamus. Vestibulum mollis placerat, litora enim quis tristique.
                    Pretium mollis euismod, class hac eros nibh. Aenean ornare, donec nunc magna. Proin sem
                    venenatis, maecenas dapibus cubilia gravida.</p>

                <p>Enim himenaeos, vel arcu quisque. Primis lorem placerat commodo, tortor augue ultrices, nunc
                    volutpat ut quam conubia risus lectus. Ornare etiam venenatis, nostra tincidunt, justo inceptos
                    facilisis vehicula aliquam urna feugiat. Luctus aliquam dictumst, sagittis ipsum ullamcorper orci
                    imperdiet. Convallis fermentum consectetur, dictum venenatis faucibus urna.</p>
            </Section>
            <Section>
                <Heading as='h3' size='md' className='title'>Cancellation Policy</Heading>
                <p>Mattis lectus ultricies cubilia, conubia id facilisis, tempor purus vitae volutpat habitant
                    pretium lobortis. Commodo consectetur ipsum, taciti quisque mattis nisi. Eu vulputate phasellus
                    maecenas, donec senectus torquent, turpis urna sed dolor dapibus aptent velit tincidunt. Hac per
                    in, hendrerit senectus, habitasse nullam curae convallis ornare et tortor. Auctor aliquam per,
                    velit suspendisse, quis vivamus morbi arcu potenti lacinia. Mollis eleifend morbi sagittis,
                    donec fames aliquet tempus vivamus. Vestibulum mollis placerat, litora enim quis tristique.
                    Pretium mollis euismod, class hac eros nibh. Aenean ornare, donec nunc magna. Proin sem
                    venenatis, maecenas dapibus cubilia gravida.</p>

                <p>Enim himenaeos, vel arcu quisque. Primis lorem placerat commodo, tortor augue ultrices, nunc
                    volutpat ut quam conubia risus lectus. Ornare etiam venenatis, nostra tincidunt, justo inceptos
                    facilisis vehicula aliquam urna feugiat. Luctus aliquam dictumst, sagittis ipsum ullamcorper orci
                    imperdiet. Convallis fermentum consectetur, dictum venenatis faucibus urna.</p>
            </Section>
            <Section>
                <Heading as='h3' size='md' className='title'>Summary</Heading>
                <div className="d-flex justify-content-evenly">

                    <div className="p-2">
                        <ul className="list-group">
                            <Heading as='h5' size='sm' className='summary'>House rules</Heading>

                            <li className="list-group-item">⏲ Check-in: 11:00 AM</li>
                            <li className="list-group-item">⏲ Check-in: 14:00 PM</li>
                            <li className="list-group-item">🚭 No smoking</li>
                            <li className="list-group-item">🔞 No underage kids alone</li>
                            <li className="list-group-item">⛔ No parties</li>
                        </ul>
                    </div>

                    <div className="p-2">
                        <ul className="list-group">
                            <Heading as='h5' size='sm' className='summary'>Safety Info</Heading>

                            <li className="list-group-item">✅ No Smoke Alarms</li>
                            <li className="list-group-item">✅ No Carbon Monoxide Alarms</li>
                            <li className="list-group-item">✅ Extinguisher</li>
                            <li className="list-group-item">✅ Emergency Kit</li>
                            <li className="list-group-item">✅ Security camera/recording device</li>
                        </ul>
                    </div>

                    <div className="p-2">
                        <ul className="list-group">
                            <Heading as='h5' size='sm' className='summary'>Cancellation Policy</Heading>

                            <li className="list-group-item">💸 Money Guarantee</li>
                            <li className="list-group-item">📆 48h Cancellation Free of Charge</li>
                            <li className="list-group-item">🤑 Pay half, the rest later</li>
                            <li className="list-group-item">💳 Various Card Options</li>
                            <li className="list-group-item">🐕 No Extra Fee For Animals</li>
                        </ul>
                    </div>
                </div>
            </Section>
        </>
    );

}

export default ContentContainer;