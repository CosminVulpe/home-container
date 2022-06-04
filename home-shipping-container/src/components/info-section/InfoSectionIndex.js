import React from 'react';
import styled from 'styled-components/macro';
import {Button} from "../button/Button";
import AOS from 'aos';
import "aos/dist/aos.css";
import {useEffect} from "react";
import Container8 from '../images/container8.jpg';
import Container7 from '../images/container7.png';
import InfoInteriorContainer from "./InfoInteriorContainer";
import {useState} from "react";
import axios from "axios";

export const Section = styled.section`
    width: 100%;
    height: 100%;
    padding: 3rem 0rem;
`;

export const Container = styled.div`
    padding: 3rem calc((100vw - 1300px) / 2);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 600px;
    @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
    }
`;

export const ColumnLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 1.4;
    padding: 1rem 2rem;
    order: ${({reverse}) => (reverse ? '2' : '1')};
    
    h1 {
        margin-bottom: 1rem;
        font-size: clamp(1.5rem, 6vw, 2rem);
    }
    
    p {
        margin-bottom: 2rem;
    }
`;

export const ColumnRight = styled.div`
    padding: 1rem 2rem;
    order: ${({reverse}) => (reverse ? '1' : '2')};
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media screen and (max-width: 768px){
        order: ${({reverse}) => (reverse ? '2' : '1')};
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        
        @media screen and (max-width: 768px){
            width: 90%;
            height: 90%;
            margin-top: 25px;
        }
    }
`;

export const Delimiter = styled.hr`
   width: 45%;
   margin-left: auto;
   margin-right: auto;
   border: 0;
   height: 4px;
   background: #095484;
   background-image: linear-gradient(to right, #ccc, #8F8F8F, #ccc);
`;


function InfoSectionIndex() {
    const [firstContainer, setFirstContainer] = useState({});
    const [secondContainer, setSecondContainer] = useState({});

    useEffect(() => {
        AOS.init({
            duration: 1500
        });
        AOS.refresh();

        axios.get("http://localhost:8080/container/1")
            .then(data => setFirstContainer(data.data))
        axios.get("http://localhost:8080/container/2")
            .then(info => setSecondContainer(info.data))
            .catch(error => {
                console.log(error);
            });

    }, []);

    return (
        <>
                <Section>
                    <Delimiter/>
                    <Container>
                        <ColumnLeft>
                            <div data-aos="zoom-out">
                                <h1>Explore our cozy shipping-containers</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum
                                    has been the industry's standard dummy text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <p>It has survived not only five centuries, but also the leap into electronic
                                    typesetting,
                                    remaining essentially unchanged.It was popularised in the 1960s with the release of
                                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                <Button to="/container" primary="true">
                                    View Container
                                </Button>
                            </div>
                        </ColumnLeft>
                        <ColumnRight>
                            <img
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.getinthetrailer.com%2Fwp-content%2Fuploads%2Fdiy-shipping-container-homes-kits_846795.jpg&f=1&nofb=1"
                                alt="homes" data-aos="zoom-in"/>
                        </ColumnRight>
                    </Container>
                </Section>
                <Delimiter/>
                <Section>
                    <Container>
                        <ColumnLeft>
                            <div>
                                <h1 data-aos="fade-right">View our containers</h1>
                                <ColumnRight data-aos="zoom-in">
                                    <div css={`display: flex, flex-direction: column`}>
                                        <img src={Container8} alt="container8"/>
                                        <p css={`font-family: 'Lato', sans-serif; font-size: 18px`}>
                                            {firstContainer.description} </p>
                                        <Button
                                            to="/container"
                                            primary="true"
                                            css={`margin-top: -25px`}
                                        >
                                            View Container
                                        </Button>
                                    </div>
                                </ColumnRight>
                            </div>
                        </ColumnLeft>
                        <ColumnRight>
                            <div css={`position: absolute, object-fit: contain !important`} data-aos="zoom-in">
                                <img src={Container7} alt="container8" css={`width: 80% !important`}/>
                                <p css={`font-family: 'Lato', sans-serif; font-size: 18px`}>
                                    {secondContainer.description}</p>
                                <Button
                                    to="/container"
                                    primary="true"
                                    css={`margin-top: 10px`}
                                >
                                    View Container </Button>
                            </div>
                        </ColumnRight>
                    </Container>
                </Section>
                <InfoInteriorContainer/>
        </>
    );
}

export default InfoSectionIndex;