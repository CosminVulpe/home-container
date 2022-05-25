import React from "react";
import styled from "styled-components/macro";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {EffectCoverflow, Pagination} from "swiper/core";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {dataReview} from "../data/ReviewData";
import './reviews.css';
import StarRatingEffect from "./StarRatingEffect";

SwiperCore.use([EffectCoverflow, Pagination]);

function ReviewSection() {
    return (
        <section>
            <Swiper effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 50
                        , stretch: 0
                        , depth: 100
                        , modifier: 5
                        , slideShadows: true
                    }}
            >
                <>
                    {dataReview.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={item.image} alt={item.username}/>
                            <h3>{item.username}</h3>
                            <StarRatingEffect/>
                            <p>{item.review}</p>
                        </SwiperSlide>
                    ))}
                </>
            </Swiper>
        </section>
    );
}

export default ReviewSection;