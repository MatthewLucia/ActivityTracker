package com.example.activitytracker.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public void addNewUser(User user) {
        Optional<User> userOptional = userRepository.findUserByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            throw new IllegalStateException("User with email " + user.getEmail() + " already exists");
        }
        userRepository.save(user);
    }

    public void deleteUser(Integer userId) {
        boolean exists = userRepository.existsById(userId);
        if (!exists) {
            throw new IllegalArgumentException("User does not exist");
        }
        userRepository.deleteById(userId);
    }

    @Transactional
    public void updateUser(Integer userId,
                            String username,
                            String email,
                            String name,
                            Integer weight,
                            Integer height
                            ) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User does not exist"));

        if (!name.isEmpty() && !name.equals(user.getName())) {
            user.setName(name);
        }

        if (!username.isEmpty() && !username.equals(user.getUsername())) {
            user.setUsername(username);
        }

        if (!email.isEmpty() && !email.equals(user.getEmail())) {
            user.setEmail(email);
        }

        if (weight.intValue() != user.getWeight()) {
            user.setWeight(weight);
        }

        if (height.intValue() != user.getHeight()) {
            user.setHeight(height);
        }

    }
}
