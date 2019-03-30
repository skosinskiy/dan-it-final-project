package com.danit.finalproject.application.security;

import com.danit.finalproject.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private UserService userService;
  private SecuritySuccessHandler successHandler;
  private SecurityFailureHandler failureHandler;

  @Autowired
  public SecurityConfig(
      UserService userService,
      SecuritySuccessHandler successHandler,
      SecurityFailureHandler failureHandler) {
    this.userService = userService;
    this.successHandler = successHandler;
    this.failureHandler = failureHandler;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.headers()
          .frameOptions()
          .disable()
        .and()
          .csrf()
          .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        .and()
          .httpBasic()
        .and()
          .authorizeRequests()
          .antMatchers("/h2-console/**", "/api/users/current", "/api/users/forgot-password/**")
          .permitAll()
          .anyRequest()
          .authenticated()
        .and()
          .formLogin()
          .loginProcessingUrl("/auth")
          .successHandler(successHandler)
          .failureHandler(failureHandler)
          .permitAll()
        .and()
          .oauth2Login()
          .userInfoEndpoint().oidcUserService(userService)
            .and()
            .successHandler(successHandler)
            .failureHandler(failureHandler)
        .and()
          .logout()
          .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
          .permitAll()
        .and()
          .rememberMe()
          .key("uniqueKey")
        .tokenValiditySeconds(86400);
  }

  @Override
  public UserDetailsService userDetailsService() {
    return userService;
  }

}
