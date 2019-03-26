package com.danit.finalproject.application.dto.request.event;

import lombok.Data;

@Data
public class EventCategoryRequest {

  private Long id;
  private String name;
  private EventCategoryRequest parentCategory;

}
