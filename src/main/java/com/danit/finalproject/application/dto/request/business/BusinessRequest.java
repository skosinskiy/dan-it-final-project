package com.danit.finalproject.application.dto.request.business;

import com.danit.finalproject.application.dto.request.place.PlaceRequest;
import lombok.Data;

import java.util.List;

@Data
public class BusinessRequest {

  private Long id;
  private String title;
  private String description;
  private List<BusinessCategoryRequest> categories;
  private String address;
  private String webSite;
  private String phoneNumber;
  private BusinessPhotoRequest mainPhoto;
  private List<BusinessPhotoRequest> photos;
  private PlaceRequest place;

}
