import React from 'react';
import styled from 'styled-components/macro';
import {Button} from "../button/Button";
import AOS from 'aos';
import "aos/dist/aos.css";
import {useEffect} from "react";
import Container8 from '../images/container8.jpg';
import Container7 from '../images/container7.png';
import InfoInteriorContainer from "./InfoInteriorContainer";


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


function InfoSectionIndex({
                         heading
                         , paragraphOne
                         , paragraphTwo
                         , buttonLabel
                         , image
                         , reverse
                     }) {

    useEffect(() => {
        AOS.init({
            duration: 1500
        });
        AOS.refresh();
    }, []);


    return (
        <>
            <Section>
                <Delimiter/>
                <Container>
                    <ColumnLeft>
                        <div data-aos="zoom-out">
                            <h1>{heading}</h1>
                            <p>{paragraphOne}</p>
                            <p>{paragraphTwo}</p>
                            <Button to="/homes" primary="true">
                                {buttonLabel}
                            </Button>
                        </div>
                    </ColumnLeft>
                    <ColumnRight reverse={reverse}>
                        <img src={image} alt="homes" data-aos="zoom-in"/>
                    </ColumnRight>
                </Container>
            </Section>
            <Delimiter/>
            <Section>
                <Container>
                    <ColumnLeft>
                        <div>
                            <h1 data-aos="fade-right">View our containers</h1>
                            <ColumnRight reverse={reverse} data-aos="zoom-in">
                                <div css={`display: flex, flex-direction: column`}>
                                    <img src={Container8} alt="container8"/>
                                    <p css={`font-family: 'Lato', sans-serif; font-size: 18px`}>One Bathroom, One
                                        Bedroom with the view of Mogosoaia Lake</p>
                                    <Button to="/homes" primary="true" css={`margin-top: -25px`}>
                                        {buttonLabel}
                                    </Button>
                                </div>
                            </ColumnRight>
                        </div>
                    </ColumnLeft>
                    <ColumnRight reverse={reverse}>
                        <div css={`position: absolute, object-fit: contain !important`} data-aos="zoom-in">
                            <img src={Container7} alt="container8" css={`width: 80% !important`}/>
                            <p css={`font-family: 'Lato', sans-serif; font-size: 18px`}>Two Bathroom, Two Bedroom with
                                the view of Mogosoaia Lake</p>
                            <Button to="/homes" primary="true" css={`margin-top: 10px`}>
                                {buttonLabel}
                            </Button>
                        </div>
                    </ColumnRight>
                </Container>
            </Section>
            <InfoInteriorContainer/>
        </>
    );
}

export default InfoSectionIndex;