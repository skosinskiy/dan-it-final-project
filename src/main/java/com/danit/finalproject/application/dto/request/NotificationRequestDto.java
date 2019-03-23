package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.dto.request.business.BusinessRequestDto;
import com.danit.finalproject.application.dto.request.event.EventRequestDto;
import com.danit.finalproject.application.dto.request.place.PlaceRequestDto;
import lombok.Data;

@Data
public class NotificationRequestDto {

  private Long id;
  private String text;
  private PlaceRequestDto place;
  private BusinessRequestDto business;
  private EventRequestDto event;

}
