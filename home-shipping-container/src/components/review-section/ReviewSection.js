import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {EffectCoverflow, Pagination} from "swiper/core";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './reviews.css';
import StarRatingEffect from "./StarRatingEffect";
import {ImageReviewData} from "../images/image-review-data/ImageReviewData";
import {Heading} from "@chakra-ui/react";
import {ApiGetReview} from "../service/api-requests/ApiService";

SwiperCore.use([EffectCoverflow, Pagination]);

function ReviewSection() {
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        ApiGetReview("")
            .then(data => setReviewData(data.data))
            .catch(error => {
                console.log(error);
            })
    }, []);

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
                    {reviewData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={ImageReviewData[index].image} alt={item.userName}/>
                            <Heading as='h6' size='md'> {item.userName}</Heading>
                            <StarRatingEffect/>
                            <p>{item.description}</p>
                        </SwiperSlide>
                    ))}
                </>
            </Swiper>
        </section>
    );
}

export default ReviewSection;
