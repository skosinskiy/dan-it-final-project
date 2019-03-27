package com.danit.finalproject.application.dto.response.place;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

@Data
public class PlacePhotoResponse {

  private Long id;
  private String photo;
  @JsonIgnore
  @ToString.Exclude
  private PlaceResponse place;

}
