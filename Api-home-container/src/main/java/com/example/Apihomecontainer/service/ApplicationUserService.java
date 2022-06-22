package com.example.Apihomecontainer.service;

import com.example.Apihomecontainer.model.ApplicationUser;
import com.example.Apihomecontainer.service.DAO.ApplicationUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

import static com.example.Apihomecontainer.service.constants.Constants.LEVEL_PASSWORD_ENCODER;


@Service
@Slf4j
public class ApplicationUserService implements UserDetailsService {

    ApplicationUserRepository applicationUserRepository;
    PasswordEncoder passwordEncoder;

    @Autowired
    public ApplicationUserService(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(LEVEL_PASSWORD_ENCODER);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser user = applicationUserRepository.findUserByFirstName(username);
        if (user == null)
            throw new UsernameNotFoundException(String.format("Username %s was not found", username));
        return (UserDetails) user;
    }

    public void register(ApplicationUser applicationUser) {
        ApplicationUser user = new ApplicationUser(applicationUser.getFirstName()
                , applicationUser.getLastName()
                , applicationUser.getEmailAddress()
                , passwordEncoder.encode(applicationUser.getPassword()));
        try {
            applicationUserRepository.save(user);
            log.info("User was successful register");
        } catch (Exception e) {
            log.error("User was NOT successful register");
        }
    }
}
