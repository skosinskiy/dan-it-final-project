package com.danit.finalproject.application.dto.request.event;

import lombok.Data;

@Data
public class EventCategoryRequestDto {

  private Long id;
  private String name;
  private EventCategoryRequestDto parentCategory;

}
