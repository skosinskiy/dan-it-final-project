package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.dto.response.business.BusinessResponseDto;
import com.danit.finalproject.application.dto.response.event.EventResponseDto;
import com.danit.finalproject.application.dto.response.place.PlaceResponseDto;
import lombok.Data;

@Data
public class NotificationResponseDto {

  private Long id;
  private String text;
  private PlaceResponseDto place;
  private BusinessResponseDto business;
  private EventResponseDto event;

}
