package com.danit.finalproject.application.dto.response.event;

import com.danit.finalproject.application.dto.response.business.BusinessResponseDto;
import com.danit.finalproject.application.dto.response.place.PlaceResponseDto;
import lombok.Data;

import java.util.List;

@Data
public class EventResponseDto {

  private Long id;
  private String title;
  private String description;
  private List<EventCategoryResponseDto> categories;
  private EventPhotoResponseDto mainPhoto;
  private List<EventPhotoResponseDto> photos;
  private BusinessResponseDto business;
  private PlaceResponseDto place;
  private String address;

}
