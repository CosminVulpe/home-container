import NavBar from "../../navBar/NavBar";
import GlobalStyle from "../../global-style/GlobalStyles";
import {Section} from "../../info-section/InfoSectionIndex";
import {css} from "styled-components/macro";
import './containerGallery.css';
import Interior3 from '../../images/interior-container/interior3.png';
import Interior4 from '../../images/interior-container/interior4.png';
import Interior5 from '../../images/interior-container/interior5.png';
import Interior6 from '../../images/interior-container/interior6.png';
import Interior7 from '../../images/interior-container/interior7.png';
import Interior8 from '../../images/interior-container/interior8.png';
import ContentContainer from "./content-container/ContentContainer";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {ContainerDetails} from "../../userContext/UserContext";
import Footer from "../../footer/Footer";


function ContainerSection() {
    window.scroll(0, 0);
    const [oneContainerDetails, setOneContainerDetails] = useState([]);
    let {id} = useParams();

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API_CONTAINER + id)
            .then(data => setOneContainerDetails(data.data))
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <>
            <GlobalStyle/>
            <NavBar/>
            <Section css={css`padding: 7rem 0rem`}>
                <div className="container">
                    <h2>{oneContainerDetails.name}</h2>
                    <div className="gallery-container">

                        <figure className="gallery__item gallery__item--1">
                            <img src={Interior3} className="gallery__img" alt="shipping-container 1"/>
                            <div className="text-img">Living Room</div>
                        </figure>

                        <figure className="gallery__item gallery__item--2">
                            <img src={Interior4} className="gallery__img" alt="shipping-container 2"/>
                            <div className="text-img">Living Room</div>
                        </figure>

                        <figure className="gallery__item gallery__item--3">
                            <img src={Interior6} className="gallery__img" alt="shipping-container 3"/>
                            <div className="text-img">Entrance</div>
                        </figure>

                        <figure className="gallery__item gallery__item--4">
                            <img src={Interior7} className="gallery__img" alt="shipping-container 4"/>
                            <div className="text-img">Kitchen</div>
                        </figure>

                        <figure className="gallery__item gallery__item--5">
                            <img src={Interior8} className="gallery__img" alt="shipping-container 5"/>
                            <div className="text-img">Bedroom</div>
                        </figure>

                        <figure className="gallery__item gallery__item--6">
                            <img src={Interior5} className="gallery__img" alt="shipping-container 6"/>
                            <div className="text-img">Bedroom</div>
                        </figure>
                    </div>
                    <ContainerDetails.Provider value={oneContainerDetails}>
                        <ContentContainer/>
                    </ContainerDetails.Provider>
                </div>
            </Section>
            <Footer/>
        </>
    );
}

export default ContainerSection;