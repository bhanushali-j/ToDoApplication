package com.springboot.ToDo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ToDo.dto.UserRequest;
import com.springboot.ToDo.dto.UserResponse;
import com.springboot.ToDo.modal.User;
import com.springboot.ToDo.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("users")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User requestUser) {
		User user=userService.createUser(requestUser);
		return new ResponseEntity<>(user,HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<UserResponse> userlogin(@RequestBody UserRequest userRequest) {
	       UserResponse userResponse=userService.login(userRequest);
	       return new ResponseEntity<>(userResponse,HttpStatus.OK);
	}

}
