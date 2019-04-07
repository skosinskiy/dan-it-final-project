package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.entity.Permission;
import java.util.List;
import lombok.Data;

@Data
public class RoleResponse {

  private Long id;
  private String name;
  private List<Permission> permissions;

}
