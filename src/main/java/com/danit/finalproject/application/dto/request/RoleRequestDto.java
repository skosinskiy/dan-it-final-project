package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.entity.Permission;
import lombok.Data;

import java.util.List;

@Data
public class RoleRequestDto {

  private Long id;
  private String name;
  private List<UserRequestDto> users;
  private List<Permission> permissions;

}
