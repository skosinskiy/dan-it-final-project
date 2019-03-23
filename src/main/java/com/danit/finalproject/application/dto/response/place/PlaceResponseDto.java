package com.danit.finalproject.application.dto.response.place;

import com.danit.finalproject.application.dto.response.business.BusinessResponseDto;
import lombok.Data;

import java.util.List;

@Data
public class PlaceResponseDto {

  private Long id;
  private String title;
  private String description;
  private String address;
  private List<BusinessResponseDto> businesses;
  private PlacePhotoResponseDto mainPhoto;
  private List<PlacePhotoResponseDto> photos;
  private PlaceCategoryResponseDto placeCategory;

}
