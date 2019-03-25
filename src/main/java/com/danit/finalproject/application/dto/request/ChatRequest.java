package com.danit.finalproject.application.dto.request;

import java.util.List;
import lombok.Data;

@Data
public class ChatRequest {

  private Long id;
  private String name;
  private List<UserRequest> users;
  private List<ChatMessageRequest> chatMessages;

}
