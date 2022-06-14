package com.example.Apihomecontainer;

import com.example.Apihomecontainer.model.Reservation;
import com.example.Apihomecontainer.model.Review;
import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.model.enums.ReservationStatus;
import com.example.Apihomecontainer.service.DAO.ReservationRepository;
import com.example.Apihomecontainer.service.DAO.ReviewRepository;
import com.example.Apihomecontainer.service.DAO.ShippingContainerRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.*;

@SpringBootApplication
public class ApiHomeContainerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiHomeContainerApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ShippingContainerRepository shippingContainerRepository
            , ReservationRepository reservationRepository
            , ReviewRepository reviewRepository) {
        return args -> {
            ShippingContainer shippingContainer1 = new ShippingContainer(
                    "Luxury Container 1, Romania"
                    , "One Bathroom, One Bedroom with the view of Mogosoaia Lake"
                    , 220

            );
            ShippingContainer shippingContainer2 = new ShippingContainer(
                    "Luxury Container 2, Romania"
                    , "Two Bathroom, Two Bedroom with the view of Mogosoaia Lake"
                    , 245
            );
            ShippingContainer shippingContainer3 = new ShippingContainer(
                    "Luxury Container 3, Romania"
                    , "One Bathroom, Two Bedroom with the view of Mogosoaia Lake"
                    , 250
            );
            ShippingContainer shippingContainer4 = new ShippingContainer(
                    "Luxury Container 4, Romania"
                    , "Two Bathroom, One Bedroom with the view of Mogosoaia Lake"
                    , 255
            );
            ShippingContainer shippingContainer5 = new ShippingContainer(
                    "Luxury Container 5, Romania"
                    , "One Bathroom, Two Bedroom with the view of Mogosoaia Lake"
                    , 235
            );
            ShippingContainer shippingContainer6 = new ShippingContainer(
                    "Luxury Container 6, Romania"
                    , "One Bathroom, One Bedroom with the view of Mogosoaia Lake"
                    , 200
            );

            shippingContainerRepository.saveAll(
                    List.of(
                            shippingContainer1
                            , shippingContainer2
                            , shippingContainer3
                            , shippingContainer4
                            , shippingContainer5
                            , shippingContainer6
                    )
            );

            Review review1 = new Review(
                    "Cosmin"
                    , "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            );
            Review review2 = new Review(
                    "Shadrack"
                    , "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            );
            Review review3 = new Review(
                    "Alex"
                    , "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            );
            Review review4 = new Review(
                    "Tudor"
                    , "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            );

            reviewRepository.saveAll(
                    List.of(
                            review1, review2, review3, review4
                    )
            );


        };
    }
}
