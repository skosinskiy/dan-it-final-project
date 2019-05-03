package com.danit.finalproject.application.dto.response.place;

import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.entity.LayoutItem;
import lombok.Data;

import java.util.List;

@Data
public class PlaceCategoryResponse {

  private Long id;
  private String name;
  private boolean multisync;
  private boolean allowMessages;
  private List<BusinessCategoryResponse> businessCategories;
  private String description;
  private List<LayoutItem> layoutItems;
}
