package com.danit.finalproject.application.dto.response.business;

import lombok.Data;

@Data
public class BusinessCategoryResponseDto {

  private Long id;
  private String name;
  private BusinessCategoryResponseDto parentCategory;

}
