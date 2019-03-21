package com.danit.finalproject.application.service;

import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequestDto;
import com.danit.finalproject.application.entity.Permission;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

  public static final int DAY_MILLISECONDS_COUNT = 24 * 60 * 60 * 1000;
  public static final String PASS_RECOVERY_EMAIL_SUBJECT = "Password recovery";

  private UserRepository userRepository;
  private EmailService emailService;
  private ValidationService validationService;
  @Value("${react.server.port}")
  private String applicationPort;
  @Value("${react.server.host}")
  private String applicationHost;

  @Autowired
  public UserService(UserRepository userRepository, EmailService emailService, ValidationService validationService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.validationService = validationService;
  }

  public User getUserById(Long userId) {
    return userRepository.findById(userId).orElse(null);
  }

  public List<User> getUsersByEmail(String email) {
    return userRepository.findAllByEmailContainingIgnoreCase(email);
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

  public User getUserByToken(String token) {
    return userRepository.findByToken(token);
  }

  public User generateToken(String userEmail) {
    User user = userRepository.findByEmail(userEmail);
    if (user != null) {
      String token = generateAndSetToken(user);
      userRepository.save(user);
      sendPasswordRecoveryEmail(token, userEmail);
    }
    return user;
  }

  private String generateAndSetToken(User user) {
    String token = UUID.randomUUID().toString();
    user.setToken(token);
    user.setTokenExpirationDate(new Date(System.currentTimeMillis() + DAY_MILLISECONDS_COUNT));
    return token;
  }

  private void sendPasswordRecoveryEmail(String token, String userEmail) {
    String text = String.format("Please follow the link to change your password\n"
        + "http://%s:%s/reset-password/%s", applicationHost, applicationPort, token);
    emailService.sendSimpleMessage(userEmail, PASS_RECOVERY_EMAIL_SUBJECT, text);
  }

  public User updateUserPassword(UpdateUserPasswordRequestDto userDto, BindingResult bindingResult) {
    validationService.checkForValidationErrors(bindingResult);
    User user = userRepository.findByToken(userDto.getToken());
    user.setPassword(userDto.getPassword());
    user.setTokenExpirationDate(null);
    user.setToken(null);
    return userRepository.save(user);
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) {
    User user = userRepository.findByEmail(email);
    Set <Permission> permissions = new HashSet<>();
    user
        .getRoles()
        .stream()
        .map(Role::getPermissions)
        .forEach(permissions::addAll);

    return org.springframework.security.core.userdetails.User.builder()
        .username(user.getEmail())
        .roles(user.getRoles().stream().map(Role::getName).toArray(String[]::new))
        .authorities(permissions)
        .password(user.getPassword())
        .build();

  }
}
