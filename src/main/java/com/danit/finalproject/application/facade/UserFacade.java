package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.RoleRequestDto;
import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequestDto;
import com.danit.finalproject.application.dto.request.UserRequestDto;
import com.danit.finalproject.application.dto.response.UserResponseDto;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
public class UserFacade extends AbstractDtoFacade<User, UserRequestDto, UserResponseDto> {

  private UserService userService;

  @Autowired
  public UserFacade(UserService userService) {
    this.userService = userService;
  }

  public UserResponseDto getPrincipalUser() {
    return mapEntityToResponseDto(userService.getPrincipalUser());
  }

  public List<UserResponseDto> getUsersByEmail(String email) {
    List<User> users = userService.getUsersByEmail(email);
    return mapEntityListToResponseDtoList(users);
  }

  public UserResponseDto setUserRoles(Long userId, List<RoleRequestDto> rolesDto) {
    List<Role> roles = modelMapper.map(rolesDto, new TypeToken<List<Role>>(){}.getType());
    User user = userService.setUserRoles(userId, roles);
    return mapEntityToResponseDto(user);
  }

  public UserResponseDto updateUserPassword(UpdateUserPasswordRequestDto userDto, BindingResult bindingResult) {
    User user = userService.updateUserPassword(userDto, bindingResult);
    return mapEntityToResponseDto(user);
  }
}
