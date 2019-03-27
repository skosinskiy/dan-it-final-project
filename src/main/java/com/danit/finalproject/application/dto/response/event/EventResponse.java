package com.danit.finalproject.application.dto.response.event;

import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import lombok.Data;

import java.util.List;

@Data
public class EventResponse {

  private Long id;
  private String title;
  private String description;
  private List<EventCategoryResponse> categories;
  private EventPhotoResponse mainPhoto;
  private List<EventPhotoResponse> photos;
  private BusinessResponse business;
  private PlaceResponse place;
  private String address;

}
