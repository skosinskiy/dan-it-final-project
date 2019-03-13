package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.service.RoleService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class RoleControllerTest extends AbstractTransactionalJUnit4SpringContextTests {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private RoleService roleService;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  public void getAllRoles() throws Exception {
    int expectedRolesSize = 2;
    String expectedName = "admin";

    MvcResult result = mockMvc.perform(get("/api/roles"))
         .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<Role> roles = objectMapper.readValue(responseBody, new TypeReference<List<Role>>(){});

    assertEquals(expectedRolesSize, roles.size());
    assertEquals(expectedName, roles.get(0).getName());
  }

  @Test
  public void createRole() throws Exception {
    int expectedRolesSize = 3;
    String expectedName = "user";

    Role role = new Role();
    role.setName(expectedName);
    String roleJson = objectMapper.writeValueAsString(role);

    MvcResult result = mockMvc.perform(
        post("/api/roles")
            .content(roleJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Role createdRole = objectMapper.readValue(responseBody, Role.class);

    assertEquals(expectedName, createdRole.getName());
    assertEquals(expectedRolesSize, roleService.getAllRoles().size());
    assertNotNull(createdRole.getCreatedDate());
    assertNotNull(createdRole.getModifiedDate());
    assertNotNull(createdRole.getId());
  }

  @Test
  public void updateRole() throws Exception {
    int expectedRolesSize = 2;
    String expectedName = "updated-admin";
    Long roleId = 1L;

    Role role = new Role();
    role.setName(expectedName);
    role.setId(roleId);
    String roleJson = objectMapper.writeValueAsString(role);

    MvcResult result = mockMvc.perform(
        put("/api/roles/1")
            .content(roleJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Role updatedRole = objectMapper.readValue(responseBody, Role.class);

    assertEquals(expectedName, updatedRole.getName());
    assertEquals(expectedName, roleService.getAllRoles().get(0).getName());
    assertEquals(expectedRolesSize, roleService.getAllRoles().size());
  }

  @Test
  public void deleteRole() throws Exception {
    int expectedRolesSize = 1;

    mockMvc.perform(delete("/api/roles/1"));

    assertNull(roleService.getRoleById(1L));
    assertEquals(expectedRolesSize, roleService.getAllRoles().size());
  }
}