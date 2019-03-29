package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.repository.RoleRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements CrudService<Role> {

  private RoleRepository roleRepository;

  @Autowired
  public RoleService(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  @Override
  public Role getById(Long roleId) {
    return roleRepository.findById(roleId).orElse(null);
  }

  @Override
  public List<Role> getAll() {
    return roleRepository.findAll();
  }

  @Override
  public Role create(Role role) {
    return roleRepository.save(role);
  }

  @Override
  public Role update(Long roleId, Role role) {
    role.setId(roleId);
    return roleRepository.save(role);
  }

  @Override
  public Role delete(Long roleId) {
    Role role = roleRepository.findById(roleId).orElse(null);
    if (role != null && role.getUsers() != null) {
      role.getUsers().forEach(user -> user.getRoles().remove(role));
    }
    roleRepository.delete(role);
    return role;
  }
}
