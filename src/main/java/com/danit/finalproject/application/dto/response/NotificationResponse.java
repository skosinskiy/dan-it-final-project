package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.danit.finalproject.application.dto.response.event.EventResponse;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import lombok.Data;

@Data
public class NotificationResponse {

  private Long id;
  private String text;
  private PlaceResponse place;
  private BusinessResponse business;
  private EventResponse event;

}
