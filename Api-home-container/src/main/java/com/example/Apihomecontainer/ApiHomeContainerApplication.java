package com.example.Apihomecontainer;

import com.example.Apihomecontainer.model.Review;
import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.service.DAO.ReservationRepository;
import com.example.Apihomecontainer.service.DAO.ReviewRepository;
import com.example.Apihomecontainer.service.DAO.ShippingContainerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

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
                    , "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fliveincontainer.com%2Fwp-content%2Fuploads%2F2015%2F01%2F1-simple-and-suave.jpg&f=1&nofb=1"
            );
            ShippingContainer shippingContainer2 = new ShippingContainer(
                    "Luxury Container 2, Romania"
                    , "Two Bathroom, Two Bedroom with the view of Mogosoaia Lake"
                    , "https://cdn.wowowhome.com/photos/2019/01/shipping-container-house-prototype-by-cocoon-modules-coco-mat-11.jpg"
            );
            ShippingContainer shippingContainer3 = new ShippingContainer(
                    "Luxury Container 3, Romania"
                    , "One Bathroom, Two Bedroom with the view of Mogosoaia Lake"
                    , "https://d3df8ea8ea59eq.cloudfront.net/photos/6324749997659123712/6333871065753460736/large.jpg"
            );
            ShippingContainer shippingContainer4 = new ShippingContainer(
                    "Luxury Container 4, Romania"
                    , "Tow Bathroom, One Bedroom with the view of Mogosoaia Lake"
                    , "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F51S_o7yK7R4%2Fmaxresdefault.jpg&f=1&nofb=1"
            );
            ShippingContainer shippingContainer5 = new ShippingContainer(
                    "Luxury Container 5, Romania"
                    , "One Bathroom, Two Bedroom with the view of Mogosoaia Lake"
                    , "https://inhabitat.com/wp-content/blogs.dir/1/files/2017/11/Shippingcontainerhome6.jpg"
            );


            shippingContainerRepository.saveAll(
                    List.of(
                            shippingContainer1
                            , shippingContainer2
                            , shippingContainer3
                            , shippingContainer4
                            , shippingContainer5
                    )
            );

            Review review1 = new Review(
                    "Cosmin"
                    , "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fbusinessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg&f=1&nofb=1"
                    , "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            );
            Review review2 = new Review(
                    "Shadrack"
                    , "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-hearth.cursecdn.com%2Favatars%2F288%2F47%2F635971242216224326.jpeg&f=1&nofb=1"
                    , "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            );
            Review review3 = new Review(
                    "Alex"
                    , "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F68%2Fa5%2Faa%2F68a5aa104457ecac4d4136285a830e3e.jpg&f=1&nofb=1"
                    , "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            );
            Review review4 = new Review(
                    "Tudor"
                    , "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.vectorstock.com%2Fi%2F1000x1000%2F20%2F76%2Fman-avatar-profile-vector-21372076.jpg&f=1&nofb=1"
                    , "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            );

            reviewRepository.saveAll(
                    List.of(
                            review1, review2, review3, review4
                    )
            );


        };
    }
}
