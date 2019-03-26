package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.dto.request.business.BusinessRequest;
import com.danit.finalproject.application.dto.request.event.EventRequest;
import com.danit.finalproject.application.dto.request.place.PlaceRequest;
import lombok.Data;

@Data
public class NotificationRequest {

  private Long id;
  private String text;
  private PlaceRequest place;
  private BusinessRequest business;
  private EventRequest event;

}
