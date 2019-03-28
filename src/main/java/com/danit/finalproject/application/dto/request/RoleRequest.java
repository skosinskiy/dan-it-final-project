package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.entity.Permission;
import java.util.List;
import lombok.Data;

@Data
public class RoleRequest {

  private Long id;
  private String name;
  private List<UserRequest> users;
  private List<Permission> permissions;

}
