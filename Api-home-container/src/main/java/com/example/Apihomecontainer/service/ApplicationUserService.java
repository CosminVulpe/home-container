package com.example.Apihomecontainer.service;

import com.example.Apihomecontainer.jwt.JWTTokenHelper;
import com.example.Apihomecontainer.model.ApplicationUser;
import com.example.Apihomecontainer.model.AuthenticationRequest;
import com.example.Apihomecontainer.model.Authority;
import com.example.Apihomecontainer.model.ShippingContainer;
import com.example.Apihomecontainer.service.DAO.ApplicationUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;

import static com.example.Apihomecontainer.security.SecurityConfig.passwordEncoder;
import static com.example.Apihomecontainer.service.constants.Constants.*;


@Service
@Slf4j
public class ApplicationUserService implements UserDetailsService {
    private final ApplicationUserRepository applicationUserRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    private final JWTTokenHelper jwtTokenHelper;

    @Autowired
    public ApplicationUserService(ApplicationUserRepository applicationUserRepository
            , JWTTokenHelper jwtTokenHelper) {
        this.applicationUserRepository = applicationUserRepository;
        this.jwtTokenHelper = jwtTokenHelper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser user = applicationUserRepository.findUserByUsername(username);
        if (user == null)
            throw new UsernameNotFoundException(String.format("Username %s was not found", username));
        return user;
    }

    public void register(ApplicationUser applicationUser) {
        List<Authority> authorityList = new ArrayList<>();

        ApplicationUser user = new ApplicationUser(applicationUser.getFirstName()
                , applicationUser.getLastName()
                , applicationUser.getUsername()
                , applicationUser.getEmailAddress()
                , passwordEncoder().encode(applicationUser.getPassword()));

        authorityList.add(createAuthority(DEFAULT_ROLE, DEFAULT_ROLE_DESCRIPTION));
        user.setAuthorities(authorityList);
        try {
            applicationUserRepository.save(user);
            log.info("User was successful register");
        } catch (Exception e) {
            log.error("User was NOT successful register");
        }
    }

    private Authority createAuthority(String role, String roleDescription) {
        return Authority.builder()
                .id(null)
                .role(role)
                .roleDescription(roleDescription)
                .build();
    }

    public ResponseEntity<?> login(AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                authenticationRequest.getUserName()
                                , authenticationRequest.getPassword()));


        SecurityContextHolder.getContext().setAuthentication(authentication);
        ApplicationUser user = (ApplicationUser) authentication.getPrincipal();
        String jwtToken = jwtTokenHelper.generateToken(user.getUsername());
        return ResponseEntity.ok(jwtToken);
    }

    public ResponseEntity<?> getUserInfo(Principal user) {
        if (user != null) {
            return ResponseEntity.ok(getUser(user));
        }
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> getUserReservations(Principal user) {
        return ResponseEntity.ok(getUser(user).getReservations());
    }

    public ResponseEntity<?> getUserContainers(Principal user) {
        List<String> shippingContainerList = new ArrayList<>();
        getUser(user).getReservations().forEach(item -> shippingContainerList.add(item.getContainer().getName()));
        shippingContainerList.forEach(System.out::println);
        return ResponseEntity.ok(shippingContainerList);
    }


    private ApplicationUser getUser(Principal user){
        return (ApplicationUser) loadUserByUsername(user.getName());
    }

}
