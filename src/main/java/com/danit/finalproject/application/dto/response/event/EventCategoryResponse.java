package com.danit.finalproject.application.dto.response.event;

import lombok.Data;

@Data
public class EventCategoryResponse {

  private Long id;
  private String name;
  private String description;
  private EventCategoryResponse parentCategory;
  private String imageKey;
  private String imageUrl;

}
