package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.RoleRequestDto;
import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequestDto;
import com.danit.finalproject.application.dto.request.UserRequestDto;
import com.danit.finalproject.application.dto.response.UserResponseDto;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.facade.UserFacade;
import com.danit.finalproject.application.service.UserService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("api/users")
public class UserController {

  private UserService userService;
  private UserFacade userFacade;

  @Autowired
  public UserController(UserService userService, UserFacade userFacade) {
    this.userService = userService;
    this.userFacade = userFacade;
  }

  @GetMapping("{userId}")
  public UserResponseDto getUserById(@PathVariable Long userId) {
    return userFacade.getById(userId);
  }

  @GetMapping("current")
  public UserResponseDto getCurrentUser() {
    return userFacade.getPrincipalUser();
  }

  @GetMapping
  public List<UserResponseDto> getUsersByEmail(@RequestParam String email) {
    return userFacade.getUsersByEmail(email);
  }

  @PostMapping
  public UserResponseDto createUser(@RequestBody UserRequestDto userRequestDto) {
    return userFacade.create(userRequestDto);
  }

  @PutMapping("{userId}")
  public UserResponseDto updateUser(@PathVariable Long userId, @RequestBody UserRequestDto userRequestDto) {
    return userFacade.update(userId, userRequestDto);
  }

  @DeleteMapping("{userId}")
  public UserResponseDto deleteUser(@PathVariable Long userId) {
    return userFacade.delete(userId);
  }

  @PutMapping("{userId}/roles")
  public UserResponseDto setUserRoles(@PathVariable Long userId, @RequestBody List<RoleRequestDto> roles) {
    return userFacade.setUserRoles(userId, roles);
  }

  @PutMapping("forgot-password/token")
  public void generateToken(@RequestParam String email) {
    userService.generateToken(email);
  }

  @PutMapping("forgot-password/update")
  public UserResponseDto updatePassword(
      @RequestBody @Valid UpdateUserPasswordRequestDto userDto,
      BindingResult bindingResult) {
    return userFacade.updateUserPassword(userDto, bindingResult);
  }

}
