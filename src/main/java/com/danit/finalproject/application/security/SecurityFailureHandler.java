package com.danit.finalproject.application.security;

import com.danit.finalproject.application.dto.response.AuthResultDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class SecurityFailureHandler implements AuthenticationFailureHandler {

  private ObjectMapper objectMapper;

  @Autowired
  public SecurityFailureHandler(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @Override
  public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
    AuthResultDto authResultDto = AuthResultDto.builder()
        .timestamp(new Date(System.currentTimeMillis()))
        .status(HttpStatus.UNAUTHORIZED.value())
        .message(HttpStatus.UNAUTHORIZED.getReasonPhrase())
        .build();
    httpServletResponse.getWriter().write(objectMapper.writeValueAsString(authResultDto));
    httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
  }
}
