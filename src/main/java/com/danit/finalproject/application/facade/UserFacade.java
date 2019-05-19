package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.RoleRequest;
import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequest;
import com.danit.finalproject.application.dto.request.UserRequest;
import com.danit.finalproject.application.dto.response.UserResponse;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.service.UserService;
import java.util.List;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
public class UserFacade extends AbstractDtoFacade<User, UserRequest, UserResponse> {

  private UserService userService;

  @Autowired
  public UserFacade(UserService userService) {
    this.userService = userService;
  }

  public UserResponse getPrincipalUser() {
    return mapEntityToResponseDto(userService.getPrincipalUser());
  }

  public Page<UserResponse> getUsersByEmail(String email, Pageable pageable) {
    Page<User> users = userService.getUsersByEmail(email, pageable);
    return mapEntityListToResponseDtoList(users);
  }

  public UserResponse setUserRoles(Long userId, List<RoleRequest> rolesDto) {
    List<Role> roles = modelMapper.map(rolesDto, new TypeToken<List<Role>>(){}.getType());
    User user = userService.setUserRoles(userId, roles);
    return mapEntityToResponseDto(user);
  }

  public UserResponse updateUserPassword(UpdateUserPasswordRequest userDto, BindingResult bindingResult) {
    User user = userService.updateUserPassword(userDto, bindingResult);
    return mapEntityToResponseDto(user);
  }

  public UserResponse generateToken(String email) {
    User user = userService.generateToken(email);
    return mapEntityToResponseDto(user);
  }

  public UserResponse registerNewUser(UserRequest userRequest) {
    User userToRegister = new User();
    userToRegister.setEmail(userRequest.getEmail());
    userToRegister.setPassword(userRequest.getPassword());
    User registeredUser = userService.create(userToRegister);
    return mapEntityToResponseDto(registeredUser);

  }

  public Page<UserResponse> getAllUsersByPlace(Long placeId, Pageable pageable) {
    Page<User> users = userService.getUsersByPlace(placeId, pageable);
    return mapEntityListToResponseDtoList(users);
  }
}
