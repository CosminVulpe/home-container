package com.example.Apihomecontainer.controller;

import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.service.ShippingContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping(path = "/container")
public class ShippingContainerController {

    private ShippingContainerService service;

    @Autowired
    public ShippingContainerController(ShippingContainerService service) {
        this.service = service;
    }

    @GetMapping
    public List<ShippingContainer> getAll(){
        return service.getAll();
    }

    @GetMapping(path = "/{containerId}")
    public ShippingContainer getFirstContainers(@PathVariable("containerId") Long containerId) {
        return service.getContainerById(containerId);
    }
}
