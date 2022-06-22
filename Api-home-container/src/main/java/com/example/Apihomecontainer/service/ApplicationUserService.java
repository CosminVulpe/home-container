package com.example.Apihomecontainer.service;

import com.example.Apihomecontainer.jwt.AuthenticationManagerHelper;
import com.example.Apihomecontainer.jwt.JWTTokenHelper;
import com.example.Apihomecontainer.model.ApplicationUser;
import com.example.Apihomecontainer.model.AuthenticationRequest;
import com.example.Apihomecontainer.model.Authority;
import com.example.Apihomecontainer.service.DAO.ApplicationUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.ArrayList;
import java.util.List;

import static com.example.Apihomecontainer.service.constants.Constants.*;


@Service
@Slf4j
public class ApplicationUserService implements UserDetailsService {

    private final ApplicationUserRepository applicationUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerHelper authenticationManagerHelper;
    private final JWTTokenHelper jwtTokenHelper;

    @Autowired
    public ApplicationUserService(ApplicationUserRepository applicationUserRepository
            , AuthenticationManagerHelper  authenticationManagerHelper
            , JWTTokenHelper jwtTokenHelper) {
        this.applicationUserRepository = applicationUserRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(LEVEL_PASSWORD_ENCODER);
        this.authenticationManagerHelper = authenticationManagerHelper;
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
                , passwordEncoder.encode(applicationUser.getPassword()));

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

    public ResponseEntity<?> login(AuthenticationRequest authenticationRequest) {
        final Authentication authentication =
                authenticationManagerHelper.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                authenticationRequest.getUserName()
                                , authenticationRequest.getPassword()
                        )
                );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtTokenHelper.generateToken(authentication.getPrincipal().toString());
        return ResponseEntity.ok(jwtToken);
    }
}
