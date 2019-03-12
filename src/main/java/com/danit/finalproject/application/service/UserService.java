package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User getUserById (Long userId) {
  	return userRepository.findById(userId).orElse(null);
  }

  public List<User> getUsersByEmail(String email) {
  	return userRepository.findAllByEmailStartingWith(email);
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public User updateUser(Long userId, User user) {
  	user.setId(userId);
  	return userRepository.save(user);
  }

  public User deleteUser(Long userId) {
	User user = userRepository.findById(userId).orElse(null);
	userRepository.delete(user);
	return user;
  }
}
