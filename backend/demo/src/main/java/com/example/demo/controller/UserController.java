// src/main/java/com/example/demo/controller/UserController.java
package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*") // Allow all frontend origins (change as needed)
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Signup
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Login
    @PostMapping("/login")
    public boolean login(@RequestBody User loginUser) {
        Optional<User> user = userRepository.findByUsernameAndPassword(
            loginUser.getUsername(), loginUser.getPassword()
        );
        return user.isPresent();
    }
    
    
    @GetMapping("/profile/{username}")
    public ResponseEntity<User> getUserProfile(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

}
