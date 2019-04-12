package com.danit.finalproject.application.service;

import static org.junit.Assert.*;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequest;
import com.danit.finalproject.application.entity.Gender;
import com.danit.finalproject.application.entity.Permission;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.repository.UserRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.BindingResult;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

	@Autowired
	private UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@MockBean
	private UserRepository userRepository;
	@MockBean
	private EmailService emailService;
	@MockBean
	private ValidationService validationService;
	@MockBean
	private BindingResult bindingResult;

	private static User firstMockUser;
	private static User secondMockUser;

	@Rule
	public ExpectedException exception = ExpectedException.none();

	@Before
	public void initializeMockUsers() throws ParseException {
		User firstUser = new User();

		ArrayList<Role> roles = new ArrayList<>();
		Role role = new Role();
		role.setName("test");
		role.setPermissions(new ArrayList<>());
		role.getPermissions().add(Permission.ADMIN_USER);
		role.getPermissions().add(Permission.MANAGE_BUILDING_TYPES);
		roles.add(role);

		firstUser.setId(1L);
		firstUser.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
				.parse("2019-03-12 12:00:00"));
		firstUser.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
				.parse("2019-03-12 12:01:00"));
		firstUser.setAge(24);
		firstUser.setEmail("first.user@test.com");
		firstUser.setFirstName("Elon");
		firstUser.setLastName("Musk");
		firstUser.setGender(Gender.MALE);
		firstUser.setToken("ddcc2361-ce4f-47bc-bf5e-fc39ca73d0e0");
		firstUser.setRoles(roles);
		firstUser.setPassword("password");
		firstMockUser = firstUser;

		User secondUser = new User();
		secondUser.setId(2L);
		secondUser.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
				.parse("2019-03-13 13:00:00"));
		secondUser.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
				.parse("2019-03-13 13:01:00"));
		secondUser.setAge(25);
		secondUser.setEmail("first.user@test2.com");
		secondUser.setFirstName("Mark");
		secondUser.setLastName("Zuckerberg");
		secondUser.setGender(Gender.MALE);
		secondMockUser = secondUser;
	}

	@Test
	public void verifyFindByIdCalledOnce() {
		Long expectedId = 1L;
		String expectedEmail = "first.user@test.com";

		when(userRepository.findById(expectedId)).thenReturn(Optional.of(firstMockUser));
		User user = userService.getById(expectedId);

		verify(userRepository, times(1)).findById(expectedId);
		assertEquals(expectedId, user.getId());
		assertEquals(expectedEmail, user.getEmail());
	}

	@Test
	public void verifyFindAllCalledOnce() {
		when(userRepository.findAll()).thenReturn(new ArrayList<>());
		List<User> result = userService.getAll();
		verify(userRepository, times(1)).findAll();
		assertNotNull(result);
	}

	@Test
	public void verifyFindByEmailCalledOnce() {
		String email = "test";
		when(userRepository.findByEmail(email)).thenReturn(new User());
		User result = userService.getByEmail(email);
		verify(userRepository, times(1)).findByEmail(email);
		assertNotNull(result);
	}

  	@Test
  	public void verifyFindAllByEmailCalledOnce() {
  		int expectedUsersSize = 2;
  		String expectedSearchEmail = "FiRst";
  		String expectedSecondUserEmail = "first.user@test2.com";
  		Pageable pageable = PageRequest.of(0, 25);

  		List<User> mockUsers = new ArrayList<>();
  		mockUsers.add(firstMockUser);
  		mockUsers.add(secondMockUser);

      Page<User> userPageable = new PageImpl<>(mockUsers);


      when(userRepository.findAllByEmailStartingWithIgnoreCase(expectedSearchEmail,  PageRequest.of(0, 25)))
          .thenReturn(userPageable);
  		Page<User> users = userService.getUsersByEmail(expectedSearchEmail, pageable);

  		verify(userRepository, times(1))
  				.findAllByEmailStartingWithIgnoreCase(expectedSearchEmail, pageable);

  		assertEquals(expectedUsersSize, users.getContent().size());
  		assertEquals(expectedSecondUserEmail, users.getContent().get(1).getEmail());
  	}

	@Test
	public void verifySaveOnCreateCalledOnce() {
		Integer expectedUserAge = 30;
		String expectedUserEmail = "createdUser@gmail.com";

		firstMockUser.setAge(expectedUserAge);
		firstMockUser.setEmail(expectedUserEmail);
		when(userRepository.save(firstMockUser)).thenReturn(firstMockUser);
		User createdUser = userService.create(firstMockUser);

		Long createdUserId = createdUser.getId();

		verify(userRepository, times(1))
				.save(firstMockUser);
		assertEquals(expectedUserAge, createdUser.getAge());
		assertEquals(expectedUserEmail, createdUser.getEmail());
		assertNotNull(createdUser.getCreatedDate());
		assertNotNull(createdUser.getModifiedDate());
		assertNotNull(createdUserId);
	}

	@Test
	public void verifySaveOnUpdateCalledOnce() {
		Long userId = 2L;
		String userFirstName = "Updated";

		firstMockUser.setFirstName(userFirstName);
		when(userRepository.save(firstMockUser)).thenReturn(firstMockUser);
		User updatedUser = userService.update(userId, firstMockUser);

		verify(userRepository, times(1)).save(firstMockUser);
		assertEquals(userFirstName, updatedUser.getFirstName());
	}

	@Test
	public void verifyDeleteCalledOnce() {
		when(userRepository.findById(2L)).thenReturn(Optional.of(secondMockUser));
		userService.delete(2L);

		verify(userRepository, times(1)).delete(secondMockUser);
	}

	@Test
	public void verifyUserRolesUpdated() {
		Long userId = 1L;
		List<Role> roles = new ArrayList<>();
		Role firstRole = new Role();
		firstRole.setId(1L);
		firstRole.setName("admin");
		Role secondRole = new Role();
		secondRole.setId(2L);
		secondRole.setName("super-admin");
		roles.add(firstRole);
		roles.add(secondRole);

		when(userRepository.findById(userId)).thenReturn(Optional.of(firstMockUser));
		User user = userService.setUserRoles(userId, roles);

		verify(userRepository, times(1)).save(firstMockUser);
		assertEquals(roles.size(), user.getRoles().size());
		assertEquals(roles.get(0).getName(), user.getRoles().get(0).getName());
	}

	@Test
	public void verifyFindByTokenCalledOnce() {
		String token = "ddcc2361-ce4f-47bc-bf5e-fc39ca73d0e0";
		when(userRepository.findByToken(token)).thenReturn(firstMockUser);

		User user = userService.getUserByToken("ddcc2361-ce4f-47bc-bf5e-fc39ca73d0e0");

		verify(userRepository, times(1)).findByToken(token);
		assertEquals(token, user.getToken());
	}

	@Test
	public void verifyUserTokenGeneratedAndSetAndEmailServiceCalled() {
		String email = "first.user@test.com";
		String token = "ddcc2361-ce4f-47bc-bf5e-fc39ca73d0e0";
		long currentTime = System.currentTimeMillis();

		when(userRepository.findByEmail(email)).thenReturn(firstMockUser);

		User user = userService.generateToken(email);

		assertNotNull(user.getToken());
		assertNotEquals(token, user.getToken());
		assertTrue(user.getTokenExpirationDate().getTime() - currentTime >= UserService.DAY_MILLISECONDS_COUNT);
		verify(emailService, times(1))
				.sendSimpleMessage(eq(email), eq(UserService.PASS_RECOVERY_EMAIL_SUBJECT), anyString());
	}

	@Test
	public void verifyUserPasswordUpdatedAndTokenReset() {
		UpdateUserPasswordRequest userDto = UpdateUserPasswordRequest.builder()
				.password("12345678")
				.token("ddcc2361-ce4f-47bc-bf5e-fc39ca73d0e0")
				.build();
		String expectedPassword = passwordEncoder.encode(userDto.getPassword());
		User expectedUser = new User();
		expectedUser.setPassword(expectedPassword);
		expectedUser.setToken(null);
		expectedUser.setTokenExpirationDate(null);

		when(userRepository.findByToken(userDto.getToken())).thenReturn(firstMockUser);
		when(userRepository.save(any())).thenReturn(expectedUser);
		User user = userService.updateUserPassword(userDto, bindingResult);

		assertNull(user.getToken());
		assertNull(user.getTokenExpirationDate());
		assertEquals(expectedPassword, user.getPassword());
		verify(userRepository, times(1)).findByToken(userDto.getToken());
		verify(userRepository, times(1)).save(any());
		verify(validationService, times(1)).checkForValidationErrors(bindingResult);
	}

	@Test
	public void verifyUserDetailsMatchUser() {
		String email = "first.user@test.com";
		when(userRepository.findByEmail(email)).thenReturn(firstMockUser);
		UserDetails userDetails = userService.loadUserByUsername(email);

		assertEquals(firstMockUser.getEmail(), userDetails.getUsername());
		assertEquals(2, userDetails.getAuthorities().size());
		assertTrue(userDetails.getAuthorities().contains(Permission.ADMIN_USER));
		assertNotNull(userDetails.getPassword());
	}

	@Test
	public void verifyOAuthUserExistAndPermissionsFilled() {
		String email = "first.user@test.com";
		List<Permission> permissions = firstMockUser.getRoles().get(0).getPermissions();
		HashMap<String, Object> attributes = new HashMap<>();
		attributes.put("email", email);
		attributes.put("id", email);
		DefaultOAuth2User defaultOAuth2User = new DefaultOAuth2User(permissions, attributes, "id");

		when(userRepository.findByEmail(email)).thenReturn(firstMockUser);

		Set<Permission> result = userService.getOAuth2UserPermissions(defaultOAuth2User);

		assertEquals(2, result.size());
		assertTrue(result.contains(Permission.ADMIN_USER));
	}

	@Test
	public void verifyUserCreatedIfOAuthUserNotExist() {
		String email = "first.user@test.com";
		String name = "First User";
		List<Permission> permissions = firstMockUser.getRoles().get(0).getPermissions();
		HashMap<String, Object> attributes = new HashMap<>();
		attributes.put("email", email);
		attributes.put("id", email);
		attributes.put("name", name);
		DefaultOAuth2User defaultOAuth2User = new DefaultOAuth2User(permissions, attributes, "id");
		User createdUser = new User();
		createdUser.setFirstName(name.split(" ")[0]);
		createdUser.setLastName(name.split(" ")[1]);
		createdUser.setEmail(email);
		createdUser.setRoles(new ArrayList<>());
		int expectedUserPermissionsSize = 1;
		when(userRepository.save(any())).thenReturn(createdUser);

		Set<Permission> userPermissions = userService.getOAuth2UserPermissions(defaultOAuth2User);

		ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
		verify(userRepository, times(1)).save(captor.capture());
		userRepository.save(captor.capture());

		assertEquals(createdUser, captor.getValue());
		assertEquals(expectedUserPermissionsSize, userPermissions.size());
		assertTrue(userPermissions.contains(Permission.ADMIN_USER));

	}
}