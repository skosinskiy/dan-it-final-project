package com.danit.finalproject.application.dto.request.business;

import lombok.Data;

@Data
public class BusinessCategoryRequestDto {

  private Long id;
  private String name;
  private BusinessCategoryRequestDto parentCategory;

}
