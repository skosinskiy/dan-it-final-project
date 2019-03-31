package com.danit.finalproject.application.service;

import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequest;
import com.danit.finalproject.application.entity.Permission;
import com.danit.finalproject.application.entity.Role;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.repository.UserRepository;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import static com.danit.finalproject.application.entity.Permission.ADMIN_USER;

@Service
public class UserService extends OidcUserService implements UserDetailsService, CrudService<User> {

  public static final int DAY_MILLISECONDS_COUNT = 24 * 60 * 60 * 1000;
  public static final String PASS_RECOVERY_EMAIL_SUBJECT = "Password recovery";

  private UserRepository userRepository;
  private EmailService emailService;
  private ValidationService validationService;
  private PasswordEncoder passwordEncoder;
  @Value("${react.server.port}")
  private String applicationPort;
  @Value("${react.server.host}")
  private String applicationHost;

  @Autowired
  public UserService(
      UserRepository userRepository,
      EmailService emailService,
      ValidationService validationService,
      PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.validationService = validationService;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public User getById(Long userId) {
    return userRepository.findById(userId).orElse(null);
  }

  @Override
  public List<User> getAll() {
    return userRepository.findAll();
  }

  public Page<User> getUsersByEmail(String email, Pageable pageable) {
    return userRepository.findAllByEmailStartingWithIgnoreCase(email, pageable);
  }

  @Override
  public User create(User user) {
    return userRepository.save(user);
  }

  @Override
  public User update(Long userId, User user) {
    user.setId(userId);
    return userRepository.save(user);
  }

  @Override
  public User delete(Long userId) {
    User user = userRepository.findById(userId).orElse(null);
    userRepository.delete(user);
    return user;
  }

  public User setUserRoles(Long userId, List<Role> roles) {
    Optional<User> optionalUser = userRepository.findById(userId);
    optionalUser.ifPresent(user -> user.setRoles(roles));
    User user = optionalUser.orElse(null);
    userRepository.save(user);
    return user;
  }

  public User getUserByToken(String token) {
    return userRepository.findByToken(token);
  }

  public User generateToken(String userEmail) {
    User user = userRepository.findByEmail(userEmail);
    if (user != null) {
      String token = generateAndSetToken(user);
      userRepository.save(user);
      sendPasswordRecoveryEmail(token, userEmail);
    }
    return user;
  }

  private String generateAndSetToken(User user) {
    String token = UUID.randomUUID().toString();
    user.setToken(token);
    user.setTokenExpirationDate(new Date(System.currentTimeMillis() + DAY_MILLISECONDS_COUNT));
    return token;
  }

  private void sendPasswordRecoveryEmail(String token, String userEmail) {
    String text = String.format("Please follow the link to change your password\n"
        + "http://%s:%s/reset-password/%s", applicationHost, applicationPort, token);
    emailService.sendSimpleMessage(userEmail, PASS_RECOVERY_EMAIL_SUBJECT, text);
  }

  public User updateUserPassword(UpdateUserPasswordRequest userDto, BindingResult bindingResult) {
    validationService.checkForValidationErrors(bindingResult);
    User user = userRepository.findByToken(userDto.getToken());
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    user.setTokenExpirationDate(null);
    user.setToken(null);
    return userRepository.save(user);
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) {
    User user = userRepository.findByEmail(email);
    return org.springframework.security.core.userdetails.User.builder()
        .username(user.getEmail())
        .roles(user.getRoles().stream().map(Role::getName).toArray(String[]::new))
        .authorities(getAllPermissions(user))
        .password(user.getPassword())
        .build();
  }

  @Override
  @Transactional
  public OidcUser loadUser(OidcUserRequest userRequest) {
    OidcUser oidcUser = super.loadUser(userRequest);
    Map<String, Object> attributes = oidcUser.getAttributes();
    String email = (String) attributes.get("email");
    User user = userRepository.findByEmail(email);
    if (user == null) {
      throw new OAuth2AuthenticationException(new OAuth2Error(OAuth2ErrorCodes.UNAUTHORIZED_CLIENT));
    }
    Set<Permission> permissions = getAllPermissions(user);
    if (permissions.isEmpty()) {
      permissions.add(ADMIN_USER);
    }
    return new DefaultOidcUser(permissions, oidcUser.getIdToken());
  }

  private Set<Permission> getAllPermissions(User user) {
    Set<Permission> permissions = new HashSet<>();
    user
        .getRoles()
        .stream()
        .map(Role::getPermissions)
        .forEach(permissions::addAll);
    return permissions;
  }

  public User getPrincipalUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication instanceof OAuth2AuthenticationToken) {
      OidcUser auth2UserInfo = (OidcUser)(authentication.getPrincipal());
      return userRepository.findByEmail(auth2UserInfo.getEmail());
    } else if (!(authentication instanceof AnonymousAuthenticationToken)) {
      return userRepository.findByEmail(authentication.getName());
    }
    return null;
  }
}
