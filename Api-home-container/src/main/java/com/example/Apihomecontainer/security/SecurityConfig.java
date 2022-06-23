package com.example.Apihomecontainer.security;

import com.example.Apihomecontainer.jwt.JWTAuthenticationFilter;
import com.example.Apihomecontainer.jwt.JWTTokenHelper;
import com.example.Apihomecontainer.service.ApplicationUserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.example.Apihomecontainer.service.constants.Constants.LEVEL_PASSWORD_ENCODER;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final ApplicationUserService applicationUserService;
    private final AuthenticationEntryPoint authenticationEntryPoint;
    private final JWTTokenHelper jwtTokenHelper;

    public SecurityConfig(ApplicationUserService applicationUserService
            , AuthenticationEntryPoint authenticationEntryPoint
            , JWTTokenHelper jwtTokenHelper) {
        this.applicationUserService = applicationUserService;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.jwtTokenHelper = jwtTokenHelper;
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(LEVEL_PASSWORD_ENCODER);
    }

    @Bean
    @Override
    public  AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
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
