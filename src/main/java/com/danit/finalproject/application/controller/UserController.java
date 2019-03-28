package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.RoleRequest;
import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequest;
import com.danit.finalproject.application.dto.request.UserRequest;
import com.danit.finalproject.application.dto.response.UserResponse;
import com.danit.finalproject.application.facade.UserFacade;
import com.danit.finalproject.application.service.UserService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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
  public UserResponse getUserById(@PathVariable Long userId) {
    return userFacade.getById(userId);
  }

  @GetMapping("current")
  public UserResponse getCurrentUser() {
    return userFacade.getPrincipalUser();
  }

  @GetMapping
  public ResponseEntity<Page<UserResponse>> getUsersByEmail(@RequestParam String email, Pageable pageable) {
    return ResponseEntity.ok(userFacade.getUsersByEmail(email, pageable));
  }

  @PostMapping
  public UserResponse createUser(@RequestBody UserRequest userRequest) {
    return userFacade.create(userRequest);
  }

  @PutMapping("{userId}")
  public UserResponse updateUser(@PathVariable Long userId, @RequestBody UserRequest userRequest) {
    return userFacade.update(userId, userRequest);
  }

  @DeleteMapping("{userId}")
  public UserResponse deleteUser(@PathVariable Long userId) {
    return userFacade.delete(userId);
  }

  @PutMapping("{userId}/roles")
  public UserResponse setUserRoles(@PathVariable Long userId, @RequestBody List<RoleRequest> roles) {
    return userFacade.setUserRoles(userId, roles);
  }

  @PutMapping("forgot-password/token")
  public void generateToken(@RequestParam String email) {
    userService.generateToken(email);
  }

  @PutMapping("forgot-password/update")
  public UserResponse updatePassword(
      @RequestBody @Valid UpdateUserPasswordRequest userDto,
      BindingResult bindingResult) {
    return userFacade.updateUserPassword(userDto, bindingResult);
  }

}
