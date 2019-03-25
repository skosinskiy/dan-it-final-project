package com.danit.finalproject.application.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class ChatResponse {

  private Long id;
  private String name;
  private List<UserResponse> users;
  private List<ChatMessageResponse> chatMessages;

}
