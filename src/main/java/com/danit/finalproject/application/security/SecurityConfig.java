package com.danit.finalproject.application.security;

import com.danit.finalproject.application.security.oauth2.CustomOAuthUserService;
import com.danit.finalproject.application.security.oauth2.CustomOidcUserService;
import com.danit.finalproject.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private UserService userService;
  private CustomOidcUserService customOidcUserService;
  private CustomOAuthUserService customOAuthUserService;
  private SecuritySuccessHandler successHandler;
  private SecurityFailureHandler failureHandler;

  @Autowired
  public SecurityConfig(
      UserService userService,
      CustomOidcUserService customOidcUserService,
      CustomOAuthUserService customOAuthUserService,
      SecuritySuccessHandler successHandler,
      SecurityFailureHandler failureHandler) {
    this.userService = userService;
    this.customOidcUserService = customOidcUserService;
    this.customOAuthUserService = customOAuthUserService;
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
          .authorizeRequests()
          .antMatchers("/**/static/**", "/h2-console/**", "/google66e649965f9cdeb4.html", "/swagger-ui.html",
              "/api/users/current", "/api/users/forgot-password/**", "/api/users/register",
              "/admin/**", "/mobile/**", "/screen")
          .permitAll()
          .anyRequest()
          .authenticated()
        .and()
          .formLogin()
          .loginPage("/")
          .loginProcessingUrl("/auth")
          .successHandler(successHandler)
          .failureHandler(failureHandler)
          .permitAll()
        .and()
          .oauth2Login()
          .loginPage("/")
          .userInfoEndpoint()
            .oidcUserService(customOidcUserService)
            .userService(customOAuthUserService)
          .and()
            .defaultSuccessUrl("/", true)
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
