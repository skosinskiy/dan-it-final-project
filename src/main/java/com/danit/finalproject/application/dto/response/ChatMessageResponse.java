package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.dto.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Date;

@Data
public class ChatMessageResponse {

  private Long id;
  private Date createdDate;
  private String message;
  @JsonView(View.Chat.class)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private UserResponse user;

}
