package com.danit.finalproject.application.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ChatRequestDto {

  private Long id;
  private String name;
  private List<UserRequestDto> users;
  private List<ChatMessageRequestDto> chatMessages;

}
