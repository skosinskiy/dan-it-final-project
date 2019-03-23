package com.danit.finalproject.application.dto.request.business;

import com.danit.finalproject.application.dto.request.place.PlaceRequestDto;
import lombok.Data;

import java.util.List;

@Data
public class BusinessRequestDto {

  private Long id;
  private String title;
  private String description;
  private List<BusinessCategoryRequestDto> categories;
  private String address;
  private String webSite;
  private String phoneNumber;
  private BusinessPhotoRequestDto mainPhoto;
  private List<BusinessPhotoRequestDto> photos;
  private PlaceRequestDto place;

}
