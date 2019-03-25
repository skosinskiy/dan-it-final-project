package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.entity.Permission;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
public class RoleResponse {

  private Long id;
  private String name;
  @ToString.Exclude
  @JsonIgnore
  private List<UserResponse> users;
  private List<Permission> permissions;

}