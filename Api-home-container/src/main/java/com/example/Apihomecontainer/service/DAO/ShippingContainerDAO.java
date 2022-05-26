package com.example.Apihomecontainer.service.DAO;

import java.util.List;
import java.util.Map;

public interface ShippingContainerDAO {

    List<Map<String, String>> getNavBarData();
    List<Map<String, String>> getDataReview();
    List<Map<String, String>> getImageCarouselData();
    List<Map<String,String>> getContentData();
}
