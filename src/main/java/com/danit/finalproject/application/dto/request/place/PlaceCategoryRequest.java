package com.danit.finalproject.application.dto.request.place;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import java.util.List;
import lombok.Data;

@Data
public class PlaceCategoryRequest {
  private Long id;
  private String name;
  private boolean multisync;
  private List<BusinessCategoryRequest> businessCategories;
  private String description;
}
