package com.danit.finalproject.application.dto.request.place;

import com.danit.finalproject.application.dto.request.business.BusinessRequest;
import lombok.Data;

import java.util.List;

@Data
public class PlaceRequest {

  private Long id;
  private String title;
  private String description;
  private String address;
  private List<BusinessRequest> businesses;
  private PlacePhotoRequest mainPhoto;
  private List<PlacePhotoRequest> photos;
  private PlaceCategoryRequest placeCategory;

}
