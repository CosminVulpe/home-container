package com.example.Apihomecontainer.service;

import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.service.DAO.ShippingContainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShippingContainerService {

    private final ShippingContainerRepository shippingContainerRepository;

    @Autowired
    public ShippingContainerService(ShippingContainerRepository shippingContainerRepository) {
        this.shippingContainerRepository = shippingContainerRepository;
    }


    public List<ShippingContainer> getAll() {
        return shippingContainerRepository.findAll();
    }

    public ShippingContainer getContainerById(Long id) {
        Optional<ShippingContainer> optionalShippingContainer = shippingContainerRepository.findById(id);
        return optionalShippingContainer.orElse(null);
    }
}
