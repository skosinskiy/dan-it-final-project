package com.danit.finalproject.application.dto.response.place;

import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
public class PlaceResponse {

  private Long id;
  private String title;
  private String description;
  private String address;
  @JsonIgnore
  @ToString.Exclude
  private List<BusinessResponse> businesses;
  private PlacePhotoResponse mainPhoto;
  private List<PlacePhotoResponse> photos;
  private PlaceCategoryResponse placeCategory;

}
