package io.getarrys.userservice;

import io.getarrys.userservice.domain.Role;
import io.getarrys.userservice.domain.User;
import io.getarrys.userservice.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import sun.security.util.Password;

import java.util.ArrayList;

@SpringBootApplication
public class UserserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserserviceApplication.class, args);
    }
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
       CommandLineRunner run(UserService userService){
        return  args -> {
           userService.saveRole( new Role(1L,"ROLE_USER"));
           userService.saveRole( new Role(2L,"ROLE_MANGER"));
           userService.saveRole( new Role(3L,"ROLE_ADMIN"));
           userService.saveRole( new Role(4L,"ROLE_SUPER_ADMIN"));
           userService.saveUser(new User(5l,"John Travolta","john","1234",new ArrayList<>()));
            userService.saveUser(new User(6l,"Sam Smith","Sam","1234",new ArrayList<>()));
            userService.saveUser(new User(7l,"Jim Carry","jim","1234",new ArrayList<>()));
            userService.saveUser(new User(8l,"Arnold Schwar","arnold","1234",new ArrayList<>()));
            userService. addRoleToUser("john","ROLE_USER");
            userService.addRoleToUser("john","ROLE_MANGER");
            userService.addRoleToUser("Sam","ROLE_MANGER");
            userService.addRoleToUser("jim","ROLE_ADMIN");
            userService.addRoleToUser("arnold","ROLE_SUPER_ADMIN");
            userService.addRoleToUser("arnold","ROLE_ADMIN");
            userService.addRoleToUser("arnold","ROLE_USER");
        };
       }
}
