import styled from 'styled-components/macro';
import {ColumnLeft, ColumnRight, Container, Delimiter, Section} from "./InfoSectionIndex";
import React, {useEffect} from "react";
import Container8 from '../images/container8.jpg';
import {Button} from "../button/Button";
import ReviewSection from "../review-section/ReviewSection";
import {Heading} from "@chakra-ui/react";
import './indexContainerInfoStyle.css';
import {dataAos} from "../service/data-aos/DataAos";

const Header = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  font-size: clamp(1.5rem, 6vw, 2rem);
`;


function InfoInteriorContainer() {

    useEffect(() => {
        dataAos();
    }, []);

    return (
        <>
            <Delimiter/>
            <Section>
                <Container>
                    <ColumnLeft>
                        <div data-aos="fade-right">
                            <Heading as='h1'>Interior</Heading>
                            <p className="text">Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            <p className="text">It has survived not only five centuries, but also the leap into
                                electronic typesetting,
                                remaining essentially unchanged.It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <Button to="/info-container" primary="true">
                                View Details
                            </Button>
                        </div>
                    </ColumnLeft>
                    <ColumnRight data-aos="fade-left">
                        <img src={Container8} alt="container"/>
                    </ColumnRight>
                </Container>
            </Section>
            <Delimiter/>
            <Section>
                <Header data-aos="zoom-in">
                    <Heading as='h2'>Reviews</Heading>
                </Header>
                <ReviewSection/>
            </Section>
        </>
    );
}

export default InfoInteriorContainer;
