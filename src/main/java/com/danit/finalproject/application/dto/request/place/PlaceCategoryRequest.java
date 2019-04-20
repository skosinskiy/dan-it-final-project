package com.danit.finalproject.application.dto.request.place;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
