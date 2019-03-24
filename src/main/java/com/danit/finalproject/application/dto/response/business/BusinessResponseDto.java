package com.danit.finalproject.application.dto.response.business;

import com.danit.finalproject.application.dto.response.place.PlaceResponseDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
public class BusinessResponseDto {

  private Long id;
  private String title;
  private String description;
  @JsonIgnore
  @ToString.Exclude
  private List<BusinessCategoryResponseDto> categories;
  private String address;
  private String webSite;
  private String phoneNumber;
  private BusinessPhotoResponseDto mainPhoto;
  private List<BusinessPhotoResponseDto> photos;
  private PlaceResponseDto place;

}
