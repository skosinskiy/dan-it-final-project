package com.danit.finalproject.application.security;

import com.danit.finalproject.application.entity.Permission;
import com.danit.finalproject.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@Profile("dev")
public class DevSecurityConfig extends WebSecurityConfigurerAdapter {

  private UserService userService;
  private SecuritySuccessHandler successHandler;
  private SecurityFailureHandler failureHandler;

  @Autowired
  public DevSecurityConfig(
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
          .cors()
          .configurationSource(corsConfigurationSource())
        .and()
          .csrf()
          .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        .and()
          .httpBasic()
        .and()
          .authorizeRequests()
          .antMatchers("/h2-console/**", "/api/users/current")
          .permitAll()
          .antMatchers("/").hasAuthority(Permission.MANAGE_BUSINESS_CATEGORIES.toString())
          .anyRequest()
          .authenticated()
        .and()
          .formLogin()
          .loginProcessingUrl("/auth")
          .successHandler(successHandler)
          .failureHandler(failureHandler)
          .permitAll()
        .and()
          .logout()
          .permitAll()
        .and()
          .rememberMe()
          .key("uniqueKey")
        .tokenValiditySeconds(86400);
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET","POST"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Override
  public UserDetailsService userDetailsService() {
    return userService;
  }

}
