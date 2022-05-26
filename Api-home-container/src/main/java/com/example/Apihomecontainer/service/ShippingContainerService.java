package com.example.Apihomecontainer.service;

import com.example.Apihomecontainer.service.DAO.ShippingContainerMemory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ShippingContainerService {

    private final ShippingContainerMemory shippingContainerMemory;

    @Autowired
    public ShippingContainerService(ShippingContainerMemory shippingContainerMemory) {
        this.shippingContainerMemory = shippingContainerMemory;
    }

    public List<Map<String, String>> dataNavBar() {
        return shippingContainerMemory.getNavBarData();
    }

    public List<Map<String, String>> reviews() {
        return shippingContainerMemory.getDataReview();
    }

    public List<Map<String, String>> imageCarousel() {
        return shippingContainerMemory.getImageCarouselData();
    }

    public List<Map<String, String>> contentData() {
        return shippingContainerMemory.getContentData();
    }
}
