package com.danit.finalproject.application.dto.request;

import lombok.Data;

@Data
public class ChatMessageRequestDto {

  private Long id;
  private String message;
  private UserRequestDto user;

}
