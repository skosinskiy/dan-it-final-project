package com.danit.finalproject.application.controller;

import static org.junit.Assert.*;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequestDto;
import com.danit.finalproject.application.entity.Gender;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.service.EmailService;
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
import org.springframework.boot.test.mock.mockito.MockBean;
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
public class UserControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private EmailService emailService;

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
  public void getCurrentUser() throws Exception {
    final Long ID = 1L;
    final String FIRST_NAME = "Elon";
    final String LAST_NAME = "Musk";
    final String EMAIL = "first.user@test.com";
    final Integer AGE = 24;
    final Gender GENDER = Gender.MALE;

    MvcResult response = this.mockMvc.perform(get("/api/users/current"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
        .andReturn();

    User responseUser = objectMapper
        .readValue(response.getResponse().getContentAsString(), User.class);

    assertNotNull(responseUser);
    assertEquals(FIRST_NAME, responseUser.getFirstName());
    assertEquals(LAST_NAME, responseUser.getLastName());
    assertEquals(EMAIL, responseUser.getEmail());
    assertEquals(AGE, responseUser.getAge());
    assertEquals(GENDER, responseUser.getGender());
  }

	@Test
	public void getUsersByEmail() throws Exception {
		int expectedUsersSize = 1;
		String expectedSecondUserEmail = "first.user@test.com";

		MvcResult result = mockMvc.perform(get("/api/users?email=first"))
				.andReturn();
		String responseBody = result.getResponse().getContentAsString();
		List<User> users = objectMapper.readValue(responseBody, new TypeReference<List<User>>(){});

		assertEquals(expectedUsersSize, users.size());
		assertEquals(expectedSecondUserEmail, users.get(0).getEmail());
	}

	@Test
	public void createUser() throws Exception {
		Integer userAge = 30;
		String userEmail = "createdUser@gmail.com";

		User user = new User();
		user.setAge(userAge);
		user.setEmail(userEmail);
		String userJson = objectMapper.writeValueAsString(user);

		MvcResult result = mockMvc.perform(
				post("/api/users")
						.with(csrf())
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
						.with(csrf())
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
		mockMvc.perform(delete("/api/users/2").with(csrf()));

		assertNull(userService.getUserById(2L));
	}

	@Test
	public void setUserRoles() throws Exception {
		List<Role> roles = roleService.getAllRoles();
		String rolesJson = objectMapper.writeValueAsString(roles);

		MvcResult result = mockMvc.perform(
				put("/api/users/1/roles")
						.with(csrf())
						.content(rolesJson)
						.contentType(MediaType.APPLICATION_JSON))
				.andReturn();
		String responseBody = result.getResponse().getContentAsString();
		User user = objectMapper.readValue(responseBody, User.class);

		assertEquals(roles.size(), user.getRoles().size());
		assertEquals(roles.get(0).getName(), user.getRoles().get(0).getName());
	}

	@Test
	public void generateToken() throws Exception {
		Long userId = 1L;
		String userEmail = "first.user@test.com";
		String token = "12b0e9eb-ad60-44ec-81d1-a759313856ce";
		long currentTime = System.currentTimeMillis();

		mockMvc.perform(
				put("/api/users/forgot-password/token")
						.with(csrf())
						.param("email", userEmail)
						.contentType(MediaType.APPLICATION_JSON));

		User user = userService.getUserById(userId);

		assertNotNull(user.getToken());
		assertNotEquals(token, user.getToken());
		assertTrue(user.getTokenExpirationDate().getTime() - currentTime > UserService.DAY_MILLISECONDS_COUNT);
		verify(emailService, times(1))
				.sendSimpleMessage(eq(userEmail), eq(UserService.PASS_RECOVERY_EMAIL_SUBJECT), anyString());
	}

	@Test
	public void updatePassword() throws Exception {
		String expectedPassword = "12345678";
		UpdateUserPasswordRequestDto userDto = UpdateUserPasswordRequestDto.builder()
				.token("12b0e9eb-ad60-44ec-81d1-a759313856ce")
				.password(expectedPassword)
				.passwordConfirmation(expectedPassword)
				.build();

		String userDtoJson = objectMapper.writeValueAsString(userDto);
		MvcResult result = mockMvc.perform(
				put("/api/users/forgot-password/update")
						.with(csrf())
						.content(userDtoJson)
						.contentType(MediaType.APPLICATION_JSON))
				.andReturn();
		String responseBody = result.getResponse().getContentAsString();
		User user = objectMapper.readValue(responseBody, User.class);

		assertNull(user.getToken());
		assertNull(user.getTokenExpirationDate());
		assertEquals(expectedPassword, user.getPassword());
	}
}