package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Role;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class RoleServiceTest {

  @Autowired
  private RoleService roleService;

  @Test
  @Transactional
  public void getAllRoles() {
    List<Role> roles = roleService.getAllRoles();

    int expectedRolesSize = 2;
    String expectedFirstRoleName = "admin";

    assertEquals(expectedRolesSize, roles.size());
    assertEquals(expectedFirstRoleName, roles.get(0).getName());
  }

  @Test
  @Transactional
  public void createRole() {

    String roleName = "user";

    Role role = new Role();
    role.setName("user");

    Role createdRole = roleService.createRole(role);

    assertEquals(roleName, createdRole.getName());
    assertNotNull(createdRole.getCreatedDate());
    assertNotNull(createdRole.getModifiedDate());
    assertNotNull(createdRole.getId());
  }

  @Test
  @Transactional
  public void updateRole() {
    String roleName = "updated-admin";
    Long roleId = 1L;

    Role role = new Role();
    role.setName(roleName);
    role.setId(roleId);

    Role updatedRole = roleService.updateRole(roleId, role);

    assertEquals(roleName, updatedRole.getName());
    assertEquals(roleName, roleService.getAllRoles().get(0).getName());
  }

  @Test
  @Transactional
  public void deleteRole() {
    roleService.deleteRole(2L);
    int expectedRolesSize = 1;
    assertEquals(expectedRolesSize, roleService.getAllRoles().size());
  }
}