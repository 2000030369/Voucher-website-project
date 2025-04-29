package com.voucherwebsite.controller;

import com.voucherwebsite.dto.LoginRequest;
import com.voucherwebsite.entity.User;
import com.voucherwebsite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Add this
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Add this

    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        User user = userService.findByEmail(loginRequest.getEmail());
        if (user == null) {
            response.put("success", false);
            response.put("message", "Invalid email!");
            return response;
        }


        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid password!");
            return response;
        }


        response.put("success", true);
        response.put("user", user);  // send user details back

        return response;
    }
}
