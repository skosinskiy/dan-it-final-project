package com.danit.finalproject.application.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.danit.finalproject.application.dto.response.RoleResponse;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.service.RoleService;
import com.danit.finalproject.application.service.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(value = "first.user@test.com")
public class RoleControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private RoleService roleService;

  @Autowired
  private UserService userService;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  public void getAllRoles() throws Exception {
    int expectedRolesSize = 2;
    String expectedName = "admin";

    MvcResult result = mockMvc.perform(get("/api/roles"))
         .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<RoleResponse> roles = objectMapper.readValue(responseBody, new TypeReference<List<RoleResponse>>(){});

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
            .with(csrf())
            .content(roleJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    RoleResponse createdRole = objectMapper.readValue(responseBody, RoleResponse.class);

    assertEquals(expectedName, createdRole.getName());
    assertEquals(expectedRolesSize, roleService.getAll().size());
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
            .with(csrf())
            .content(roleJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    RoleResponse updatedRole = objectMapper.readValue(responseBody, RoleResponse.class);

    assertEquals(expectedName, updatedRole.getName());
    assertEquals(expectedName, roleService.getAll().get(0).getName());
    assertEquals(expectedRolesSize, roleService.getAll().size());
  }

  @Test
  public void deleteRole() throws Exception {
    int expectedRolesSize = 1;
    User user = userService.getById(2L);

    mockMvc.perform(delete("/api/roles/1").with(csrf()));

    assertNull(roleService.getById(1L));
    assertEquals(expectedRolesSize, roleService.getAll().size());
    assertEquals(expectedRolesSize, user.getRoles().size());
  }
}