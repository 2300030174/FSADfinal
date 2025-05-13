package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // User Registration
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // Check if username already exists
            if (userRepository.existsByUsername(user.getUsername())) {
                return ResponseEntity.badRequest().body("Error: Username is already taken!");
            }

            // Check if email already exists
            if (userRepository.existsByEmail(user.getEmail())) {
                return ResponseEntity.badRequest().body("Error: Email is already in use!");
            }

            // Create new user account
            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setEmail(user.getEmail());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setName(user.getName());
            newUser.setAge(user.getAge());
            newUser.setCountry(user.getCountry());

            userRepository.save(newUser);
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
        try {
            Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
            
            if (user.isEmpty() || !passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
                return ResponseEntity.badRequest().body("Error: Invalid username or password!");
            }
            
            return ResponseEntity.ok(user.get());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // Get User Profile
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getUserProfile(@PathVariable String username) {
        try {
            Optional<User> user = userRepository.findByUsername(username);
            return user.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // Update User Profile
    @PutMapping("/profile/{username}")
    public ResponseEntity<?> updateProfile(@PathVariable String username, @RequestBody User updatedUser) {
        try {
            Optional<User> userOptional = userRepository.findByUsername(username);
            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            User user = userOptional.get();
            user.setName(updatedUser.getName());
            user.setAge(updatedUser.getAge());
            user.setCountry(updatedUser.getCountry());
            
            // Only update password if it's provided
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            userRepository.save(user);
            return ResponseEntity.ok("Profile updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}