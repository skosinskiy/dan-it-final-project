package com.danit.finalproject.application.dto.request.business;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BusinessCategoryRequest {

  private Long id;
  private String name;
  private String description;
  private BusinessCategoryRequest parentCategory;
  private MultipartFile imageFile;

}
