package com.danit.finalproject.application.dto.response.place;

import java.util.List;
import lombok.Data;

@Data
public class PlaceResponse {

  private Long id;
  private String title;
  private String description;
  private String address;
  private PlacePhotoResponse mainPhoto;
  private List<PlacePhotoResponse> photos;
  private PlaceCategoryResponse placeCategory;

}
