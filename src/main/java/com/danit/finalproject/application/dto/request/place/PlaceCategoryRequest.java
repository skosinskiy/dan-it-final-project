package com.danit.finalproject.application.dto.request.place;

import lombok.Data;

@Data
public class PlaceCategoryRequest {

  private Long id;
  private String name;
  private boolean multisync;

}
