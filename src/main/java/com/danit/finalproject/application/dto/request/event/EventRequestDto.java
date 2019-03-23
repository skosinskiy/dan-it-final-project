package com.danit.finalproject.application.dto.request.event;

import com.danit.finalproject.application.dto.request.business.BusinessRequestDto;
import com.danit.finalproject.application.dto.request.place.PlaceRequestDto;
import lombok.Data;

import java.util.List;

@Data
public class EventRequestDto {

  private Long id;
  private String title;
  private String description;
  private List<EventCategoryRequestDto> categories;
  private EventPhotoRequestDto mainPhoto;
  private List<EventPhotoRequestDto> photos;
  private BusinessRequestDto business;
  private PlaceRequestDto place;
  private String address;

}
