package com.danit.finalproject.application.dto.request.place;

import com.danit.finalproject.application.dto.request.UserRequest;
import lombok.Data;

@Data
public class PlaceMessageRequest {

  private Long id;
  private String message;
  private UserRequest user;
  private PlaceRequest place;

}
