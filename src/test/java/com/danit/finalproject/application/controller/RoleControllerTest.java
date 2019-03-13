package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.service.RoleService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import java.io.IOException;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class RoleControllerTest {

  @Autowired
  private TestRestTemplate testRestTemplate;

  @Autowired
  private RoleService roleService;

  @Autowired
  private ObjectMapper objectMapper;

  private static String endpoint = String.format("http://%s:%s/api/roles", "localhost", 9000);

  @Test
  @Transactional
  public void getAllRoles() throws IOException {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

    ResponseEntity<String> responseEntity =
        testRestTemplate.exchange(endpoint, HttpMethod.GET, requestEntity, String.class);
    String responseBody = responseEntity.getBody();
    List<Role> roles = objectMapper.readValue(responseBody, new TypeReference<List<Role>>(){});

    int expectedRolesSize = 2;
    String expectedFirstRoleName = "admin";

    assertEquals(expectedRolesSize, roles.size());
    assertEquals(expectedFirstRoleName, roles.get(0).getName());
  }

  @Test
  @Transactional
  public void createRole() throws IOException {
    String roleName = "user";

    Role role = new Role();
    role.setName("user");

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<Object> requestEntity = new HttpEntity<>(role, headers);

    ResponseEntity<String> responseEntity =
        testRestTemplate.exchange(endpoint, HttpMethod.POST, requestEntity, String.class);
    String responseBody = responseEntity.getBody();
    Role createdRole = objectMapper.readValue(responseBody, Role.class);

    assertEquals(roleName, createdRole.getName());
    assertNotNull(createdRole.getCreatedDate());
    assertNotNull(createdRole.getModifiedDate());
    assertNotNull(createdRole.getId());
  }

  @Test
  @Transactional
  public void updateRole() throws IOException {
    String roleName = "updated-admin";
    Long roleId = 1L;

    Role role = new Role();
    role.setName(roleName);
    role.setId(roleId);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<Object> requestEntity = new HttpEntity<>(role, headers);

    ResponseEntity<String> responseEntity =
        testRestTemplate.exchange(endpoint + "/1", HttpMethod.PUT, requestEntity, String.class);
    String responseBody = responseEntity.getBody();
    Role updatedRole = objectMapper.readValue(responseBody, Role.class);

    assertEquals(roleName, updatedRole.getName());
    assertEquals(roleName, roleService.getAllRoles().get(0).getName());
  }

  @Test
  @Transactional
  public void deleteRole() {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

    int expectedRolesSize = roleService.getAllRoles().size() - 1;

    testRestTemplate.exchange(endpoint + "/2", HttpMethod.DELETE, requestEntity, String.class);
    assertEquals(expectedRolesSize, roleService.getAllRoles().size());
  }
}