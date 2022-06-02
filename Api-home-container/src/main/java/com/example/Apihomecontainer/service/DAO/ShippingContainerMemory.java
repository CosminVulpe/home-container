package com.example.Apihomecontainer.service.DAO;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ShippingContainerMemory implements ShippingContainerDAO {
    @Override
    public List<Map<String, String>> getNavBarData() {
        return List.of(
                Map.of("title", "About"
                        , "link", "/about"),
                Map.of("title", "Containers"
                        , "link", "/containers"),
                Map.of("title", "Rentals"
                        , "link", "/rentals")

        );
    }

    @Override
    public List<Map<String, String>> getDataReview() {
        return List.of(
                Map.of("username", "Shadrack"
                        , "image", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fbusinessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg&f=1&nofb=1"
                        , "review", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
                Map.of("username", "Cosmin"
                        , "image", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-hearth.cursecdn.com%2Favatars%2F288%2F47%2F635971242216224326.jpeg&f=1&nofb=1"
                        , "review", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
                Map.of("username", "ALex"
                        , "image", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F68%2Fa5%2Faa%2F68a5aa104457ecac4d4136285a830e3e.jpg&f=1&nofb=1"
                        , "review", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
                Map.of("username", "Jonny"
                        , "image", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.vectorstock.com%2Fi%2F1000x1000%2F20%2F76%2Fman-avatar-profile-vector-21372076.jpg&f=1&nofb=1"
                        , "review", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")
        );
    }


    // https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.getinthetrailer.com%2Fwp-content%2Fuploads%2Fdiy-shipping-container-homes-kits_846795.jpg&f=1&nofb=1
//https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fliveincontainer.com%2Fwp-content%2Fuploads%2F2015%2F01%2F1-simple-and-suave.jpg&f=1&nofb=1
    @Override
    public List<Map<String, String>> getImageCarouselData() {
        return List.of(
                Map.of(
                        "title", "Luxury Container 1, Romania",
                        "price", "200 Lei / night",
                        "path", "/homes",
                        "image", "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fliveincontainer.com%2Fwp-content%2Fuploads%2F2015%2F01%2F1-simple-and-suave.jpg&f=1&nofb=1",
                        "label", "View Container",
                        "alt", "Container"
                ),
                Map.of(
                        "title", "Luxury Container 2, Romania",
                        "price", "220 Lei / night",
                        "path", "/homes",
                        "image", "https://cdn.wowowhome.com/photos/2019/01/shipping-container-house-prototype-by-cocoon-modules-coco-mat-11.jpg",
                        "label", "View Container",
                        "alt", "Container"
                ),
                Map.of(
                        "title", "Luxury Container 3, Romania",
                        "price", "240 Lei / night",
                        "path", "/homes",
                        "image", "https://d3df8ea8ea59eq.cloudfront.net/photos/6324749997659123712/6333871065753460736/large.jpg",
                        "label", "View Container",
                        "alt", "Container"
                ),
                Map.of(
                        "title", "Luxury Container 4, Romania",
                        "price", "250 Lei / night",
                        "path", "/homes",
                        "image", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F51S_o7yK7R4%2Fmaxresdefault.jpg&f=1&nofb=1",
                        "label", "View Container",
                        "alt", "Container"
                ),
                Map.of(
                        "title", "Luxury Container 5, Romania",
                        "price", "300 Lei / night",
                        "path", "/homes",
                        "image", "https://inhabitat.com/wp-content/blogs.dir/1/files/2017/11/Shippingcontainerhome6.jpg",
                        "label", "View Container",
                        "alt", "Container"
                )
        );
    }

    @Override
    public List<Map<String, String>> getContentData() {
        return List.of(
                Map.of(
                        "heading", "Explore our cozy shipping-containers",
                        "paragraphOne", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
                                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        "paragraphTwo", "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." +
                                "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        "buttonLabel", "View Container",
                        "image", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.getinthetrailer.com%2Fwp-content%2Fuploads%2Fdiy-shipping-container-homes-kits_846795.jpg&f=1&nofb=1",
                        "reverse", "false",
                        "delay", "100"
                )
        );
    }
}
