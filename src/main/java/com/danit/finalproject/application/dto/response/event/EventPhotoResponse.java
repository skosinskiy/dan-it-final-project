package com.danit.finalproject.application.dto.response.event;

import lombok.Data;

@Data
public class EventPhotoResponse {

  private Long id;
  private String photo;
  private String imageKey;
  private String imageUrl;

}
