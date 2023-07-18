package io.getarrys.userservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
@EnableWebSecurity
@Configuration
public class bCryptPasswordEncoder {
    @Bean
    public PasswordEncoder passwordEncoder(){
       return new BCryptPasswordEncoder();
       // return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
