package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.repository.RoleRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RoleServiceTest {

  @Autowired
  private RoleService roleService;

  @MockBean
  private RoleRepository roleRepository;

  private static Role firstMockRole;
  private static Role secondMockRole;

  @Before
  public void initializeMockUsers() throws ParseException {
    Role firstRole = new Role();
    firstRole.setId(1L);
    firstRole.setName("admin");
    firstRole.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
            .parse("2019-03-12 14:00:00"));
    firstRole.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
            .parse("2019-03-13 14:01:00"));

    Role secondRole = new Role();
    secondRole.setId(2L);
    secondRole.setName("super-admin");
    secondRole.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
            .parse("2019-03-13 15:00:00"));
    secondRole.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
            .parse("2019-03-13 15:01:00"));

    firstMockRole = firstRole;
    secondMockRole = secondRole;
  }

  @Test
  public void verifyFindByIdCalledOnce() {
    Long expectedId = 2L;
    String expectedName = "super-admin";

    when(roleRepository.findById(expectedId)).thenReturn(Optional.of(secondMockRole));
    Role role = roleService.getRoleById(expectedId);

    verify(roleRepository, times(1)).findById(expectedId);
    assertEquals(expectedId, role.getId());
    assertEquals(expectedName, role.getName());
  }

  @Test
  public void verifyFindAllCalledOnce() {
    int expectedRolesSize = 2;
    String expectedName = "super-admin";

    List<Role> mockRoles = new ArrayList<>();
    mockRoles.add(firstMockRole);
    mockRoles.add(secondMockRole);
    when(roleRepository.findAll()).thenReturn(mockRoles);
    List<Role> roles = roleService.getAllRoles();

    verify(roleRepository, times(1)).findAll();
    assertEquals(expectedRolesSize, roles.size());
    assertEquals(expectedName, roles.get(1).getName());
  }

  @Test
  public void verifySaveOnCreateCalledOnce() {
    String expectedRoleName = "user";

    firstMockRole.setName(expectedRoleName);
    when(roleRepository.save(firstMockRole)).thenReturn(firstMockRole);
    Role createdRole = roleService.createRole(firstMockRole);

    verify(roleRepository, times(1)).save(firstMockRole);
    assertEquals(expectedRoleName, createdRole.getName());
    assertNotNull(createdRole.getCreatedDate());
    assertNotNull(createdRole.getModifiedDate());
    assertNotNull(createdRole.getId());
  }

  @Test
  public void verifySaveOnUpdateCalledOnce() {
    String roleName = "updated-admin";
    Long roleId = 2L;

    secondMockRole.setName(roleName);
    when(roleRepository.save(secondMockRole)).thenReturn(secondMockRole);
    Role updatedRole = roleService.updateRole(roleId, secondMockRole);

    verify(roleRepository, times(1)).save(secondMockRole);
    assertEquals(roleName, updatedRole.getName());
  }

  @Test
  public void verifyDeleteCalledOnce() {
    when(roleRepository.findById(2L)).thenReturn(Optional.of(secondMockRole));
    roleService.deleteRole(2L);

    verify(roleRepository, times(1)).delete(secondMockRole);
  }
}