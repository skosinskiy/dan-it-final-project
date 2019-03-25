package com.danit.finalproject.application.dto.request.event;

import com.danit.finalproject.application.dto.request.business.BusinessRequest;
import com.danit.finalproject.application.dto.request.place.PlaceRequest;
import java.util.List;
import lombok.Data;

@Data
public class EventRequest {

  private Long id;
  private String title;
  private String description;
  private List<EventCategoryRequest> categories;
  private EventPhotoRequest mainPhoto;
  private List<EventPhotoRequest> photos;
  private BusinessRequest business;
  private PlaceRequest place;
  private String address;

}
