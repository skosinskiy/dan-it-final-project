package com.danit.finalproject.application.service;

import com.danit.finalproject.application.dto.request.UpdateUserPassWordRequestDTO;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

  private static final int DAY_MILLISECONDS_COUNT = 24*60*60*1000;
  private static final String PASS_RECOVERY_EMAIL_SUBJECT = "Password recovery";

  private UserRepository userRepository;
  private EmailService emailService;

  @Autowired
  public UserService(
      UserRepository userRepository, EmailService emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  public User getUserById(Long userId) {
    return userRepository.findById(userId).orElse(null);
  }

  public List<User> getUsersByEmail(String email) {
    return userRepository.findAllByEmailStartingWithIgnoreCase(email);
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

  public User setUserRoles(Long userId, List<Role> roles) {
    Optional<User> optionalUser = userRepository.findById(userId);
    optionalUser.ifPresent(user -> user.setRoles(roles));
    User user = optionalUser.orElse(null);
    userRepository.save(user);
    return user;
  }

  public void generateToken(String userEmail) {
    User user = userRepository.findByEmail(userEmail);
    if (user != null) {
      String token = UUID.randomUUID().toString();
      user.setToken(token);
      user.setTokenExpirationDate(new Date(System.currentTimeMillis() + DAY_MILLISECONDS_COUNT));
      userRepository.save(user);
      String text = String.format("Please follow the link to change your password\n"
          + "http://localhost:3000/reset-password/%s", token);
      emailService.sendSimpleMessage(userEmail, PASS_RECOVERY_EMAIL_SUBJECT, text);
    }
  }

  public User updateUserPassword(UpdateUserPassWordRequestDTO userDTO) {
    String token = userDTO.getToken();
    String password = userDTO.getPassword();
    User user = userRepository.findByToken(token);
    if (System.currentTimeMillis() > user.getTokenExpirationDate().getTime()) {
      user.setPassword(password);
      user.setTokenExpirationDate(new Date(System.currentTimeMillis()));
      userRepository.save(user);
    }
    return user;
  }
}
