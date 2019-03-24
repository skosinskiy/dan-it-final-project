package com.danit.finalproject.application.dto.response.place;

import com.danit.finalproject.application.dto.response.business.BusinessResponseDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
public class PlaceResponseDto {

  private Long id;
  private String title;
  private String description;
  private String address;
  @JsonIgnore
  @ToString.Exclude
  private List<BusinessResponseDto> businesses;
  private PlacePhotoResponseDto mainPhoto;
  private List<PlacePhotoResponseDto> photos;
  private PlaceCategoryResponseDto placeCategory;

}
