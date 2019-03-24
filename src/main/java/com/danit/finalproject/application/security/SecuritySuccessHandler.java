package com.danit.finalproject.application.security;

import com.danit.finalproject.application.dto.response.AuthResultDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class SecuritySuccessHandler implements AuthenticationSuccessHandler {

  private ObjectMapper objectMapper;

  @Autowired
  public SecuritySuccessHandler(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest httpServletRequest,
      HttpServletResponse httpServletResponse,
      Authentication authentication) throws IOException {
    AuthResultDto authResultDto = AuthResultDto.builder()
        .timestamp(new Date(System.currentTimeMillis()))
        .status(HttpStatus.OK.value())
        .message(HttpStatus.OK.getReasonPhrase())
        .build();
    httpServletResponse.getWriter().write(objectMapper.writeValueAsString(authResultDto));
    httpServletResponse.setStatus(HttpStatus.OK.value());
  }
}