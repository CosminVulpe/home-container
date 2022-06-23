package com.example.Apihomecontainer.controller;

import com.example.Apihomecontainer.model.ApplicationUser;
import com.example.Apihomecontainer.model.AuthenticationRequest;
import com.example.Apihomecontainer.service.ApplicationUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping(path = "/auth")
public class ApplicationUserController {

    private final ApplicationUserService applicationUserService;

    @Autowired
    public ApplicationUserController(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @PostMapping(path="/register")
    public void register(@RequestBody ApplicationUser applicationUser){
        applicationUserService.register(applicationUser);
    }

    @PostMapping(path="/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
            return applicationUserService.login(authenticationRequest);
    }

    @GetMapping(path="/user/info")
    public ResponseEntity<?> getUserInfo(Principal user){
        ApplicationUser user1 = (ApplicationUser) applicationUserService.loadUserByUsername(user.getName());

        return ResponseEntity.ok(user1);
    }

}
