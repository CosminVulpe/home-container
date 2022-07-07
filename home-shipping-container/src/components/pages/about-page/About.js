import GlobalStyle from "../../global-style/GlobalStyles";
import NavBar from "../../navBar/NavBar";
import React, {useEffect} from "react";
import {ColumnLeft, ColumnRight, Container, Delimiter} from "../../info-section/InfoSectionIndex";
import AOS from "aos";
import {Heading} from "@chakra-ui/react";
import BusinessManPicture from '../../images/about-page-images/business-man.png';
import BusinessWomanPicture from '../../images/about-page-images/business-woman.png';


function About() {
    useEffect(() => {
        AOS.init({
            duration: 1500
        });
        AOS.refresh();
    }, []);

    return (
        <>
            <GlobalStyle/>
            <NavBar/>
            <section style={{padding: "4rem", marginRight: "1rem"}}>
                <Container>
                    <ColumnLeft>
                        <div data-aos="zoom-out">
                            <Heading as="h2" style={{marginBottom: "1rem"}}>Investors</Heading>
                            <p>Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry. Lorem
                                Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <p>
                                It has survived not only five centuries, but
                                also the leap into electronic
                                typesetting,
                                remaining essentially unchanged.It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </ColumnLeft>
                    <ColumnRight>
                        <img
                            src={BusinessManPicture}
                            style={{borderRadius: "50%", height: "20rem"}}
                            alt="container"
                            data-aos="zoom-in"/>
                    </ColumnRight>
                </Container>
                <Delimiter/>
                <Container>
                    <ColumnLeft>
                        <img
                            src={BusinessWomanPicture}
                            style={{borderRadius: "50%", height: "20rem"}}
                            alt="container"
                            data-aos="fade-right"/>
                    </ColumnLeft>
                    <ColumnRight>
                        <div data-aos="fade-left">
                            <p>

                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry. Lorem
                                Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <br/>
                            <p>
                                It has survived not only five centuries, but
                                also the leap into electronic
                                typesetting,
                                remaining essentially unchanged.It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </ColumnRight>
                </Container>
            </section>
        </>
    )
}

export default About;
