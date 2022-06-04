import React, {useState, useRef, useEffect} from "react";
import styled, {css} from "styled-components/macro";
import {Button} from "../button/Button";
import {IoMdArrowRoundForward} from "react-icons/io";
import {IoArrowForward, IoArrowBack} from "react-icons/io5";
import AOS from 'aos';
import "aos/dist/aos.css";


const ImageSection = styled.section`
    height: 100vh;
    max-height: 1100px;
    position: relative;
    overflow: hidden;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
`;

const Slide = styled.div`
    z-index: 1;
    width: 100%;
    height: 100%;
    
`;
const Slider = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex:
    align-items: center;
    justify-content: center;
    
    &::before {
        content: '';
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100vh;
        bottom: 0vh;
        left: 0;
        overflow: hidden;
        opacity: 0.4;
        background: linear-gradient(
         0deg,
         rgba(0,0,0,0.2) 0%,
         rgba(0,0,0,0.2) 50%,
         rgba(0,0,0,0.6) 100% );
    }
`;


const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;     
`;

const Content = styled.div`
    position: relative,
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1600px;
    width: calc(100% - 100px);
    color: #fff;    
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-52%, -40%);
    
    h1 {
        font-size: clamp(1rem, 8vh, 2rem);
        font-weight: 400;
        text-transform: uppercase;
        text-shadow: 0px 0px 20px rgba(0,0,0,0.4);
        text-align: left;
        margin-bottom: 0.7rem;
    }
    
    p {
        margin-bottom: 1.0rem;
        text-shadow: 0px 0px 20px rgba(0,0,0,0.4);
        color: white;
        font-size: 17px;
    }
`;

const Arrow = styled(IoMdArrowRoundForward)`
    margin-left: 0.5rem;
`;


const arrowsButtons = css`
    width: 50px;
    height: 50px;
    color: #fff;
    cursor: pointer;
    background: #000d1a;
    border-radius: 50px;
    padding: 10px;
    margin-right: 1rem;
    user-select: none;
    transition: 0.3s;
    
    &:hover{
        background: #cd853f;
        transform: scale(1.05);
    }
`;

const SliderButton = styled.div`
    position: absolute;
    bottom: 50px;
    right: 50px;
    display: flex;
    z-index: 10;
`;

const PreviousArrow = styled(IoArrowBack)`
    ${arrowsButtons}
`;

const NextArrow = styled(IoArrowForward)`
    ${arrowsButtons}
`;


function ImagineSlider({slides}) {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
    const timeOut = useRef(null);

    useEffect(() => {

        AOS.init({
            duration: 1500
        });
        AOS.refresh();

        function nextImageSlider() {
            setCurrent(current => (current === (length - 1)) ? 0 : (current + 1));
        }

        timeOut.current = setTimeout(nextImageSlider, 4000);
        return function () {
            if (timeOut.current) {
                clearTimeout(timeOut.current);
            }
        };
    }, [current, length]);

    function nextSlide() {
        if (timeOut.current) {
            clearTimeout(timeOut.current);
        }
        setCurrent(current === (length - 1) ? 0 : (current + 1));
    }

    function prevSlide() {
        if (timeOut.current) {
            clearTimeout(timeOut.current);
        }
        setCurrent(current === 0 ? (length - 1) : (current - 1));
    }

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <ImageSection>
            <ImageWrapper>
                <>
                    {slides.map((item, index) =>
                        <Slide key={index}>
                            {index === current && (
                                <Slider>
                                    <Image src={item.imageUrl} alt="shipping-container"/>
                                    <Content>
                                        <h1 data-aos="fade-down">{item.name}</h1>
                                        <p data-aos="fade-down"><em>220 Lei / night</em></p>
                                        <Button to="/container"
                                                primary='true'
                                                css={`max-width:160px`} data-aos="zoom-in-up"
                                                >
                                            View Container
                                            <Arrow/>
                                        </Button>
                                    </Content>
                                </Slider>
                            )}
                        </Slide>
                    )}
                    <SliderButton>
                        <PreviousArrow onClick={prevSlide}/>
                        <NextArrow onClick={nextSlide}/>
                    </SliderButton>
                </>
            </ImageWrapper>
        </ImageSection>
    );
}

export default ImagineSlider;