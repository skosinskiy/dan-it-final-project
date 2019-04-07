package com.danit.finalproject.application.security.oauth2;

import com.danit.finalproject.application.entity.Permission;
import com.danit.finalproject.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class CustomOAuthUserService extends DefaultOAuth2UserService {

  private UserService userService;

  @Autowired
  public CustomOAuthUserService(UserService userService) {
    this.userService = userService;
  }

  @Override
  @Transactional
  public OAuth2User loadUser(OAuth2UserRequest userRequest) {
    OAuth2User oAuth2User = super.loadUser(userRequest);
    Set<Permission> permissions = userService.getOAuth2UserPermissions(oAuth2User);
    return new DefaultOAuth2User(permissions, oAuth2User.getAttributes(), "id");
  }
}
