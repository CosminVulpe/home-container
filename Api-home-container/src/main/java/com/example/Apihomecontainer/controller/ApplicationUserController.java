package com.example.Apihomecontainer.controller;

import com.example.Apihomecontainer.model.ApplicationUser;
import com.example.Apihomecontainer.model.AuthenticationRequest;
import com.example.Apihomecontainer.model.Reservation;
import com.example.Apihomecontainer.service.ApplicationUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping(path = "/auth")
public class ApplicationUserController {

    private final ApplicationUserService applicationUserService;

    @Autowired
    public ApplicationUserController(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @PostMapping(path = "/register")
    public void register(@RequestBody ApplicationUser applicationUser) {
        applicationUserService.register(applicationUser);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        return applicationUserService.login(authenticationRequest);
    }

    @GetMapping(path = "/user/info")
    public ResponseEntity<?> getUserInfo(Principal user) {
        return applicationUserService.getUserInfo(user);
    }

    @GetMapping(path="/user/reservations")
    public ResponseEntity<List<Reservation>> getUserReservations(Principal user){
        return applicationUserService.getUserReservations(user);
    }

    @GetMapping(path="/user/reservation/containers")
    public ResponseEntity<List<String>> getUserContainers(Principal user){
        return applicationUserService.getUserContainers(user);
    }

}
