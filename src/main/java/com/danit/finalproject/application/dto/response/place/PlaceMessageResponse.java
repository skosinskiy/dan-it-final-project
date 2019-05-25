package com.danit.finalproject.application.dto.response.place;

import com.danit.finalproject.application.dto.response.UserResponse;
import lombok.Data;

@Data
public class PlaceMessageResponse {

  private Long id;
  private String message;
  private UserResponse user;
  private PlaceResponse place;
}
