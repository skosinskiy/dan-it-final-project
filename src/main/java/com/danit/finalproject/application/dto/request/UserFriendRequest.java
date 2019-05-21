package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.entity.User;
import lombok.Data;

@Data
public class UserFriendRequest {
  private Long id;
  private User user;
}
