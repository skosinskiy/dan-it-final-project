package com.danit.finalproject.application.dto.response.place;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

@Data
public class PlacePhotoResponseDto {

  private Long id;
  private String photo;
  @JsonIgnore
  @ToString.Exclude
  private PlaceResponseDto place;

}
