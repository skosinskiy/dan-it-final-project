package com.danit.finalproject.application.security;

import com.danit.finalproject.application.entity.Permission;
import com.danit.finalproject.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private UserService userService;

  @Autowired
  public SecurityConfig(UserService userService) {
    this.userService = userService;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.headers()
          .frameOptions()
          .disable()
        .and()
          .authorizeRequests()
          .antMatchers("/h2-console/**")
          .permitAll()
          .antMatchers("/").hasAuthority(Permission.MANAGE_BUSINESS_CATEGORIES.toString())
          .anyRequest()
          .authenticated()
        .and()
          .formLogin()
          .permitAll()
        .and()
          .logout()
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
