package com.danit.finalproject.application.dto.response.event;

import lombok.Data;

@Data
public class EventCategoryResponseDto {

  private Long id;
  private String name;
  private EventCategoryResponseDto parentCategory;

}
