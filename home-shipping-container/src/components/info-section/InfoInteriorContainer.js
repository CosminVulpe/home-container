import styled from 'styled-components/macro';
import {ColumnLeft, ColumnRight, Container, Delimiter, Section} from "./InfoSectionIndex";
import React from "react";
import Container8 from '../images/container8.jpg';
import {Button} from "../button/Button";
import {useEffect} from "react";
import AOS from "aos";
import ReviewSection from "../review-section/ReviewSection";

const Box = styled.div`
    border: thin solid black;
    width: 2000px;
    height: 100px;
    text-align: justify;
    background-color: black;
    margin: -42px -10px auto;
    padding: 10px 20px 30p;
    float: left;
`;

const Header = styled.h1`
    margin-left: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    font-size: clamp(1.5rem, 6vw, 2rem);
`;


function InfoInteriorContainer() {
    useEffect(() => {
        AOS.init({
            duration: 1500
        });
        AOS.refresh();
    }, []);
    return (
        <>
            {/*<Box/>*/}
            <Delimiter/>
            <Section>
                <Container>
                    <ColumnLeft>
                        <div data-aos="fade-right">
                            <h1>Interior</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            <p>It has survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged.It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <Button to="/homes" primary="true">
                                View Details
                            </Button>
                        </div>
                    </ColumnLeft>
                    <ColumnRight data-aos="fade-left">
                        <img src={Container8} alt="homes"/>
                    </ColumnRight>
                </Container>
            </Section>
            <Delimiter/>
            {/*<Box/>*/}
            <Section>
                <Header data-aos="zoom-in">Reviews</Header>
                <ReviewSection/>
            </Section>
        </>
    );
}

export default InfoInteriorContainer;