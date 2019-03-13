package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.service.RoleService;
import com.danit.finalproject.application.service.UserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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
public class UserControllerTest extends AbstractTransactionalJUnit4SpringContextTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	public void getUserById() throws Exception {
		Long expectedId = 1L;
		String expectedEmail = "first.user@test.com";

		MvcResult result = mockMvc.perform(get("/api/users/1"))
				.andReturn();
		String responseBody = result.getResponse().getContentAsString();
		User user = objectMapper.readValue(responseBody, User.class);

		assertEquals(expectedId, user.getId());
		assertEquals(expectedEmail, user.getEmail());

	}

	@Test
	public void getUsersByEmail() throws Exception {
		int expectedUsersSize = 2;
		String expectedSecondUserEmail = "first.user@test2.com";

		MvcResult result = mockMvc.perform(get("/api/users?email=first"))
				.andReturn();
		String responseBody = result.getResponse().getContentAsString();
		List<User> users = objectMapper.readValue(responseBody, new TypeReference<List<User>>(){});

		assertEquals(expectedUsersSize, users.size());
		assertEquals(expectedSecondUserEmail, users.get(1).getEmail());
	}

	@Test
	public void createUser() throws Exception {
		Long userAge = 30L;
		String userEmail = "createdUser@gmail.com";

		User user = new User();
		user.setAge(userAge);
		user.setEmail(userEmail);
		String userJson = objectMapper.writeValueAsString(user);

		MvcResult result = mockMvc.perform(
				post("/api/users")
						.content(userJson)
						.contentType(MediaType.APPLICATION_JSON))
				.andReturn();
		String responseBody = result.getResponse().getContentAsString();
		User createdUser = objectMapper.readValue(responseBody, User.class);
		Long createdUserId = createdUser.getId();

		assertEquals(userAge, createdUser.getAge());
		assertEquals(userEmail, createdUser.getEmail());
		assertNotNull(createdUser.getCreatedDate());
		assertNotNull(createdUser.getModifiedDate());
		assertNotNull(createdUserId);
		assertNotNull(userService.getUserById(createdUserId));
	}

	@Test
	public void updateUser() throws Exception {
		String userFirstName = "Updated";
		Long userId = 2L;
		User user = userService.getUserById(userId);
		user.setFirstName(userFirstName);
		String userJson = objectMapper.writeValueAsString(user);

		MvcResult result = mockMvc.perform(
				put("/api/users/2")
						.content(userJson)
						.contentType(MediaType.APPLICATION_JSON))
				.andReturn();
		String responseBody = result.getResponse().getContentAsString();
		User updatedUser = objectMapper.readValue(responseBody, User.class);

		assertEquals(userFirstName, updatedUser.getFirstName());
		assertEquals(userFirstName, userService.getUserById(userId).getFirstName());
	}

	@Test
	public void deleteUser() throws Exception {
		mockMvc.perform(delete("/api/roles/3"));

		assertNull(userService.getUserById(3L));
	}

	@Test
	public void setUserRoles() throws Exception {
		List<Role> roles = roleService.getAllRoles();
		String rolesJson = objectMapper.writeValueAsString(roles);

		MvcResult result = mockMvc.perform(
				put("/api/users/1/roles")
						.content(rolesJson)
						.contentType(MediaType.APPLICATION_JSON))
				.andReturn();
		String responseBody = result.getResponse().getContentAsString();
		User user = objectMapper.readValue(responseBody, User.class);

		assertEquals(roles.size(), user.getRoles().size());
		assertEquals(roles.get(0).getName(), user.getRoles().get(0).getName());
	}
}