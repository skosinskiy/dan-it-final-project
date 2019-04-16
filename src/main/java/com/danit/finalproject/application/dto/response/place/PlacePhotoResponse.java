package com.danit.finalproject.application.dto.response.place;

import lombok.Data;

@Data
public class PlacePhotoResponse {
  private Long id;
  private String imageKey;
  private String imageUrl;
}
