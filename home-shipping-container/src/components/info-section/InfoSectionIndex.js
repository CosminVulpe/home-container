import React, {useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {Button} from "../button/Button";
import AOS from 'aos';
import "aos/dist/aos.css";
import Container8 from '../images/container8.jpg';
import Container10 from '../images/container10.png';
import Container2db from './../images/image-carousel-data/container2db.png';
import InfoInteriorContainer from "./InfoInteriorContainer";
import {Heading} from "@chakra-ui/react";
import {ApiGetContainer} from "../service/api-requests/ApiService";


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
  @media screen and (max-width: 768px) {
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

  @media screen and (max-width: 768px) {
    order: ${({reverse}) => (reverse ? '2' : '1')};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media screen and (max-width: 768px) {
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
  background-image: linear-gradient(to right, black, #808080, black);
`;


function InfoSectionIndex() {
    const [firstContainer, setFirstContainer] = useState({});
    const [secondContainer, setSecondContainer] = useState({});

    useEffect(() => {
        AOS.init({
            duration: 1500
        });
        AOS.refresh();

        ApiGetContainer("/1")
            .then(data => setFirstContainer(data.data))
        ApiGetContainer("/2")
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
                            <Heading as='h1' style={{fontFamily: "'Roboto',sans-serif"}}>Explore our cozy
                                shipping-containers</Heading>
                            <p style={{fontFamily: "'Arimo', sans-serif"}}>Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry. Lorem
                                Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <p style={{fontFamily: "'Arimo', sans-serif"}}>It has survived not only five centuries, but
                                also the leap into electronic
                                typesetting,
                                remaining essentially unchanged.It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <Button to="/all-containers" primary="true">
                                View All Containers
                            </Button>
                        </div>
                    </ColumnLeft>
                    <ColumnRight>
                        <img
                            src={Container10}
                            alt="container" data-aos="zoom-in"/>
                    </ColumnRight>
                </Container>
            </Section>
            <Delimiter/>
            <Section>
                <Container>
                    <ColumnLeft>
                        <div>
                            <Heading as='h1' data-aos="fade-right">View our containers</Heading>
                            <ColumnRight data-aos="zoom-in">
                                <div css={`display: flex;
                                  flex-direction: column`}>
                                    <img src={Container8} alt="container8"/>
                                    <p style={{fontFamily: "'Arimo', sans-serif", fontSize: "18px"}}>
                                        {firstContainer.description} </p>
                                    <Button
                                        to={"/container/" + firstContainer.id}
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
                        <div css={` object-fit: contain !important`} data-aos="zoom-in">
                            <img src={Container2db} alt="container8" css={`width: 88% !important`}/>
                            <p style={{fontFamily: "'Arimo', sans-serif", fontSize: "18px"}}>
                                {secondContainer.description}</p>
                            <Button
                                to={"/container/" + secondContainer.id}
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
