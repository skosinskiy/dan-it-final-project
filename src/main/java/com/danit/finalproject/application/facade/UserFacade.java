package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.RoleRequest;
import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequest;
import com.danit.finalproject.application.dto.request.UserRequest;
import com.danit.finalproject.application.dto.response.UserResponse;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.service.UserService;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

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

  public List<UserResponse> getUsersByEmail(String email) {
    List<User> users = userService.getUsersByEmail(email);
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
}
