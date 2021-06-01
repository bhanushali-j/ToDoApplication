package com.springboot.ToDo.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ToDo.dto.UserRequest;
import com.springboot.ToDo.dto.UserResponse;
import com.springboot.ToDo.exceptions.NotFoundException;
import com.springboot.ToDo.modal.User;
import com.springboot.ToDo.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	ModelMapper modelMapper;

	public User createUser(User user) {
		user = userRepository.save(user);
		return user;
	}

	public User getUserById(int id) {
		return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found with id: " + id));

	}

	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	public UserResponse login(UserRequest userRequest) {
		User existingUser = userRepository
				.findByUsernameAndPassword(userRequest.getUsername(), userRequest.getPassword())
				.orElseThrow(() -> new NotFoundException("Invalid credentials"));
		UserResponse userResponse = modelMapper.map(existingUser, UserResponse.class);
		return userResponse;

	}
}
