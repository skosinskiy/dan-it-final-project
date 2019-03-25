package com.danit.finalproject.application.service;

import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequest;
import com.danit.finalproject.application.entity.Gender;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.BindingResult;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

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

	@Before
	public void initializeMockUsers() throws ParseException {
		User firstUser = new User();
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
	public void verifyFindAllByEmailCalledOnce() {
		int expectedUsersSize = 2;
		String expectedSearchEmail = "FiRst";
		String expectedSecondUserEmail = "first.user@test2.com";
		Pageable pageable = new Pageable() {
			@Override
			public int getPageNumber() {
				return 0;
			}

			@Override
			public int getPageSize() {
				return 25;
			}

			@Override
			public long getOffset() {
				return 0;
			}

			@Override
			public Sort getSort() {
				return null;
			}

			@Override
			public Pageable next() {
				return null;
			}

			@Override
			public Pageable previousOrFirst() {
				return null;
			}

			@Override
			public Pageable first() {
				return null;
			}

			@Override
			public boolean hasPrevious() {
				return false;
			}
		};

		List<User> mockUsers = new ArrayList<>();
		mockUsers.add(firstMockUser);
		mockUsers.add(secondMockUser);

		when(userRepository.findAllByEmailStartingWithIgnoreCase(expectedSearchEmail, pageable).getContent()).thenReturn
				(mockUsers);
		List<User> users = userService.getUsersByEmail(expectedSearchEmail, pageable).getContent();

		verify(userRepository, times(1))
				.findAllByEmailStartingWithIgnoreCase(expectedSearchEmail, pageable);

//		when(userRepository.findAllByEmailContainingIgnoreCase(expectedSearchEmail)).thenReturn(mockUsers);
//		List<User> users = userService.getUsersByEmail(expectedSearchEmail);
//
//		verify(userRepository, times(1))
//				.findAllByEmailContainingIgnoreCase(expectedSearchEmail);

		assertEquals(expectedUsersSize, users.size());
		assertEquals(expectedSecondUserEmail, users.get(1).getEmail());
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
}