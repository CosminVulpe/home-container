import styled from "styled-components/macro";
import React, {useContext} from "react";
import CalendarReservation from "../../../calendar/Calendar";
import {ContainerDetails} from "../../../userContext/UserContext";
import {Link} from "react-router-dom";

const Section = styled.section`
     margin-top: 1rem;
     margin-bottom: 3rem;
`;
const Button = styled(Link)`
    width: 100%;
    text-decoration: none;
    height: 100%;
    border: none;
    color: black;
    display: flex !important;
    justify-content: center;
    text-align: center;
    background-color: #CE8952;
    border-radius: 4px ;
    box-shadow: inset 0 0 0 0 #BACA70;
    transition: ease-in-out 0.5s ;
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


    function handleClickEvent() {
        console.log(details);
    }


    return (
        <>
            <Section>
                <div className="d-flex justify-content-between">
                    <div className="p-2 text-lg-start">
                        <h3 className="d-flex flex-column">Description</h3>
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
                            <h4 className="d-flex flex-column">Calendar</h4>
                            <CalendarReservation/>
                        </div>
                    </div>
                    <div className="p-2 text-lg-start">
                        <div className="card" style={{
                            width: "18rem",
                            boxShadow: "10px 10px 10px 10px"
                        }}>
                            <img src={details.imageUrl} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title text-center">{details.name}</h5>
                                <div className="d-flex justify-content-between">
                                    <div className="p-2">
                                        <p>Number Adults</p>
                                        <input type="number" min="1" max="5" defaultValue="1"/>
                                    </div>
                                    <div className="p-2">
                                        <p>Number Kids</p>
                                        <input type="number" min="1" max="3" defaultValue="1"/>
                                    </div>
                                </div>
                                <br/>
                                <p className="d-flex justify-content-center">Total Price : 0 Lei</p>
                                <div className="d-flex justify-content-center" onClick={handleClickEvent}>
                                    <Button to="/payment">Book</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <Section>
                <h3>Safety Precautions </h3>
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
                <h3>Cancellation Policy</h3>
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
                <h3>Summary</h3>
                <div className="d-flex justify-content-evenly">

                    <div className="p-2">
                        <ul className="list-group">
                            <h5>House rules</h5>
                            <li className="list-group-item">⏲ Check-in: 11:00 AM</li>
                            <li className="list-group-item">⏲ Check-in: 14:00 PM</li>
                            <li className="list-group-item">🚭 No smoking</li>
                            <li className="list-group-item">🔞 No underage kids alone</li>
                            <li className="list-group-item">⛔ No parties</li>
                        </ul>
                    </div>

                    <div className="p-2">
                        <ul className="list-group">
                            <h5>Safety Info</h5>

                            <li className="list-group-item">✅ No Smoke Alarms</li>
                            <li className="list-group-item">✅ No Carbon Monoxide Alarms</li>
                            <li className="list-group-item">✅ Extinguisher</li>
                            <li className="list-group-item">✅ Emergency Kit</li>
                            <li className="list-group-item">✅ Security camera/recording device</li>
                        </ul>
                    </div>

                    <div className="p-2">
                        <ul className="list-group">
                            <h5>Cancellation Policy</h5>

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