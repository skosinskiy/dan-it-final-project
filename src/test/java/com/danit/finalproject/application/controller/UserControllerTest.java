package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UserControllerTest {

	@Autowired
	private TestRestTemplate testRestTemplate;

	@Autowired
	private ObjectMapper objectMapper;

	private static String endpoint = String.format("http://%s:%s/api/users", "localhost", 9000);

	@Test
	public void getUserById() throws IOException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<String> responseEntity = testRestTemplate.exchange(endpoint + "/1",
				HttpMethod.GET, requestEntity, String.class);
		String responseBody = responseEntity.getBody();
		User user = objectMapper.readValue(responseBody, User.class);

		Long expectedId = 1L;
		String expectedEmail = "first.user@test.com";

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(expectedId, user.getId());
		assertEquals(expectedEmail, user.getEmail());

	}

	@Test
	public void getUsersByEmail() {
	}

	@Test
	public void createUser() {
	}

	@Test
	public void updateUser() {
	}

	@Test
	public void deleteUser() {
	}
}