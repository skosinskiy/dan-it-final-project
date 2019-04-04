package com.danit.finalproject.application.dto.request.business;

import lombok.Data;

@Data
public class BusinessCategoryRequest {

  private Long id;
  private String name;
  private String description;
  private BusinessCategoryRequest parentCategory;

}
