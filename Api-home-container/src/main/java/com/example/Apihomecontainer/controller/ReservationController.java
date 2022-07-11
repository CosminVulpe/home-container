package com.example.Apihomecontainer.controller;

import com.example.Apihomecontainer.model.Reservation;
import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.service.ReservationService;
import com.example.Apihomecontainer.service.ShippingContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping(path = "/reservation")
public class ReservationController {
    private final ReservationService reservationService;
    private final ShippingContainerService shippingContainerService;

    @Autowired
    public ReservationController(ReservationService reservationService
            , ShippingContainerService shippingContainerService) {
        this.reservationService = reservationService;
        this.shippingContainerService = shippingContainerService;
    }

    @PostMapping
    public ShippingContainer getContainerReservation(@RequestBody ShippingContainer shippingContainer) {
        return shippingContainerService.getContainerById(shippingContainer.getId());
    }

    @PostMapping(path = "/{containerId}")
    public void addReservation(@RequestBody Reservation reservation
            , @PathVariable("containerId") Long containerId) {
        reservationService.addReservation(reservation, containerId);
    }


    @GetMapping(path = "/{containerId}")
    public UUID getReservationId(@PathVariable("containerId") Long containerId) {
        return reservationService.getReservationId(containerId);
    }

    @PostMapping(path = "/cancel-reservation")
    public void cancelReservation(@RequestBody Reservation reservation) {
        reservationService.cancelReservation(reservation);
    }

}
