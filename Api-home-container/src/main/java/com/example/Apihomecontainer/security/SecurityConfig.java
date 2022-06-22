package com.example.Apihomecontainer.security;

import com.example.Apihomecontainer.jwt.JWTAuthenticationFilter;
import com.example.Apihomecontainer.jwt.JWTTokenHelper;
import com.example.Apihomecontainer.jwt.RestAuthenticationEntryPoint;
import com.example.Apihomecontainer.service.ApplicationUserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.example.Apihomecontainer.service.constants.Constants.DEFAULT_ROLE;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final ApplicationUserService applicationUserService;
    private final JWTTokenHelper jwtTokenHelper;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    public SecurityConfig(ApplicationUserService applicationUserService
            , JWTTokenHelper jwtTokenHelper
            , RestAuthenticationEntryPoint restAuthenticationEntryPoint) {
        this.applicationUserService = applicationUserService;
        this.jwtTokenHelper = jwtTokenHelper;
        this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .exceptionHandling()
                    .authenticationEntryPoint(restAuthenticationEntryPoint)
                .and()
                    .authorizeRequests((request) ->
                            request.antMatchers("/auth/register").permitAll()
                                    .antMatchers("/**").permitAll()
                            .anyRequest().authenticated())
                    .addFilterBefore(new JWTAuthenticationFilter(applicationUserService, jwtTokenHelper)
                        , UsernamePasswordAuthenticationFilter.class);
        http.csrf().disable().cors().and().headers().frameOptions().disable();
    }
}
