package com.danit.finalproject.application.dto.response;

import lombok.Data;

@Data
public class ChatMessageResponse {

  private Long id;
  private String message;
  private UserResponse user;

}
