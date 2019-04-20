package com.danit.finalproject.application.dto.response.place;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import java.util.List;
import lombok.Data;

@Data
public class PlaceCategoryResponse {

  private Long id;
  private String name;
  private boolean multisync;
  private List<BusinessCategory> businessCategories;
  private String description;
}
