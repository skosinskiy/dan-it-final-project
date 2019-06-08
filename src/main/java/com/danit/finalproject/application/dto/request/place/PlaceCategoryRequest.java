package com.danit.finalproject.application.dto.request.place;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import com.danit.finalproject.application.entity.LayoutItem;
import lombok.Data;

import java.util.List;

@Data
public class PlaceCategoryRequest {
  private Long id;
  private String name;
  private boolean multisync;
  private boolean allowMessages;
  private boolean shouldAddPairedUsers;
  private List<BusinessCategoryRequest> businessCategories;
  private String description;
  private String iconKey;
  private List<LayoutItem> layoutItems;
}
