package com.danit.finalproject.application.dto.response;

import lombok.Data;

@Data
public class ChatMessageResponseDto {

  private Long id;
  private String message;
  private UserResponseDto user;

}
