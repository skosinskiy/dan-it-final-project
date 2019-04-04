package com.danit.finalproject.application.dto.response.business;

import lombok.Data;

@Data
public class BusinessCategoryResponse {

  private Long id;
  private String name;
  private String description;
  private BusinessCategoryResponse parentCategory;
  private String imageKey;
  private String imageUrl;

}
