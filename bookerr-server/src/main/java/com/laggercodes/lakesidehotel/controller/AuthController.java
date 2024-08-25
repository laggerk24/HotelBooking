package com.laggercodes.lakesidehotel.controller;

import com.laggercodes.lakesidehotel.exception.UserAlreadyExistsException;
import com.laggercodes.lakesidehotel.model.User;
import com.laggercodes.lakesidehotel.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

public class AuthController {
    private final IUserService userService;

    public AuthController(IUserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register-user")
    public ResponseEntity<?>  registerUser(User user){
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful");
        }catch (UserAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
