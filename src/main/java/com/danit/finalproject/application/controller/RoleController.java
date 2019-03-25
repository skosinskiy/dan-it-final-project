package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.RoleRequest;
import com.danit.finalproject.application.dto.response.RoleResponse;
import com.danit.finalproject.application.facade.RoleFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/roles")
public class RoleController {

  private RoleFacade roleFacade;

  @Autowired
  public RoleController(RoleFacade roleFacade) {
    this.roleFacade = roleFacade;
  }

  @GetMapping
  public List<RoleResponse> getAllRoles() {
    return roleFacade.getAll();
  }

  @PostMapping
  public RoleResponse createRole(@RequestBody RoleRequest roleRequest) {
    return roleFacade.create(roleRequest);
  }

  @PutMapping("{roleId}")
  public RoleResponse updateRole(@PathVariable Long roleId, @RequestBody RoleRequest roleRequest) {
    return roleFacade.update(roleId, roleRequest);
  }

  @DeleteMapping("{roleId}")
  public RoleResponse deleteRole(@PathVariable Long roleId) {
    return roleFacade.delete(roleId);
  }

}
