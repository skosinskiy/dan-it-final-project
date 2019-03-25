package com.danit.finalproject.application.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ChatRequest {

  private Long id;
  private String name;
  private List<UserRequest> users;
  private List<ChatMessageRequest> chatMessages;

}
