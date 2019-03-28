package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.entity.Permission;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import lombok.Data;
import lombok.ToString;

@Data
public class RoleResponse {

  private Long id;
  private String name;
  @ToString.Exclude
  @JsonIgnore
  private List<UserResponse> users;
  private List<Permission> permissions;

}
