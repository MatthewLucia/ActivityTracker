package com.example.activitytracker.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner userCommandLineRunner(UserRepository repository) {
        return args -> {
            User demo_user = new User(
                    1L,
                    "mlucia",
                    "Password",
                    "mlucia@gmail.com",
                    "Matt",
                    "M",
                    180,
                    72
            );

            repository.save(demo_user);
        };
    }
}
