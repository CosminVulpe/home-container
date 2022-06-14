package com.example.Apihomecontainer.controller;

import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.service.ShippingContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping(path = "/container")
public class ShippingContainerController {

    private final ShippingContainerService service;

    @Autowired
    public ShippingContainerController(ShippingContainerService service) {
        this.service = service;
    }

    @GetMapping
    public List<ShippingContainer> getAll(){
        return service.getAll();
    }

    @GetMapping(path = "/{containerId}")
    public ShippingContainer getContainerById(@PathVariable("containerId") Long containerId) {
        return service.getContainerById(containerId);
    }

    @GetMapping(path="/dates")
    public List<LocalDate> getDatesContainerOccupy(){

        return service.getDatesContainerOccupy();
    }


}
