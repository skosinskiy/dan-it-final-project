package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

  @Autowired
  private RoleRepository roleRepository;

  public List<Role> getAllRoles() {
    return roleRepository.findAll();
  }

  public Role createRole(Role role) {
    return roleRepository.save(role);
  }

  public Role updateRole(Long roleId, Role role) {
    role.setId(roleId);
    return roleRepository.save(role);
  }

  public Role deleteRole(Long roleId) {
    Role role = roleRepository.findById(roleId).orElse(null);
    if (role != null) {
      role.getUsers().forEach(user -> user.removeRole(role));
    }
    roleRepository.delete(role);
    return role;
  }
}
