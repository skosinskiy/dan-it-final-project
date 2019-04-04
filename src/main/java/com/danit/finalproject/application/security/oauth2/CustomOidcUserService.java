package com.danit.finalproject.application.security.oauth2;

import com.danit.finalproject.application.entity.Permission;
import com.danit.finalproject.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;


@Service
public class CustomOidcUserService extends OidcUserService {

  private UserService userService;

  @Autowired
  public CustomOidcUserService(UserService userService) {
    this.userService = userService;
  }

  @Override
  @Transactional
  public OidcUser loadUser(OidcUserRequest userRequest) {
    OidcUser oidcUser = super.loadUser(userRequest);
    Set<Permission> permissions = userService.getOAuth2UserPermissions(oidcUser);
    return new DefaultOidcUser(permissions, oidcUser.getIdToken());
  }

}
