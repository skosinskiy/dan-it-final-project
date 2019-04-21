package com.danit.finalproject.application.dto.response.place;

import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import java.util.List;
import lombok.Data;

@Data
public class PlaceCategoryResponse {

  private Long id;
  private String name;
  private boolean multisync;
  private List<BusinessCategoryResponse> businessCategories;
  private String description;
}
