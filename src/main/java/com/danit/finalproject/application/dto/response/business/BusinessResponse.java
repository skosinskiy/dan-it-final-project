package com.danit.finalproject.application.dto.response.business;

import com.danit.finalproject.application.dto.response.event.EventResponse;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import java.util.List;

import com.danit.finalproject.application.dto.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

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
  @JsonView(View.Business.class)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private List<EventResponse> events;
}
