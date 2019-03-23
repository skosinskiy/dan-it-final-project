package com.danit.finalproject.application.dto.response.place;

import lombok.Data;

@Data
public class PlacePhotoResponseDto {

  private Long id;
  private String photo;
  private PlaceResponseDto place;

}
