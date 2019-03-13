package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.service.RoleService;
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
@RequestMapping("api")
public class RoleController {

  @Autowired
  private RoleService roleService;

  @GetMapping("roles")
  public List<Role> getAllRoles() {
    return roleService.getAllRoles();
  }

  @PostMapping("roles")
  public Role createRole(@RequestBody Role role) {
    return roleService.createRole(role);
  }

  @PutMapping("roles/{roleId}")
  public Role updateRole(@PathVariable Long roleId, @RequestBody Role role) {
    return roleService.updateRole(roleId, role);
  }

  @DeleteMapping("roles/{roleId}")
  public Role deleteRole(@PathVariable Long roleId) {
    return roleService.deleteRole(roleId);
  }

}
