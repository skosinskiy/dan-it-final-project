package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("users/{userId}")
  public User getUserById(@PathVariable Long userId) {
    return userService.getUserById(userId);
  }

  @GetMapping("users")
  public List<User> getUsersByEmail(@RequestParam String email) {
    return userService.getUsersByEmail(email);
  }

  @PostMapping("users")
  public User createUser(@RequestBody User user) {
    return userService.createUser(user);
  }

  @PutMapping("users/{userId}")
  public User updateUser(@PathVariable Long userId, @RequestBody User user) {
    return userService.updateUser(userId, user);
  }

  @DeleteMapping("users/{userId}")
  public User deleteUser(@PathVariable Long userId) {
    return userService.deleteUser(userId);
  }

}
