package com.voucherwebsite.controller;

import com.voucherwebsite.entity.User;
import com.voucherwebsite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Add this
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {

        if (userService.findByEmail(user.getEmail()) != null) {
            return "Email already exists!";
        }


        user.setPassword(passwordEncoder.encode(user.getPassword()));


        userService.saveUser(user);

        return "Registration successful!";
    }
}
