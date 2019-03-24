package com.danit.finalproject.application.dto.response.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

@Data
public class EventPhotoResponseDto {

  private Long id;
  private String photo;
  @JsonIgnore
  @ToString.Exclude
  private EventResponseDto event;

}
