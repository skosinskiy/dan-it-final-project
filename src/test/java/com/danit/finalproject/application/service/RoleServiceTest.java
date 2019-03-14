package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class RoleServiceTest {

  @Autowired
  private RoleService roleService;

  @Autowired
  private UserService userService;

  @Test
  public void getRoleById() {
    Long expectedId = 2L;
    String expectedName = "super-admin";

    Role role = roleService.getRoleById(expectedId);

    assertEquals(expectedId, role.getId());
    assertEquals(expectedName, role.getName());
  }

  @Test
  public void getAllRoles() {
    int expectedRolesSize = 2;
    String expectedName = "super-admin";

    List<Role> roles = roleService.getAllRoles();

    assertEquals(expectedRolesSize, roles.size());
    assertEquals(expectedName, roles.get(1).getName());
  }

  @Test
  public void createRole() {
    int expectedRolesSize = 3;
    String expectedRoleName = "user";

    Role role = new Role();
    role.setName(expectedRoleName);
    Role createdRole = roleService.createRole(role);

    assertEquals(expectedRoleName, createdRole.getName());
    assertEquals(expectedRolesSize, roleService.getAllRoles().size());
    assertNotNull(createdRole.getCreatedDate());
    assertNotNull(createdRole.getModifiedDate());
    assertNotNull(createdRole.getId());
  }

  @Test
  public void updateRole() {
    int expectedRolesSize = 2;
    String roleName = "updated-admin";
    Long roleId = 2L;

    Role role = roleService.getRoleById(roleId);
    role.setName(roleName);
    Role updatedRole = roleService.updateRole(roleId, role);

    assertEquals(roleName, updatedRole.getName());
    assertEquals(roleName, roleService.getRoleById(roleId).getName());
    assertEquals(expectedRolesSize, roleService.getAllRoles().size());
  }

  @Test
  public void deleteRole() {
    int expectedRolesSize = 1;
    User user = userService.getUserById(2L);

    roleService.deleteRole(2L);

    assertNull(roleService.getRoleById(2L));
    assertEquals(expectedRolesSize, roleService.getAllRoles().size());
    assertEquals(expectedRolesSize, user.getRoles().size());
  }
}