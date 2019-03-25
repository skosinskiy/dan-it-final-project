package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.entity.Permission;
import lombok.Data;

import java.util.List;

@Data
public class RoleRequest {

  private Long id;
  private String name;
  private List<UserRequest> users;
  private List<Permission> permissions;

}
