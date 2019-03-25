package com.danit.finalproject.application.dto.request.event;

import lombok.Data;

@Data
public class EventPhotoRequest {

  private Long id;
  private String photo;
  private EventRequest event;

}
