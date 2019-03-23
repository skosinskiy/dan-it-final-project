package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.entity.Permission;
import lombok.Data;

import java.util.List;

@Data
public class RoleResponseDto {

  private Long id;
  private String name;
  private List<UserResponseDto> users;
  private List<Permission> permissions;

}
