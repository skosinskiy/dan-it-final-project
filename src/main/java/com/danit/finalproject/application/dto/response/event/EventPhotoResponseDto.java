package com.danit.finalproject.application.dto.response.event;

import lombok.Data;

@Data
public class EventPhotoResponseDto {

  private Long id;
  private String photo;
  private EventResponseDto event;

}
