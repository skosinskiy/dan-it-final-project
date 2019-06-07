package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.RoleRequest;
import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequest;
import com.danit.finalproject.application.dto.request.UserRequest;
import com.danit.finalproject.application.dto.response.UserResponse;
import com.danit.finalproject.application.dto.view.View;
import com.danit.finalproject.application.facade.UserFacade;
import java.util.List;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

  private UserFacade userFacade;

  @Autowired
  public UserController(UserFacade userFacade) {
    this.userFacade = userFacade;
  }

  @GetMapping("{userId}")
  @JsonView(View.User.class)
  public ResponseEntity<UserResponse> getUserById(@PathVariable Long userId) {
    return new ResponseEntity<>(userFacade.getById(userId), HttpStatus.OK);
  }

  @GetMapping("place/{placeId}")
  @JsonView(View.User.class)
  public ResponseEntity<Page<UserResponse>> getUsersByPlace(@PathVariable Long placeId, Pageable pageable) {
    return new ResponseEntity<>(userFacade.getAllUsersByPlace(placeId, pageable), HttpStatus.OK);
  }

  @GetMapping("current")
  @JsonView(View.User.class)
  public ResponseEntity<UserResponse> getCurrentUser() {
    return new ResponseEntity<>(userFacade.getPrincipalUser(), HttpStatus.OK);
  }

  @PutMapping("current/place/{placeId}")
  @JsonView(View.User.class)
  public ResponseEntity<UserResponse> updateCurrentPlace(@PathVariable Long placeId) {
    return new ResponseEntity<>(userFacade.updateCurrentPlace(placeId), HttpStatus.OK);
  }

  @GetMapping
  @JsonView(View.User.class)
  public ResponseEntity<Page<UserResponse>> getUsersByEmail(
      @RequestParam String email,
      @PageableDefault Pageable pageable) {
    return new ResponseEntity<>(userFacade.getUsersByEmail(email, pageable), HttpStatus.OK);
  }

  @PostMapping
  @PreAuthorize("hasAuthority('MANAGE_USERS')")
  @JsonView(View.User.class)
  public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
    return new ResponseEntity<>(userFacade.create(userRequest), HttpStatus.OK);
  }

  @PutMapping("{userId}")
  @JsonView(View.User.class)
  @PreAuthorize("hasAuthority('MANAGE_USERS')")
  public ResponseEntity<UserResponse> updateUser(@PathVariable Long userId, @RequestBody UserRequest userRequest) {
    return new ResponseEntity<>(userFacade.update(userId, userRequest), HttpStatus.OK);
  }

  @DeleteMapping("{userId}")
  @JsonView(View.User.class)
  @PreAuthorize("hasAuthority('MANAGE_USERS')")
  public ResponseEntity<UserResponse> deleteUser(@PathVariable Long userId) {
    return new ResponseEntity<>(userFacade.delete(userId), HttpStatus.OK);
  }

  @PutMapping("{userId}/roles")
  @JsonView(View.User.class)
  @PreAuthorize("hasAuthority('MANAGE_USERS')")
  public ResponseEntity<UserResponse> setUserRoles(@PathVariable Long userId, @RequestBody List<RoleRequest> roles) {
    return new ResponseEntity<>(userFacade.setUserRoles(userId, roles), HttpStatus.OK);
  }

  @PutMapping("forgot-password/token")
  @JsonView(View.User.class)
  public void generateToken(@RequestParam String email) {
    userFacade.generateToken(email);
  }

  @PutMapping("forgot-password/update")
  @JsonView(View.User.class)
  public ResponseEntity<UserResponse> updatePassword(
      @RequestBody @Valid UpdateUserPasswordRequest userDto,
      BindingResult bindingResult) {
    return new ResponseEntity<>(userFacade.updateUserPassword(userDto, bindingResult), HttpStatus.OK);
  }

  @PostMapping("register")
  @JsonView(View.User.class)
  public ResponseEntity<UserResponse> registerNewUser(@RequestBody UserRequest userRequest) {
    return new ResponseEntity<>(userFacade.registerNewUser(userRequest), HttpStatus.OK);
  }

  @PutMapping("/pair/{placeId}")
  @JsonView(View.User.class)
  public ResponseEntity<UserResponse> addNewPlaceToUser(@PathVariable Long placeId) {
    return new ResponseEntity<>(userFacade.addNewPlaceToUser(placeId), HttpStatus.OK);
  }

  @PutMapping("/unpair/{placeId}")
  @JsonView(View.User.class)
  public ResponseEntity<UserResponse> removePlaceFromUser(@PathVariable Long placeId) {
    return new ResponseEntity<>(userFacade.removePlaceFromUser(placeId), HttpStatus.OK);
  }

}
