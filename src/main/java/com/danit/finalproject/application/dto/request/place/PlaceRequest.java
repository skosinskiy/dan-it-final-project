package com.danit.finalproject.application.dto.request.place;

import java.util.List;
import lombok.Data;

@Data
public class PlaceRequest {

  private Long id;
  private String title;
  private String description;
  private String address;
  private PlacePhotoRequest mainPhoto;
  private List<PlacePhotoRequest> photos;
  private PlaceCategoryRequest placeCategory;

}
