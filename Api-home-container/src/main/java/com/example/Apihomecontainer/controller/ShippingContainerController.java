package com.example.Apihomecontainer.controller;

import com.example.Apihomecontainer.service.ShippingContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class ShippingContainerController {

    private ShippingContainerService service;

    @Autowired
    public ShippingContainerController(ShippingContainerService service) {
        this.service = service;
    }

    @GetMapping(path = "/navBarData")
    public List<Map<String, String>> getNavBarData() {
        return service.dataNavBar();
    }

    @GetMapping(path = "/reviewData")
    public List<Map<String, String>> getReviewData() {
        return service.reviews();
    }

    @GetMapping(path = "/imageCarousel")
    public List<Map<String, String>> getImageSliderData() {
        return service.imageCarousel();
    }

    @GetMapping(path = "/contentData")
    public List<Map<String, String>> getContentData() {
        return service.contentData();
    }

}
