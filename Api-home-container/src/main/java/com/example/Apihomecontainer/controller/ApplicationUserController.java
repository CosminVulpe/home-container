package com.example.Apihomecontainer.controller;

import com.example.Apihomecontainer.model.ApplicationUser;
import com.example.Apihomecontainer.service.ApplicationUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
