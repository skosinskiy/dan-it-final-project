package com.danit.finalproject.application.dto.request.place;

import lombok.Data;

@Data
public class PlacePhotoRequestDto {

  private Long id;
  private String photo;
  private PlaceRequestDto place;

}
