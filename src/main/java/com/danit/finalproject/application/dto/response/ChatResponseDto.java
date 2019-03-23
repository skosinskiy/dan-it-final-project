package com.danit.finalproject.application.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class ChatResponseDto {

  private Long id;
  private String name;
  private List<UserResponseDto> users;
  private List<ChatMessageResponseDto> chatMessages;

}
