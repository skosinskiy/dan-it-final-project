package com.danit.finalproject.application.dto.request.event;

import lombok.Data;

@Data
public class EventPhotoRequestDto {

  private Long id;
  private String photo;
  private EventRequestDto event;

}
