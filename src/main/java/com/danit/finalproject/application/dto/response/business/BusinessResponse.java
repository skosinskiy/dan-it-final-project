package com.danit.finalproject.application.dto.response.business;

import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import lombok.Data;

import java.util.List;

@Data
public class BusinessResponse {

  private Long id;
  private String title;
  private String description;
  private List<BusinessCategoryResponse> categories;
  private String address;
  private String webSite;
  private String phoneNumber;
  private BusinessPhotoResponse mainPhoto;
  private List<BusinessPhotoResponse> photos;
  private PlaceResponse place;

}
