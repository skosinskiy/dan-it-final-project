package com.danit.finalproject.application.dto.request.place;

import com.danit.finalproject.application.dto.request.business.BusinessRequestDto;
import lombok.Data;

import java.util.List;

@Data
public class PlaceRequestDto {

  private Long id;
  private String title;
  private String description;
  private String address;
  private List<BusinessRequestDto> businesses;
  private PlacePhotoRequestDto mainPhoto;
  private List<PlacePhotoRequestDto> photos;
  private PlaceCategoryRequestDto placeCategory;

}
