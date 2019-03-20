package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Permission;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

  private UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
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
