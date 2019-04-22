package com.danit.finalproject.application.dto.response.event;

import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;

import java.util.Date;
import java.util.List;

import com.danit.finalproject.application.dto.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
public class EventResponse {
  private Long id;
  private String title;
  private String description;
  private List<EventCategoryResponse> categories;
  private EventPhotoResponse mainPhoto;
  private List<EventPhotoResponse> photos;
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonView(View.Event.class)
  private BusinessResponse business;
  private PlaceResponse place;
  private String address;
  private Date startDate;
  private Date endDate;

}
