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
public class UserServiceTest {

	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	@Test
	public void getUserById() {
		Long expectedId = 1L;
		String expectedEmail = "first.user@test.com";

		User user = userService.getUserById(expectedId);

		assertEquals(expectedId, user.getId());
		assertEquals(expectedEmail, user.getEmail());
	}

	@Test
	public void getUsersByEmail() {
		int expectedUsersSize = 2;
		String expectedSecondUserEmail = "first.user@test2.com";

		List<User> users = userService.getUsersByEmail("First");

		assertEquals(expectedUsersSize, users.size());
		assertEquals(expectedSecondUserEmail, users.get(1).getEmail());
	}

	@Test
	public void createUser() {
		Long userAge = 30L;
		String userEmail = "createdUser@gmail.com";

		User user = new User();
		user.setAge(userAge);
		user.setEmail(userEmail);

		User createdUser = userService.createUser(user);

		Long createdUserId = createdUser.getId();

		assertEquals(userAge, createdUser.getAge());
		assertEquals(userEmail, createdUser.getEmail());
		assertNotNull(createdUser.getCreatedDate());
		assertNotNull(createdUser.getModifiedDate());
		assertNotNull(createdUserId);
		assertNotNull(userService.getUserById(createdUserId));
	}

	@Test
	public void updateUser() {
		String userFirstName = "Updated";
		Long userId = 2L;
		User user = userService.getUserById(userId);
		user.setFirstName(userFirstName);

		User updatedUser = userService.updateUser(userId, user);

		assertEquals(userFirstName, updatedUser.getFirstName());
		assertEquals(userFirstName, userService.getUserById(userId).getFirstName());
	}

	@Test
	public void deleteUser() {
		userService.deleteUser(2L);
		assertNull(userService.getUserById(2L));
	}

	@Test
	public void setUserRoles() {
		Long userId = 1L;
		List<Role> roles = roleService.getAllRoles();

		userService.setUserRoles(userId, roles);
		User user = userService.getUserById(userId);

		assertEquals(roles.size(), user.getRoles().size());
		assertEquals(roles.get(0).getName(), user.getRoles().get(0).getName());
	}
}