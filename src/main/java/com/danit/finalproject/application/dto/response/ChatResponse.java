package com.danit.finalproject.application.dto.response;

import java.util.List;
import lombok.Data;

@Data
public class ChatResponse {

  private Long id;
  private String name;
  private List<ChatMessageResponse> chatMessages;

}
