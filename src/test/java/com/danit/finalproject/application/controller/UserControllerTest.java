package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.service.UserService;
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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UserControllerTest {

	@Autowired
	private TestRestTemplate testRestTemplate;

	@Autowired
	private UserService userService;

	@Autowired
	private ObjectMapper objectMapper;

	private static String endpoint = String.format("http://%s:%s/api/users", "localhost", 9000);

	@Test
	@Transactional
	public void getUserById() throws IOException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<String> responseEntity =
				testRestTemplate.exchange(endpoint + "/1", HttpMethod.GET, requestEntity, String.class);
		String responseBody = responseEntity.getBody();
		User user = objectMapper.readValue(responseBody, User.class);

		Long expectedId = 1L;
		String expectedEmail = "first.user@test.com";

		assertEquals(expectedId, user.getId());
		assertEquals(expectedEmail, user.getEmail());

	}

	@Test
	@Transactional
	public void getUsersByEmail() throws IOException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<String> responseEntity =
				testRestTemplate.exchange(endpoint + "?email=first", HttpMethod.GET, requestEntity, String.class);
		String responseBody = responseEntity.getBody();
		List<User> users = objectMapper.readValue(responseBody, new TypeReference<List<User>>(){});

		int expectedUsersSize = 2;
		String expectedSecondUserEmail = "first.user@test2.com";

		assertEquals(expectedUsersSize, users.size());
		assertEquals(expectedSecondUserEmail, users.get(1).getEmail());
	}

	@Test
	@Transactional
	public void createUser() throws IOException {
		Long userAge = 30L;
		String userEmail = "createdUser@gmail.com";

		User user = new User();
		user.setAge(userAge);
		user.setEmail(userEmail);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> requestEntity = new HttpEntity<>(user, headers);

		ResponseEntity<String> responseEntity =
				testRestTemplate.exchange(endpoint, HttpMethod.POST, requestEntity, String.class);
		String responseBody = responseEntity.getBody();
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
	@Transactional
	public void updateUser() throws IOException {
		String userFirstName = "Updated";
		Long userId = 2L;
		User user = userService.getUserById(userId);
		user.setFirstName(userFirstName);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> requestEntity = new HttpEntity<>(user, headers);

		ResponseEntity<String> responseEntity =
				testRestTemplate.exchange(endpoint + "/2", HttpMethod.PUT, requestEntity, String.class);
		String responseBody = responseEntity.getBody();
		User updatedUser = objectMapper.readValue(responseBody, User.class);

		assertEquals(userFirstName, updatedUser.getFirstName());
		assertEquals(userFirstName, userService.getUserById(userId).getFirstName());
	}

	@Test
	@Transactional
	public void deleteUser() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

		testRestTemplate.exchange(endpoint + "/3", HttpMethod.DELETE, requestEntity, String.class);

		assertNull(userService.getUserById(3L));
	}
}